// Define the steps for the form wizard
const steps: string[] = ['Event Main Parameters', 'Event Additional Data', 'Event Properties'];

// Common fields for step 0
const commonFieldsStep0: string[] = [
  'start_of_shipments',
  'end_of_shipments',
  'event_type',
  'event_subtype',
  'umbrella_event',
  'comments',
  'event_description',
  'event_sales_channel'
];

// Common fields for step 1
const commonFieldsStep1: string[] = [
  'expected_shipments_forecast',
  'expected_consumption_forecast',
  'item_type',
  'bu',
  'proxy_like_item_number',
  'pgp_flag',
  'customer_item_number',
  'promoted_product_group_id',
  'distribution_profile',
  'discount_amt',
  'base_price',
  'price_after_discount'
];

// Common fields for step 2
const commonFieldsStep2: string[] = [
  'offer_type',
  'multi_category_offer',
  'multi_manufacturer_offer',
  'off',
  'limit',
  'off_2',
  'quantity_threshold',
  'x_free',
  'gc_buy',
  'gc_save',
  'percentage',
  'event_string_property_1',
  'event_string_property_2',
  'event_string_property_3',
  'event_string_property_4',
  'event_num_property_1',
  'event_num_property_2',
  'event_num_property_3'
];
// Fields for each step
const stepFields: Record<number, string[]> = {
  0: [
    'cpf_id',
    'golden_customer_id',
    'event_in_store_start_date',
    'event_in_store_end_date',
    'unique_event_id',
    'minerva_volume',
    'event_publish_to_demand',
    ...commonFieldsStep0
  ],
  1: ['product_id', 'id_type', 'country_code', ...commonFieldsStep1],
  2: [...commonFieldsStep2]
};
// Fields that are dates
const dateFields: string[] = [
  'event_in_store_end_date',
  'event_in_store_start_date',
  'start_of_shipments',
  'end_of_shipments'
];
// Settings fields for each step
const settingsFields: Record<number, string[]> = {
  0: [...commonFieldsStep0],
  1: [...commonFieldsStep1],
  2: [...commonFieldsStep2]
};
// Options for sales channels
const salesChannelOptions: string[] = ['Store', 'Ecomm'];
// Options for item types
const itemTypeOptions: string[] = ['EDA', 'In & Out'];
// Options for ID types
const iDTypeOptions: string[] = ['FPC', 'GTIN'];
// Options for countries
const countryOptions: string[] = [
  'US',
  'CA',
  'GB',
  'FR',
  'DE',
  'IT',
  'JP',
  'CN',
  'IN',
  'BR',
  'RU',
  'ZA',
  'PL'
];

export {
  steps,
  stepFields,
  dateFields,
  settingsFields,
  salesChannelOptions,
  itemTypeOptions,
  countryOptions,
  iDTypeOptions
};
