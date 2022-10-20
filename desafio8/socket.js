const { Server } = require('socket.io');
const moment = require("moment");
const { insertProducts, createTableSqlite, insertMessage, getMessages } = require('./knex');

let io;

let messages = [];
let products = [];

(async function () {
    try {
        await createTableSqlite();
        // let asd = {
        //     email: "Coder House",
        //     message: "Bienvenidos",
        //     date: "01/01/2022 00:00:00",
        // }
        // await insertMessage(asd);
        const savedMessages = await getMessages();
        savedMessages.forEach(message => {
            messages.push(message);
        });
    } catch (error) {
        console.error(error.message);
    }
})();

function initSocket(httpServer) {
    io = new Server(httpServer);
    setEvents(io);
}

function setEvents(io) {
    io.on('connection', (socketClient) => {
        console.log('Se conecto un nuevo cliente con el id', socketClient.id);
        
        socketClient.emit('history-messages', messages);
        
        socketClient.emit('history-products', products);

        socketClient.on('new-message', (data) => {
            data.date = moment().format("DD/MM/YYYY HH:mm:ss");
            insertMessage(data);
            messages.push(data);
            io.emit('notification', data);
        })

        socketClient.on('new-product', (data) => {
            products.push(data);
            insertProducts(data);
            io.emit('table-update', data);
        })

        socketClient.on('disconnection', () => {
        console.log('Se desconecto el cliente con el id', socketClient.id);
        })
    })
}

module.exports = {
    initSocket,
}