const steps = ['Event Main Parameters', 'Event Additional Data', 'Event Properties'];
const commonFieldsStep0 = [
  'start_of_shipments',
  'end_of_shipments',
  'event_type',
  'event_subtype',
  'umbrella_event',
  'comments',
  'minerva_volume',
  'event_description',
  'event_sales_channel'
];
const commonFieldsStep1 = [
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
const commonFieldsStep2 = [
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

const stepFields = {
  0: [
    'cpf_id',
    'golden_customer_id',
    'event_in_store_start_date',
    'event_in_store_end_date',
    'unique_event_id',
    'event_publish_to_demand',
    ...commonFieldsStep0
  ],
  1: ['product_id', 'id_type', 'country_code', ...commonFieldsStep1],
  2: [...commonFieldsStep2]
};
const dateFields = [
  'event_in_store_end_date',
  'event_in_store_start_date',
  'start_of_shipments',
  'end_of_shipments'
];

const settingsFields = {
  0: [...commonFieldsStep0],
  1: [...commonFieldsStep1],
  2: [...commonFieldsStep2]
};

const salesChannelOptions = ['Store', 'Ecomm'];
const itemTypeOptions = ['EDA', 'In & Out'];
const iDTypeOptions = ['FPC', 'GTIN'];
const countryOptions = [
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
