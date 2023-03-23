import mongoose from "mongoose";

//* Connecting the database
export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MOGODB_URI, {
            dbName: "backendapi"
        })
        await console.log("Database connection established")
    } catch (error) {
        console.log("Error connecting to backend")
    }

}
