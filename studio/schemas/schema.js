import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import product from './product';
import brand from './brand';
import productTypes from './productTypes';
import options from './options';
import site from './site';
import index from './index';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    product,
    brand,
    productTypes,
    options,
    site,
    index,
  ]),
});
