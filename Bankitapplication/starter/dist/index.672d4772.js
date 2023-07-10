"use strict";
/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////
/*
let arr = [1, 2, 4, 5, 6];
let arr2 = [7, 8, 9, 10, 11, 12];
// SLICE
console.log(arr.slice(0));
console.log(arr.slice(0, 3));//remember last parameter not accessable
console.log(arr2.slice(0, -2));
console.log(arr);//here we get copy of arr
console.log(...arr);// here we get value

////// SPLICE
// console.log(arr.splice(3));
// console.log(arr2.splice(-3));
// console.log(arr2.splice(-4, 5));

//////// REVERSE //////
// console.log(arr.reverse());
// console.log(arr2.reverse());

//////// CONCAT ////////
let arr3 = [...arr, ...arr2];
console.log(arr.concat(arr2));
console.log(arr3);

//////// JOIN ////////
console.log(arr3.join('-'));



/////////// AT METHOD //////
console.log(arr[0]);
console.log(arr.at(0));
console.log(arr.at(3));
console.log(arr.at(-1));

console.log(arr[arr.length - 1]);//last method

console.log(arr.slice(-1)[0]);
const str = 'Aakash yadav';
console.log(str.at(-1));
console.log(str.at(-2));
console.log(str.at(-3));
console.log(str.at(1));
console.log(str.at(2));


/////// LOOPING ARRAYS :- for each
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`Deposite :- ${movement}`);
//   } else {
//     console.log(`withdrawal :- ${Math.abs(movement)}`);
//   }
// }
// for (const [i, mov] of movements.entries()) {
//   if (mov > 0) {
//     console.log(`Deposite number :   ${i + 1} ,your Deposite's :  ${mov}`);
//   } else {
//     console.log(`Withdrawal num:  ${i + 1} , Your Withdrawal :  ${Math.abs(mov)}`);
//   }
// }
/////
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement :${i + 1} ,your Deposite's :  ${mov}`);
  } else {
    console.log(`Movement :${i + 1} , Your Withdrawal :  ${Math.abs(mov)}`);
  }
  // console.log(arr);
});

///// WITH MAP AND SETS :- foreach loop///////
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${value} is value ${key} is key`);
});
console.log(currencies);
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/ ///////// BANkIST application////////
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [
        200,
        450,
        -400,
        3000,
        -650,
        -130,
        70,
        1300
    ],
    interestRate: 1.2,
    pin: 1111
};
const account2 = {
    owner: "Jessica Davis",
    movements: [
        5000,
        3400,
        -150,
        -790,
        -3210,
        -1000,
        8500,
        -30
    ],
    interestRate: 1.5,
    pin: 2222
};
const account3 = {
    owner: "Steven Thomas Williams",
    movements: [
        200,
        -200,
        340,
        -300,
        -20,
        50,
        400,
        -460
    ],
    interestRate: 0.7,
    pin: 3333
};
const account4 = {
    owner: "Sarah Smith",
    movements: [
        430,
        1000,
        700,
        50,
        90
    ],
    interestRate: 1,
    pin: 4444
};
const account5 = {
    owner: "Aakash Yadav",
    movements: [
        355,
        777,
        900,
        36,
        67,
        68,
        9,
        90,
        -78,
        345,
        634,
        24,
        24
    ],
    interestRate: 1,
    pin: 5555
};
const accounts = [
    account1,
    account2,
    account3,
    account4,
    account5
];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const movements = [
    200,
    450,
    -400,
    3000,
    -650,
    -130,
    70,
    1300
];
/////// functions ////// 
// this is for display in grid row way the Deposite and withdrawal
const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = "";
    const movs = sort ? movements.slice().sort((a, b)=>a - b) : movements; // Remember pass ha shallow copy 
    movs.forEach(function(mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};
/// This function for total balance in bankist app
const calcTotalDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov)=>acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`;
};
//Creating function for Username 
const creatingusername = function(acc) {
    acc.map(function(acc) {
        acc.username = acc.owner.split(" ").map((name)=>name[0].toLowerCase()).join("");
    });
};
creatingusername(accounts);
//// Creating Function for Summary 
const calcDisplaySummary = function(movement) {
    const SummaryIn = movement.movements.filter((mov)=>mov > 0).reduce((acc, mov)=>acc + mov, 0);
    labelSumIn.textContent = `${SummaryIn}€`;
    const Summaryout = movement.movements.filter((mov)=>mov < 0).reduce((acc, mov)=>acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(Summaryout)}€`;
    const interestSum = movement.movements.filter((mov)=>mov > 0).map((mov)=>mov * movement.interestRate / 100).filter((mov)=>mov > 1).reduce((acc, mov)=>acc + mov, 0);
    labelSumInterest.textContent = `${interestSum}€`;
};
////// creating  UI
const updateUI = function(currentacc) {
    //display the movements
    displayMovements(currentacc.movements);
    //display the total balance
    calcTotalDisplayBalance(currentacc);
    //display the summary
    calcDisplaySummary(currentacc);
};
////// Event Handler ////
let currentaccount;
btnLogin.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("login");
    currentaccount = accounts.find((acc)=>acc.username === inputLoginUsername.value);
    // console.log(currentaccount);
    if (currentaccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome back,${currentaccount.owner.split(" ")[0]}`;
        containerApp.style.opacity = 100;
        //clear the field pin wala
        inputLoginPin.value = inputLoginUsername.value = "";
        inputLoginPin.blur();
        /// Display UI 
        updateUI(currentaccount);
    }
});
/////// Implementing transfer ///////
btnTransfer.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("hlo");
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find((acc)=>acc.username === inputTransferTo.value);
    console.log(receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = "";
    if (amount > 0 && receiverAcc && currentaccount.balance >= amount && receiverAcc?.username !== currentaccount.username) {
        // paise nikalna hai kike mai s
        console.log("hollow");
        currentaccount.movements.push(-amount);
        // dalna kikse mai hai
        receiverAcc.movements.push(amount);
        /// Display UI
        updateUI(currentaccount);
    }
});
///// close the account and delte that account by splice  method//////
btnClose.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("hey");
    // Edha if check mai basically confirm kiya ki current account see match krte hai ki nahi quki kisi dusre ka account tho nhai delete kr sakte
    if (currentaccount.username === inputCloseUsername.value && currentaccount.pin === Number(inputClosePin.value)) {
        const index = accounts.findIndex((acc)=>acc.username === inputCloseUsername.value);
        console.log(index); /// ye phe index access kiye account ka jo closeusername hai
        /// this is for deleting the object with help of arr indirectly kr rahi hai
        accounts.splice(index, 1);
        /// remove the UI
        containerApp.style.opacity = 0;
    }
    // this is for clearing the pin value and usernmae
    inputClosePin.value = inputCloseUsername.value = "";
});
// const arrme = [1, 23, 45, 6, 76];
// console.log(arrme.splice(1, 3));
// console.log(arrme);
///// using some i calculated the request loan //
btnLoan.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("hup");
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentaccount.movements.some((mov)=>mov >= amount * 0.1)) {
        // This is for adding the value in movments that how much loan is taken
        currentaccount.movements.push(amount);
        // for display UI
        updateUI(currentaccount);
    }
    inputLoanAmount.value = "";
});
//// sorting the deposite and withdrawal
let sorted = false;
btnSort.addEventListener("click", function(e) {
    e.preventDefault();
    displayMovements(currentaccount.movements, !sorted);
    sorted = !sorted;
});
///////////////////////////////////////
// Coding Challenge #1
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

const Julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];
const checkDogs = function (dogsJulia, dogsKate) {
  const correctjulia = dogsJulia.slice();//.slice isliye use kr rhai quki hum shallow copy bhej rhe hai
  correctjulia.splice(0, 1);
  correctjulia.splice(-2);
  //correctjulia.splice(1,3) idhar hum ye bhi use kr sake hai for remove cat's at 1st and last tow cats
  // console.log(correctjulia);
  // console.log(dogsJulia);
  const totaldogs = correctjulia.concat(dogsKate)
  // console.log(totaldogs);
  totaldogs.forEach(function (dogage, i) {
    if (dogage >= 3) {
      console.log(`"Dog number ${i + 1} is an adult, and is ${dogage} years old"`);
    } else {
      console.log(`"Dog number ${i + 1} is still a puppy 🐶  and age is ${dogage} year old"`);
    }
  });

}
checkDogs(Julia, Kate);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);





///// THE MAP MEHTOD //////
const eurToUsd = 1.1;
// const newarrbyMap = movements.map(function (mov) {
//   return eurToUsd * mov;
// });
// console.log(newarrbyMap);
// // By Arrow function
// const byarrwMapmethod = movements.map(mov => eurToUsd * mov);
// console.log(byarrwMapmethod);

// const movementsDescriptions = movements.map(function (mov, i) {
//   return `Movement :${i + 1} ${mov > 0 ? 'Deposite' : 'withdrawal'} ${Math.abs(mov)}`
//   // if (mov > 0) {
//   //   return `Movement :${i + 1} ,your Deposite's :  ${mov}`
//   // } else {
//   //   return `Movement :${i + 1} , Your Withdrawal :  ${Math.abs(mov)}`
//   // }// remember always use less code and efficent so for now use ternary operator for this if-else loop
// });
// console.log(movementsDescriptions);
/////// BY Arrow function
// const byArrowMthod = movements.map((mov, i) => {
//   if (mov > 0) {
//     return `Movement :${i + 1} ,your Deposite's :  ${mov}`
//   } else {
//     return `Movement :${i + 1} , Your Withdrawal :  ${Math.abs(mov)}`
//   }
// });
const byArrowMthod = movements.map((mov, i) => `Movement: ${i + 1} ${mov > 0 ? 'Deposite' : 'Withrawal'} ${Math.abs(mov)}`)
console.log(byArrowMthod);

///  the above thing by for each loop
// const byforEachNeedarr = [];
// movements.forEach(function (mov) {
//   return byforEachNeedarr.push(eurToUsd * mov);
// })
// console.log(byforEachNeedarr);// this disadvantage of forEach loop as compared to Map method



////// The filter Method ///
const FilterDeposite = movements.filter(mov => mov > 0);
console.log(FilterDeposite);
const FilerWithdrawal = movements.filter(mov => mov < 0);
console.log(FilerWithdrawal);
const RegularDeposite = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(RegularDeposite);
//// by for of loop
// const Deposite = [];
// for (let mov of movements) {
//   if (mov > 0) {
//     // console.log(mov);
//     Deposite.push(mov);
//   }
// }
// console.log(Deposite);

*/ ///// The Reduce METHOD 
// const balanceRegular = movements.reduce(function (acc, mov, i, arr) {
//   console.log(`Iteration ${i + 1} ${mov} ${acc}`);
//   return acc + mov;
// }, 0);
// console.log(balanceRegular);
// const balanceArrow = movements.reduce((acc, mov, i, arr) => {
//   console.log(`${i + 1} ${mov} ${acc}`);
//   return acc + mov;
// }, 0);
// cosnt balanceArrow = movements.reduce((acc,mov)=>acc+mov,0);
// console.log(balanceArrow);
// let num = 0;
// for (const mov of movements) num += mov;
// console.log(num);
/////// how to max if calculate in function's 
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);
// Coding Challenge #2
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  /// idhar hum direct tornary operator use nahi kr sakte it will show NaN
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);
  const adults = humanAge.filter(age => age >= 18);
  console.log(adults);
  const dogagefromHumanage = humanAge.filter(age => age <= 18);
  console.log(`Exclude or remove the dog age frome human age:-${dogagefromHumanage}`);
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  const average = adults.reduce(function (acc, age, i, arr) {
    return acc + age / adults.length;
  }, 0)

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);


