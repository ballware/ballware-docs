import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "storage/ballware-storage-user-api",
    },
    {
      type: "category",
      label: "Attachment",
      items: [
        {
          type: "doc",
          id: "storage/attachment-all-for-entity-and-owner",
          label: "Query attachments for entity and owner",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage/attachment-download-for-entity-and-owner-by-id",
          label: "Download attachment for entity and owner by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "storage/attachment-upload-for-entity-and-owner",
          label: "Upload attachment for entity and owner",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "storage/attachment-drop-for-entity-and-owner-by-id",
          label: "Drop attachment for entity and owner by ID",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "storage/attachment-drop-all-for-entity-and-owner",
          label: "Drop all attachments for entity and owner",
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
          id: "storage/temporary-download-by-id",
          label: "Download temporary file by ID",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
