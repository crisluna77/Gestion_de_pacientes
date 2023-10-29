var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var archivo   = require("./models/GestionPacientes.js");
//importar el validador de express-validator
const { check, validationResult } = require("express-validator");
const cors = require('cors');
router.use(cors());

//conecta a la base de datos
const uri = "mongodb://mongo:27017/expedientes_medicos";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error(err);
  });

// http://localhost:3000/api

module.exports = router;


router.get("/expedientes", async (req, res) => {
  try {
      const fichas = await archivo.find(); // Utiliza await para esperar a que se complete la consulta
      res.status(200).send(fichas);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener los fichas");
  }
});


router.get("/expedientes/:id", async (req, res) => {
  try {
      const ficha = await archivo.findById(req.params.id); // Utiliza await para esperar a que se complete la consulta
      if (!ficha) {
          res.status(404).send("ficha no encontrado");
      } else {
          res.status(200).json(ficha);
      }
  } catch (err) {
      console.error(err);
      res.status(500).send("Error al obtener el ficha");
  }
});

router.post("/expedientes", async (req, res) => {
  try {
      const ficha = new archivo(req.body);
      await ficha.save();
      res.status(200).json(ficha);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error al guardar el ficha");
  }
});

router.put("/expedientes/:id", async (req, res) => {
  try {
      const ficha = await archivo.findById(req.params.id).exec();
      if (!ficha) {
          return res.status(404).send("ficha no encontrado");
      }

      ficha.tipoSangre = req.body.tipoSangre;
      ficha.nombres = req.body.nombres;
      ficha.apellidos = req.body.apellidos;
      ficha.dpi = req.body.dpi;
      ficha.email = req.body.email;
      ficha.convenio = req.body.convenio;
      ficha.sexo = req.body.sexo;
      ficha.fechaNacimiento = req.body.fechaNacimiento;
      ficha.departamento = req.body.departamento;
      ficha.municipio = req.body.municipio;
      ficha.telefono = req.body.telefono;
      ficha.actividadProfesion = req.body.actividadProfesion;
      ficha.alergias = req.body.alergias;

      await ficha.save();

      res.status(200).json(ficha);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error al actualizar el ficha");
  }
});


router.delete("/expedientes/:id", async (req, res) => {
  try {
      const ficha = await archivo.findByIdAndRemove(req.params.id).exec();
      if (!ficha) {
          return res.status(404).send("ficha no encontrado");
      }
      res.status(200).json(ficha);
  } catch (err) {
      console.error(err);
      res.status(500).send("Error al eliminar el ficha");
  }
});

module.exports = router;

// metodo get para obtener usuario en mysql
// router.post(
//     '/login',
//     [
//       check('email', 'El correo electrónico es obligatorio').isEmail(),
//       check('password', 'La contraseña es obligatoria').not().isEmpty(),
//     ],
//     async (req, res) => {
//       // Verifica si hay errores de validación
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { email, password } = req.body;
  
//       try {
//         // Busca el usuario en la base de datos por su correo electrónico
//         const user = await User.findOne({ email });
  
//         if (!user) {
//           return res.status(400).json({ message: 'Credenciales inválidas' });
//         }
  
//         // Compara la contraseña proporcionada con la almacenada en la base de datos
//         const isMatch = await bcrypt.compare(password, user.password);
  
//         if (!isMatch) {
//           return res.status(400).json({ message: 'Credenciales inválidas' });
//         }
  
//         // Genera un token JWT para el usuario autenticado
//         const payload = {
//           user: {
//             id: user.id, // Puedes incluir otros datos del usuario aquí
//           },
//         };
  
//         // Aquí, debes configurar una clave secreta adecuada para JWT (puede ser una variable de entorno)
//         const jwtSecret = 'tu_secreto_jwt';
        
//         jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         });
//       } catch (err) {
//         console.error(err);
//         res.status(500).send('Error en el servidor');
//       }
//     }
//   );
  
module.exports = router;

