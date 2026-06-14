import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let nickname = localStorage.getItem("nickname");

const loginBox = document.getElementById("loginBox");
const mainApp = document.getElementById("mainApp");
const welcomeText = document.getElementById("welcomeText");

if (nickname) {
  startApp();
}

window.login = function () {
  const nick = document.getElementById("nickname").value.trim();

  if (!nick) {
    alert("닉네임 입력");
    return;
  }

  localStorage.setItem("nickname", nick);
  nickname = nick;

  startApp();
};

async function startApp() {
  loginBox.style.display = "none";
  mainApp.style.display = "block";

  welcomeText.innerText = `${nickname}`;

  loadMatches();
  loadRanking();
}

async function loadMatches() {
  const matchesDiv = document.getElementById("matches");

  const snapshot = await getDocs(collection(db, "matches"));

  let html = "";

  snapshot.forEach((doc) => {
    const m = doc.data();

    html += `
      <div class="match">
        <h3>${m.home} vs ${m.away}</h3>

        <input class="scoreInput" id="h_${doc.id}" type="number" min="0">

        :

        <input class="scoreInput" id="a_${doc.id}" type="number" min="0">
      </div>
    `;
  });

  matchesDiv.innerHTML = html;
}

window.submitPredictions = async function () {

  const matches = await getDocs(collection(db, "matches"));

  for (const docSnap of matches.docs) {

    const homeScore =
      document.getElementById(`h_${docSnap.id}`).value;

    const awayScore =
      document.getElementById(`a_${docSnap.id}`).value;

    if (homeScore === "" || awayScore === "") {
      alert("모든 경기 입력");
      return;
    }

    await addDoc(collection(db, "predictions"), {
      nickname,
      matchId: docSnap.id,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      createdAt: Date.now()
    });
  }

  alert("제출 완료");
};

async function loadRanking() {

  const rankingDiv = document.getElementById("ranking");

  const snapshot =
    await getDocs(collection(db, "users"));

  let users = [];

  snapshot.forEach((doc) => {
    users.push(doc.data());
  });

  users.sort((a, b) => b.score - a.score);

  let html = "";

  html += `
  <div class="match">
    <h3>${m.home} vs ${m.away} ${isLocked ? "🔒" : ""}</h3>
    
    <div class="score-container">
      <input class="scoreInput" id="h_${docSnap.id}" type="number" min="0" ${isLocked ? "disabled" : ""}>
      <span>:</span>
      <input class="scoreInput" id="a_${docSnap.id}" type="number" min="0" ${isLocked ? "disabled" : ""}>
    </div>
  </div>
`;


  rankingDiv.innerHTML = html;
}
