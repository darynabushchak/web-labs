import { data } from "./api.js";
import { displayChairs } from "./domUtils.js";

const searchInput = document.getElementById("type_input");
let showedList = [];

export function sortByPrice() {
  const sortSwitch = document.getElementById("sort-switch");
  const isAscending = sortSwitch.checked;
  let sortedChairs;
  if (showedList.length == 0) {
    sortedChairs = data.slice();
    showedList = data.slice();
  } else {
    sortedChairs = showedList.slice();
  }
  sortedChairs.sort((a, b) => a.price - b.price);
  if (isAscending) {
    displayChairs(sortedChairs);
  } else {
    displayChairs(showedList);
  }
}

export function countTotalPrice() {
  const chairInfoArray = Array.from(
    document.getElementsByClassName("chairPrice")
  );
  let totalCost = 0.0;

  chairInfoArray.forEach((chair) => {
    const cost = parseFloat(chair.textContent);
    if (!isNaN(cost)) {
      totalCost += cost;
    }
  });

  const totalExpensesDiv = document.querySelector(".total_expenses");
  totalExpensesDiv.textContent = `Total expenses: ${totalCost.toFixed(2)} UAH`;
}

export function searchByName() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredChairs = [];
  if (searchTerm !== "") {
    filteredChairs = data.filter((chair) =>
      chair.name.toLowerCase().includes(searchTerm)
    );
  } else {
    filteredChairs = data.slice();
  }
  showedList = filteredChairs;
  console.log(showedList);
  displayChairs(filteredChairs);
}

export function clear() {
  showedList = data.slice();
  console.log(showedList);
  displayChairs(data);
}
