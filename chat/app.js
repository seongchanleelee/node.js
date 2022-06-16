// require명령어를 사용하면 express라는 이름의 라이브러리를 경로없이 가져 올 수 있다.
const express = require("express")

const http = require("http")

// express를 실행한 내용을 app이란 변수에 담는다
const app = express();
//path라는 라이브러리를 가져옴
const path = require("path")

//web socketio를 사용하기 위해 http로 서버를 열기 위함
const server = http.createServer(app)

const socketIO = require("socket.io")
const moment = require("moment")

// server가 socketIO에서 담아간 내용을 다시 한번 변수에 담아줌
const io = socketIO(server);


// 서버가 실행이되면 서버가 보여줄 파일들을 지정
//express에 static폴더를 만듬
app.use(express.static(path.join(__dirname, "SRC")))
// 서버를 실행하기 위한 포트를 지정
// 프로세스 환경에 PORT가 지정이되어있다면 PORT를 사용하고 아니라면 5000번을 사용
const PORT = process.env.PORT || 5000;

// io에 on이란 함수를 사용하고 connection 메서드를 사용하는데 connection이 이뤄지면 객체를 socket에 넣어줌
io.on("connection", (socket) => {
    console.log("연결이 이루어 졌습니다.")
    // chat.js에서 보낸 메세지를 받는 코드
    // 메세지를 받았다면 data는 chat.js에서 보낸 data(from front)가 된다.
    socket.on("chatting", (data)=>{
        const { name, msg } = data;
        console.log(data)
        // 받았다면 응답해주는 코드를 작성해보자
        // io.emit("chatting", `그래 반가워 ${data}`)

        //client에서 보낸 param을 응답해보자
        io.emit("chatting", {
            name: name,
            msg: msg,
            time: moment(new Date()).format("h:ss A")
        })
    })
})







// 서버 실행하는 명령어 listen
//app.listen(포트,명령)
// 서버가 실행이 된다면 명령함수를 시행
server.listen(PORT, ()=> 
    console.log(`server is running ${PORT}`)
)
