const { Router } = require('express');
const CarritoController = require('../controllers/CarritoController');

const router = Router();

router.post('/', async (req, res) => {
    
    const carritoId = await CarritoController.crearCarrito(req);
    res.status(201).json({ carritoID : carritoId});
})

router.delete('/:id', async (req, res) => {
    
    const carrito = await CarritoController.borrarCarrito(req.params.id);
    if (carrito) {
        res.status(204).end();
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id} metodo DELETE no implementada` // 404 NOT FOUND
         })
    )
})

router.get('/:id/productos', async (req, res) => {
    
    const carrito = await CarritoController.obtenerProductosCarrito(req.params.id);
    if (carrito) {
        res.status(200).json(carrito);
    } else {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos metodo GET no implementada` // 404 NOT FOUND
         })
    }
})


router.post('/:id/productos', async (req, res) => {
    
    const producto = await CarritoController.agregarProducto(req, req.params.id);
    if (producto) { 
        res.status(201).json(producto);
    } else (
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos metodo POST no implementada` // 404 NOT FOUND
         })
    )
})


router.delete('/:id/productos/:id_prod', async (req, res) => {
    
    const carrito = await CarritoController.borrarProducto(req.params.id, req.params.id_prod);
    
    if (carrito == 0) {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos/${req.params.id_prod} metodo DELETE no implementada` // 404 NOT FOUND
         })
    } else if (carrito == 1) {
        res.status(404).json({
            error: -2,
            descripcion: `ruta http://localhost:8080/api/carrito/${req.params.id}/productos/${req.params.id_prod} metodo DELETE no implementada` // 404 NOT FOUND
         })
    } else {
        res.status(204).end();
    }
})

module.exports = router;