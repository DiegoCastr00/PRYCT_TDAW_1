import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 8081;
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sushibd",
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
  console.log(req.headers);
  res.json("hello there");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/posts/"),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("photo");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: "Ocurrió un error al cargar la imagen" });
    } else {
      const imagePath = path.join("uploads/posts", req.file.filename);
      const imageUrl = `http://localhost:${process.env.PORT || 8081}/${imagePath}`;
      res.status(200).send({ url: imageUrl });
    }
  });
});

// Manejar la creación de posts utilizando Axios
app.post("/createPost", (req, res) => {
  const imageUrl = req.body.imageUrl;
  const postText = req.body.postText;
  const user = req.body.user;
  console.log(imageUrl);
  console.log(postText);
  const q = "INSERT INTO `post` (`image`, `description`, `user`) VALUES (?);";
  const values = [imageUrl, postText, user];
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

//guardar cambios usuario
const storageProfiles = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/profiles/"),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadProfiles = multer({
  storage: storageProfiles,
  limits: { fileSize: 1000000 },
}).single("photo");

app.post("/upload/profiles", (req, res) => {
  uploadProfiles(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: "Ocurrió un error al cargar la imagen" });
    } else {
      const imagePath = path.join("uploads/profiles", req.file.filename);
      const imageUrl = `http://localhost:${process.env.PORT || 8081}/${imagePath}`;
      res.status(200).send({ url: imageUrl });
    }
  });
});

app.post("/updateUserPhoto", (req, res) => {
  const imageUrl = req.body.imageUrl;
  const user = req.body.userP;
  console.log(imageUrl);
  const q = "UPDATE usuario SET photo = ? WHERE (user = ?);";
  //UPDATE `inject`.`usuario` SET `descripcion` = 'No me gusta ser social', `photo` = 'photo124' WHERE (`user` = '@diego_el');
  db.query(q, [imageUrl, user], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al actualizar la foto" });
    }
    console.log("se guardo con exito la foto");
    return res.status(200).json({ message: "Foto actualizada exitosamente" });
  });
});

app.post('/updateDescription', (req, res) => {
  const description = req.body.description;
  const user = req.body.userP;

  const q = "UPDATE usuario SET descripcion = ? WHERE user = ?;";
  db.query(q, [description, user], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al actualizar la descripción" });
    }
    console.log("Se guardó con éxito la descripción");
    return res.status(200).json({ message: "Descripción actualizada exitosamente" });
  });
});

// Ruta para iniciar sesión
app.post('/LogIn', (req, res) => {
  const { correo, contrasena } = req.body;

  // Consulta SQL para verificar el correo y contraseña en la base de datos
  const consulta = `SELECT user FROM usuario WHERE email = ? AND password = ?`;
  const values = [correo, contrasena];

  db.query(consulta, values, (err, data) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ mensaje: 'Error en el servidor' })
    }
    if (data.length > 0) {
      console.log(data[0]);
      // Autenticación exitosa, enviar los datos del usuario como respuesta
      res.json(data[0].user);
    } else {
      // Credenciales inválidas
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  });
});

app.get('/allPost', (req, res) => {
  const consulta = 'SELECT p.image as url, u.nombre as autor, p.description as descripcion, u.photo as image, u.user as urlprofile, p.likes, p.share, COALESCE(comentarios.cantidad, 0) as comments FROM post AS p INNER JOIN usuario AS u ON p.user = u.user LEFT JOIN ( SELECT c.post_idPost, COUNT(c.post_idPost) AS cantidad FROM comment AS c GROUP BY c.post_idPost ) AS comentarios ON p.idPost = comentarios.post_idPost ORDER BY RAND();';
  db.query(consulta, (err, data) => {
    if (err) return res.json(err);

    const formattedData = data.map(item => {
      const { url, image, urlprofile, ...rest } = item;
      return {
        ...rest,
        url: url.replace(/\\/g, '/'), // Reemplaza las diagonales dobles invertidas por diagonales normales en el campo 'url'
        profile: {
          ...rest.profile,
          image: image.replace(/\\/g, '/'), // Reemplaza las diagonales dobles invertidas por diagonales normales en el campo 'profile.image'
          urlprofile: urlprofile // Agrega la propiedad 'urlprofile' al objeto 'profile'
        }
      };
    });
    res.json(formattedData);
  });
});



app.post('/NewUser', function(req, res){
  const user = req.body.user;
  const name = req.body.name;
  const correo = req.body.email;
  const contraseña = req.body.password;
  const values = [user, name, correo, contraseña];
  console.log(values);
  const sql = 'INSERT INTO usuario (`user`, `nombre`, `email`, `password`) VALUES (?) ;';
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al crear nuevo usuario" });
    }
    res.json({ message: "Usuario creado exitosamente, usted será redirigido al inicio de sesion" });
  });
})

app.post('/infoUser', (req, res) => {
  const user = req.body.user;
  const consulta = 'SELECT user, nombre, descripcion, followers, following, photo FROM usuario WHERE user = ?;';
  db.query(consulta, [user], (err, data) => {
    if (err) return res.json(err);
    res.json(data[0]);
  });
});

app.get('/photoUser', (req, res) => {
  const user = req.query.user;
  const consulta = 'SELECT photo FROM usuario WHERE user = ?;';
  db.query(consulta, [user], (err, data) => {
    if (err) return res.json(err);
    res.json(data[0].photo);
  });
});


app.get('/imagesPost', (req, res) => {
  const user = req.query.user;
  const query = "SELECT image, idPost FROM `post` WHERE `user` = ? ";
  // Ejecutar la consulta en la base de datos
  db.query(query, [user] ,(err, result) => {
    if (err) {
      throw err;
    }
    res.json(result); // Enviar el resultado de la consulta como JSON
  });
});

app.get('/DisplayUsuario', (req, res) => {
  const user = req.query.user;
  const query = "SELECT user, nombre, descripcion, followers, following, photo FROM usuario where user= ?;";
  // Ejecutar la consulta en la base de datos
  db.query(query, [user] ,(err, result) => {
    if (err) {
      throw err;
    }
    res.json(result); // Enviar el resultado de la consulta como JSON
  });
});

app.delete('/deletepost/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const q = 'DELETE FROM post WHERE idPost = ?;';
  db.query(q, [id],(err, data) => {
      if (err) {
          res.status(500).send('Error al elimar el post');
        } else {
          res.send(`Post eliminado`);
        }
  })
});

//Listening server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


