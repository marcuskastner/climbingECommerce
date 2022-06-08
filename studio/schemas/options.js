export default {
  name: 'options',
  title: 'Options',
  type: 'document',
  fields: [
    {
      name: 'optionName',
      title: 'Option Name',
      type: 'string',
    },
    {
      name: 'optionValues',
      title: 'Option Values',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
