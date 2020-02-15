// select all the DOM nodes we need to interact with
const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionaireesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

// initialize an array we we are going to store the people, giving it names and money information
let data = [];

// create 3 random users
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money using async/await
async function getRandomUser() {
  // randomuser api gives us a results array with a bunch of user fields, we'll just use the name
  // for comparison of async/await and promises,  see https://levelup.gitconnected.com/async-await-vs-promises-4fe98d11038f
  
    // usually we'd chain promises onto the fetch like:
    // fetch('https://randomuser.me/api')
    // .then(res => res.json())
    // .then( data => console.log(data));
    // instead, we are going to mark the function as asynchronous by typing async in front of it
    // then we can put the result of the fetch into a variable
    // instead we'll do it this way with the async
    // fetch is awaiting the promise from the function
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);

    // get the first result in the array returned and assign it to user
    const user = data.results[0];

    // each call to the function will add a new user object pulling in the name from the fetch call
    // and using math floor and math random to generate a random number, up to a million
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    }

    // console.log(newUser);

    // now we are taking the user object and passing to a addData function
    addData(newUser);
}

// function to double the money for each person
// function takes the data and uses map to return a new array where money is multiplied by 2
// and user is just copied from original array (data)
// map loops through and array and runs a function on each item and returns a new array
// spread operator (...user), returns what is already there
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// sorts user by most money
function sortByRichest() {
  // a and b are objects, so we neeed the money property attached
  // subtracting a from b because we want it to be in descending order
  data.sort((a, b) => b.money -  a.money);

  updateDOM();
}

// function to filter for only the millionaires
// take the user object and return if the users money property is greater than a million
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// function to add all the users wealth together
function calculateWealth() {
  // start accumulator at 0,  and add current users money to it each time through the loop
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  // create the area on the page to insert the wealth information
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth:  <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new user object to the data array and update it in the DOM
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update the DOM
// using a default value (data) if nothing is passed into the function
function  updateDOM(providedData = data) {
  // Clear main div of previous entries
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // forEach is an ES6 thing which is much easier than a standard for loop
  // forEach takes a function
  // we are only using the first index (item), but forEach can also take in the index as second param, entire array as 3rd param 
  providedData.forEach( item => {
    // for each person (item), create a div and assign to variable called element
    const element = document.createElement('div');
    // add a class of 'person' to the div
    element.classList.add('person');
    // add the html inside the div including the person's name and money
    // money is sent to the formatMoney function to be formatted
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    // add the data to the content area
    main.appendChild(element);
  });
}

// Format number as money
// format regex courtesy of https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaireesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


// *******************************
// .map() information:
// map() creates a new array populated with the results of the function called on every item of the called array
// a new array is returned from the map
// index and array can be added as second and third parameters to map()

// const arr = [1, 2, 3, 4, 5];
// const arr2 = arr.map( item => `Number: ${item}`;

// result: ['Number: 1', 'Number: 2','Number: 3','Number: 4','Number: 5',]

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// *********************************



// *******************************
// .sort() information:
// sort() sorts the elements of an array and returns the sorted array
// default sort order is ascending, after converting to strings

// const arr = [1, 2, 110, 3, 4, 330]
// const sortedArr = arr.sort();
// console.log(sortedArr)

// result: [1, 110, 2, 3, 330, 4]
// this is because the numbers have been turned into strings

// to sort numbers, you need to use a compareFuntion
// const sortedArr = arr.sort(function(a, b) => a - b);
// console.log(sortedArr)

// result: [1, 2, 3, 4, 110, 330]
// if we wanted descending order, we'd do b -  a.

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// *********************************



// *******************************
// .filter() information:
// const arr = [20, 23, 25, 30, 21, 50, 60];
// const under30 = arr.filter(function() {
// return item < 30; 
// });
// console.log(under30);

// result: [20, 23, 25, 21]

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// *********************************



// *******************************
// .reduce() information:
// reducer() executes a reducer function on each element of the array, resulting in a single output value
// accumulator is like a running total and number is the value of the current item, 0 is the starting number
// const arr = [1, 2, 3, 4, 5];
// const total = arr.reduce((accumulator, number) => (accumulator + number), 0);
// console.log(total);

// result: 15

// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// *********************************
