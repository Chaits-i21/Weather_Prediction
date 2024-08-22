// Function to display selected city's data for a specific date
function displayData() {
    let selectedCity = document.getElementById("cities").value;
    let selectedDate = document.getElementById("date").value;

    fetch(`${selectedCity}_temp.csv`) // Load temperature CSV based on selected city
        .then(response => response.text())
        .then(tempData => {
            console.log("Temperature Data for " + selectedCity + ":", tempData); // Log the fetched temperature data

            fetch(`${selectedCity}_precipitation.csv`) // Load precipitation CSV based on selected city
                .then(response => response.text())
                .then(precipitationData => {
                    console.log("Precipitation Data for " + selectedCity + ":", precipitationData); // Log the fetched precipitation data

                    let tempRows = tempData.split('\n');
                    let tempHeaders = tempRows[0].split(',');
                    let tempDateIndex = tempHeaders.indexOf('ds');
                    let tempIndex = tempHeaders.indexOf('yhat1');

                    let precipitationRows = precipitationData.split('\n');
                    let precipitationHeaders = precipitationRows[0].split(',');
                    let precipitationDateIndex = precipitationHeaders.indexOf('ds');
                    let precipitationIndex = precipitationHeaders.indexOf('yhat1');

                    let tempCityData = tempRows
                        .map(row => row.split(','))
                        .filter(row => row.length > 1 && row[tempIndex].trim() !== "" && row[tempDateIndex].trim() !== "ds") // Filter out header row and empty/incomplete rows

                    let precipitationCityData = precipitationRows
                        .map(row => row.split(','))
                        .filter(row => row.length > 1 && row[precipitationIndex].trim() !== "" && row[precipitationDateIndex].trim() !== "ds") // Filter out header row and empty/incomplete rows

                    let weatherDataDiv = document.getElementById("weatherData");
                    weatherDataDiv.innerHTML = ""; // Clear previous data

                    if (tempCityData.length > 0 && precipitationCityData.length > 0) 
                    {
                        let weatherHtml = `
                            <h3>${selectedCity} Weather Data for ${selectedDate}</h3>
                            <table>
                                <tr>
                                    <th>Date</th>
                                    <th>Temperature (C)  </th>
                                    <th>Precipitation (mm)</th>
                                </tr>
                        `;

                        let filteredTempData = tempCityData.find(row => row[tempDateIndex] === selectedDate);
                        let filteredPrecipitationData = precipitationCityData.find(row => row[precipitationDateIndex] === selectedDate);

                        if (filteredTempData && filteredPrecipitationData) {
                            weatherHtml += `
                                <tr>
                                    <td>${filteredTempData[tempDateIndex]}</td>
                                    <td>${filteredTempData[tempIndex]} </td>
                                    <td>${filteredPrecipitationData[precipitationIndex]} mm</td>
                                </tr>
                            `;
                        } else {
                            weatherHtml += `
                                <tr>
                                    <td colspan="3">Data not found for ${selectedCity} on ${selectedDate}</td>
                                </tr>
                            `;
                        }

                        weatherHtml += `</table>`;
                        weatherDataDiv.innerHTML = weatherHtml;
                    } else {
                        weatherDataDiv.innerHTML = "<p>Data not found for selected city.</p>";
                    }
                })
                .catch(error => {
                    console.error('Error fetching precipitation data:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching temperature data:', error);
        });
}

// Call the populateCities function when the page loads
window.onload = populateCities;
