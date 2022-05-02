const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
require('dotenv').config()
const methodOverride = require('method-override')
const createPath = require('./helpers/create-path')
const postRoutes = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')
const postApiRoutes = require('./routes/api-post-routes')

const errorMsg = chalk.bold.bgKeyword('white').redBright
const successMsg = chalk.bold.bgKeyword('green').whiteBright

const app = express()

app.set('view engine', 'ejs')

mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then((res) => console.log(successMsg('Connected to DB')))
.catch((error) => console.log(errorMsg(error)))

app.listen(process.env.PORT, (err) => {
 err ? console.log(errorMsg(err)) : console.log(successMsg('Server has been started...'))
})

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  const title = 'Home'
  res.render(createPath('index'), {title})
})


app.use(postRoutes)
app.use(postApiRoutes)
app.use(contactRoutes)

app.use((req, res) => {
  const title = 'Error Page'
  res
  .status(404)
  .render(createPath('error'), {title})
})


// Combine styled and normal strings
const log = console.log
log(chalk.hex('#FFA500')('Node') + ' <Js> | ' + chalk.bold.blue('Mongodb'))