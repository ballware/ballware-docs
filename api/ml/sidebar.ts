import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "ml/ballware-ml-user-api",
    },
    {
      type: "category",
      label: "MlModel",
      items: [
        {
          type: "doc",
          id: "ml/ml-model-select-list",
          label: "Query list of all documents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "ml/ml-model-select-by-id",
          label: "Query select item by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "ml/ml-model-consume-by-id",
          label: "Consume model by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "ml/ml-model-train",
          label: "Train models",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
