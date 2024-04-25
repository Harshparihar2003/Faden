const mongoose = require("mongoose");

const dbConnect = () => {
    try {
        const connection = mongoose.connect("mongodb+srv://harsh9454696030:3t8wxIdaoLtyfn8r@cluster0.rrt7qy0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to database successfully...");
    } catch (error) {
        console.log(error);
    }
}
// 3t8wxIdaoLtyfn8r
module.exports = dbConnect;