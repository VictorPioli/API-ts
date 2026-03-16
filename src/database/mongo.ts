import mongoose from "mongoose";

export async function connectMongo() {
  await mongoose.connect("mongodb+srv://DevUser1:m2Mdmtcb0hH7Rpre@dev.otbneg5.mongodb.net/?appName=Dev");

  console.log("MongoDB conectado");
}