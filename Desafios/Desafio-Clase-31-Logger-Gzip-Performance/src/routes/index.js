const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const path = require("path");
const logger = require("../logger");
require("../database");

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
  try {
    const datos = await User.findOne({username: user}).lean()
    logger.info("Se muestran los datos del usuario: ", user)
    res.render('datos', {
      datos: datos
    });
  } catch (error) {
    logger.error(error)
  }
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

/* --------------------- AUTH --------------------------- */

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router;
