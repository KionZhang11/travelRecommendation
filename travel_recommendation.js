fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {        
    document.getElementById('search-button').addEventListener('click', function() {
      const searchTerm = document.getElementById('search-input').value.toLowerCase();
      searchResults(data, searchTerm);
      displayRecommendations(data);

    });
    document.getElementById('clear-button').addEventListener('click', function() {
      clearResults();
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error); // Log any errors
  });

// Function to display recommendations (default display)
function displayRecommendations(data) {
  const countriesDiv = document.getElementById('countries-list');
  data.countries.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');
    countryDiv.innerHTML = `
      <h3>${country.name}</h3>
      <img src="${country.cities[0].imageUrl}" alt="${country.name}" />
      <p>${country.cities[0].description}</p>
    `;
    countriesDiv.appendChild(countryDiv);
  });

  // Display temples
  const templesDiv = document.getElementById('temples-list');
  data.temples.forEach(temple => {
    const templeDiv = document.createElement('div');
    templeDiv.classList.add('temple');
    templeDiv.innerHTML = `
      <h3>${temple.name}</h3>
      <img src="${temple.imageUrl}" alt="${temple.name}" />
      <p>${temple.description}</p>
    `;
    templesDiv.appendChild(templeDiv);
  });

  // Display beaches
  const beachesDiv = document.getElementById('beaches-list');
  data.beaches.forEach(beach => {
    const beachDiv = document.createElement('div');
    beachDiv.classList.add('beach');
    beachDiv.innerHTML = `
      <h3>${beach.name}</h3>
      <img src="${beach.imageUrl}" alt="${beach.name}" />
      <p>${beach.description}</p>
    `;
    beachesDiv.appendChild(beachDiv);
  });
}

// Function to filter and display search results based on the search term
function searchResults(data, searchTerm) {
  document.getElementById('countries').style.display = 'none';
  document.getElementById('temples').style.display = 'none';
  document.getElementById('beaches').style.display = 'none';
  
  document.getElementById('countries-list').innerHTML = '';
  document.getElementById('temples-list').innerHTML = '';
  document.getElementById('beaches-list').innerHTML = '';

  const filteredCountries = data.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm) ||
    country.cities.some(city => city.name.toLowerCase().includes(searchTerm))
  );

  const filteredTemples = data.temples.filter(temple =>
    temple.name.toLowerCase().includes(searchTerm)
  );

  const filteredBeaches = data.beaches.filter(beach =>
    beach.name.toLowerCase().includes(searchTerm)
  );

  if (searchTerm.includes('beach')) {
    displayFilteredResults('beaches-list', filteredBeaches, 'beach');
    document.getElementById('beaches').style.display = 'block'; // Show beach section
  } else if (searchTerm.includes('temple')) {
    displayFilteredResults('temples-list', filteredTemples, 'temple');
    document.getElementById('temples').style.display = 'block'; // Show temple section
  } else if (searchTerm.includes('country')) {
    displayFilteredResults('countries-list', filteredCountries, 'country');
    document.getElementById('countries').style.display = 'block'; // Show country section
  }
}

// Function to display filtered results in the DOM
function displayFilteredResults(sectionId, filteredData, type) {
  const sectionDiv = document.getElementById(sectionId);
  filteredData.slice(0, 2).forEach(item => {  // Limit results to 2
    const itemDiv = document.createElement('div');
    itemDiv.classList.add(type);
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.imageUrl}" alt="${item.name}" />
      <p>${item.description}</p>
    `;
    sectionDiv.appendChild(itemDiv);
  });
}

// Function to clear all results
function clearResults() {
  document.getElementById('search-input').value = '';

  document.getElementById('countries-list').innerHTML = '';
  document.getElementById('temples-list').innerHTML = '';
  document.getElementById('beaches-list').innerHTML = '';

  document.getElementById('countries').style.display = 'none';
  document.getElementById('temples').style.display = 'none';
  document.getElementById('beaches').style.display = 'none';
}
