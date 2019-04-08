const session = require('koa-session');
const passport = require('koa-passport');
const LocalStrategy  = require('passport-local').Strategy;
const route = require('koa-route');
const send = require('koa-send');
const helper = require('./helper');

module.exports = (app) => {
// trust proxy
app.proxy = true

// sessions
app.keys = ['your-session-secret']
app.use(session({}, app))

// authentication

app.use(passport.initialize())
app.use(passport.session())

//---
passport.serializeUser(function(user, done) {
  done(null, user.id)
})
passport.deserializeUser(async function(id, done) {
  try {
    const user = await helper.fetchUser()
    done(null, user)
  } catch(err) {
    done(err)
  }
})
passport.use(new LocalStrategy(function(username, password, done) {
  helper.fetchUser(username)
    .then(user => {
      if (username === user.username && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
//------

// POST /login
app.use(route.post('/login',  async (ctx, next) => {
  //console.log('>>'+ctx.isAuthenticated()+' '+JSON.stringify(ctx.request.body))
  await next(ctx, next)
  //console.log('<<'+ctx.isAuthenticated())
  ctx.redirect(ctx.request.body.location)
}))
app.use(route.post('/login', // async (ctx, next) => {await next(ctx, next)},
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })))

app.use(route.get('/logout', function(ctx) {
  ctx.logout()
  ctx.redirect('/')
}))




  app.use(async (ctx, next) => {
        if (ctx.isAuthenticated()) {
          return next()
        } else {
            //console.log('AUTH!')
            await send(ctx, 'ui/login.html', {root: "./"})
        }
      })

}
