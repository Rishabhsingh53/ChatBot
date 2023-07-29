import bot from "./assets/bot.svg"
import user from "./assets/user.svg"

const form = document.querySelector("form")
const chatContainer = document.querySelector("#chat_container")

let loadInterval;

function loader(element) {
  console.log(element.textContent)
  element.textContent = "";
  loadInterval = setInterval(() => {
    element.textContent += "."
    if (element.textContent === "....") {
      element.textContent = ""
    }
  }, 300);
}

function typeText(element , text) {
  let index = 0;
  console.log(element.innerHTML)
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    }
    else{
      clearInterval(interval)
    }
  }, 20);
}

function generateUniqueID() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimal = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimal}`
}


function chatStripe(isAi , value , uniqueID) {
  return (
    `
      <div class="wrapper ${isAi && "ai"}">
        <div class = "chat">
          <div class = "profile">
            <img src="${isAi ? bot : user}" alt= "${isAi ? 'bot' : 'user'}" />
          </div>
          <div class="message" id=${uniqueID}>${value} </div>
        </div>
      </div>
    `
  )
}

const  handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form)
  chatContainer.innerHTML += chatStripe(false,data.get("prompt") )
   form.reset();
   const uniqueID = generateUniqueID();
   chatContainer.innerHTML  += chatStripe(true , "" , uniqueID);
   chatContainer.scrollTop = chatContainer.scrollHeight;
   const messageDiv = document.getElementById(uniqueID);
   loader(messageDiv)
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup" , (e) => {
  if (e.keyCode === 13 )
    handleSubmit(e)
})