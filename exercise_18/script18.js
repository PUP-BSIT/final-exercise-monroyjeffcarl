const apiUrl = "http://localhost/exercise20/exercise_18/backend/api.php";

document
  .querySelector(".user-input")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    submitMood();
  });

document.getElementById("update").addEventListener("click", function (event) {
  event.preventDefault();
  submitUpdate();
});

document.addEventListener("DOMContentLoaded", function () {
  fetchMoods();
});

function fetchMoods() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      updateTable(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateTable(moods) {
  const tableBody = document.getElementById("table_body");
  tableBody.innerHTML = ""; // Clear existing table rows before updating

  moods.forEach((mood) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${mood.date}</td>
            <td>${mood.sleep_duration}</td>
            <td>${mood.expected_mood}</td>
            <td>${mood.actual_mood}</td>
            <td>${mood.notes}</td>
            <td>
                <button onclick="updateMood(${mood.id})">Update</button>
                <button onclick="deleteMood(${mood.id})">Delete</button>
            </td>`;

    tableBody.appendChild(row);
  });
}

function submitMood() {
  const date = document.querySelector("#date").value;
  const sleep = document.querySelector("#sleep").value;
  const expMood = document.querySelector("#exp_mood").value;
  const actMood = document.querySelector("#act_mood").value;
  const notes = document.querySelector("#notes").value;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      date,
      sleep_duration: sleep,
      expected_mood: expMood,
      actual_mood: actMood,
      notes,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      fetchMoods();
    })
    .catch((error) => {
      console.error("Error creating mood entry:", error);
    });
}

function deleteMood(id) {
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      fetchMoods();
    })
    .catch((error) => {
      console.error("Error deleting mood entry:", error);
    });
}

function updateMood(id) {
  const updateBtn = document.getElementById("update");
  const submitBtn = document.querySelector(".submit-button button");

  updateBtn.style.display = "block";
  submitBtn.style.display = "none";

  // Fetch the mood entry by id and populate the form fields
  fetch(apiUrl + `?id=${id}`)
    .then((response) => response.json())
    .then((mood) => {
      document.getElementById("date").value = mood.date;
      document.getElementById("sleep").value = mood.sleep_duration;
      document.getElementById("exp_mood").value = mood.expected_mood;
      document.getElementById("act_mood").value = mood.actual_mood;
      document.getElementById("notes").value = mood.notes;
    })
    .catch((error) => {
      console.error("Error fetching mood entry for update:", error);
    });
}

function submitUpdate() {
  const id = document.getElementById("id").value; // Make sure to have an ID field in your form
  const date = document.querySelector("#date").value;
  const sleep = document.querySelector("#sleep").value;
  const expMood = document.querySelector("#exp_mood").value;
  const actMood = document.querySelector("#act_mood").value;
  const notes = document.querySelector("#notes").value;

  fetch(apiUrl, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id,
      date,
      sleep_duration: sleep,
      expected_mood: expMood,
      actual_mood: actMood,
      notes,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      fetchMoods();
    })
    .catch((error) => {
      console.error("Error updating mood entry:", error);
    });
}
