let gdp_data, gdp_pc_data, labor_data, literacy_data, rural_data
let selectedCountry, selectedGdpPcCountry, laborCountry
let barGraph, lineGraph, lineAreaGraph, pieGraph
const GDP_DATA_INDEX = 0
const GDP_PER_CAPITA_INDEX = 1

$(document).ready(init);

function init() {
  const url = 'http://127.0.0.1:5000/api/gdp'
  fetch(url)
    .then(res => res.json())
    .then(data => {
      gdp_data = data
      initCountries()
      initCharts()
      createSelectOptions()
    })
  const url1 = 'http://127.0.0.1:5000/api/gdp_pc'
  fetch(url1)
    .then(res => res.json())
    .then(data => {
      gdp_pc_data = data
      initCountries()
      initCharts()
      createSelectOptions()
    })
  const url2 = 'http://127.0.0.1:5000/api/labor_force'
  fetch(url2)
    .then(res => res.json())
    .then(data => {
      labor_data = data
      initCountries()
      initCharts()
      createSelectOptions()
    })
  const url3 = 'http://127.0.0.1:5000/api/literacy_rate'
  fetch(url3)
    .then(res => res.json())
    .then(data => {
      literacy_data = data
      initCountries()
      initCharts()
      createSelectOptions()
    })
  const url4 = 'http://127.0.0.1:5000/api/rural_population'
  fetch(url4)
    .then(res => res.json())
    .then(data => {
      rural_data = data
      initCountries()
      initCharts()
      createSelectOptions()
    })
}


function initCountries() {
  selectedCountry = gdp_data[0]
  selectedGdpPcCountry = gdp_pc_data[0]
  laborCountry = labor_data[0]
  literacyCountry = literacy_data[0]
  ruralCountry = rural_data[0]
}

function onCountryChange(iso_code) {
  updateCountries(iso_code)
  updateCharts()
}

function updateCountries(iso_code) {
  selectedCountry = gdp_data.find(row => row.iso_code === iso_code)
  selectedGdpPcCountry = gdp_pc_data.find(row => row.iso_code === iso_code)
  laborCountry = labor_data.find(row => row.iso_code === iso_code)
  literacyCountry = literacy_data.find(row => row.iso_code === iso_code)
  ruralCountry = rural_data.find(row => row.iso_code === iso_code)

}


function updateCharts() {
  lineAreaGraph.data.labels = getGdpYears()
  lineAreaGraph.data.datasets[GDP_DATA_INDEX].data = getGDP()
  lineAreaGraph.data.datasets[GDP_PER_CAPITA_INDEX].data = getGdpPerCapita()
  lineAreaGraph.options.title.text = `GDP and GDP per capita for ${selectedCountry.country}`
  lineGraph.data.datasets[GDP_DATA_INDEX].data = getLiteracy()
  barGraph.data.datasets[GDP_DATA_INDEX].data = getRural()
  barGraph.data.datasets[GDP_PER_CAPITA_INDEX].data = getUrban()
  pieGraph.data.datasets[GDP_DATA_INDEX].data = [100-laborCountry[2018], laborCountry[2018]]
  lineAreaGraph.update()
  lineGraph.update()
  barGraph.update()
  pieGraph.update()
}

function initCharts() {
  barGraph = new Chart(document.getElementById("barGraph"), {
    type: 'bar',
    data: {
      labels: getGdpYears(),
      datasets: [
        {
          label: "Rural Population",
          backgroundColor: "#7FE1DF",
          data: getRural(),
        }, {
          label: "Urban Population",
          backgroundColor: "#E19852",
          data: getUrban()
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Urban vs. Rural Population'
      },
      scales: {
        yAxes: [
          {
            ticks: {beginAtZero:true,max:100},
            scaleLabel: {
              display: true,
              labelString: "Percentage of Total"
          }
          }
        ]
      }
    }
  });



  lineGraph = new Chart(document.getElementById("lineGraph"), {
    type: 'line',
    data: {
      labels: getGdpYears(),
      datasets: [{
        data: getLiteracy(),
        label: "Literacy Rate (%)",
        borderColor: "#1EE17C",
        fill: false
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Literacy Rate as a Percentage of Total Population'
      }
    }
  });

  lineAreaGraph = new Chart(document.getElementById("lineAreaGraph"), {
    type: 'bar',
    data: {
      labels: getGdpYears(),
      datasets: [
        {
          label: selectedCountry.country,
          type: "line",
          borderColor: "#E11208",
          yAxisID: "y-axis-1",
          data: getGdpPerCapita(),
          fill: false,
          
        },
        {
          label: selectedCountry.country,
          type: "bar",
          borderColor: "#6B8E23",
          backgroundColor: "#6B8E23",
          yAxisID: "y-axis-0",
          data: getGDP(),
          fill: false,
          
          
        }
       

      ]
    },
    options: {
      title: {
        display: true,
        text: `GDP and GDP per capita for ${selectedCountry.country}`
      },
      legend: { display: false },
      scales: {
        yAxes: [{
          position: "left",
          id: "y-axis-0",
          scaleLabel: {
            display: true,
            labelString: "GDP (in $ millions)"
        }
        }, {
          position: "right",
          id: "y-axis-1",
          scaleLabel: {
            display: true,
            labelString: "GDP per Capita"
        }
        }]
      }
    }
  });

  pieGraph = new Chart(document.getElementById("pieGraph"), {
    type: 'pie',
    data: {
      labels: ["Men", "Women"],
      datasets: [{
        label: "Labor Force (%)",
        backgroundColor: ["#C2E1B8", "#E1D04D"],
        data: [100-laborCountry[2018], laborCountry[2018]]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Labor Force Gender Distribution'
      }
    }
  });
}

/*
	1. Grab the select tag with JavaScript(jQuery)
    2. Loop through all the countries
    3. Create an option tag for each country
    4. Add option to the select tag
*/
function createSelectOptions() {
  //   1. Grab the select tag with JavaScript(jQuery)
  let selectTag = $('#selDataset')
  //   2. Loop through all the countries
  gdp_data.forEach(function (row) {
    //  3. Create an option tag for each country
    $('#selDataset').append($('<option>', {
      value: row.iso_code,
      text: row.country
    }));
  });
}


function getGdpYears() {
  let selectedCountry = gdp_data[0]
  let keys = Object.keys(selectedCountry)

  // tries to convert key into a number
  // if it is a number, then it is a valid year
  // add year to the final array
  // will remove iso_code and country keys
  let years = keys.filter(key => parseInt(key))
  return years
}


function getGDP() {
  let gdpValues = getGdpYears().map(year => selectedCountry[year] / 1000000)
  return gdpValues
}

function getGdpPerCapita() {
  let gdpPCValues = getGdpYears().map(year => selectedGdpPcCountry[year])
  return gdpPCValues
}

function getLiteracy() {
  let literacyValues = getGdpYears().map(year => literacyCountry[year])
  return literacyValues
}

function getRural() {
  let ruralValues = getGdpYears().map(year => ruralCountry[year])
  return ruralValues
}
function getUrban() {
  let urbanValues = getGdpYears().map(year => 100 - ruralCountry[year])
  return urbanValues
}

function getLabor() {
  let laborValues = getGdpYears(2018).map(year => laborCountry[year])
  return laborValues
}




