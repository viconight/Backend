const Contenedor = require("../escribirCarritos");

const carritos = [
   // {
   //     id": 1,
   //     timestamp: Date.now(),
   //     productos: [
   //       {
   //         timestamp: Date.now(),
   //         id: 1,
   //         nombre: "One Piece",
   //         descripcion: "Famoso manga del autor eiichiro oda",
   //         codigo: "",
   //         foto: "https://m.media-amazon.com/images/I/51xRyPQYUmL._AC_SY780_.jpg",
   //         precio: 1100,
   //         stock": 100
   //       }
   //     ]
   //   }
];


let savedCarts = Contenedor.getAll();
    savedCarts
        .then (data => {
            data.forEach(cart => {
                carritos.push(cart);
            });
        })
        .catch (error => console.log(error))

let siguienteID = 2;

class CarritoController {
    static async crearCarrito (req) {
        let { body : data } = req;
        data = { id: siguienteID, timestamp: Date.now(), ...data };
        carritos.push(data);
        Contenedor.save(data); 
        siguienteID ++;
        return data.id;
    }
    
    static async borrarCarrito (id) {
        const carritoFind = carritos.find(carrito => carrito.id == id);
        const index = carritos.findIndex(objeto => objeto.id == id);
        if (carritoFind) {
            carritos.splice(index, 1);
            Contenedor.deleteById(index); 
            return carritos;
        }
        return;
    }

    static async obtenerProductosCarrito (id) {
        const carritoFind = carritos.find(carrito => carrito.id == id);
        if (carritoFind) {
            return carritoFind.productos;
        }
        return;
    }

    static async agregarProducto (req, id) {
        const carritoFind = carritos.find(carrito => carrito.id == id);
        const index = carritos.findIndex(objeto => objeto.id == id);
        if (carritoFind) {
            let { body : data } = req;
            data = { timestamp: Date.now(), ...data };
            carritos[index].productos.push(data);
            Contenedor.saveProduct(); 
            return data;
        }
        return;
    }

    static async borrarProducto (id, id_prod) {
        const carritoFind = carritos.find(carrito => carrito.id == id);
        const index = carritos.findIndex(objeto => objeto.id == id);
        if (carritoFind) {
            const productoFind = carritoFind.productos.find(producto => producto.id == id_prod);
            if (productoFind) {
                const indexProducto = carritoFind.productos.findIndex(producto => producto.id == id_prod);
                carritos[index].productos.splice(indexProducto, 1);
                Contenedor.deleteProduct(); 
                return carritos;
            }
            return 1; 
        }
        return 0; 
    }
}

module.exports = CarritoController;