const selector = (element) => document.querySelector(element);

selector("#words2400").addEventListener("click", function() {
  this.style.display = "none";
  selector("#gradeList").style.display = "block";
})

selector("#gradeList").addEventListener("click", function(event) {
  this.style.display = "none";
  selector("#modeList").style.display = "block";

  const grade = Number(event.target.innerText.slice(2, -2));
  const queryString = `?item=words2400&grade=${grade}`;

  selector("#modeList").children[0].href += queryString;
  selector("#modeList").children[1].href += queryString;
})
