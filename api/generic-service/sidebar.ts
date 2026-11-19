import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "generic-service/ballware-service-api",
    },
    {
      type: "category",
      label: "Lookup",
      items: [
        {
          type: "doc",
          id: "generic-service/lookup-select-column-value-by-id-for-tenant-and-lookup-id",
          label: "Query single column value for lookup by tenant and id",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "MlModel",
      items: [
        {
          type: "doc",
          id: "generic-service/ml-model-training-data-by-tenant-and-plain-query",
          label: "Query model training data by tenant and sql query",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Tenant",
      items: [
        {
          type: "doc",
          id: "generic-service/tenant-report-datasources",
          label: "Query report datasources for tenant",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
