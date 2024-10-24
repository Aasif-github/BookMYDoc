import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your frontend's URL
        methods: ["GET", "POST"],
    },
});

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'test.html'));
});

app.use(express.json());

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

// Start the server with Socket.IO
server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
