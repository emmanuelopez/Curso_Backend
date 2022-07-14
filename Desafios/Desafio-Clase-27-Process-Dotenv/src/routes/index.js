const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const path = require("path");

//Register

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/failregister',
  })
);

router.get('/failregister', (req, res) => {
  res.render('register-error')
})

//Login

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/faillogin',
  successRedirect: '/datos'
  })
);

router.get('/faillogin', (req, res) => {
  res.render('login-error');
})

//Datos

router.get('/datos', isAuth, async (req, res) => {
  const user = req.user.username
  const datos = await User.findOne({username: user}).lean()
  console.log(datos);
  res.render('datos', {
    datos: datos
  });
});

//Logout

router.get('/logout', (req, res, next) => {
  req.logout(req.user, err => {
    if (err) return next(err); 
    res.redirect('/');
  });
});

//Inicio

router.get('/', isAuth, (req, res) => {
  res.redirect('/datos')
})


router.get("/info", (req, res) => {
  const objeto = {
    carpeta_proyecto: process.cwd(),
    path_ejecucion: process.execPath,
    plataforma: process.platform,
    argumentos: process.argv.slice(2),
    version_node: process.version,
    process_id: process.pid,
    memoria_total: process.memoryUsage().rss,
  };

  console.log(objeto);
  res.status(200).json(objeto);
});

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
