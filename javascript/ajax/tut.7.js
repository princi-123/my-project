console.log("this is tutorial 7");

 async function harry() {
    console.log('inside harry function')
    const response = await fetch('https://api.github.com/users');
    console.log('before response');
    const users = await response.json();

    console.log('users resolved')
    return users;

    return "harry";
}

console.log("Before calling harry");
let a = harry();
console.log("After calling harry");
console.log(a);
a.then(data => console.log(data))
console.log("Last line of this js file")
