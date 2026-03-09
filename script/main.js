let allData = [];
const cardContainer = document.getElementById("card-container");
const totalIssuesCount = document.getElementById("total-issues-count");


const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// all data load from api link
const getIssues = async () => {
  manageSpinner(true);
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

// single api data loaded and used
const getSingleIssue = async (id) => {
  manageSpinner(true);
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    );
    const data = await res.json();
    const issue = data.data;
    displaySingleIssue(issue);
  } catch (err) {
    console.error("Error:", err);
  }
};

// total issues count
const updateTotalCardCount = (allData) => {
  totalIssuesCount.innerText = allData.length;
};

// priority text handle
const setPriorityStyle = (priority, element) => {

  element.classList.remove(
    "bg-red-50",
    "text-red-500",
    "bg-[#FFF6D1]",
    "text-[#F59E0B]",
    "text-[#9CA3AF]"
  );

  if(priority === "high"){
    element.classList.add("bg-red-50","text-red-500");
  }

  if(priority === "medium"){
    element.classList.add("bg-[#FFF6D1]","text-[#F59E0B]");
  }

  if(priority === "low"){
    element.classList.add("text-[#9CA3AF]");
  }

}

// display single issue in modal
const modal = document.getElementById("my_modal_5");
const displaySingleIssue = (issue) => {
  const label1 = issue.labels?.[0] || "";
  const label2 = issue.labels?.[1] || "";

  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="modal-box bg-white p-6 md:p-8 rounded-2xl mx-auto outline-0">
    
    <h3 class="text-xl font-bold text-slate-800">${issue.title}</h3>
    
    <div class="flex flex-wrap items-center gap-2 mt-4 text-slate-500 text-sm font-medium">
      
      <span class="badge badge-success gap-2 text-white py-3 px-4 rounded-full border-none">
         ${issue.status}
      </span>
      <span>•</span>
      <span>Opened by <span class="font-semibold text-slate-700">${
        issue.author
      }</span></span>
      <span>•</span>
      <span>${issue.createdAt}</span>
    </div>

   <!-- labels -->
    <div class="flex gap-2 mb-0 mt-6">
      <div class="badge label-one border-red-200 bg-red-50 text-red-500 flex justify-center items-center gap-1 py-3 px-3 uppercase">
        <span class="text-xs"><img src="../assets/BugDroid.png"></span> <span class="text-[10px]">${label1}</span>
      </div>
      <div class="badge label-two border-amber-200 bg-amber-50 text-amber-600 gap-1 py-3 px-3 uppercase font-bold">
        <span><img src="../assets/Lifebuoy.png"/></span> <span class="text-[9px]">${label2}</span>
      </div>
    </div>

    <p class="mt-5 text-[15px] text-slate-600 leading-snug">
      ${issue.description}
    </p>

    <div class="bg-slate-50 rounded-xl p-6 mt-4 flex justify-between items-center border border-slate-100 mb-0">
      <div>
        <p class="text-slate-400 font-semibold text-sm mb-1 uppercase tracking-tight">Assignee:</p>
        <p class="text-lg font-bold text-slate-800">${
          issue.assignee
            ? issue.assignee
            : `<span class = "text-red-500 font-semibold">No Assignee Name</span>`
        }</p>
      </div>
      <div class="text-right flex flex-col items-center">
        <p class="text-slate-400 font-semibold text-sm mb-2 uppercase tracking-tight">Priority:</p>
        <span class="priority-text bg-red-50 text-red-500 px-6 py-1 rounded-md font-bold text-xs shadow-lg shadow-red-200 uppercase">
          ${issue.priority}
        </span>
      </div>
    </div>

    <div class="modal-action mt-7">
      <form method="dialog">
        <button class="btn bg-[#4f46e5] hover:bg-[#4338ca] text-white px-7 rounded-lg text-sm normal-case outline-0">
          Close
        </button>
      </form>
    </div>
  </div>
  `;

  // handle bg status
  const modalStatus = div.querySelector(".badge-success");
  if (issue.status === "closed") {
    modalStatus.classList.remove("badge-success");
    modalStatus.classList.add("bg-purple-500");
  } else {
    modalStatus.classList.add("badge", "badge-success");
    modalStatus.classList.remove("bg-purple-500");
  }

  // handle undefined of labels
  const labelOneDiv = div.querySelector(".label-one");
  const labelTwoDiv = div.querySelector(".label-two");
  const priorityText = div.querySelector(".priority-text");

  if (!label1) labelOneDiv.classList.add("hidden");
  if (!label2) labelTwoDiv.classList.add("hidden");

  setPriorityStyle(issue.priority, priorityText);

  // update priority text color and bg
  // if (issue.priority === "medium") {
  //   priorityText.classList.remove("bg-red-50");
  //   priorityText.classList.remove("text-red-500");
  //   priorityText.classList.add("bg-[#FFF6D1]");
  //   priorityText.classList.add("text-[#F59E0B]");
  // }
  // if (issue.priority === "low") {
  //   priorityText.classList.remove("text-red-500");
  //   priorityText.classList.add("text-[#9CA3AF]");
  // }

  modalContent.appendChild(div);
  modal.showModal();
  manageSpinner(false);
};

// manage card data and update
const renderCard = (allData) => {
  cardContainer.innerHTML = "";
  if(allData.length === 0){
  cardContainer.innerHTML = `<p class="mt-5 col-span-4 text-center text-black text-3xl font-semi-bold">No Issues Found</p>`;
  return;
}

  allData.forEach((element) => {
    const label1 = element.labels?.[0] || "";
    const label2 = element.labels?.[1] || "";

    const div = document.createElement("div");
    div.innerHTML = `
         <!-- Issue card -->
    <div onclick="getSingleIssue(${element.id})" class="h-[330px] bg-base-100 shadow-xl border border-gray-200 rounded-xl overflow-hidden">
      <!-- green line -->
  <div class="green-line hidden h-1 bg-emerald-500 w-full"></div>
      <!-- purple line -->
  <div class="purple-line hidden h-1 bg-blue-700 w-full"></div>

  <div class="p-5">
    <div class="flex justify-between items-start mb-4">
      <div>
        <img class="open-status-img" src="../assets/Open-Status.png" alt="">
        <img class="closed-status-img" src="../assets/Closed-Status.png" alt="">
      </div>
      <!-- priority -->
      <span class="badge badge-ghost priority-text bg-red-50 text-red-500 border-none font-bold px-4 py-3 uppercase">${element.priority}</span>
    </div>
      <!-- title -->
    <h2 class="text-xl font-bold text-slate-800 leading-tight mb-2">
      ${element.title}
    </h2>
    <!-- description -->
    <p class="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
      ${element.description}
    </p>
    <!-- labels -->
    <div class="flex gap-2 mb-6">
      <div class="badge label-one border-red-200 bg-red-50 text-red-500 flex justify-center items-center gap-1 py-3 px-3 uppercase">
        <span class="text-xs"><img src="../assets/BugDroid.png"></span> <span class="text-[10px]">${label1}</span>
      </div>
      <div class="badge label-two border-amber-200 bg-amber-50 text-amber-600 gap-1 py-3 px-3 uppercase font-bold">
        <span><img src="../assets/Lifebuoy.png"/></span> <span class="text-[9px]">${label2}</span>
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
    const greenLine = div.querySelector(".green-line");
    const purpleLine = div.querySelector(".purple-line");

    // status image show/hide related condition
    if (element.priority === "high" || element.priority === "medium") {
      closedImg.classList.add("hidden");
      openImg.classList.remove("hidden");
    } else {
      openImg.classList.add("hidden");
      closedImg.classList.remove("hidden");
    }

    setPriorityStyle(element.priority, priorityText);

    // // update priority text color and bg
    // if (element.priority === "medium") {
    //   priorityText.classList.remove("bg-red-50");
    //   priorityText.classList.remove("text-red-500");
    //   priorityText.classList.add("bg-[#FFF6D1]");
    //   priorityText.classList.add("text-[#F59E0B]");
    // }
    // if (element.priority === "low") {
    //   priorityText.classList.remove("text-red-500");
    //   priorityText.classList.add("text-[#9CA3AF]");
    // }


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
  manageSpinner(false);
};

// button toggle style
const toggleStyle = (activeId) => {
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

allBtn.addEventListener("click", () => {
  manageSpinner(true);
  renderCard(allData);
  updateTotalCardCount(allData);
  manageSpinner(false);
});

openBtn.addEventListener("click", () => {
  manageSpinner(true);
  const openData = allData.filter((issue) => issue.status === "open");
  renderCard(openData);
  updateTotalCardCount(openData);
  manageSpinner(false);
});

closedBtn.addEventListener("click", () => {
  manageSpinner(true);
  const closedData = allData.filter((issue) => issue.status === "closed");
  renderCard(closedData);
  updateTotalCardCount(closedData);
  manageSpinner(false);
});

// search
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  const searchInputText = searchInput.value.toLowerCase();
    if (searchInputText === "") {
    renderCard(allData);
    updateTotalCardCount(allData);
    return;
    }

  const filteredData = allData.filter((issue) =>
    `${issue.title} ${issue.description} ${issue.author}`.toLowerCase().includes(searchInputText)
  );
  renderCard(filteredData);
  updateTotalCardCount(filteredData);
});
