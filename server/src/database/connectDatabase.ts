import mongoose from "mongoose";

const connectDatabase = (url: string) => {
    return mongoose.connect(url);
}

export default connectDatabase;