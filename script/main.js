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
    div.classList.add('border');
    div.classList.add('m-5');
    div.innerHTML += `
        <h1 class="">${element.title}</h1>
        <p>${element.description}</p>
        <span>${element.labels[0]}</span>
        <span>${element.labels[1]}</span>
    `;
    cardContainer.appendChild(div)
  });
};
