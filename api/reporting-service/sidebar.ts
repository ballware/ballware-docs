import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reporting-service/ballware-document-service-api",
    },
    {
      type: "category",
      label: "Document",
      items: [
        {
          type: "doc",
          id: "reporting-service/document-select-list-for-tenant",
          label: "Query available documents for tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/document-metadata-for-tenant-and-id",
          label: "Query document metadata by tenant and id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/document-new-for-tenant-and-user",
          label: "Query new document template for tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/document-save-for-tenant-behalf-of-user",
          label: "Save document behalf of user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Notification",
      items: [
        {
          type: "doc",
          id: "reporting-service/notification-metadata-by-tenant-and-id",
          label: "Query notification metadata by tenant and id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/notification-metadata-by-tenant-and-identifier",
          label: "Query notification metadata by tenant and identifier",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Subscription",
      items: [
        {
          type: "doc",
          id: "reporting-service/subscription-metadata-by-tenant-and-id",
          label: "Query subscription metadata by tenant and id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/subscription-active-by-frequency",
          label: "Query active subscriptions by frequency",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting-service/subscription-set-send-result",
          label: "Send send result for subscription",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
