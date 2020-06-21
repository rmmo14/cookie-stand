// ================= Global ========================
var openHours = ['6am ', '7am ', '8am ', '9am ', '10am ', '11am ', '12pm ', '1pm ', '2pm ', '3pm ', '4pm ', '5pm ', '6pm ', '7pm '];
var theBranches = [];

// ================= Random Number Generator ============

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}
// ============== forms =========
var dataInput = document.getElementById('datainput');

dataInput.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(e);
  var theEvent = e;
  var theForm = theEvent.target;
  // console.log(theForm)

  var branchId = theForm.storeID;
  console.log(branchId);

  var branchName = branchId.value;
  console.log(branchName);


  var branch = e.target.storeID.value;
  var name = e.target.store.value;
  var min = e.target.min.value;
  var max = e.target.max.value;
  var avg = e.target.avg.value;

  var newStore = new SalmonBranch(branch, name, min, max, avg);
  newStore.calculateCookiesAllHours();
  newStore.calculateCustomersOnce();
  refreshTable();
});

// RECEIVED HELP ON THIS FUNCTION FROM SKYLER TA
function refreshTable(){
  // flush/clear the table
  var getTable = document.getElementById('branches');
  getTable.innerHTML = '';
  // this (above) makes the html inside the table be an empty string

  // recreate theader
  renderTableHeader();
  // recreate body
  for (var i = 0; i < theBranches.length; i++){
    theBranches[i].renderData();
  }
  // recreate footer
  renderTableFooter();
}

var createButton = document.getElementById('populate');

createButton.addEventListener('submit', function(e){
  e.preventDefault();
  console.log('populated', e);
});

// ======= other functions ============
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
    this.dailySales += cookies; // this adds each hours cookies to the one before it
  }
}
// renderToPage is not being called atm
// function renderToPage() {
//   // need to render to page by referencing the ul the store belongs to
//   var storeList = document.getElementById(this.id + '-ul');
//   var storeStats = document.createElement('h2');
//   storeStats.textContent = this.location;
//   storeList.appendChild(storeStats);
//   for (var j = 0; j < openHours.length; j++) {
//     storeStats = document.createElement('li');
//     storeStats.textContent = openHours[j] + ' ' + this.hourlySales[j] + ' cookies';
//     storeList.appendChild(storeStats);
//   }
//   var newListItem = document.createElement('li');
//   newListItem.textContent = 'Total: ' + this.dailySales + ' cookies';
//   storeList.appendChild(newListItem);
// }

// ============= table ================

function renderTableHeader() {
  var getTable = document.getElementById('branches'); // this goes to the table with id 'branches'
  var newParent = document.createElement('tr'); //this creates a table row in table
  var newChild = document.createElement('th'); //this creates a table heading in tr in the table
  newChild.textContent = 'Branches'; //this adds the first column first row
  newParent.appendChild(newChild);

  //The for loop will create the remaining headings for first row (newParent)
  for (var i = 0; i < openHours.length; i++) {
    // this loop will populate the hours open into the same row as above after 'Branches' one after the other
    var hoursRow = document.createElement('th');
    hoursRow.textContent = openHours[i];
    newParent.appendChild(hoursRow);
    // since the parent is the tr, need to append its child (th) to the parent (tr)
  }

  // this code below will create a table header saying Total
  var totalRow = document.createElement('th');
  totalRow.textContent = 'Day Total ';
  newParent.appendChild(totalRow);
  getTable.appendChild(newParent);
}
renderTableHeader(); // takes care of initial page load

// ========= function to populate the rest (body) ====
function renderData() {
  // 1. This grabs the table called 'branches'
  var getTable = document.getElementById('branches');
  // 2. creates a table row
  var otherParent = document.createElement('tr');
  // 2...creates the headings for this row (bolded?)
  var otherChild = document.createElement('th');
  // 2.5 adds the location name (capital letter)
  otherChild.textContent = this.location;
  // 3. appends this heading with text onto the initial
  otherParent.appendChild(otherChild);
  // the for-loop, within the parent of a 'tr' create multiple cells (td) equal to number of hours open/sell
  var totalBranch = 0;
  for (var i = 0; i < this.hourlySales.length; i++) {
    otherChild = document.createElement('td');
    // this places the number of cookies sold in each hour to a cell
    otherChild.textContent = this.hourlySales[i];
    otherParent.appendChild(otherChild);
    totalBranch += this.hourlySales[i];
  }
  var newChild = document.createElement('td');
  newChild.textContent = totalBranch;
  otherParent.appendChild(newChild);
  // this appends the table rows onto the table 'branches'
  getTable.appendChild(otherParent);
}

// =========== Table footer =============
function renderTableFooter (){
  var getTable = document.getElementById('branches');
  var newParent = document.createElement('tr');
  var newChild = document.createElement('th');
  newChild.textContent = 'Hourly Total ';
  newParent.appendChild(newChild);

  for (var i = 0; i < openHours.length; i++){
    var allSales = 0;
    var otherChild = document.createElement('td');

    for (var j = 0; j < theBranches.length; j++){
      allSales += theBranches[j].hourlySales[i];
    }
    otherChild.textContent = allSales;
    newParent.appendChild(otherChild);
  }
  // the last column last row should be the total sold
  var otroChild = document.createElement('td');
  var colTotal = 0;
  for (var k = 0; k < theBranches.length; k++){
    colTotal += theBranches[k].dailySales;
  }
  otroChild.textContent = colTotal;
  newParent.appendChild(otroChild);
  getTable.appendChild(newParent);
}
// ================ Store Details ================

