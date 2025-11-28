let students = [
  { name: "Ravi", dob: "2004-11-28" },
  { name: "Priya", dob: "2005-05-10" },
  { name: "Rahul", dob: "2003-11-28" }
];

const form = document.getElementById("student-form");
const nameInput = document.getElementById("name");
const dobInput = document.getElementById("dob");
const tableBody = document.querySelector("#student-table tbody");
const toastContainer = document.getElementById("toast-container");

function renderStudents() {
  tableBody.innerHTML = "";
  students.forEach((s, index) => {
    const tr = document.createElement("tr");
    const dobDate = new Date(s.dob);
    const dobText = dobDate.toLocaleDateString("en-GB");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${dobText}</td>
    `;
    tableBody.appendChild(tr);
  });
}

function showToast(message, isError = false) {
  const div = document.createElement("div");
  div.className = "toast" + (isError ? " toast-error" : "");
  div.textContent = message;
  toastContainer.appendChild(div);

  setTimeout(() => {
    toastContainer.removeChild(div);
  }, 4000);
}

function checkTodayBirthdays() {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();

  const todaysStudents = students.filter((s) => {
    const d = new Date(s.dob);
    return d.getDate() === todayDay && d.getMonth() === todayMonth;
  });

  if (todaysStudents.length > 0) {
    const names = todaysStudents.map((s) => s.name).join(", ");
    showToast(`Today is birthday of: ${names}`);
  } else {
    showToast("No birthdays today.", true);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const dob = dobInput.value;

  if (!name || !dob) {
    showToast("Please enter student name and date of birth.", true);
    return;
  }

  students.push({ name, dob });
  renderStudents();
  form.reset();
  showToast("Student added successfully.");
});

window.addEventListener("load", function () {
  renderStudents();
  checkTodayBirthdays();
});
