import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

const PORT = 8081;
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "admin1",
  password: "12345",
  database: "inject",
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
//middleware
app.use(express.static("public"));

app.use(cors());

app.post("/", (req, res) => {
  res.json("hello there");
});

app.get("/", (req, res) => {
  res.json("hello there");
});

// Configurar Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: "./uploads/posts",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("photo");

// Manejar la carga de archivos utilizando Multer
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: "Ocurrió un error al cargar la imagen" });
    } else {
      const imagePath = req.file.path.replace("\\", "/");
      const imageUrl = `http://localhost:${
        process.env.PORT || PORT
      }/${imagePath}`;
      res.status(200).send({ url: imageUrl });
    }
  });
});

// Manejar la creación de posts utilizando Axios
app.post("/createPost", (req, res) => {
  const imageUrl = req.body.imageUrl;
  const postText = req.body.postText;
  const partesURL = imageUrl.split("/");
  const archivoConRuta = partesURL[partesURL.length - 1];
  const nombreArchivo = archivoConRuta.split("\\").pop();
  console.log("si entra");
  console.log(imageUrl);
  console.log(postText);
  const q = "INSERT INTO `post` (`image`, `description`, `user`) VALUES (?);";
  const values = [nombreArchivo, postText, "prueba"];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al guardar el post" });
    }
    console.log("se guardo con exito");
    return res.status(200).json({ message: "Post creado exitosamente" });
  });
});

//Listening server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
