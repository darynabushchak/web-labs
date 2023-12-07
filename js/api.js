import { displayChairs } from "./domUtils.js";

export let data = [];

export async function fetchChairs() {
  try {
    const response = await fetch("http://127.0.0.1:8000/chairs/");
    data = await response.json();
    displayChairs(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}