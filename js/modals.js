export const overlay = document.querySelector(".overlay");
export const modal = document.querySelector(".modal");

export const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

export const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

export function closeEditModal() {
  const editModal = document.querySelector(".edit-modal");
  editModal.classList.add("hidden");
};