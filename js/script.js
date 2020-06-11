// ================= Global ========================
var openHours = ['6am: ', '7am: ', '8am: ', '9am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: '];
var locationUls = ['seattle-ul', 'tokyo-ul', 'dubai-ul', 'paris-ul', 'lima-ul'];

// ================= Random Number Generator ============

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function calculateCustomersOnce() {
  // this function generates a random number between the min and max values in the object
  var customers = randomNumber(this.minNumCustomers, this.maxNumCustomers);
  return customers;
}

function calculateCookiesAllHours() {
  // this function will calculate the cookies for the whole day
  for (var i = 0; i < openHours.length; i++) {
    var cookies = Math.ceil(this.calculateCustomersOnce() * this.avgNumCookies);
    // console.log(cookies);
    this.hourlySales.push(cookies); //this stores cookies into end of array
    this.dailySales += cookies; // this adds each days cookies to the one before it
  }
}

function renderToPage() {
  // this function will use a loop to reference for the getElementById
  // need to render to page by referencing the ul the store belongs to
  var storeList = document.getElementById(this.id + '-ul');
  var storeStats = document.createElement('h2');
  storeStats.textContent = this.location;
  storeList.appendChild(storeStats);
  for (var j = 0; j < openHours.length; j++) {
    storeStats = document.createElement('li');
    storeStats.textContent = openHours[j] + ' ' + this.hourlySales[j] + ' cookies';
    storeList.appendChild(storeStats);
  }
  var newListItem = document.createElement('li');
  newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
  storeList.appendChild(newListItem);
}
// ================ Store Details ================

var seattle = {
  id: 'seattle',
  location: 'Seattle',
  minNumCustomers: 23,
  maxNumCustomers: 65,
  avgNumCookies: 6.3,
  hourlySales: [], // this will be assigned the sales numbers calculated
  dailySales: 0, // will be the sum of hourly sales in one day
  calculateCustomersOnce: calculateCustomersOnce,
  calculateCookiesAllHours: calculateCookiesAllHours,
  renderToPage: renderToPage
  // This function will render to the page the store list
  /*  renderToPage : function(){
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
        // console.log(this.calculateEachHourCookieSales);
        storeList.appendChild(storeStats);
      }
      var newListItem = document.createElement('li');
      newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
      storeList.appendChild(newListItem);
    }*/
};

seattle.calculateCustomersOnce();
seattle.calculateCookiesAllHours();
seattle.renderToPage();

var tokyo = {
  id: 'tokyo',
  location: 'Tokyo',
  minNumCustomers: 3,
  maxNumCustomers: 24,
  avgNumCookies: 1.2,
  hourlySales: [],
  dailySales: 0,
  calculateCustomersOnce: calculateCustomersOnce,
  calculateCookiesAllHours: calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage: function () {
    // 1. target
    var storeList = document.getElementById('tokyo-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++) {
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' ' + this.hourlySales[i] + ' cookies';
      storeList.appendChild(storeStats);
    }
    var newListItem = document.createElement('li');
    newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
    storeList.appendChild(newListItem);
  }
};
tokyo.calculateCustomersOnce();
tokyo.calculateCookiesAllHours();
tokyo.renderToPage();

var dubai = {
  id: 'dubai',
  location: 'Dubai',
  minNumCustomers: 11,
  maxNumCustomers: 38,
  avgNumCookies: 3.7,
  hourlySales: [],
  dailySales: 0,
  calculateCustomersOnce: calculateCustomersOnce,
  calculateCookiesAllHours: calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage: function () {
    // 1. target
    var storeList = document.getElementById('dubai-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++) {
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' ' + this.hourlySales[i] + ' cookies';
      storeList.appendChild(storeStats);
    }
    var newListItem = document.createElement('li');
    newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
    storeList.appendChild(newListItem);
  }
};
dubai.calculateCustomersOnce();
dubai.calculateCookiesAllHours();
dubai.renderToPage();

// =================

var paris = {
  id: 'paris',
  location: 'Paris',
  minNumCustomers: 20,
  maxNumCustomers: 38,
  avgNumCookies: 2.3,
  hourlySales: [],
  dailySales: 0,
  calculateCustomersOnce: calculateCustomersOnce,
  calculateCookiesAllHours: calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage: function () {
    // 1. target
    var storeList = document.getElementById('paris-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++) {
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' ' + this.hourlySales[i] + ' cookies';
      storeList.appendChild(storeStats);
    }
    var newListItem = document.createElement('li');
    newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
    storeList.appendChild(newListItem);
  }
};
paris.calculateCustomersOnce();
paris.calculateCookiesAllHours();
paris.renderToPage();

var lima = {
  id: 'lima',
  location: 'Lima',
  minNumCustomers: 2,
  maxNumCustomers: 16,
  avgNumCookies: 4.6,
  hourlySales: [],
  dailySales: 0,
  calculateCustomersOnce: calculateCustomersOnce,
  calculateCookiesAllHours: calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage: function () {
    // 1. target
    var storeList = document.getElementById('lima-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++) {
      storeStats = document.createElement('li');
      storeStats.textContent = openHours[i] + ' ' + this.hourlySales[i] + ' cookies';
      storeList.appendChild(storeStats);
    }
    var newListItem = document.createElement('li');
    newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
    storeList.appendChild(newListItem);
  }
};
lima.calculateCustomersOnce();
lima.calculateCookiesAllHours();
lima.renderToPage();

