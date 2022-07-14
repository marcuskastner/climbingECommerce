export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'reference',
      to: [{ type: 'productTypes' }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
    },
    {
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'options' }] }],
    },

    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      title: 'Description',
      name: 'desc',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'priceId',
      title: 'Price ID',
      type: 'string',
    },
  ],
};
