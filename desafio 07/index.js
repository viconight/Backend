const express = require('express');
const path = require('path');
// const handlebars = require('express-handlebars');
const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.engine('handlebars', handlebars.engine());
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

app.use('/api', routers);


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

const server = app.listen(process.env.NODE_PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
    console.log(`http://localhost:${server.address().port}`);
    console.log(`Environment:${process.env.NODE_ENV}`);
})


server.on("error", error => console.log(`Error en servidor ${error}`));