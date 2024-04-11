// Überprüft die Browserspache
const browserLang = window.navigator.language || window.navigator.userLanguage;

// Filter für die Unternehmen
function UnternehmenFilter() {
  const input = document.getElementById("inputUnternehmen");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("TabelleUnternehmen");
  const tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      const txtValue = td.textContent || td.innerText;
      tr[i].style.display =
        txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}

// Ereignis wenn man auf die Spalten überschrift drückt
function enableSorting(table) {
  const headers = table.querySelectorAll("th");

  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      sortUnternehmenTable(table, index);
    });
  });
}

// Sortierfunktion der Tabellen
const tableUnternehmen = document.getElementById("TabelleUnternehmen");
enableSorting(tableUnternehmen);

function sortUnternehmenTable(table, column) {
  const tbody = table.querySelector("tbody");
  const rows = [...tbody.querySelectorAll("tr")];
  const isAscending = table.classList.contains("ascending");

  rows.sort((a, b) => {
    const cellA = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const cellB = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return isAscending
      ? cellA.localeCompare(cellB, undefined, { numeric: true })
      : cellB.localeCompare(cellA, undefined, { numeric: true });
  });

  rows.forEach((row) => tbody.appendChild(row));

  // Umkehrung der Sortierrichtung
  table.classList.toggle("ascending");
}

// Nur erlaubte String werte werden erlaubt
const inputLand = document.getElementById("inputLand");
inputLand.addEventListener("input", function () {
  if (!/^[a-zA-Z\s]*$/.test(this.value)) {
    this.value = "";
  }
});

// Eingabe wird in sicheren code umgewandelt
document
  .getElementById("inputUnternehmen")
  .addEventListener("input", function () {
    const userInput = this.value;
    const escapedUserInput = escapeHTML(userInput);
    document.getElementById("inputUnternehmen").value = escapedUserInput;
  });

function escapeHTML(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}
