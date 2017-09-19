// import core modules
const Promise = require('bluebird')
const koa = require('koa')
const mongoose = Promise.promisifyAll(require('mongoose'))
const config = require('./config')

// import authentication modules
const passport = require('koa-passport')
const passortLocal = require('passport-local')

// import middleware config
const bodyParser = require('koa-bodyParser')
const convert = require('koa-convert')
const res = require('koa-res')
const router = require('koa-simple-router')
const liveReload = require('koa-livereload')
const views = require('koa-views')
const stylus = require('koa-stylus')
const mount = require('koa-mount')
const serveStatic = require('koa-static')

// initialize koa server
const app = new koa()

/*
  Mongoose Config
*/

mongoose.Promise = require('bluebird')
mongoose
.connect(config.mongoUrl)
.then(response => {
  console.log('connected to mongo :-)')
})
.catch((err) => {
  console.log("Error connecting to Mongo")
  console.log(err)
})
// define amp schema
const ampSchema = mongoose.Schema({
  name: String,
  genres: Array,
  image: String
})
// define amp model
const Amp = Promise.promisifyAll(mongoose.model('Amp', ampSchema))

/*
  Server Config
*/
// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 500
      ctx.render('error', {
        title: 'AmpBuddy Error',
        errorMessage: "There has been an error processing your request."
      })
    } 
    else if (err.status === 501) {
      ctx.render('error', {
        title: 'AmpBuddy Error',
        errorMessage: err.message
      })
    } else {
      ctx.app.emit('error', err, ctx)
      ctx.render('error', {
        title: 'AmpBuddy Error',
        errorMessage: err.message
      })
    }
  }
})

// initialize passport
app.use(passport.initialize())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// body parser
app.use(bodyParser())

// process stylus files
app.use(convert(stylus('./assets/style')))
app.use(serveStatic('./assets'))
// view config
app.use(views(('./views'), { extension: 'pug' }))

// router
app.use(router(_ => {
  _.get('/', async ctx => {
    await ctx.render('home', {
      title: "AmpBuddy"
    })
  }),
  _.get('/rig/:genre', async ctx => {
    // set up variables
    const genre = ctx.params.genre
    const ampList = await Amp.findAsync({})
    if (!ampList) {throw new Error('Amp list could not be retrieved!')}
    let genreAmpList = []
    // loop through amp list to find amps that match the appropriate genre
    ampList.forEach(amp => {
      if (amp.genres.includes(genre)) {genreAmpList.push(amp)}
    })
    // render the view
    await ctx.render('amps', {
      title: 'AmpBuddy',
      amps: genreAmpList
    })
  }),
  _.get('/rig', async ctx => {
    await ctx.render('home', {
      title: 'AmpBuddy'
    })
  })
  _.get('/error', async ctx => {
    await ctx.render('error', {
      title: 'AmpBuddy Error',
      errorMessage: 'Test error message.'
    })
  })
}))

app.listen(3000)