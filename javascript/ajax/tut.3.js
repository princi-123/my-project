console.log("this is tutorial 37");

const students = [
    { name: "harry", subject: "javascript" },
    { name: "rohan", subject: "Machine learning" }
]

function enrollStudent(student, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            students.push(student);
            console.log("student has been enrolled");
            const error = false;
            if(!error){
                resolve();
            }
            else {
                reject();
            }
            callback();
            resolve();
        }, 1000);
    })
}

function getStudents() {
    setTimeout(function () {
        let str = "";
        students.forEach(function (student) {
            str += '<li> ${student.name}</li>'
        });
        document.getElementById('students').innerHTML = str;
        console.log("student have been fetched");
    }, 5000);
}

let newstudent = { name: "Sunny", subject: "python" }
enrollStudent(newstudent, getstudents).then(function(){
    getStudents();
}).catch(function(){
    console.log("some error occured")
});
