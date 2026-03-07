const cardContainer = document.getElementById("card-container");

const getIssues = async () => {
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();
    return renderCard(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

getIssues();

const renderCard = (data) => {
  data.data.forEach((element) => {
    console.log(element);
    const div = document.createElement('div');
    div.innerHTML += `
         <!-- Issue card -->
    <div class="h-[330px] bg-base-100 shadow-xl border border-gray-200 rounded-xl overflow-hidden">
      <!-- green line -->
  <div id="green-line" class="h-1 bg-emerald-500 w-full"></div>
      <!-- purple line -->
  <div id="purple-line" class="hidden h-1 bg-blue-700 w-full"></div>

  <div class="p-5">
    <div class="flex justify-between items-start mb-4">
      <div>
        <img src="./assets/Open-Status.png" alt="">
      </div>
      <!-- priority -->
      <span class="badge badge-ghost bg-red-50 text-red-500 border-none font-bold px-4 py-3 uppercase">${element.priority}</span>
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
      <div class="badge border-red-200 bg-red-50 text-red-500 flex justify-center items-center gap-1 py-3 px-3 uppercase">
        <span class="text-xs"><img src="../assets/BugDroid.png"></span> <span class="text-[10px]">${element.labels[0]}</span>
      </div>
      <div class="badge border-amber-200 bg-amber-50 text-amber-600 gap-1 py-3 px-3 uppercase font-bold">
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
    cardContainer.appendChild(div)
  });
};
