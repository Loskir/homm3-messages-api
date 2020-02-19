const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const boolParser = require('express-query-boolean')
const morgan = require('morgan')

const {
  getPngBuffer,
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

app.use(async (req, res) => {
  const {
    text = '',
  } = req.body

  let {
    color = 'red',
    show_ok,
    show_cancel,
  } = req.body

  const colors = [
    "red",
    "blue",
    "brown",
    "green",
    "orange",
    "violet",
    "teal",
    "pink",
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
})

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
