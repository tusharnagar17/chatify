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



const port = process.env.PORT;
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions))
app.use(express.json())

// mongoose setup
mongoose.connect(MONGO_URI).then(()=> {
  console.log("Connetec to MongoDB",)
}).catch(error => {console.log("mongoose connection failed!", error)})


app.get('/ping', (_req:Request, res:Response) => {
  res.status(200).json({message: "Successfully pinged!"});
});

app.use("/api/auth", authRoute)
app.use("/api/message", messageRoute )

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// socket.io initialization
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true,
    methods: ["GET", "POST"]
  }
})

const onlineUsers = new Map()  

io.on("connection", (socket) => {
  // Adding a users to the online users map
  socket.on("add-user", (userId)=> {
    onlineUsers.set(userId, socket.id)
    
    console.log(`User ${userId} connected!`)
  } )

  socket.on("send-msg", (data)=> {
    console.log(data)
    const sendUserSocket = onlineUsers.get(data.to)
    
    console.log('retrieving submit to user OR sendUserSocket', sendUserSocket)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message)
    }
  })

});



export default app