const Container = require('./class');
const data = require('./database');

const productos = new Container('./database.txt');
productos.save(data);
productos.getById(2);
productos.getAll();
productos.deleteById(2);
productos.deleteAll();