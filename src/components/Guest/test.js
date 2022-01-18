// var person1 = { firstName: 'Jon', lastName: 'Kuperman' };
// var person2 = { firstName: 'Kelly', lastName: 'King' };

// function say(greeting) {
//     console.log(greeting + ' ' + this.firstName + ' ' + this.lastName);
// }

// say.call(person1, 'Hello'); // Hello Jon Kuperman
// say.call(person2, 'Hello'); // Hello Kelly King

// say.apply(person1, ['Hello', 'dsf']); // Hello Jon Kuperman
// say.apply(person2, ['Hello']); // Hello Kelly King

// var sayHelloJon = say.bind(person1);
// var sayHelloKelly = say.bind(person2);

// sayHelloJon(); // Hello Jon Kuperman
// sayHelloKelly(); // Hello Kelly King


function init() {
    const name = 'Mozilla'; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        console.log(name); // use variable declared in the parent function
    }
    displayName();
}
init();
