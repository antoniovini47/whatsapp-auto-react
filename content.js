const reaction = "🐝";
const pauseTime = 1;

const startButton = document.createElement("button");
startButton.textContent = `${reaction}`;
startButton.style.position = "fixed";
startButton.style.top = "24px";
startButton.style.right = "24px";
startButton.style.fontSize = "24px";
startButton.style.zIndex = "1000";
startButton.style.backgroundColor = "white";
startButton.style.border = "1px solid black";
startButton.style.padding = "5px";
startButton.style.borderRadius = "5px";
document.body.appendChild(startButton);
startButton.addEventListener("click", sendReactionAsAMessage);

async function sendReactionAsAMessage() {
  console.log("Checking messages...");
  console.log("Emulating Command+Control+E to open the reaction picker");
  const event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "e",
    code: "e",
    metaKey: true,
    ctrlKey: true,
  });
  document.dispatchEvent(event);

  await new Promise((resolve) => setTimeout(resolve, pauseTime));

  const bees = document.querySelectorAll(`[data-emoji="${reaction}"]`);
  bees.forEach((bee) => {
    console.log("Clicking on the bee");
    bee.click();
  });

  await new Promise((resolve) => setTimeout(resolve, pauseTime));

  console.log("Clicking on the send button");
  const sendButton = document.querySelector('[aria-label="Send"]');
  sendButton.click();
}
