const form = document.getElementById("ageForm");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const yearsOutput = document.getElementById("years");
const monthsOutput = document.getElementById("months");
const daysOutput = document.getElementById("days");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);
  let hasError = false;
  const today = new Date();
  if (!dayInput.value) {
    showError(dayInput, "Tiene que ser dia valido");
    hasError = true;
  }
  if (!monthInput.value) {
    showError(monthInput, "tiene que ser un mes valido");
    hasError = true;
  }
  if (!yearInput.value) {
    showError(yearInput, "Tiene que ser un año valido");
    hasError = true;
  }
  if (day < 1 || day > 31) {
    showError(dayInput, "debe ser un dia Valido");
    hasError = true;
  }
  if (month < 1 || month > 12) {
    showError(monthInput, "Debe ser un mes válido");
    hasError = true;
  }
  if (year > today.getFullYear()) {
    showError(yearInput, "debe colocar un año valido");
    hasError = true;
  }
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    showError(dayInput, "Debe ser una fecha válida");
    hasError = true;
  }
  if (birthDate > today) {
    showError(dayInput, "Must be in the past");
    hasError = true;
  }
  if (hasError) return;
  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  let days = today.getDate() - day;
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  yearsOutput.textContent = years;
  monthsOutput.textContent = months;
  daysOutput.textContent = days;
});
function showError(input, message) {
  const parent = input.parentElement;
  parent.classList.add("error");
  parent.querySelector(".error").textContent = message;
}
function clearErrors() {
  document.querySelectorAll(".input-group").forEach(group => {
    group.classList.remove("error");
    group.querySelector(".error").textContent = "";
  });
}