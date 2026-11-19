import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "generic/ballware-generic-api",
    },
    {
      type: "category",
      label: "Generic",
      items: [
        {
          type: "doc",
          id: "generic/generic-all",
          label: "Query all",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-query",
          label: "Query items of generic entity by query identifier and params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-count",
          label: "Count items of generic entity by query identifier and params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-new",
          label: "Fetch new item template for entity by identifier",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-new-query",
          label: "Fetch new item template for entity by identifier with params",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-by-id",
          label: "Query existing tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-save",
          label: "Save existing or new tenant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic/generic-save-batch",
          label: "Save list of items for entity by identifier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic/generic-remove",
          label: "Query existing tenant",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "generic/generic-import",
          label: "Import from file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic/generic-export",
          label: "Export by query",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic/generic-export-url",
          label: "Export to file by query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic/generic-download",
          label: "Download exported",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
