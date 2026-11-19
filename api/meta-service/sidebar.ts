import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "meta-service/ballware-service-api",
    },
    {
      type: "category",
      label: "Entity",
      link: {
        type: "doc",
        id: "meta-service/entity",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/entity-select-list-for-tenant",
          label: "Query list of all entities",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/entity-service-metadata-for-tenant-by-identifier",
          label: "Query metadata for entity",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Export",
      link: {
        type: "doc",
        id: "meta-service/export",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/export-fetch-for-tenant-by-id",
          label: "Fetch export for tenant by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/export-create-for-tenant-behalf-of-user",
          label: "Create new export for tenant behalf of user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Job",
      link: {
        type: "doc",
        id: "meta-service/job",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/job-create-for-tenant-behalf-of-user",
          label: "Create new background job for tenant behalf of user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "meta-service/job-update-for-tenant-behalf-of-user",
          label: "Update background job for tenant behalf of user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Lookup",
      link: {
        type: "doc",
        id: "meta-service/lookup",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/lookup-metadata-for-tenant-and-id",
          label: "Query lookup metadata by tenant and identifier",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/lookup-metadata-for-tenant-and-identifier",
          label: "Query lookup metadata by tenant and identifier",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/lookup-metadata-for-tenant",
          label: "Query lookup metadata by tenant",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Pickvalue",
      link: {
        type: "doc",
        id: "meta-service/pickvalue",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/pickvalue-select-by-value-for-tenant-entity-and-field",
          label: "Query single pickvalue for tenant and entity and field by value",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "ProcessingState",
      link: {
        type: "doc",
        id: "meta-service/processing-state",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/processing-state-select-list-all-successors-for-tenant-and-entity-by-identifier",
          label: "Query all possible successor processing states for entity by identifier and current state",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/processing-state-select-by-state-for-tenant-and-entity-by-identifier",
          label: "Query single processing state for entity by identifier and state",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Statistic",
      link: {
        type: "doc",
        id: "meta-service/statistic",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/statistic-metadata-by-tenant-and-identifier",
          label: "Query metadata for statistic by tenant and identifier",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tenant",
      link: {
        type: "doc",
        id: "meta-service/tenant",
      },
      items: [
        {
          type: "doc",
          id: "meta-service/tenant-service-metadata",
          label: "Query tenant metadata by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/tenant-report-allowed-tenants",
          label: "Query list of allowed tenants for user for reporting purposes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/tenant-report-meta-datasources",
          label: "Query report meta datasources for tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "meta-service/tenant-report-lookup-metadata-for-tenant-and-lookup",
          label: "Query additional metadata for lookup by tenant, datasource and identifier",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
