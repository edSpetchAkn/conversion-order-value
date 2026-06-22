/**
 * config.js — Conversions + Order Value
 *
 * Single source of truth for all configuration, thresholds, and narrative strings.
 * Set debugMode: false before client handover.
 */

export const CONFIG = {
  debugMode: false,

  api: {
    maxAttributePages: 20,
    defaultChannel: 'ecommerce',
  },

  structuredAttributeTypes: [
    'pim_catalog_date',
    'pim_catalog_identifier',
    'pim_catalog_metric',
    'pim_catalog_multiselect',
    'pim_catalog_number',
    'pim_catalog_price_collection',
    'akeneo_reference_entity',
    'akeneo_reference_entity_collection',
    'pim_catalog_simpleselect',
    'pim_catalog_table',
    'pim_catalog_boolean',
  ],

  productLinkAttributeTypes: ['pim_catalog_product_link'],

  assetCollectionAttributeType: 'pim_catalog_asset_collection',

  valueFramework: {
    businessGoal: 'Accelerate Growth',
    businessOutcome: 'Conversions + Order Value',
  },

  metrics: {
    completeness: {
      key: 'completeness',
      pillar: 'Data Model',
      label: '% of Products with 100% Completeness',
      description: 'What % of your products currently pass your completeness check for every locale on this channel?',
      thresholds: { red: 70, green: 90 },
      valueAtRisk:
        'You risk high cart abandonment rates. Any missing specification creates a moment of doubt. There is a low probability of a customer leaving your site to find a technical answer, then returning to buy.',
      valueDelivered:
        'Full completeness eliminates buyer hesitation. By ensuring every required attribute is present, you remove the information gaps that cause customers to abandon their carts.',
    },
    categorised: {
      key: 'categorised',
      pillar: 'Data Model',
      label: '% of Products Categorised',
      description: 'What % of your products are assigned to at least one category?',
      thresholds: { red: 70, green: 90 },
      valueAtRisk:
        "If products aren't categorised, they are invisible to customers browsing your menu trees. It is also harder to find related or alternative products.",
      valueDelivered:
        'Products correctly placed within a logical hierarchy are easier to find via site navigation and breadcrumbs, ensuring customers are exposed to more of your catalogue.',
    },
    structuredTypes: {
      key: 'structuredTypes',
      pillar: 'Data Model',
      label: '% of Attributes Using Structured Types',
      description:
        'What % of your catalogue attributes use machine-parseable structured types (date, identifier, measurement, multi-select, number, price, reference entity links, simple select, table, yes/no) rather than free text?',
      thresholds: { red: 50, green: 70 },
      valueAtRisk:
        'You risk high bounce rates from lack of discoverability in your site search/filters. You risk losing every lead who uses your faceted navigation.',
      valueDelivered:
        'Structured data powers site search and faceted filtering. By allowing customers to accurately filter you decrease the discovery time, leading to a more satisfying customer experience.',
    },
    hasParent: {
      key: 'hasParent',
      pillar: 'Data Model',
      label: '% of Products with a Product Model Parent',
      description: 'What % of your products are variants linked to a product model parent?',
      thresholds: { red: 70, green: 90 },
      valueAtRisk:
        'Without parent-child modelling, you risk discoverability issues. Customers are forced to browse individual product pages rather than one consolidated page.',
      valueDelivered:
        'By grouping product variants under a parent structure, you provide a consolidated view that allows customers to explore all options on a single page.',
    },
    hasAssociation: {
      key: 'hasAssociation',
      pillar: 'Data Model',
      label: '% of Products with Associations',
      description: 'What % of your products have at least one product link attribute or association populated?',
      thresholds: { red: 50, green: 70 },
      valueAtRisk:
        'By not linking items, you risk leaving potential revenue on the table. You are missing the add-on that turns a single-item sale into a high-value basket.',
      valueDelivered:
        'By providing cross-sells and up-sells, you transition the customer from buying a single item to purchasing a full solution, effectively building the basket at high intent touchpoints.',
    },
    hasAssetCollection: {
      key: 'hasAssetCollection',
      pillar: 'Data Model',
      label: '% of Products with Asset Collections',
      description: 'What % of your products have at least one asset collection attribute with media assets linked?',
      thresholds: { red: 80, green: 100 },
      valueAtRisk:
        'Products without rich asset collections are perceived as higher risk. You risk losing customers who require the visual proof needed for a confident purchase.',
      valueDelivered:
        'Visual proof is a great conversion tool. An asset collection builds trust, helping the customer visualise the product in their own life and reducing the perceived risk of purchase.',
    },
  },
};
