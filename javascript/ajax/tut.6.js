console.log("this is my tutorial 6");

let myBtn = document.getElementById("myBtn");

let content = document.getElementById("content");

function getData() {
    console.log("started grtdata")
    url = "harry.txt";
    fetch(url).then((response) => {
        console.log("inside first then")
        return response.text / json();
    }).then((data) => {
        console.log("inside second then")
        console.log(data);
    })
}

function postData() {
    url = "https://api.github.com/users";
    data = '{"name": "test", "salary":"123", "age":"23"}'
    params = {
        method: 'post',
        Headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    url = "harry.txt";
    fetch(url, params).then((response) => response.text / json())
        .then(data => console.log(data)
        )
}
postData()


console.log("Before get data")
getData()
console.log("After get data")