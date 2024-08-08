const mongoose=require('mongoose');
require("dotenv/config");



const dbUsername = encodeURIComponent(process.env.dbUsername);
const dbPassword = encodeURIComponent(process.env.dbPassword); // Ensure to encode special characters
const dbCluster = process.env.dbCluster;
const dbName = process.env.dbName;

const connectDB = async()=>{
    try {
        await  mongoose.connect(
               `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`,
               {
                 dbName: dbName,
               })
        console.log(`MONGODB connected ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`mongodb server issue ${error}`)
        
    }
}
module.exports=connectDB