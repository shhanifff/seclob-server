import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/route.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());


mongoose
  .connect(
    `mongodb+srv://sukun555:3EmUbYdaOsOydMtY@cluster0.qigrcti.mongodb.net/seclob`
  )
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("CONNECTION FAILED", err);
  });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});

