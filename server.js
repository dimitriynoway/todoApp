const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT||5000

app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.MONGO_URI||"mongodb+srv://admin:qwe123@server.7tdvn.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify:false
    },
    (err)=>{
        if (err)throw err;
        console.log("DB is here")
    }

)


app.use("/users", require("./routes/userRouter"))
app.use("/folder", require("./routes/folder"))
app.get("/check", (req,res)=>{
    res.send("IT WORKS")
})

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname, "client","build","index.html"))
//     })
// }

app.listen(PORT, ()=>console.log("server is running"))