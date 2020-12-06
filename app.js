const { response } = require('express')
const express  = require('express')
const path = require('path')
const app  = express()
require('ejs')
const apiRouter = require('./router/apiRouter')
const bodyParser = require('body-parser')





// console.log(path.resolve(__dirname + '/views'))
//C:\apps\userlistweb\views 폴더를 뷰 템플릿 기본 폴더로 
app.set('views',path.resolve(__dirname+'/views'))

//view engine 등록
app.set('view engine', 'ejs')

//urlencoded 미들웨어 등록
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/' ,apiRouter)



app.post('/topic', function(req, res){
    let sql = "INSERT INTO `topic` (`title`, `description`, `author`) VALUES (?,?,?);"
    // console.log(req.body.title)
    // res.send(req.body.title)
    let title = req.body.title
    let description = req.body.description
    let author = req.body.author
    db.query(sql ,[title,description, author], function(err, result){
        if(err){
            console.log(err)
        }
        else {
            console.log(result)
            res.send("Success")
        }
    }) 
})
//http://localhost:8080/data로 get방식의 요청 처리
// app.get('/data', function(request , response ) {
//     console.log(request.body)
//     response.render('index' , {data:"김태경"})
// })



// listen(포트번호 , URL , backlog , 콜백함수)
let port = 8080
app.listen(port, function(){
    console.log("Server is running at http://localhost:"+port)
})



// const http = require('http')

// const app = http.createServer()
// app.
// // listen(포트번호 , URL , backlog , 콜백함수)
// app.listen(8080,'127.0.0.1', function (){
//     console.log("Server is Running at http://localhost:8080")
// })