import type {JSX} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: JSX.Element;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Metadata-driven UI',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <rect x="14" y="14" width="68" height="68" rx="8" fill="none" stroke="currentColor" strokeWidth="5" />
        <line x1="14" y1="38" x2="82" y2="38" stroke="currentColor" strokeWidth="5" />
        <line x1="40" y1="38" x2="40" y2="82" stroke="currentColor" strokeWidth="5" />
      </svg>
    ),
    description: (
      <>
        ballware screens are not coded per application: entities, lookups,
        layouts, and rights are described as metadata and rendered as working
        lists and forms by the Angular web client.
      </>
    ),
  },
  {
    title: 'Multi-service platform',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="48" r="12" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="18" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="78" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="18" cy="72" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="78" cy="72" r="8" fill="none" stroke="currentColor" strokeWidth="5" />
        <line x1="24" y1="30" x2="40" y2="41" stroke="currentColor" strokeWidth="4" />
        <line x1="72" y1="30" x2="56" y2="41" stroke="currentColor" strokeWidth="4" />
        <line x1="24" y1="66" x2="40" y2="55" stroke="currentColor" strokeWidth="4" />
        <line x1="72" y1="66" x2="56" y2="55" stroke="currentColor" strokeWidth="4" />
      </svg>
    ),
    description: (
      <>
        Independent .NET services for metadata, generic data, documents,
        storage, and machine learning, secured by Keycloak.
      </>
    ),
  },
  {
    title: 'API, administration & user documentation',
    icon: (
      <svg className={styles.featureIcon} viewBox="0 0 96 96" aria-hidden="true">
        <path d="M18 18 H48 A10 10 0 0 1 58 28 V78 A12 12 0 0 0 46 66 H18 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
        <path d="M78 18 H48 A10 10 0 0 0 38 28" fill="none" stroke="currentColor" strokeWidth="5" transform="translate(20 0)" />
        <path d="M78 18 H58 A10 10 0 0 0 48 28 V78 A12 12 0 0 1 60 66 H78 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      </svg>
    ),
    description: (
      <>
        OpenAPI-derived API reference, operational runbooks for the deployed
        environments, and an end-user guide for the metadata-driven
        applications.
      </>
    ),
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">{icon}</div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}
