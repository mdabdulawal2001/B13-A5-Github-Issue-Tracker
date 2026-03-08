const cardContainer = document.getElementById("card-container");
const totalIssuesCount = document.getElementById("total-issues-count");

let allData = [];



// data load from api link
const getIssues = async () => {
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();
    allData = data.data;
    renderCard(allData), updateTotalCardCount(allData);
  } catch (err) {
    console.error("Error:", err);
  }
};

getIssues();


// total issues count
const updateTotalCardCount = (allData) => {
  const allCards = allData.map((el) => {
    return el;
  });
  totalIssuesCount.innerText = allCards.length;
};

// manage card data and update
const renderCard = (allData) => {
  cardContainer.innerHTML = "";

  allData.forEach((element) => {
    const label1 = element.labels?.[0] || "";
    const label2 = element.labels?.[1] || "";

    const div = document.createElement("div");
    div.innerHTML = `
         <!-- Issue card -->
    <div class="h-[330px] bg-base-100 shadow-xl border border-gray-200 rounded-xl overflow-hidden">
      <!-- green line -->
  <div id="green-line" class="hidden h-1 bg-emerald-500 w-full"></div>
      <!-- purple line -->
  <div id="purple-line" class="hidden h-1 bg-blue-700 w-full"></div>

  <div class="p-5">
    <div class="flex justify-between items-start mb-4">
      <div>
        <img class="open-status-img" src="../assets/Open-Status.png" alt="">
        <img class="closed-status-img" src="../assets/Closed- Status .png" alt="">
      </div>
      <!-- priority -->
      <span class="badge badge-ghost priority-text bg-red-50 text-red-500 border-none font-bold px-4 py-3 uppercase">${element.priority}</span>
    </div>
      <!-- title -->
    <h2 class="text-lg font-bold text-slate-800 leading-tight mb-2">
      ${element.title}
    </h2>
    <!-- description -->
    <p class="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
      ${element.description}
    </p>
    <!-- labels -->
    <div class="flex gap-2 mb-6">
      <div class="badge label-one border-red-200 bg-red-50 text-red-500 flex justify-center items-center gap-1 py-3 px-3 uppercase">
        <span class="text-xs"><img src="../assets/BugDroid.png"></span> <span class="text-[10px]">${element.labels[0]}</span>
      </div>
      <div class="badge label-two border-amber-200 bg-amber-50 text-amber-600 gap-1 py-3 px-3 uppercase font-bold">
        <span><img src="../assets/Lifebuoy.png"/></span> <span class="text-[9px]">${element.labels[1]}</span>
      </div>
    </div>
    <div class="pt-4 border-t border-gray-100 text-slate-400 text-sm space-y-1">
      <!-- author -->
      <p>#1 by <span class="hover:underline cursor-pointer">${element.author}</span></p>
      <!-- createdAt -->
      <p>${element.createdAt}</p>
    </div>
  </div>
    </div>
    `;

    // show/hide
    const openImg = div.querySelector(".open-status-img");
    const closedImg = div.querySelector(".closed-status-img");
    const priorityText = div.querySelector(".priority-text");
    const greenLine = div.querySelector("#green-line");
    const purpleLine = div.querySelector("#purple-line");

    // status image show/hide related condition
    if (element.priority === "high" || element.priority === "medium") {
      closedImg.classList.add("hidden");
      openImg.classList.remove("hidden");
    } else {
      openImg.classList.add("hidden");
      closedImg.classList.remove("hidden");
    }

    // update priority text color and bg
    if (element.priority === "medium") {
      priorityText.classList.remove("bg-red-50");
      priorityText.classList.remove("text-red-500");
      priorityText.classList.add("bg-[#FFF6D1]");
      priorityText.classList.add("text-[#F59E0B]");
    }
    if (element.priority === "low") {
      priorityText.classList.remove("text-red-500");
      priorityText.classList.add("text-[#9CA3AF]");
    }

    // handle undefined of labels
    const labelOneDiv = div.querySelector(".label-one");
    const labelTwoDiv = div.querySelector(".label-two");

    if (!label1) labelOneDiv.classList.add("hidden");
    if (!label2) labelTwoDiv.classList.add("hidden");

    // handle green line and purple line
    if (element.status === "open") {
      purpleLine.classList.add("hidden");
      greenLine.classList.remove("hidden");
    }

    if (element.status === "closed") {
      purpleLine.classList.remove("hidden");
      greenLine.classList.add("hidden");
    }

    cardContainer.appendChild(div);
  });
};

// button toggle style
function toggleStyle(activeId) {
  const buttons = ["all-btn", "open-btn", "closed-btn"];
  buttons.forEach((id) => {
    const btn = document.getElementById(id);
    if (id === activeId) {
      btn.classList.add("bg-[#4A00FF]", "text-white");
      btn.classList.remove("bg-white", "text-black");
    } else {
      btn.classList.remove("bg-blue-500", "text-white");
      btn.classList.add("bg-white", "text-black");
    }
  });
}


// show/hide open/closed tab button related card 

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

allBtn.addEventListener("click", ()=>{
  renderCard(allData);
  updateTotalCardCount(allData);
})

openBtn.addEventListener("click", ()=>{
  const openData = allData.filter((issue) => issue.status === "open");
  renderCard(openData);
  updateTotalCardCount(openData);
})

closedBtn.addEventListener("click", ()=>{
  const closedData = allData.filter((issue) => issue.status === "closed");
  renderCard(closedData);
  updateTotalCardCount(closedData);
})