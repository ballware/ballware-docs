#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const openapiDir = path.join(root, 'openapi');
const manifestPath = path.join(openapiDir, 'manifest.json');

const services = [
  { service: 'meta', port: 5001, container: 'meta-service', docs: ['meta', 'service'] },
  { service: 'generic', port: 5002, container: 'generic-service', docs: ['generic', 'service', 'schema'] },
  { service: 'ml', port: 5003, container: 'ml-service', docs: ['ml', 'service'] },
  { service: 'reporting', port: 5004, container: 'reporting-service', docs: ['document', 'service'] },
  { service: 'storage', port: 5005, container: 'storage-service', docs: ['storage', 'service'] },
];

function specUrl(port, doc) {
  return `http://localhost:${port}/swagger/${doc}/swagger.json`;
}

function specFile(service, doc) {
  return path.join(openapiDir, service, `${doc}.json`);
}

async function fetchSpec(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) {
    throw new Error(`GET ${url} -> HTTP ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function validateSpec(spec, url) {
  if (!spec || typeof spec !== 'object') throw new Error(`${url}: not a JSON object`);
  const version = spec.openapi ?? spec.swagger;
  if (typeof version !== 'string' || !version.startsWith('3.')) {
    throw new Error(`${url}: missing or unsupported OpenAPI version (${version})`);
  }
  const paths = spec.paths ?? {};
  const count = Object.keys(paths).length;
  if (count === 0) throw new Error(`${url}: spec contains zero paths`);
  return { version, pathCount: count, title: spec.info?.title ?? null, specVersion: spec.info?.version ?? null };
}

function detectImage(container) {
  const probe = spawnSync('docker', ['inspect', '--format', '{{.Config.Image}}', container], { encoding: 'utf8' });
  if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
  return null;
}

async function fetchAll() {
  const errors = [];
  const entries = [];
  for (const svc of services) {
    const dir = path.join(openapiDir, svc.service);
    mkdirSync(dir, { recursive: true });
    for (const doc of svc.docs) {
      const url = specUrl(svc.port, doc);
      try {
        const spec = await fetchSpec(url);
        const meta = validateSpec(spec, url);
        writeFileSync(specFile(svc.service, doc), `${JSON.stringify(spec, null, 2)}\n`);
        entries.push({
          service: svc.service,
          doc,
          sourceUrl: url,
          openapi: meta.version,
          title: meta.title,
          specVersion: meta.specVersion,
          pathCount: meta.pathCount,
          serviceImage: detectImage(svc.container),
        });
      } catch (err) {
        errors.push(`${svc.service}/${doc}: ${err.message}`);
      }
    }
  }
  if (errors.length > 0) {
    console.error('OpenAPI fetch failed — the local ballware-docker-compose stack must be running (docker compose up -d):');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  writeFileSync(
    manifestPath,
    `${JSON.stringify({ fetchedAt: new Date().toISOString(), note: 'Snapshots taken from the local ballware-docker-compose stack; see scripts/fetch-openapi.mjs', services: services.map((s) => ({ service: s.service, port: s.port, docs: s.docs })) }, null, 2)}\n`
  );
  writeFileSync(
    path.join(openapiDir, 'snapshot.json'),
    `${JSON.stringify({ fetchedAt: new Date().toISOString(), entries }, null, 2)}\n`
  );
  console.log(`Fetched ${entries.length} specs into openapi/:`);
  for (const e of entries) {
    console.log(`  ${e.service}/${e.doc}.json  (openapi ${e.openapi}, ${e.pathCount} paths, image: ${e.serviceImage ?? 'n/a'})`);
  }
}

function readManifest() {
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

function status() {
  const manifest = readManifest();
  console.log(`Manifest fetchedAt: ${manifest.fetchedAt}`);
  for (const svc of manifest.services) {
    for (const doc of svc.docs) {
      const file = specFile(svc.service, doc);
      try {
        const spec = JSON.parse(readFileSync(file, 'utf8'));
        const meta = validateSpec(spec, file);
        console.log(`  ${svc.service}/${doc}.json  ok  (openapi ${meta.version}, ${meta.pathCount} paths, title: ${meta.title ?? 'n/a'}, spec: ${meta.specVersion ?? 'n/a'})`);
      } catch (err) {
        console.error(`  ${svc.service}/${doc}.json  MISSING OR INVALID: ${err.message}`);
        process.exitCode = 1;
      }
    }
  }
}

function check() {
  let entries;
  try {
    entries = JSON.parse(readFileSync(path.join(openapiDir, 'snapshot.json'), 'utf8')).entries;
  } catch {
    console.error('openapi/snapshot.json not found — run npm run api:fetch first');
    process.exit(1);
  }
  let failed = 0;
  for (const svcDir of readdirSync(openapiDir, { withFileTypes: true })) {
    if (!svcDir.isDirectory()) continue;
    for (const f of readdirSync(path.join(openapiDir, svcDir.name))) {
      if (!f.endsWith('.json')) continue;
      const file = path.join(openapiDir, svcDir.name, f);
      try {
        const spec = JSON.parse(readFileSync(file, 'utf8'));
        const meta = validateSpec(spec, file);
        const entry = entries.find((e) => e.service === svcDir.name && e.doc === f.replace(/\.json$/, ''));
        if (!entry) {
          console.error(`  ${svcDir.name}/${f}: not covered by snapshot manifest`);
          failed++;
          continue;
        }
        console.log(`  ${svcDir.name}/${f}: openapi ${meta.version}, ${meta.pathCount} paths`);
      } catch (err) {
        console.error(`  ${svcDir.name}/${f}: ${err.message}`);
        failed++;
      }
    }
  }
  if (failed > 0) {
    console.error(`api:check failed for ${failed} spec(s)`);
    process.exit(1);
  }
  console.log(`api:check ok (${entries.length} specs)`);
}

const command = process.argv[2] ?? 'fetch';
if (command === 'fetch') {
  await fetchAll();
} else if (command === 'status') {
  status();
} else if (command === 'check') {
  check();
} else {
  console.error('usage: node scripts/fetch-openapi.mjs <fetch|status|check>');
  process.exit(2);
}
