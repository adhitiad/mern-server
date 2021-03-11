import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer';
import path from 'path'


import postRoutes from "./routes/posts.js";

const app = express();


// konfigurasi diskStorage multer
const diskStorage = multer.diskStorage({
  // konfigurasi folder penyimpanan file
  destination: function (req, file, cb) {
    cb(null, "./image");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(multer({ storage: diskStorage }).single('image'));
app.use('/image', express.static(path.join('image')));
app.use("/posts", postRoutes);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



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
