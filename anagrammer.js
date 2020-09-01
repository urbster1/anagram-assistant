import { prevAnagrams } from "./previous.js";
let remainingLetters = document.getElementById("remainingLetters");
let status = document.getElementById("status");
let phraseToAnagram = document.getElementById("phraseToAnagram");
let anagramToMake = document.getElementById("anagramToMake");
let anagramList = document.getElementById("anagramList");
let allShown = false;
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const sortLetters = (letters) => {
  let lowerCaseLetters = letters.toLowerCase();
  let lettersArray = lowerCaseLetters.split("").sort();
  let sortedLetters = lettersArray.join("");
  return sortedLetters;
};
const setText = () => {
  let remainingOne = new Array();
  let remainingTwo = new Array();
  let firstInput = phraseToAnagram.value;
  let secondInput = anagramToMake.value;
  let firstRemain = "";
  let secondRemain = "";
  for (const letter of alphabet) {
    let reg = new RegExp(letter + "+");
    let firstInputSorted = sortLetters(firstInput);
    let secondInputSorted = sortLetters(secondInput);
    let firstMatch = reg.test(firstInputSorted)
      ? firstInputSorted.match(reg)[0]
      : "";
    let secondMatch = reg.test(secondInputSorted)
      ? secondInputSorted.match(reg)[0]
      : "";
    if (firstMatch.length > 0) {
      for (let i = firstMatch.length; i > secondMatch.length; i--) {
        remainingOne.push(letter);
      }
    }
    if (secondMatch.length > 0) {
      for (let j = secondMatch.length; j > firstMatch.length; j--) {
        remainingTwo.push(letter);
      }
    }
  }
  firstRemain = remainingOne.join("");
  secondRemain = remainingTwo.join("");
  remainingLetters.innerText = firstRemain;
  status.innerText = secondRemain;
  if (
    firstRemain === "" &&
    secondRemain === "" &&
    firstInput !== "" &&
    secondInput !== ""
  ) {
    remainingLetters.innerText = "";
    if (firstInput === secondInput) {
      remainingLetters.style.backgroundColor =
        "#EEE";
      remainingLetters.style.border = "0";
      status.innerText =
        "Rearrange the letters to make an anagram!";
      status.style.color = "black";
      status.style.fontWeight = "bold";
      status.style.backgroundColor = "#F0D0D0";
      status.style.border = "1px solid red";
      status.style.borderRadius = "3px";
      status.style.textShadow = "0px 0px 1px red";
    } else {
      remainingLetters.style.backgroundColor =
        "#EEE";
      remainingLetters.style.border = "0";
      status.innerText = "*Perfect anagram!*";
      status.style.color = "green";
      status.style.textShadow = "0px 0px 1px limegreen";
      status.style.fontWeight = "bold";
      status.style.backgroundColor = "#D0F0D0";
      status.style.border = "1px solid green";
      status.style.borderRadius = "3px";
    }
  } else {
    remainingLetters.innerText = firstRemain;
    remainingLetters.style.backgroundColor =
      firstInput == "" || firstRemain == "" ? "#EEE" : "#CFDFEF";
    remainingLetters.style.border =
      firstInput === "" || firstRemain == "" ? "0" : "1px solid #3584E4";
    remainingLetters.style.borderRadius =
      firstInput === "" || firstRemain == "" ? "0" : "3px";
    status.innerText = secondRemain;
    status.style.color =
      secondInput == "" || secondRemain == "" ? "#EEE" : "#D00000";
    status.style.backgroundColor =
      secondInput == "" || secondRemain == "" ? "#EEE" : "#EFCFCF";
    status.style.borderRadius =
      secondInput == "" || secondRemain == "" ? "0" : "3px";
    status.style.border =
      secondInput === "" || secondRemain == "" ? "0" : "1px solid red";
  }
};
const toUrl = () => {
  if (phraseToAnagram.value !== "") {
    window.location.href =
      `${window.location.protocol}//${window.location.host}${window.location.pathname}?a=` +
      phraseToAnagram.value;
  }
};
const eraseText = (id) => (document.getElementById(id).value = "");
const shuffleRemaining = () => {
  let word = remainingLetters.innerText.split("");
  let tmp,
    current,
    top = word.length;
  if (top) {
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = word[current];
      word[current] = word[top];
      word[top] = tmp;
    }
  }
  remainingLetters.innerText = word.join("");
  return;
};
const getUrlParam = () => {
  const queryString = window.location.search;
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    const myParam = urlParams.get("a");
    phraseToAnagram.value = myParam;
    setText();
  }
};
phraseToAnagram.addEventListener("keyup", () => setText());
anagramToMake.addEventListener("keyup", () => setText());
remainingLetters.addEventListener("click", () => shuffleRemaining());
document.getElementById("urlButton").addEventListener("click", () => toUrl());
document.getElementById("clear").addEventListener("click", () => { eraseText("phraseToAnagram"); setText(); });
document.getElementById("clear2").addEventListener("click", () => { eraseText("anagramToMake"); setText(); });
anagramList.addEventListener("click", () => showPrevious(window.event.target.id));


const listPrevious = (prevAnagrams) => {
  let sectionHeader = document.createElement("p");
  sectionHeader.innerHTML = 'Previous anagrams (<span id="all" style="text-decoration: underline; cursor: pointer;">Show All</span>)';
  anagramList.appendChild(sectionHeader);
  let anagrams = Object.keys(prevAnagrams);
  for (let anagram of anagrams) {
    let nextAnagramPhrase = document.createElement("div");
    let nextAnagrams = document.createElement("div");
    nextAnagramPhrase.id = anagram + "_phrase";
    nextAnagramPhrase.className = "phrase";
    nextAnagramPhrase.innerText = prevAnagrams[anagram].phrase;
    nextAnagrams.id = anagram;
    nextAnagrams.className = "anagram";
    nextAnagrams.innerText = prevAnagrams[anagram].anagrams;
    nextAnagrams.style.display = "none";
    anagramList.appendChild(nextAnagramPhrase);
    anagramList.appendChild(nextAnagrams);
  }
};

const showPrevious = (anagramID) => {
  if (anagramID === "all" ) {
    let anagrams = Object.keys(prevAnagrams);
    for (let anagram of anagrams) {
      let nextAnagram = document.getElementById(anagram);
      allShown === false ? nextAnagram.style.display = "inline-block" : nextAnagram.style.display = "none";
    }
    allShown === false ? document.getElementById("all").innerText = "Hide All" : document.getElementById("all").innerText = "Show All";
    allShown === false ? allShown = true : allShown = false;
  } else {
  let anagramsShown = anagramID.replace("_phrase","");
  let anagramDiv = document.getElementById(anagramsShown);
  anagramDiv.style.display !== "none" ? anagramDiv.style.display = "none" : anagramDiv.style.display = "inline-block";
  };
};

window.onload = () => { getUrlParam(); listPrevious(prevAnagrams); }