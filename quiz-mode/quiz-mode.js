const selector = (element) => document.querySelector(element);
const currentCount = selector(".current-count");
const maxCount = selector(".max-count");
const wrongAnswerList = [];
const correctAnswerList = [];
const wordFilePath = (day) => `../words/${day}.json`;
let wordList = [];
const currentAnswerList = [];
let order = 1;

const randomValue = () =>
  wordList[Math.floor(Math.random() * wordList.length)][1];

const callDayFile = (day) => {
  fetch(wordFilePath(day))
    .then((response) => response.json())
    .then((data) => {
      wordList = shuffleList(Object.entries(data));
      selector(".meaning").style.display = "block";
      currentCount.innerText = order;
      maxCount.innerText = wordList.length;

      wordSetting();
    })
    .catch((error) => console.log(error));
};

function wordSetting() {
  const index = order - 1;
  console.log(index);

  if (index >= maxCount.innerText) {
    localStorage.setItem("correctAnswerList", JSON.stringify(correctAnswerList));
    localStorage.setItem("wrongAnswerList", JSON.stringify(wrongAnswerList));
    location.href = "./result.html";
  }

  selector(".word").innerText = wordList[index][0];
  currentAnswerList.push(wordList[index][1]);
  currentCount.innerText = order++;

  let loopCount = 0;

  while (loopCount < 2) {
    const currentValue = randomValue();

    if (currentAnswerList.indexOf(currentValue) === -1) {
      currentAnswerList.push(currentValue);
      prevValue = randomValue;
      loopCount++;
    }
  }

  const list = shuffleList(currentAnswerList);
  const length = selector(".meaning").children.length;

  for (let i = 0; i < length; i++) {
    selector(".meaning").children[i].innerText = list[i];
  }
}

document.addEventListener("click", (event) => {
  if (event.target.className === "answer") {
    answerCheck(event.target.innerText);
  }
});

function answerCheck(userAnswer) {
  const word = selector(".word").innerText;
  const correctAnswer = wordList.find((item) => item[0] === word)[1];

  if (correctAnswer === userAnswer) {
    console.log("정답");
    correctAnswerList.push([word, userAnswer]);
  } else {
    console.log("오답");
    wrongAnswerList.push([word, correctAnswer, userAnswer]);
  }

  currentAnswerList.length = 0;
  wordSetting();
}

function shuffleList(list) {
  const shufflelist = list.slice();
  for (let i = shufflelist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shufflelist[i], shufflelist[j]] = [shufflelist[j], shufflelist[i]];
  }
  return shufflelist;
}

selector(".date-selection + button").addEventListener("click", () => {
  callDayFile(selector(".date-selection").value);
  selector(".date-box").style.display = "none";
});
