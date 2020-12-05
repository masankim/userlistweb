const { response } = require('express')
const express  = require('express')
const path = require('path')
const app  = express()
require('ejs')

// console.log(path.resolve(__dirname + '/views'))
//C:\apps\userlistweb\views 폴더를 뷰 템플릿 기본 폴더로 
app.set('views',path.resolve(__dirname+'/views'))

//view engine 등록
app.set('view engine', 'ejs')

//http://localhost:8080/data로 get방식의 요청 처리
app.get('/data', function(request , response ) {
    console.log(request)
    response.send("Hello world!!!!")
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