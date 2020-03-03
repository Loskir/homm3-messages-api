const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const boolParser = require('express-query-boolean')
const morgan = require('morgan')

const {
  getPngBuffer,
  getJpegBuffer,

  pngToJpeg,
  scale,
} = require('./functions/core')

const app = express()

app.disable('x-powered-by')
// ? app.disable('etag');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
app.use(boolParser())

app.set('port', 11001)

app.use((req, res, next) => {
  req.body = Object.assign({}, req.body, req.query)
  return next()
})

const processQuery = (req, res, next) => {
  const {
    text = '',
  } = req.body

  let {
    color = 'red',
    show_ok,
    show_cancel,
  } = req.body

  res.locals = {
    ...res.locals,
    text,
    color,
    show_ok,
    show_cancel,
  }

  return next()
}

const checkColors = (req, res, next) => {
  const {color} = res.locals

  const colors = [
    'red',
    'blue',
    'brown',
    'green',
    'orange',
    'violet',
    'teal',
    'pink',
  ]

  if (!colors.includes(color)) {
    return res.status(400).json({
      ok: false,
      error: {
        code: 400,
        name: 'WRONG_COLOR',
      }
    })
  }

  return next()
}

const router = express.Router()
router.all('/jpeg', [
  processQuery,
  checkColors,
  async (req, res) => {
    const {
      text,
      color,
      show_ok,
      show_cancel,
    } = res.locals

    const buffer = await getJpegBuffer(text, {
      color,
      buttons_show: {
        ok: show_ok === undefined ? true : show_ok,
        cancel: show_cancel === undefined ? false : show_cancel,
      },
      showShadow: false,
    })

    res.set('Content-Type', 'image/jpeg')
    return res.send(buffer)
  },
])

router.all('/bot', [
  processQuery,
  checkColors,
  async (req, res) => {
    const {
      text,
      color,
      show_ok,
      show_cancel,
    } = res.locals

    const buffer = await Promise.resolve(getPngBuffer(text, {
      color,
      buttons_show: {
        ok: show_ok === undefined ? true : show_ok,
        cancel: show_cancel === undefined ? false : show_cancel,
      },
      showShadow: false,
    })).then((result) => scale(result, 2)).then(pngToJpeg)

    res.set('Content-Type', 'image/jpeg')
    return res.send(buffer)
  },
])

app.use(router)

app.use([
  processQuery,
  checkColors,
  async (req, res) => {
    const {
      text,
      color,
      show_ok,
      show_cancel,
    } = res.locals

    const buffer = await getPngBuffer(text, {
      color,
      buttons_show: {
        ok: show_ok === undefined ? true : show_ok,
        cancel: show_cancel === undefined ? false : show_cancel,
      },
      showShadow: false,
    })

    res.set('Content-Type', 'image/png')
    return res.send(buffer)
  }
])

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500).json({
    ok: false,
    error: {
      code: 400,
      name: 'UNKNOWN_ERROR',
    }
  })
})

// start our rest api server
const server = app.listen(app.get('port'), function () {
  console.log('Homm3 Messages API server listening on port ' + server.address().port)
})
