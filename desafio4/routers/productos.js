const express = require("express");
const { Router } = express;
const Contenedor = require("../productos");

const productos = new Contenedor("./productos/productos.txt");
const router = Router();
const noEncontrado = { error: "producto no encontrado" };


router.get("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      const producto = await productos.getById(id);
      !producto && res.status(404).json(noEncontrado);
      res.status(200).json(producto);
});

router.get("/productos", async (_, res) => {
      const arrayProductos = await productos.getAll();
      !arrayProductos && res.status(404).json(noEncontrado);
      res.status(200).json(arrayProductos);
});


router.post("/productos", async (req, res) => {
      let { body: data } = req;
      const producto = await productos.save(data);
      res.status(200).json(data);
});


router.put("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      let { body: data } = req;
      const arrayProductos = await productos.modify(id, data);
      !arrayProductos && res.status(404).json(noEncontrado);
      res.status(200).end();
});

router.delete("/productos/:id", async (req, res) => {
      let id = parseInt(req.params.id);
      const producto = await productos.deleteById(id);
      !producto && res.status(404).json(noEncontrado);
      res.status(200).end();
});

module.exports = router;
