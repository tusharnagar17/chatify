import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import mongoose, { ConnectOptions } from 'mongoose';
const app = express();

dotenv.config()

// ROUTES
import authRoute from "../routes/authRoute"

const port = process.env.PORT;
const uri: string = process.env.MONGO_URL || ""


app.use(cors())
app.use(express.json())


// mongoose setup
mongoose.connect(uri).then(()=> {
  console.log("successfully connected",)
}).catch(error => {console.log("mongoose connection failed!", error)})


app.get('/ping', (req, res) => {
  res.json({message: "Successfully pinged!"});
});

app.use("/api/auth", authRoute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
