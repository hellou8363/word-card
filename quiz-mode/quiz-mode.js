const selector = (element) => document.querySelector(element);
const currentCount = selector(".current-count");
const maxCount = selector(".max-count");
const wrongAnswerList = [];
const correctAnswerList = [];
const wordList = [];
const currentAnswerList = [];
let order = 1;

const randomValue = () =>
  wordList[Math.floor(Math.random() * wordList.length)][1];

const callDayFile = (day) => {
  fetch("../words/grade3.json")
    .then((response) => response.json())
    .then((data) => {
      if (day.length > 5) {
        setDates(data, day);
      } else {
        wordList.push(...shuffleList(Object.entries(data[day])));
      }

      selector(".meaning").style.display = "block";
      currentCount.innerText = order;
      maxCount.innerText = wordList.length;

      setWords();
    })
    .catch((error) => console.log(error));
};

function setDates(data, day) {
  const result = day.slice(3).split("-");
  const start = Number(result[0]);
  const end = Number(result[1]);

  for (let i = start; i <= end; i++) {
    wordList.push(...shuffleList(Object.entries(data[`day${i}`])));
  }
}

function saveLocalStorage() {
  localStorage.setItem("correctAnswerList", JSON.stringify(correctAnswerList));
  localStorage.setItem("wrongAnswerList", JSON.stringify(wrongAnswerList));
  location.href = "./result.html";
}

function setWords() {
  const index = order - 1;

  if (index >= maxCount.innerText) {
    saveLocalStorage();
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
    selector(".mark").style.background = "url(../img/circle_green.png)"
    correctAnswerList.push([word, userAnswer]);
  } else {
    selector(".mark").style.background = "url(../img/x_red.png)"
    wrongAnswerList.push([word, correctAnswer, userAnswer]);
  }

  selector(".mark").style.backgroundSize = "contain";
  selector(".mark").style.display = "block";

  setTimeout(() => {
    selector(".mark").style.display = "none";
  }, 500);

  currentAnswerList.length = 0;
  setWords();
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
