const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let cryptoData = [];

// Fetch data using .then
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    cryptoData = data;
    renderTable();
  })
  .catch((error) => console.error("Error:", error));

// Fetch data using async/await
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    cryptoData = await response.json();
    renderTable();
  } catch (error) {
    console.error("Error:", error);
  }
}
// Call the async function to fetch data
// fetchData();

// Render table with data
function renderTable() {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";

  cryptoData.forEach((crypto) => {
    const row = document.createElement("tr");
    const { name, id, image, symbol, current_price, total_volume } = crypto;

    row.innerHTML = `
      <td>${name}</td>
      <td>${id}</td>
      <td><img src="${image}" alt="${name}" width="30"></td>
      <td>${symbol}</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Search functionality
function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredData = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchInput) ||
      crypto.symbol.toLowerCase().includes(searchInput)
  );

  renderFilteredTable(filteredData);
}

// Render filtered table
function renderFilteredTable(data) {
  const tableBody = document.getElementById("cryptoTableBody");
  tableBody.innerHTML = "";

  data.forEach((crypto) => {
    const row = document.createElement("tr");
    const { name, id, image, symbol, current_price, total_volume } = crypto;

    row.innerHTML = `
      <td>${name}</td>
      <td>${id}</td>
      <td><img src="${image}" alt="${name}" width="30"></td>
      <td>${symbol}</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Sort by market cap
function sortByMarketCap() {
  const sortedData = cryptoData.sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}

// Sort by percentage change
function sortByPercentageChange() {
  const sortedData = cryptoData.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  renderTable(sortedData);
}
