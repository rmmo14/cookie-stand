// ================= Global ========================
var openHours = ['6am: ', '7am: ', '8am: ', '9am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: '];

// ================= Random Number Generator ============

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*((max + 1) - min) + min);
}
// ================ Store Details ================

var seattle = {
  location : 'Seattle',
  minNumCustomers : 23,
  maxNumCustomers : 65,
  avgNumCookies : 6.3,
  hourlySales : [], // this will be assigned the sales numbers calculated
  dailySales : 0, // will be the sum of hourly sales in one day
  calculateCustomersOnce : function(){
    // this function generates a random number between the min and max values in the object
    var customers = randomNumber(this.minNumCustomers,this.maxNumCustomers);
    return customers;
  },
  calculateCookiesAllHours : function(){
    // this function will calculate the cookies for the whole day
    for (var i = 0; i < openHours.length; i++) {
      var cookies = Math.ceil(this.calculateCustomersOnce()*this.avgNumCookies);
      console.log(cookies);
      this.hourlySales.push(cookies); //this stores cookies into end of array
    }
  },
  // This function will render to the page the store list
  renderToPage : function(){
    // 1. target
    var storeList = document.getElementById('seattle-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++){
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' ' + this.hourlySales[i] + ' cookies';
      console.log(this.calculateEachHourCookieSales);
      storeList.appendChild(storeStats);
    }
  }
};


console.log('hourlySales', seattle.hourlySales);
seattle.calculateCustomersOnce();
seattle.calculateCookiesAllHours();
seattle.renderToPage();