// this function constructor will create a new var (when called) that will take in the following parameters the user inputs to
function SalmonBranch(id, location, minNumCustomers, maxNumCustomers, avgNumCookies) {
  this.id = id;
  this.location = location;
  this.minNumCustomers = minNumCustomers;
  this.maxNumCustomers = maxNumCustomers;
  this.avgNumCookies = avgNumCookies;
  this.hourlySales = [];
  this.dailySales = 0;
  theBranches.push(this);
}

SalmonBranch.prototype.calculateCustomersOnce = calculateCustomersOnce;
SalmonBranch.prototype.calculateCookiesAllHours = calculateCookiesAllHours;
// SalmonBranch.prototype.renderToPage = renderToPage;
SalmonBranch.prototype.renderData = renderData;

// ======= declare new branches ======

new SalmonBranch('seattle', 'Seattle', 23, 65, 6.3);
new SalmonBranch('tokyo', 'Tokyo', 3, 24, 1.2);
new SalmonBranch('dubai', 'Dubai', 11, 38, 3.7);
new SalmonBranch('paris', 'Paris', 20, 38, 2.3);
new SalmonBranch('lima', 'Lima', 2, 16, 4.6);

for (var i = 0; i < theBranches.length; i++){
  theBranches[i].calculateCustomersOnce();
  theBranches[i].calculateCookiesAllHours();
  theBranches[i].renderData();
}
renderTableFooter();


// ================= dont need these below since they are repeated and can make them dynamic as shown above
// seattle.calculateCustomersOnce();
// seattle.calculateCookiesAllHours();
// //seattle.renderToPage();
// seattle.renderData();



// tokyo.calculateCustomersOnce();
// tokyo.calculateCookiesAllHours();
// //tokyo.renderToPage();
// tokyo.renderData();



// dubai.calculateCustomersOnce();
// dubai.calculateCookiesAllHours();
// //dubai.renderToPage();
// dubai.renderData();



// paris.calculateCustomersOnce();
// paris.calculateCookiesAllHours();
// //paris.renderToPage();
// paris.renderData();


// lima.calculateCustomersOnce();
// lima.calculateCookiesAllHours();
// //lima.renderToPage();
// lima.renderData();




/*   ========== ALL OF THIS BELOW WAS CONDENSED TO THE LINES ABOVE (new branches)! ===========
var seattle = {
  id : 'seattle',
  location : 'Seattle',
  minNumCustomers : 23,
  maxNumCustomers : 65,
  avgNumCookies : 6.3,
  hourlySales : [], // this will be assigned the sales numbers calculated
  dailySales : 0, // will be the sum of hourly sales in one day
  calculateCustomersOnce : calculateCustomersOnce,
  calculateCookiesAllHours : calculateCookiesAllHours,
  renderToPage : renderToPage
};

seattle.calculateCustomersOnce();
seattle.calculateCookiesAllHours();
seattle.renderToPage();

var tokyo = {
  id : 'tokyo',
  location : 'Tokyo',
  minNumCustomers : 3,
  maxNumCustomers : 24,
  avgNumCookies : 1.2,
  hourlySales : [],
  dailySales : 0,
  calculateCustomersOnce : calculateCustomersOnce,
  calculateCookiesAllHours : calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage : function(){
    // 1. target
    var storeList = document.getElementById('tokyo-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++){
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
  id : 'dubai',
  location : 'Dubai',
  minNumCustomers : 11,
  maxNumCustomers : 38,
  avgNumCookies : 3.7,
  hourlySales : [],
  dailySales : 0,
  calculateCustomersOnce : calculateCustomersOnce,
  calculateCookiesAllHours : calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage : function(){
    // 1. target
    var storeList = document.getElementById('dubai-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++){
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
  id : 'paris',
  location : 'Paris',
  minNumCustomers : 20,
  maxNumCustomers : 38,
  avgNumCookies : 2.3,
  hourlySales : [],
  dailySales : 0,
  calculateCustomersOnce : calculateCustomersOnce,
  calculateCookiesAllHours : calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage : function(){
    // 1. target
    var storeList = document.getElementById('paris-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++){
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
  id : 'lima',
  location : 'Lima',
  minNumCustomers : 2,
  maxNumCustomers : 16,
  avgNumCookies : 4.6,
  hourlySales : [],
  dailySales : 0,
  calculateCustomersOnce : calculateCustomersOnce,
  calculateCookiesAllHours : calculateCookiesAllHours,
  // This function will render to the page the store list
  renderToPage : function(){
    // 1. target
    var storeList = document.getElementById('lima-ul');
    // 2. new element
    var storeStats = document.createElement('h2');
    // 2.5 add content
    storeStats.textContent = this.location;
    // 3. put it on the page
    storeList.appendChild(storeStats);

    for (var i = 0; i < openHours.length; i++){
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
*/
