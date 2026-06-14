import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const PASSWORD = "dnstjq1004";

window.adminLogin = async function () {

  const input =
    document.getElementById("adminPassword").value;

  if (input !== PASSWORD) {
    alert("비밀번호 틀림");
    return;
  }

  document.getElementById("loginArea").style.display = "none";
  document.getElementById("adminArea").style.display = "block";

  loadMatches();
};

window.addMatch = async function () {

  const home =
    document.getElementById("homeTeam").value.trim();

  const away =
    document.getElementById("awayTeam").value.trim();

  if (!home || !away) {
    alert("팀 이름 입력");
    return;
  }

  await addDoc(collection(db, "matches"), {
    home,
    away,
    createdAt: Date.now()
  });

  alert("경기 추가 완료");

  document.getElementById("homeTeam").value = "";
  document.getElementById("awayTeam").value = "";

  loadMatches();
};

async function loadMatches() {

  const matchList =
    document.getElementById("matchList");

  const snapshot =
    await getDocs(collection(db, "matches"));

  let html = "";

  snapshot.forEach((doc) => {

    const m = doc.data();

    html += `
      <div class="match">
        ${m.home} vs ${m.away}
      </div>
    `;
  });

  matchList.innerHTML = html;
}
