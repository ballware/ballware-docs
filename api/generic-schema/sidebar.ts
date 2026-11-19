import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "generic-schema/ballware-schema-api",
    },
    {
      type: "category",
      label: "Tenant",
      items: [
        {
          type: "doc",
          id: "generic-schema/tenant-create-or-update-entity-schema-for-tenant",
          label: "Create or update entity schema in tenant database",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic-schema/tenant-drop-entity-schema-for-tenant",
          label: "Drop entity schema in tenant database by identifier",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "generic-schema/tenant-create-or-update-schema-for-tenant",
          label: "Create or update schema in tenant database",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic-schema/tenant-drop-schema-for-tenant",
          label: "Drop schema in tenant database",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
