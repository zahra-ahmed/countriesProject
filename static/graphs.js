let selectedCountry, selectedGdpPcCountry
let barGraph, lineGraph, lineAreaGraph, pieGraph

$(document).ready(init);

function fetchData() {
  const url = 'http://127.0.0.1:5000/api/gdp'
//   d3.json(url).then(data => {
//   console.log(data);
// });
console.log(d3)
}


function init() {
  initCountries()
  initCharts()
  createSelectOptions()
  fetchData()
}

function initCountries() {
  selectedCountry = gdp_data[0]
  selectedGdpPcCountry = gdp_ppp_data[0]
}

function onCountryChange(iso_code) {
updateCountries() 
updateCharts()
}

function updateCountries() {
  selectedCountry = gdp_data.find(row => row.iso_code === iso_code)
  selectedGdpPcCountry = gdp_ppp_data.find(row => row.iso_code === iso_code)
}

function updateCharts() {
  lineAreaGraph.data.labels = getGdpYears()
  lineAreaGraph.data.datasets[0].data = getGDP()
  lineAreaGraph.data.datasets[1].data = getGdpPerCapita()
  lineAreaGraph.options.title.text = `GDP and GDP per capita for ${selectedCountry.country}`
  lineAreaGraph.update()
}

function initCharts() {
  barGraph = new Chart(document.getElementById("barGraph"), {
    type: 'bar',
    data: {
      labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
      datasets: [
        {
          label: "Rural Population",
          backgroundColor: "#3e95cd",
          data: [133, 221, 783, 2478, 133, 221, 783, 2478, 133, 221, 783, 2478, 133, 221, 783, 2478, 133, 221]
        }, {
          label: "Urban Population",
          backgroundColor: "#8e5ea2",
          data: [408, 547, 675, 734, 133, 221, 783, 2478, 133, 221, 783, 2478, 133, 221, 133, 221, 783, 2478]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Urban vs. Rural Population'
      }
    }
  });



  lineGraph = new Chart(document.getElementById("lineGraph"), {
    type: 'line',
    data: {
      labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
      datasets: [{
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478, 86, 114, 106, 106, 107, 111, 133, 221],
        label: "Literacy Rate (%)",
        borderColor: "#3e95cd",
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
        type: "bar",
        borderColor: "#8e5ea2",
        data: getGDP(),
        fill: false
      },
        {
        label: selectedCountry.country,
        type: "line",
        borderColor: "#8e5ea2",
        data: getGdpPerCapita(),
        fill: false
      }
      
      ]
    },
    options: {
      title: {
        display: true,
        text: `GDP and GDP per capita for ${selectedCountry.country}`
      },
      legend: { display: false }
    }
  });

  pieGraph = new Chart(document.getElementById("pieGraph"), {
    type: 'pie',
    data: {
      labels: ["Men", "Women"],
      datasets: [{
        label: "Labor Force (%)",
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
        data: [60, 40]
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
  let gdpValues = getGdpYears().map(year => selectedCountry[year]/10000000)
  return gdpValues
}

function getGdpPerCapita() {
  let gdpPCValues = getGdpYears().map(year => selectedGdpPcCountry[year])
  return gdpPCValues
}


