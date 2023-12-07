const chairList = document.getElementById("chairs__list");

export const displayChairs = (dataToDisplay) => {
  chairList.innerHTML = "";
  let currentRow;
    dataToDisplay.forEach((chairs, index) => {
    if (index % 3 === 0) {
      currentRow = document.createElement("div");
      currentRow.classList.add("containerRows");
      chairList.appendChild(currentRow);
    }

    const chairItem = document.createElement("div");
    chairItem.classList.add("chair-item");

    chairItem.innerHTML = `
      <h3>${chairs.name}</h3>
      <p>Description: ${chairs.description}</p>
      <p>Price: <span class="chairPrice">${chairs.price}</span></p>
      <p>color: ${chairs.color}</p>
      <button class="edit-button" data-id="${chairs.id}">Edit</button>
    `;

    currentRow.appendChild(chairItem);
  });
};