//////// The Magic of Chaining Method ////
const eurToUsd = 1.1;
//// its like pipe line
const totalDepositsUSD = movements.filter(mov => mov > 0)
  .map(mov => mov * eurToUsd).
  reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/ ///////////////////////////////////////
// Coding Challenge #3
/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = ages => {
  const average = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, mov, i, arr) => acc + mov / arr.length, 0);
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

console.log([5, 2, 4, 1, 15, 8, 3].length);
const forlen = [5, 2, 4, 1, 15, 8, 3];
const my = forlen.map((ele, i, arr) => arr.length);
console.log(my);/// isme mrko for every element i get arr length in which by using ages.length i get the value of length that's why i get not same answer as arrow function


///////// The Find method Brooo
console.log(movements);
const findIndex = movements.find(mov => mov > 0);
console.log(findIndex);

const account = accounts.find(acc => acc.interestRate === 1.2);
console.log(account);// this give first index element

// by for each loop
for (const acc of accounts) {
  if (acc.interestRate === 1.2) console.log(acc);
}

//////  SOME  AND EVERY METHOD////
console.log(movements);
console.log(movements.includes(-400));
/// some methohd
const deposite = movements.some(mov => mov > 0);
console.log(deposite);// so its return true because it have positive and negative value both
console.log(movements.some(mov => mov < 0));

