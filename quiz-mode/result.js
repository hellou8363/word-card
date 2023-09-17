const correct = JSON.parse(localStorage.getItem("correctAnswerList"));
const wrong = JSON.parse(localStorage.getItem("wrongAnswerList"));
console.log(correct);
console.log(wrong);

const selector = (element) => document.querySelector(element);
// selector(".correctAnswerList").innerText = correct;
// selector(".wrongAnswerList").innerText = wrong;

const correctList = selector("#correct-answer-list");
const wrongList = selector("#wrong-answer-list");

for (let i = 0; i < wrong.length; i++) {
  wrongList.innerHTML += `<tr><td>${wrong[i][0]}</td><td>${wrong[i][1]}</td><td>${wrong[i][2]}</td></tr>`;
}

for (let i = 0; i < correct.length; i++) {
  correctList.innerHTML += `<tr><td>${correct[i][0]}</td><td>${correct[i][1]}</td></tr>`;
}

