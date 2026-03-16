import mongoose from "mongoose";

export async function connectMongo() {
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@dev.otbneg5.mongodb.net/?appName=Dev`);

  console.log("MongoDB conectado");
}