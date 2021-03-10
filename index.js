import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import postRoutes from "./routes/posts.js";

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, res, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "images/png" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "images/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use("/posts", postRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

const CONNECTION_URL =
  "mongodb+srv://adhitia:adhitia96@dev1.g2lf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Berjalan di Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) =>
    console.log(
      `${error} password atau username mongodb salah bro atau cek koneksi internet server lu`
    )
  );

mongoose.set("useFindAndModify", false);
