console.log('Hello World')

// variables
var firstname = 'Ramya'
let lastname = 'Iyengar'

console.log(firstname, lastname)

var age,
  dataOfBirth = 25

age = 26

console.log(age, dataOfBirth)

const occupation = 'Engineer'
console.log(occupation)

// occupation = "Architect"  // TypeError: Assignment to constant variable.
// constant variable has to be intialized

//datatypes

var sex = 'female'
var isSheMarried = false
var age = 26
var noOfMarriedYears = null
var noOfCars = undefined

// concatenation and interpolation

console.log('My name is ' + firstname + lastname + ' and my age is ' + age)
console.log(`My date of birth is ${dataOfBirth}`)

// objects - pair of key and value

var customer = {
  name: 'John',
  age: 50,
}

console.log(customer)
console.log(customer.age)
console.log(customer['name'])
customer['name'] = 'Jackson'
customer['lname'] = 'mikeal'
console.log(customer)

// arrays

arr1 = ['Volvo', 'Benz', 'Tata', 'Tesla']
console.log(arr1[0])
arr1[3] = 'Hyundai'
console.log(arr1)

// condition

isAgeMoreThanEighteen = false
isIndianCitizen = true

if (isAgeMoreThanEighteen && isIndianCitizen) {
  console.log('Eligible for driving license')
} else {
  console.log("Not eligibel for driver's license")
}

//loop

//for - loops through a block of code a number of times
// for/in - loops through the properties of an object
// for/of - loops through the values of an iterable object
// while - loops through a block of code while a specified condition is true
// do/while - also loops through a block of code while a specified condition is true

for(let i = 0; i<5; i++){
    console.log("Krishna" + i)
}


// for in  - loops through the properties of an object
var student = {
    name: 'John',
    class: 50,
  }
  
for(let s in student){
    console.log(s, student[s])
}

// forEach
a1 = [1,2,3,4]
var txt = ""
a1.forEach(element => {
    txt+=element
});

console.log(txt)

// for/of - loops through the values of an iterable object
var cars = ["BMW", "Volvo", "Tesla"]

for(let car of cars){
    console.log(car)
}

//Looping over a String

let language = "JavaScript";

let text = "";
for (let x of language) {
    if(x=='S'){
        break
    }
text += x;
}
console.log(text)



let familySize = 2;
var plannedDistanceToDrive = 200

function recommendedCar(familySize) {
    if (familySize<=4 && plannedDistanceToDrive<200){
        return "Tesla"
        
    } else if(familySize<=4 && plannedDistanceToDrive>=200){
        return "Toyota Camry"
    }else{
        return "Minivan"
    }

}

console.log(recommendedCar(familySize, plannedDistanceToDrive));