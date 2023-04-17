'use strict';
const bookings = [];
const createBooking = function(flightNum, numPassenger = 1, price = 199 * numPassenger) {
	// ES5 (old way)
	// numPassenger = numPassenger || 1;
	// price = price || 199;

	const booking = {
		flightNum,
		numPassenger,
		price
	};
	console.log(booking);
	bookings.push(booking);
};

createBooking('LM123');
createBooking('LM123', 2, 800);
createBooking('LM123', 4);
createBooking('LM123', undefined);

const flight = 'LM234';
const vanja = {
	name: 'Vanja Martinovic',
	passport: 3424534535
};

const checkIn = function(flightNum, passenger) {
	flightNum = 'LH999';
	passenger.name = 'Mr.' + passenger.name;

	if (passenger.passport === 3424534535) {
		alert('Checked in');
	} else {
		alert('Wrong passport');
	}
};

// checkIn(flight, vanja);
// console.log(flight, vanja);

const newPassport = function(person) {
	person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(vanja);
// checkIn(flight, vanja);
console.log(vanja);

// Higher-order functions (accept callback functions)
// Creating abstraction

const oneWord = function(str) {
	return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function(str) {
	const [ first, ...otherWords ] = str.split(' ');
	return [ first.toUpperCase(), ...otherWords ].join(' ');
};

// Higher order function
const transformer = function(str, fn) {
	console.log(`Original string: ${str}`);
	console.log(`Transformed string: ${fn(str)}`);

	console.log(`Transformed by: ${fn.name}`);
};
transformer('Javascript is the best', upperFirstWord);
console.log('-----------------------');
transformer('Javascript is the best', oneWord);

const calculate = function(num1, num2) {
	console.log(num1 * num2 / 2);
};

const total = function(num1, num2, fn) {
	fn(num1, num2);
};

total(500, 200, calculate);

// Functions that return functions
console.log('------Functions that returns new functions');

const greet = function(greeting) {
	return function(name) {
		console.log(`${greeting}, ${name}`);
	};
};

const greeter = greet('Hey');
greeter('Vanja');
greet('Hello')('Vanja');

// Rewrite function using arrow function syntax
const arrowGreet = (greeting) => (name) => {
	console.log(`${greeting}, ${name}`);
};
arrowGreet('Hi')('Vanja');

// Call and Apply methods
console.log('--------Call and Apply methods----------');
const lufthansa = {
	airline: 'Lufthansa',
	iataCode: 'LH',
	bookings: [],
	book(flightNum, name) {
		console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
	}
};

lufthansa.book(239, 'Vanja');
lufthansa.book(635, 'John Wick');
console.log(lufthansa);

const eurowings = {
	airline: 'Eurowings',
	iataCode: 'EW',
	bookings: []
};

// Call method
const book = lufthansa.book;
// Does not work
// book(23, 'Elliot Jay');
book.call(eurowings, 23, 'Jake Paul');
console.log(eurowings);

book.call(lufthansa, 239, 'Keanu Reeves');
console.log(lufthansa);

// Apply method
// Does not receive arguments, it receives array of arguments
// Call method is used in modern Javascript
const flightData = [ 583, 'Jason Mitt' ];
book.apply(eurowings, flightData);
book.call(eurowings, ...flightData);

// Bind method
console.log('---------BIND Method-----------');
// Bind does not immediately call a function, it created a new function where this keyword is bound
const bookEw = book.bind(eurowings);
const bookLh = book.bind(lufthansa);

bookEw(23, 'Steven Pressfield');

// One argument already predefined
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jay Jay');
bookEW23('Cooper');

// Bind with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
	console.log(this);

	this.planes++;
	console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(500));

/* const calculateTax = function(rate) { 
  return function addTax(value) { 
    return value + value * rate;
  }
};*/

const calculateTax = (rate) => (value) => value + value * rate;
console.log(calculateTax(0.23)(100));
const croatiaVAT = calculateTax(0.25);
console.log(croatiaVAT(100));

// Immediately Invoked Function Expressions
console.log('------Immediately Invoked Function Expressions-------');

// This function can actually be called multiple times inside a code
const runOnce = function() {
	console.log('This will never run again');
};
runOnce();

// But these one cannot
// IIFE expression
(function() {
	console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();

// Closures
console.log('-------Closures-------');
const secureBooking = function() {
	let passengerCount = 0;

	return function() {
		passengerCount++;
		console.log(`${passengerCount} passengers`);
	};
};

const booker = secureBooking();
booker();
booker();
booker();
console.dir(booker);

//Example 1
let f;
const g = function() {
	const a = 23;
	f = function() {
		console.log(a * 2);
	};
};

const h = function() {
	const b = 777;
	f = function() {
		console.log(b * 2);
	};
};

g();
f();
console.dir(f);
// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = function(n, wait) {
	const perGroup = n / 3;

	setTimeout(function() {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`)
  },wait*1000);

	console.log(`Will start boarding in ${wait} seconds`);
};
// Closure has priority over scope
const perGroup = 1000;
boardPassengers(180, 3)