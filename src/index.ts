import express, {Express} from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

const app: Express = express()

const port: number = 443;

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173']
}))

const server = app.listen(port, () => {
  console.log('api-websocket is running on port 443')
})

const io: Server = new Server(server, {
  pingTimeout: 15000,
  cors: {
    origin: ["http://localhost:5173"]
  }
})

io.on('connection', socket => {
  console.log('Usuario conectado:', socket.id);

  socket.on('payment', payment => {
    console.log('Pago recibido y enviado correctamente:', payment);
    io.emit('payment-processed', payment);
  });

  socket.on("disconnect", (reason) => {
    console.log("Usuario desconectado:", socket.id, "Motivo:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("Error de conexión en el socket:", error);
  });
});
