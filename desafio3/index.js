const Container = require('./class');
const data = require('./database');

const productos = new Container('./database.txt');


const express = require('express')

const app = express()




app.get("/", (req, res) => {
    res.send(
          '<h1 style="color: orange">Bienvenidos al servidor express</h1>'
    );
});

app.get('/productos', async(req, res) =>{
    const resp = await productos.getAll()
    res.send(resp)
})

app.get("/productoRandom", async (req, res) => {
    const resultado = await productos.getAll();
    const random = resultado[Math.ceil(Math.random() * resultado.length)];
    res.send(random);
  });

const PORT =  process.env.PORT || 8080;

const server = app.listen(PORT,() =>{
    console.log(`servidor http escuchado en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`error en el servidor ${error}`))
