/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://ritu:Ghanshi%401986@cluster1-0stib.mongodb.net/productinventory
     scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker
     scripts/init.mongo.js
 */
/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});
db.deleted_products.remove({});
const productDB = [
  {
    id: 1,
    category: 'Shirts',
    name: 'Blue Shirt',
    price: 35.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH365GVN7pM4ohXUywFfav7HIRQwSGy5glrH-fe_0H45-9948T&usqp=CAU',
  },
  {
    id: 2,
    category: 'Accessories',
    name: 'Gold Earring',
    price: 65.00,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5h57LSW4zyJU1elGYjoTq2D85iYO6tVY8deFazTgwfI6kOvd9FDOru3V5KBa_PhOey8GJPjoFXg&usqp=CAc',

  },
  {
    id: 3,
    category: 'Jackets',
    name: 'Sweatshirt',
    price: 8.98,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ2QimcCsfOIoPlwYyRYn2OjpCqmWjWzcMbyjBQQHulhogdJcorh-hJEpoCvoklcvXTvTHkTiI&usqp=CAc',
  },
];
db.products.insertMany(productDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });
print('Created counter');

db.products.createIndex({ id: 1 }, { unique: true });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
