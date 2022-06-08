export default {
  name: 'index',
  title: 'Index',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'sale',
      title: 'Sale',
      type: 'string',
    },
  ],
};