////// every method /// so it basically work for every vallue in it
console.log(movements.every(mov => mov > 0));
console.log(movements.every(mov => mov < 0));
console.log(account4.movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov < 0));
console.log(account4.movements.filter(mov => mov > 0));



////// flat and flatmap ///
const arr = [1, [2, 34, [5, 6, 7], [75, 56, 7]]];
console.log(arr.flat(4));
/// flat is like nested array ko single element of array mai push karna and in multiple nested arr hai tho specific position pass kr do jaise ki upper pass kr rakhhi hai 4
const allmovmens = accounts.map(mov => mov.movements);
// console.log(allmovmens.flat());
const combiningmovements = allmovmens.flat();
// console.log(combiningmovements);
const totalofallmove = combiningmovements.reduce((acc, mov) => mov + acc, 0);
console.log(totalofallmove);

/// all above stuff in single code
const totalbalanceofmov = accounts.map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalbalanceofmov);

////// flat Map ye map wala kam and flat wala dono kr laita hai

const totalbalanceo = accounts.flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalbalanceo);


/// Sorting
// console.log(movements);
const arr = ['VIkash', 'Aakash', 'Friends', 'Mom', 'Father'];
console.log(arr.sort());
console.log(movements);

movements.sort((a, b) => {
  if (a > b) return 1;//increasing for all +ve value
  if (b > a) return -1;// Decreasing for all -Ve value
})
// console.log(movements);
movements.sort((a, b) => a - b);// arrow decreaing order
movements.sort((a, b) => b - a);// arrow increasing order
// console.log(movements);
// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
movements.sort((a, b) => {
  if (a > b) return 1;
});
console.log(movements);
movements.sort((a, b) => {
  if (b > a) return -1;
})
console.log(movements);



