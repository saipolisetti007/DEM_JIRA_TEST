const steps = ['Event Main Parameters', 'Event Additional Data', 'Event Properties'];
const stepFields = {
  0: [
    'unique_event_id',
    'golden_customer_id',
    'event_in_store_start_date',
    'event_in_store_end_date',
    'start_of_shipments',
    'end_of_shipments',
    'event_type',
    'event_subtype',
    'event_description',
    'event_sales_channel',
    'umbrella_event',
    'event_publish_to_demand',
    'comments'
  ],
  1: [
    'expected_shipments_forecast',
    'expected_consumption_forecast',
    'item_type',
    'bu',
    'product_id',
    'id_type',
    'customer_item_number',
    'proxy_like_item_number',
    'pgp_flag',
    'promoted_product_group_id',
    'country_code',
    'distribution_profile',
    'discount_amt',
    'base_price',
    'price_after_discount',
    'status'
  ],
  2: [
    'event_string_property_1',
    'event_string_property_2',
    'event_string_property_3',
    'event_string_property_4',
    'event_string_property_5',
    'event_num_property_1',
    'event_num_property_2',
    'event_num_property_3',
    'event_num_property_4',
    'event_num_property_5',
    'offer_type',
    'off',
    'limit',
    'tpr',
    'off_2',
    'gc_buy',
    'gc_save',
    'percentage'
  ]
};
const dateFields = [
  'event_in_store_end_date',
  'event_in_store_start_date',
  'start_of_shipments',
  'end_of_shipments'
];

const settingsFields = {
  0: ['start_of_shipments', 'end_of_shipments', 'event_description', 'umbrella_event', 'comments'],
  1: [
    'expected_shipments_forecast',
    'expected_consumption_forecast',
    'bu',
    'proxy_like_item_number',
    'pgp_flag',
    'promoted_product_group_id',
    'distribution_profile',
    'discount_amt',
    'base_price',
    'price_after_discount',
    'status'
  ],
  2: [
    'event_string_property_1',
    'event_string_property_2',
    'event_string_property_3',
    'event_string_property_4',
    'event_string_property_5',
    'event_num_property_1',
    'event_num_property_2',
    'event_num_property_3',
    'event_num_property_4',
    'event_num_property_5',
    'offer_type',
    'off',
    'limit',
    'tpr',
    'off_2',
    'gc_buy',
    'gc_save',
    'percentage'
  ]
};

export { steps, stepFields, dateFields, settingsFields };
