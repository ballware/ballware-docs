import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "reporting/ballware-document-user-api",
    },
    {
      type: "category",
      label: "Document",
      items: [
        {
          type: "doc",
          id: "reporting/document-select-list-for-entity",
          label: "Query available documents for entity",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-select-list",
          label: "Query list of all documents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-select-by-id",
          label: "Query select item by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-update-datasources-by-ids",
          label: "Update document datasources by ids",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/document-all",
          label: "Query all",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-query",
          label: "Query items by query identifier and params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-new",
          label: "Query new item template",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-by-id",
          label: "Query existing item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-save",
          label: "Save existing or new item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/document-save-batch",
          label: "Save existing or new items in batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/document-remove",
          label: "Query existing tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reporting/document-import",
          label: "Import from file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/document-export",
          label: "Export by query",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/document-export-url",
          label: "Export to file by query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/document-download",
          label: "Download exported",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Notification",
      items: [
        {
          type: "doc",
          id: "reporting/notification-all",
          label: "Query all",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/notification-query",
          label: "Query items by query identifier and params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/notification-new",
          label: "Query new item template",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/notification-by-id",
          label: "Query existing item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/notification-save",
          label: "Save existing or new item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/notification-save-batch",
          label: "Save existing or new items in batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/notification-remove",
          label: "Query existing tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reporting/notification-import",
          label: "Import from file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/notification-export",
          label: "Export by query",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/notification-export-url",
          label: "Export to file by query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/notification-download",
          label: "Download exported",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "ProcessingState",
      items: [
        {
          type: "doc",
          id: "reporting/processing-state-select-list-all-successors-for-document-by-ids",
          label: "Query all possible successor processing states for documents by instance ids",
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
          id: "reporting/subscription-all",
          label: "Query all",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/subscription-query",
          label: "Query items by query identifier and params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/subscription-new",
          label: "Query new item template",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/subscription-by-id",
          label: "Query existing item",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/subscription-save",
          label: "Save existing or new item",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/subscription-save-batch",
          label: "Save existing or new items in batch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/subscription-remove",
          label: "Query existing tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "reporting/subscription-import",
          label: "Import from file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/subscription-export",
          label: "Export by query",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "reporting/subscription-export-url",
          label: "Export to file by query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "reporting/subscription-download",
          label: "Download exported",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
