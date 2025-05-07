const reaction = "🐝";
const name = "IFMA";

const startButton = document.createElement("button");
startButton.textContent = `React with ${reaction} to all ${name} messages`;
startButton.style.position = "fixed";
startButton.style.top = "10px";
startButton.style.right = "10px";
startButton.style.zIndex = "1000";
startButton.style.backgroundColor = "red";
document.body.appendChild(startButton);

startButton.addEventListener("click", () => {
  console.log("Checking messages...");
  const messages = document.querySelectorAll("div[role='row']");
  const lastMessage = messages[messages.length - 1];
  console.log("lastMessage", lastMessage);
  reactToMessage(lastMessage);
});

function reactToMessage(message) {
  console.log("reacting to message: ", message);
  const reactionBtn = message.querySelector("button[aria-label='React']");
  console.log("reactionBtn", reactionBtn);
  if (reactionBtn) {
    reactionBtn.click();
  }
}
