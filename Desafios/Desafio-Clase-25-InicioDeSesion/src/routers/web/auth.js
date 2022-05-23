import { Router } from 'express'
import passport from 'passport'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

authWebRouter.get('/signup', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/signup.html'))
})

authWebRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}))

authWebRouter.get('/signin', (req, res) => {
    /*
    const email = req.session?.email
    if (email) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/signin.html'))
    }*/
    res.sendFile(path.join(process.cwd(), '/views/signin.html'))
})


authWebRouter.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}))

authWebRouter.get('/home', isAuth, (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/pages/home.html'));
  });

authWebRouter.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(function(err) {
            if (err) { return next(err); }
        })
        res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { email })
    }
    res.redirect('/')
})


function isAuth(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }

export default authWebRouter