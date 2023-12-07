import { fetchChairs, data } from "./api.js";
import { displayChairs } from "./domUtils.js";
import {
  sortByPrice,
  searchByName,
  countTotalPrice,
  clear,
} from "./methods.js";
import { overlay, openModal, closeModal, closeEditModal } from "./modals.js";

document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.getElementById("sort-switch");
  const countButton = document.querySelector(".count__button");
  const searchInput = document.getElementById("type_input");
  const addChairModal = document.querySelector(".add_button");
  const closeChairModal = document.querySelector(".close");
  const editChairsButton = document.querySelector(".edit_chair_button");
  const createChair = document.querySelector(".add_chair_button");
  const clearButton = document.getElementById("clear_button");
  const searchButton = document.getElementById("search_button");


  addChairModal.addEventListener("click", () => {
    const addData = {
      name: document.getElementById("type_input_name").value = "",
      description: document.getElementById("type_input_description").value = "",
      price: document.getElementById("type_input_price").value = "",
      color: document.getElementById("type_input_color").value = "",
    };
  })
  

  searchButton.addEventListener("click", () => {
    searchByName();
    displayChairs(filteredChairs);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    clear();
  });

  createChair.addEventListener("click", async (event) => {
    event.preventDefault();
    const name = document.getElementById("type_input_name").value;
    const description = document.getElementById("type_input_description").value;
    const price = document.getElementById("type_input_price").value;
    const color = document.getElementById("type_input_color").value;
    let createData = {};
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price < 0 ||
      color.trim() === ""
    ) {
      window.alert("invalid value");
      return;
    } else {
      createData = {
        name: name,
        description: description,
        price: price,
        color: color,
      };
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/chairs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createData),
      });
      fetchChairs();
      const responseData = await response.json();
      console.log(responseData);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  });

  var selectedChairs = null;

  const editCloseButton = document.querySelector(".edit-close");
  editCloseButton.addEventListener("click", closeEditModal);

  function openEditModal(chairs) {
    const editModal = document.querySelector(".edit-modal");
    document.getElementById("edit_input_name").value = chairs.name;
    document.getElementById("edit_input_description").value =
      chairs.description;
    document.getElementById("edit_input_price").value = chairs.price;
    document.getElementById("edit_input_color").value = chairs.color;

    editModal.classList.remove("hidden");
    selectedChairs = chairs;
  }

  document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("edit-button")) {
      const chairId = event.target.getAttribute("data-id");
      const selectedChairs = data.find((c) => c.id == chairId);
      openEditModal(selectedChairs);
    }
  });

  editChairsButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const editData = {
      name: document.getElementById("edit_input_name").value,
      description: document.getElementById("edit_input_description").value,
      price: document.getElementById("edit_input_price").value,
      color: document.getElementById("edit_input_color").value,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chairs/${selectedChairs.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      const editModal = document.querySelector(".edit-modal");
      editModal.classList.add("hidden");
      fetchChairs();
    } catch (error) {
      console.log(error);
    }
  });

  fetchChairs();

  overlay.addEventListener("click", closeModal);
  toggleSwitch.addEventListener("click", sortByPrice);
  countButton.addEventListener("click", countTotalPrice);
  searchInput.addEventListener("input", searchByName);
  addChairModal.addEventListener("click", openModal);
  closeChairModal.addEventListener("click", closeModal);
});
