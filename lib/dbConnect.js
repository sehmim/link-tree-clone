import mongoose from "mongoose";

const connectDB = () => {
    console.log()
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection.db;
    }
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true
    })
        .then((res) => console.log('Database Connected'))
        .catch(err => console.log(err));
}

export default connectDB;