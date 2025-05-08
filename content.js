const reaction = "🐝";
const pauseTime = 200;
const disableTime = 1000;
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

let isActivated = false;

startButton.addEventListener("click", () => {
  isActivated = !isActivated;
  startObserver();
  startButton.style.backgroundColor = isActivated ? "lightgreen" : "white";
  console.log(`Button is now ${isActivated ? "activated" : "deactivated"}`);
});

const observer = new MutationObserver(() => {
  if (!isActivated) {
    console.log("Not activated, skipping");
    return;
  }
  // sendReactionAsAMessage();
  reactToTheLastMessage();
  disableTemporaryTheScript(disableTime);
});

async function disableTemporaryTheScript(disableTime) {
  isActivated = false;
  setTimeout(() => {
    isActivated = true;
  }, disableTime);
}

async function startObserver() {
  if (!isActivated) {
    console.log("Not activated, skipping");
    return;
  }
  console.log("Waiting for 1 seconds to garantee the whatsapp page is loaded. Select the chat!!!");
  setTimeout(() => {
    const chatContainer = document.querySelector('[role="application"]');
    console.log("Chat container:", chatContainer);
    if (chatContainer) {
      observer.observe(chatContainer, { childList: true, subtree: true });
    } else {
      console.log("No chat container found, skipping");
    }
  }, 1000);
}

// Scripts
async function reactToTheLastMessage() {
  console.log("Reading all messages");
  const messages = document.querySelectorAll("div[role='row']");
  console.log(`Found ${messages.length} messages`);
  const lastMessageDiv = messages[messages.length - 1];
  console.log("Last message div:", lastMessageDiv);
  await new Promise((resolve) => setTimeout(resolve, pauseTime));
  // get the reaction button by aria-label="React" div
  const reactionButton = lastMessageDiv.querySelector("div[aria-label='React']");
  console.log("Reaction button:", reactionButton);
  // click on the reaction button
  reactionButton.click();
  // wait for the reaction picker to be visible
  await new Promise((resolve) => setTimeout(resolve, pauseTime));
  // click on the + button to show the reaction picker named data-icon="plus"
  const plusButton = document.querySelector("div[aria-label='More reactions']");
  console.log("Plus button:", plusButton);
  plusButton.click();
  // wait for the reaction picker to be visible
  await new Promise((resolve) => setTimeout(resolve, pauseTime));

  const bees = document.querySelectorAll(`[data-emoji="${reaction}"]`);
  if (bees.length === 0) {
    console.log("No bees found, skipping");
    return;
  }
  bees.forEach((bee) => {
    console.log("Clicking on the bee");
    bee.click();
  });

  await new Promise((resolve) => setTimeout(resolve, pauseTime));

  console.log("Clicking on the send button");
  const sendButton =
    document.querySelector('[aria-label="Send"]') ||
    document.querySelector('[aria-label="Enviar"]');
  if (!sendButton) {
    console.log("No send button found, skipping");
    return;
  }
  sendButton.click();
  console.log(`Message ${reaction} sent`);
}

async function sendReactionAsAMessage() {
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
  if (bees.length === 0) {
    console.log("No bees found, skipping");
    return;
  }
  bees.forEach((bee) => {
    console.log("Clicking on the bee");
    bee.click();
  });

  await new Promise((resolve) => setTimeout(resolve, pauseTime));

  console.log("Clicking on the send button");
  const sendButton =
    document.querySelector('[aria-label="Send"]') ||
    document.querySelector('[aria-label="Enviar"]');
  if (!sendButton) {
    console.log("No send button found, skipping");
    return;
  }
  sendButton.click();
  console.log(`Message ${reaction} sent`);
}
