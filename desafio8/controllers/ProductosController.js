const { createTable, insertProducts, getProducts, getProductsByID, updateProducts, deleteProducts } = require('../knex');

// const productos = [
//       // {
      //  id: 1,
      //  timestamp: Date.now(),
      //  nombre: "Naruto",
      //  nombre: "One Piece",
      //  descripcion: "Famoso manga del autor eiichiro oda",
      //  precio: 1100,
      //  stock: 100
      //},
      //{
      //  id: 2,
      //  timestamp: Date.now(),
      //  nombre: "Dragon Ball",
      //  descripcion": "Famoso manga del autor akira toriyama",
      //  foto: "https://m.media-amazon.com/images/I/71u0UjsSrnL.jpg",
      //  precio: 1100,
      //  stock: 100
      //},
      //{
      //  id: 3,
      //  timestamp: Date.now(),
      //  nombre: "Naruto",
      //  descripcion: "Famoso manga del autor masashi kishimoto",
      //  foto: "https://m.media-amazon.com/images/I/51xRyPQYUmL._AC_SY780_.jpg",
      //  precio: 1100,
      //  stock: 100
      // },
// ]

(async function () {

    try {
        await createTable();
        // await insertProducts(productos);
    } catch (error) {
        console.error(error.message);
    }
    
})();

class ProductosController {
    static async obtenerTodos () {
        const productos = await getProducts();
        return productos;
    }

    static async obtenerPorId (id) {
        const objetoFind = await getProductsByID({ id: id });
        return objetoFind;
    }

    static async agregar (req) {
        let { body : data } = req;
        await insertProducts(data);
        return data;
    }

    static async actualizar (id, req) {
        const objetoFind = await getProductsByID({ id: id });
        if (objetoFind) {
            await updateProducts([req.body], { id: id });
            return req.body;
        }
        return undefined;
    }

    static async borrar (id) {
        const objetoFind = await getProductsByID({ id: id });
        if (objetoFind) {
            const productos = await deleteProducts({ id: id });
            return productos;
        }
        return undefined;
    }
}

module.exports = ProductosController;