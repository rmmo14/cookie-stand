// ================= Global ========================
var openHours = ['6am: ', '7am: ', '8am: ', '9am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: '];
// ================= Random Number Generator ============
function randomNumber(min, max) {
  return Math.floor(Math.random()*((max + 1) - min) + min);
}

function hourlyService(seattle) {
  for (var i = 0; i < openHours; i++){
    var footTraffic = randomNumber(seattle.min, seattle.max);
    var hourlyTotalSales = Math.round(footTraffic*seattle.avg);
    seattle.hourlySales.push(hourlyTotalSales);
    seattle.dailySales += hourlyTotalSales;
  }
  console.log(footTraffic);
}

// ================= Seattle ===============

var seattle = {
  location : 'Seattle',
  min : 23,
  max : 64,
  avg : 64,
  hourlySales : [], // this will be assigned the sales numbers calculated
  dailySales : 0, // will be the sum of hourly sales in one day

  // This function will render to the page the store list
  renderToPage : function () {
    // 1. target
    var storeList = document.getElementById('seattle-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours; i++){
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' : ' + this.hourlySales + ' cookies';
      console.log(this.calculateEachHourCookieSales);
      storeList.appendChild(storeStats);
    }

    storeStats = document.createElement('li');
    storeStats.textContent = 'Total: ' + this.dailySales + ' cookies';
    storeList.appendChild(storeStats);
  }
};

console.log('hourlySales', seattle.hourlySales);
hourlyService(seattle);
seattle.renderToPage();
