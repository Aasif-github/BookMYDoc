import express from 'express';
import http, { Server } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeSocket } from './service/socket.io.js';

import dbConnection from './database/dbConnection.js';
import bookingRouter  from './routes/bookings.route.js';
import slotsRouter from './routes/slot.route.js';

const app = express();
app.use(express.json());
// For URL-encoded data (e.g., from forms):
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', bookingRouter);
app.use('/api/v1', slotsRouter);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);  
// Initialize Socket.IO
const io = initializeSocket(server);

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'test.html'));
});

/*
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your frontend's URL
        methods: ["GET", "POST"],
    },
});

// Set up Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for events from the client
    socket.on('message', (data) => {
        console.log('Message received from client:', data);

        // Emit an event back to the client
        socket.emit('message', 'Hello from server!');
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
*/

dbConnection().then(()=>{
    server.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    })
}).catch((err)=>{
    console.log(err)
});


