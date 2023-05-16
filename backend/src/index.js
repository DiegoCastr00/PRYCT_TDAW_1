import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

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
  destination: "./uploads/",
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
        process.env.PORT || 8080
      }/${imagePath}`;
      res.status(200).send({ url: imageUrl });
    }
  });
});

app.post("/addEvento", (req, res) => {
  console.log("si pero no");
  console.log(req.body);
  const q =
    "INSERT INTO reserva (`startDateTime`, `endDateTime`, `descripcion`,`tipo`, `usuario`, `numLab`) VALUES (?)";
  const values = [
    req.body.start,
    req.body.end,
    req.body.descripcion,
    req.body.tipo,
    req.body.usuario,
    req.body.numLab,
  ];
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    console.log("se guardo con exito");
    return res.json(data);
  });
});

// Manejar la creación de posts utilizando Axios
app.post("/createPost", (req, res) => {
  const imageUrl = req.body.imageUrl;
  const postText = req.body.postText;
  const q = 'INSERT INTO post '
  res.status(200).send({ message: "Post creado exitosamente" });
});

//Listening server
app.listen(8080, () => {
  console.log("CONNECTEED");
});
