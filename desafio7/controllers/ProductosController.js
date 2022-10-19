const Contenedor = require("../escribirProductos");

const productos = [
      // {
      //  id: 1,
      //  timestamp: Date.now(),
      //  nombre: "Naruto",
      //  descripcion: "Famoso manga del autor masashi kishimoto",
      //  foto: "https://static.wikia.nocookie.net/naruto/images/b/be/Naruto_Volumen_1.png/revision/latest?cb=20160917231224&path-prefix=es",
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
      //  nombre: "One Piece",
      //  descripcion: "Famoso manga del autor eiichiro oda",
      //  foto: "https://m.media-amazon.com/images/I/51xRyPQYUmL._AC_SY780_.jpg",
      //  precio: 1100,
      //  stock: 100
      // }
    
];


let savedProducts = Contenedor.getAll();
    savedProducts
        .then (data => {
            data.forEach(producto => {
                productos.push(producto);
            });
        })
        .catch (error => console.log(error))

let siguienteID = 4;

class ProductosController {
    static async obtenerTodos () {
        return productos;
    }

    static async obtenerPorId (id) {
        const objetoFind = productos.find(objeto => objeto.id == id);
        return objetoFind;
    }

    static async agregar (req) {
        let { body : data } = req;
        data = { id: siguienteID, timestamp: Date.now(), ...data };
        productos.push(data);
        Contenedor.save(data);  
        siguienteID ++;
        return productos;
    }

    static async actualizar (id, req) {
        const objetoFind = productos.find(objeto => objeto.id == id);
        const index = productos.findIndex(objeto => objeto.id == id);
        if (objetoFind) {
            objetoFind.nombre = req.body.nombre;
            objetoFind.descripcion = req.body.descripcion;
            objetoFind.codigo = req.body.codigo;
            objetoFind.foto = req.body.foto;
            objetoFind.precio = req.body.precio;
            objetoFind.stock = req.body.stock;
            Contenedor.updateById(index, objetoFind);
            return objetoFind;
        }
        return objetoFind;
    }

    static async borrar (id) {
        const objetoFind = productos.find(objeto => objeto.id == id);
        const index = productos.findIndex(objeto => objeto.id == id);
        if (objetoFind) {
            productos.splice(index, 1);
            Contenedor.deleteById(index); 
            return productos;
        }
        return;
    }
}

module.exports = ProductosController;