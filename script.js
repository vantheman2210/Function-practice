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
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
  }
}

lufthansa.book(239, 'Vanja');
lufthansa.book(635, 'John Wick');
console.log(lufthansa)

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  
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
const flightData = [583, 'Jason Mitt'];
book.apply(eurowings, flightData)
book.call(eurowings, ...flightData);

// Bind method
console.log('---------BIND Method-----------');
// Bind does not immediately call a function, it created a new function where this keyword is bound
const bookEw = book.bind(eurowings);
const bookLh= book.bind(lufthansa);

bookEw(23, 'Steven Pressfield');

// One argument already predefined
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jay Jay');
bookEW23('Cooper');

//

