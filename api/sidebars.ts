import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

import metaApiSidebar from './meta/sidebar';
import metaServiceApiSidebar from './meta-service/sidebar';
import genericApiSidebar from './generic/sidebar';
import genericServiceApiSidebar from './generic-service/sidebar';
import genericSchemaApiSidebar from './generic-schema/sidebar';
import mlApiSidebar from './ml/sidebar';
import mlServiceApiSidebar from './ml-service/sidebar';
import reportingApiSidebar from './reporting/sidebar';
import reportingServiceApiSidebar from './reporting-service/sidebar';
import storageApiSidebar from './storage/sidebar';
import storageServiceApiSidebar from './storage-service/sidebar';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    {
      type: 'category',
      label: 'API overview',
      items: ['index', 'authentication', 'route-map', 'mcp', 'versions'],
    },
    ...metaApiSidebar,
    ...metaServiceApiSidebar,
    ...genericApiSidebar,
    ...genericServiceApiSidebar,
    ...genericSchemaApiSidebar,
    ...mlApiSidebar,
    ...mlServiceApiSidebar,
    ...reportingApiSidebar,
    ...reportingServiceApiSidebar,
    ...storageApiSidebar,
    ...storageServiceApiSidebar,
  ],
};

export default sidebars;
