const { response } = require('express')
const express  = require('express')
const path = require('path')
const app  = express()
require('ejs')

const bodyParser = require('body-parser')
const mysql = require('mysql')

// mysql.createConnection(객체의형태로 접속 정보)
const db = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:"o2"
})

app.get('/topic', function(req, res){
    let sql = 'SELECT * FROM topic';
    db.query(sql,function(err, result ){
        if(err){
            console.log(err)
        }
        else {
            console.log(result[0])
            res.send("Success")
        }
    })
})
// console.log(path.resolve(__dirname + '/views'))
//C:\apps\userlistweb\views 폴더를 뷰 템플릿 기본 폴더로 
app.set('views',path.resolve(__dirname+'/views'))

//view engine 등록
app.set('view engine', 'ejs')

//urlencoded 미들웨어 등록
app.use(bodyParser.urlencoded({extended:true}))

//http://localhost:8080/data로 get방식의 요청 처리
app.get('/data', function(request , response ) {
    console.log(request.body)
    response.render('index' , {data:"김태경"})
})



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