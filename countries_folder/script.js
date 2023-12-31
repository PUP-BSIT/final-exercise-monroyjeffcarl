function searchCountry() {
  const input = document.getElementById("search_input").value;

  fetchCountryDetails(input)
    .then((data) => {
      const country = data[0];
      const region = country.region;

      const countryDetailsElement = document.getElementById("country_details");
      countryDetailsElement.innerHTML = `
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Region: ${region}</p>
                <p>Population: ${country.population}</p>
                <p>Area: ${country.area} sq km</p>
                <p>Languages: ${Object.values(country.languages).join(", ")}</p>
            `;

      return fetchOtherCountriesInRegion(region);
    })
    .then((sameRegion) => {
      const sameRegionElement = document.getElementById("same_region");
      sameRegionElement.innerHTML = `<h3>Other countries in the ${region} region:</h3>`;
      sameRegion.forEach((country) => {
        sameRegionElement.innerHTML += `<p>${country.name.common}</p>`;
      });
    })
    .catch((error) => {
      alert("Invalid country. Please enter the valid name of a country.");
      console.error("Error fetching data:", error);
    });
}

function fetchCountryDetails(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(
    (response) => {
      if (response.status === 404) {
        throw new Error("Country not found");
      }
      return response.json();
    }
  );
}

function fetchOtherCountriesInRegion(region) {
  return fetch(`https://restcountries.com/v3.1/region/${region}`).then(
    (response) => response.json()
  );
}
