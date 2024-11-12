import express from "express"
import cors from 'cors'
const app = express();
import studentRoutes from './routes/student.js'
const port = 3000
import connectDB from './utils/conn.js'

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> {
  res.send("Root directory")
  return "Root"
})
app.use('/student', studentRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
