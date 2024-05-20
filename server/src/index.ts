import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import mongoose from 'mongoose';
import {Server as SocketIOServer} from "socket.io"

const app = express();

dotenv.config()

// ROUTES
import authRoute from "../routes/authRoute"
import messageRoute from "../routes/messageRoute"

const port = process.env.PORT;
const uri: string = process.env.MONGO_URL || ""

app.use(cors())
app.use(express.json())

// mongoose setup
mongoose.connect(uri).then(()=> {
  console.log("Connetec to MongoDB",)
}).catch(error => {console.log("mongoose connection failed!", error)})


app.get('/ping', (req, res) => {
  res.json({message: "Successfully pinged!"});
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



io.on("connection", (socket) => {
  const testData = "this is test data from socket.io"
    socket.on("test", (data)=> {
      console.log(`Client message : ${data}`)
    })
    
    
    // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:');
  });
});



