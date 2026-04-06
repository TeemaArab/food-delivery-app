import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://fatimaarab:momi6068@cluster0.8lvqu.mongodb.net/food-delivery').then(()=>console.log("DB Connected successfully"))
}