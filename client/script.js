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

function uniqueID() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimal = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimal}`
}