///////Ways of Creating an Array, Filling and from method on array// Mutable method hai ye
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// console.log(array.fill(1));
console.log(array.fill(1, 4, 6));//isme last argument tak fill nhai kr rah jaise slice
console.log(array.fill(3, 1, -2));

const x = new Array(10);// define's the length of arr
console.log(x);
x.fill(2, 1, 7);
console.log(x);
// from method
const z = Array.from({ length: 10 }, () => 4);
console.log(z);

const f = Array.from(x, (_, i) => i + 1);
console.log(f);
const j = Array.from({ length: 20 }, (_, i) => {
  const g = Math.trunc(Math.random() * 6) + 1;
  return g + i;
});
console.log(j);
const g = Array.from({ length: 4 }, (cur, i) => i + 1);
console.log(g);

labelBalance.addEventListener('click', function (e) {
  (e).preventDefault;
  const MovementUI = [...document.querySelectorAll('.movements__value')];
  console.log(MovementUI);
  console.log('hii');
  const movmentsUI = Array.from(document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')));
  console.log(movmentsUI);// this is the best method
  const byme = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace("€", '')));
  console.log(byme);// this is for practice above and this is same
});


/// some Array method for practiece
// let a = 2;
// console.log(++a);
// console.log(a++);
// console.log(a);
// 1.
// const bankDepositSum = accounts.flatMap(acc => acc.movements)
//   .reduce((acc, mov) => mov > 0 ? acc + mov : acc, 0);//my technique also match
// const bankDepositSum = accounts.flatMap(acc => acc.movements)
//   .filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
// console.log(bankDepositSum);

