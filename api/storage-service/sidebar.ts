import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "storage-service/ballware-storage-service-api",
    },
    {
      type: "category",
      label: "Attachment",
      items: [
        {
          type: "doc",
          id: "storage-service/attachment-all-for-tenant-entity-and-owner",
          label: "Query attachments for entity and owner",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage-service/attachment-download-for-tenant-entity-and-owner-by-id",
          label: "Download attachment for entity and owner by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage-service/attachment-download-for-tenant-entity-and-owner-by-filename",
          label: "Download attachment for entity and owner by filename",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage-service/attachment-upload-for-tenant-entity-and-owner-behalf-of-user",
          label: "Upload attachment for tenant, entity and owner",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "storage-service/attachment-drop-for-tenant-entity-and-owner-by-id-behalf-of-user",
          label: "Drop attachment for tenant, entity and owner by ID",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "storage-service/attachment-drop-for-tenant-entity-and-owner-by-filename-behalf-of-user",
          label: "Drop attachment for tenant, entity and owner by filename",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "storage-service/attachment-drop-all-for-tenant-entity-and-owner-behalf-of-user",
          label: "Drop all attachments for tenant, entity and owner",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "storage-service/attachment-drop-all-for-tenant-and-entity-behalf-of-user",
          label: "Drop all attachments for tenant, entity and owner",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "storage-service/attachment-drop-all-for-tenant-behalf-of-user",
          label: "Drop all attachments for tenant",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Temporary",
      items: [
        {
          type: "doc",
          id: "storage-service/temporary-download-for-tenant-by-id",
          label: "Download temporary for tenant by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage-service/temporary-upload-for-tenant-and-id-behalf-of-user",
          label: "Upload temporary for tenant and ID behalf of user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "storage-service/temporary-drop-for-tenant-and-id-behalf-of-user",
          label: "Drop temporary for tenant and ID",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
