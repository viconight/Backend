import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';
import routers from './routers/index.js'
import { initSocket } from './socket.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routers);

const server = http.createServer(app);
initSocket(server);


app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

server.listen(process.env.NODE_PORT, () => {
    console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`);
    console.log(`http://localhost:${server.address().port}`);
    console.log(`Environment:${process.env.NODE_ENV}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));