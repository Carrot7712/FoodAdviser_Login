//include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const login = require('./login')

const app = express()
const port = 3000

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//use static files
app.use(express.static('public'))
//setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//starts the express server and listening for connections
app.listen(port, () => {
  console.log(`Express app is listening on port ${port}`)
})

//setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  //幫使用者保留可能有錯的帳號
  const userKeyin=req.body
  //根據回傳值決定要render的畫面
  const result=login(req.body)
  if (result.includes('錯誤')) {
    res.render('index', { result, userKeyin })
  } else {
    res.render('welcome', { result })
  }
})
