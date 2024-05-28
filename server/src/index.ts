import express, {Express, Request, Response} from 'express';
import cors from "cors"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import {Server as SocketIOServer} from "socket.io"
import { MONGO_URI } from './utils/config';
const app: Express = express();

dotenv.config()

// ROUTES
import authRoute from "./routes/authRoute"
import messageRoute from "./routes/messageRoute"
import logger from './utils/logger';
import errorHandler from './middleware/errorHandler';

const origin = process.env.ORIGIN || ""
const port = process.env.PORT || 3000; 
const corsOptions = {
  origin: origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

console.log(corsOptions)

app.use(cors(corsOptions))
app.use(express.json())

// mongoose setup
mongoose.connect(MONGO_URI).then(()=> {
  logger.info("Conneted to MongoDB")
}).catch(error => {logger.info("mongoose connection failed!", error)})


app.get('/health', (_req:Request, res:Response) => {
  res.status(200).json({message: "Endpoint /health successfully!"});
});

app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute )

app.use(errorHandler)

const server = app.listen(port, () => {
  logger.info(`Server is running at ${port}`);
});

// socket.io initialization
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"]
  }
})

const onlineUsers = new Map()  

io.on("connection", (socket) => {
  // Adding a users to the online users map
  socket.on("add-user", (userId)=> {
    onlineUsers.set(userId, socket.id)
    
    logger.info(`User ${userId} connected!`)
  } )

  socket.on("send-msg", (data)=> {
    logger.info(data)
    const sendUserSocket = onlineUsers.get(data.to)
    
    logger.info('retrieving submit to user OR sendUserSocket', sendUserSocket)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    }
  })

});



export default app