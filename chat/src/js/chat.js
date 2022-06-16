// socket.io를 불러올 필요가 있다.
//use strict를 통해서 js의 오류를 최대한 줄인다.
"use strict"

// socket에 clientsocket.io가 담긴다.
const socket = io();

//대화명을 가져오기 위해 querySelector를사용하여 dom을 선택함
const nickname= document.querySelector("#nickname");

//ul에 list를 넣기위해서 querySelector를 사용하여 dom을 선택
const chatList = document.querySelector(".chatting-list");
//input태크의 dom을 선택
const chatInput = document.querySelector(".chatting-input");
//button태그의 dom을 선택
const sendButton = document.querySelector(".send-button")

const displayContainer = document.querySelector(".display-container");

//enter를 눌렀을 시 event진행
chatInput.addEventListener("keypress", (event)=>{
    if (event.keycode ===13) {
        send()
    }
})

function send(){
     // 이벤트 발생시 넘어가는 내용을 params라는 object형태로 만들어줌
     const param = {
        // input이기 때문에 value를 이용하면 작성한 value에 접근가능하다
        name: nickname.value,
        msg: chatInput.value
    }

    socket.emit("chatting", param)
}

// 클릭시 nickname과 적은 내용을 서버로 전송 시키면 된다
sendButton.addEventListener("click", send)

// //메세지를 강제로 보내기
// // chatting=== 채널이름
// socket.emit("chatting", "from front")

//서버에서 응답해주는 걸 받는 코드
socket.on("chatting", (data)=> {
    const { name, msg, time }=data;
    // data를 넘겨받으면 item이란 변수에 new키워드를 통해 li모델을 인스턴스화 시켜줌
    const item = new LiModel(name, msg, time);
    //우리가 만든 makeLi를 호출시킴
    item.makeLi()
    // 대화를 작성하면 자동으로 가장 하단으로 내려감
    displayContainer.scrollTo(0, displayContainer.scrollHeight)

})


// 보낸 메세지를 html과 css에 맞게 맞춰주기 위해 append시켜줌
function LiModel(name, msg, time) {
    //makeLi라는 method에서 값들에 접근을 하여 사용하기 위해 할당시켜줌
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=> {
        const li = document.createElement("li");
        //대화명이같다면 오른쪽에서 출력
        li.classList.add(nickname.value === this.name ? "sent": "received")
        // 하나하나 넣어주기 힘들기 때문에 dom이란 변수에 우리가 만든 html태그를 innerhtml로 넣어줌
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    //innerHTML로 넣어주고
    li.innerHTML = dom;
    //chatList에 append해줌
    chatList.appendChild(li)
    }
}