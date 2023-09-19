const selector = (element) => document.querySelector(element);
const cardLayout = selector(".card");
const word = selector(".word");
const meaning = selector(".meaning");
const wordState = selector(".card .word");
const dateSelection = selector(".date-selection");
const wordFilePath = (day) => `../words/${day}.json`;

let wordList = [];
let currentCardOrder = 0;

fetch("../words/grade3.json")
  .then((response) => response.json())
  .then((data) => {
    wordList = Object.entries(data["day1"]);
    word.innerText = wordList[0][0];
    meaning.innerText = wordList[0][1];
  })
  .catch((error) => console.log(error));

const callDayFile = (day) => {
  fetch("../words/grade3.json")
    .then((response) => response.json())
    .then((data) => {
      wordList = Object.entries(data[day]);
      word.innerText = wordList[0][0];
      meaning.innerText = wordList[0][1];
    })
    .catch((error) => console.log(error));
};

function wordStyleInit() {
  meaning.style.display = "none";
  word.style.display = "block";
  wordState.className = "word on";
}

dateSelection.addEventListener("change", () =>
  callDayFile(dateSelection.value)
);

cardLayout.addEventListener("click", () => {
  if (wordState.className === "word on") {
    word.style.display = "none";
    meaning.style.display = "block";
    wordState.className = "word";
  } else {
    wordStyleInit();
  }
});

selector(".btn-left").addEventListener("click", () => {
  const max = wordList.length;

  wordStyleInit();

  if (currentCardOrder - 1 < 0) {
    currentCardOrder = max - 1;
  } else {
    currentCardOrder--;
  }

  word.innerText = wordList[currentCardOrder][0];
  meaning.innerText = wordList[currentCardOrder][1];
});

selector(".btn-right").addEventListener("click", () => {
  const max = wordList.length;

  wordStyleInit();

  if (currentCardOrder + 1 >= max) {
    currentCardOrder = 0;
  } else {
    currentCardOrder++;
  }

  word.innerText = wordList[currentCardOrder][0];
  meaning.innerText = wordList[currentCardOrder][1];
});
