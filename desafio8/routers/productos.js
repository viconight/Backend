const { Router } = require('express');
const ProductosController = require('../controllers/ProductosController');

const router = Router();

router.get('/', async (req, res) => {
    
    const productos = await ProductosController.obtenerTodos();
    res.status(200).json(productos);
})

router.get('/:id', async (req, res) => {
    
    const producto = await ProductosController.obtenerPorId(req.params.id);
    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error : 'producto no encontrado' })
    }
})

router.post('/', async (req, res) => {
    
    const productos = await ProductosController.agregar(req);
    // res.status(201).json(productos);
    res.redirect('/');
})

router.put('/:id', async (req, res) => {
    
    const producto = await ProductosController.actualizar(req.params.id, req);
    if (producto) { 
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

router.delete('/:id', async (req, res) => {
   
    const producto = await ProductosController.borrar(req.params.id);
    if (producto) {
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

module.exports = router;