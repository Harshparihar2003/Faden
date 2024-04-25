const express = require("express");
const dbConnect = require("./dbconnect");
const app = express();
const cors = require("cors") 
const PORT = 5000;

app.use(cors())
dbConnect();
app.use(express.json());

app.use("/api", require("./app.route"))

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})
