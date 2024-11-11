const express = require("express")
const cors = require('cors')
const app = express();
const port = 3001
const connectDB = require('./utils/conn')

connectDB();
app.use(cors());
app.get('/', (req,res)=>{
    res.send("hello")
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  