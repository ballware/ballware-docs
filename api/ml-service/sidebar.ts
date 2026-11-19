import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "ml-service/ballware-ml-service-api",
    },
    {
      type: "category",
      label: "MlModel",
      items: [
        {
          type: "doc",
          id: "ml-service/ml-model-consume-by-id-behalf-of-user",
          label: "Consume model by id behalf of user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "ml-service/ml-model-consume-by-identifier-behalf-of-user",
          label: "Consume model by identifier behalf of user",
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
          id: "ml-service/tenant-report-ml-datasources",
          label: "Query report ml datasources for tenant",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
