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