// 2
// const numDeposits1000 = accounts.flatMap(mov => mov.movements)
//   .filter(mov => mov >= 1000).length;
const numDeposits1000 = accounts.flatMap(mov => mov.movements)
  .reduce((acc, mov) => mov >= 1000 ? ++acc : acc, 0);// or idhar mai acc+1 like sakta tha but this is good
console.log(numDeposits1000);
//  3
const { Deposite, Withdrawal } = accounts.flatMap(mov => mov.movements)
  .reduce((acc, mov) => {
    mov > 0 ? acc.Deposite += mov : acc.Withdrawal += mov;
    return acc;
  }, { Deposite: 0, Withdrawal: 0 });
console.log(Deposite, Withdrawal);

// 4 converting the the title  impo
// const convertTitleCase = (titel) => {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = titel.toLowerCase().split(' ').map(titel => (exceptions.includes(titel) ? titel : titel[0].toUpperCase() + titel.slice(1).toLowerCase()));
//   return titleCase;
// }

const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title.toLowerCase().split(' ').map(word => (exceptions.includes(word) ? word : capitzalize(word))).join(' ');
  return capitzalize(titleCase);
}
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/ ///////////////////////////////////////
// Coding Challenge #4
/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/ const dogs = [
    {
        weight: 22,
        curFood: 250,
        owners: [
            "Alice",
            "Bob"
        ]
    },
    {
        weight: 8,
        curFood: 200,
        owners: [
            "Matilda"
        ]
    },
    {
        weight: 13,
        curFood: 275,
        owners: [
            "Sarah",
            "John"
        ]
    },
    {
        weight: 32,
        curFood: 340,
        owners: [
            "Michael"
        ]
    }
];
// 1
dogs.forEach((ele)=>{
    ele.recommendedFood = Math.trunc(ele.weight ** 0.75 * 28);
});
console.log(dogs);
// 2 
const dogsarah = dogs.find((ele)=>ele.owners.includes("Sarah"));
console.log(dogsarah);
console.log(`Sarah dog's eats too ${dogsarah.curFood > dogsarah.recommendedFood ? "much" : "little"}`);
// 3
const ownersEatTooMuch = dogs.filter((ele)=>ele.curFood > ele.recommendedFood).flatMap((ele)=>ele.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter((ele)=>ele.curFood < ele.recommendedFood).flatMap((ele)=>ele.owners);
console.log(ownersEatTooLittle);
// 4
console.log(`"${ownersEatTooMuch.join(" and ")} dogs eat to much!" and "${ownersEatTooLittle.join(" and ")} dogs eat to little!"`);
// 5
// const Exactlysame = dogs.findIndex(ele => ele.curFood === ele.recommendedFood ? true : false);
// console.log(Exactlysame);
console.log(dogs.some((dog)=>dog.curFood === dogs.recommendedFood));
//6
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = (dog)=>dog.curFood > dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));
// 7.
console.log(dogs.filter(checkEatingOkay));
// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b)=>a.recFood - b.recFood);
console.log(dogsSorted);
const dogsSortedmy = dogs.map((ele)=>ele).slice().sort((a, b)=>a.recommendedFood - b.recommendedFood);
console.log(dogsSortedmy);

//# sourceMappingURL=index.672d4772.js.map
