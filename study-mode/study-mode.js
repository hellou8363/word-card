const selector = (element) => document.querySelector(element);
const wordFilePath = (day) => `../words/${day}.json`;

const cardLayout = selector(".card");
const word = selector(".word");
const meaning = selector(".meaning");
const wordState = selector(".card .word");
const dateSelection = selector(".date-selection");

const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
const item = searchParams.get("item");

let fileData;
let wordList;
let currentCardOrder = 0;

if (item === "words2400") {
  const grade = `grade${searchParams.get("grade")}`;
  callFileInit(item, grade);
}

function callFileInit(item, value) {
  fetch(`../words/${item}/${value}.json`)
    .then((response) => response.json())
    .then((data) => {
      fileData = data;

      for (const key in fileData) {
        if (fileData.hasOwnProperty(key)) {
          wordList = Object.entries(fileData[key]);
          word.innerText = wordList[0][0];
          meaning.innerText = wordList[0][1];
          break;
        }
      }
    })
    .catch((error) => console.log(error));
}

const callKeyData = (key) => {
  wordList = Object.entries(fileData[key]);
  word.innerText = wordList[0][0];
  meaning.innerText = wordList[0][1];
};

function wordStyleInit() {
  meaning.style.display = "none";
  word.style.display = "block";
  wordState.className = "word on";
}

dateSelection.addEventListener("change", () =>
  callKeyData(dateSelection.value)
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
