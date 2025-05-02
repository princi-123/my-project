
function func1() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            const reeoe = true;
            if(!error){
            console.log('Function: your promise has been resolved')
            resolve();
            }
            else {
                console.log('Function: your promise has not been resolved')
                reject('sorry not fulfilled');
            }
        }, 2000);
    })
}
func1().then(function(){
    console.log("Harry: Thanks for resolving")
}).catch(function(error){
    console.log("Harry: very bed bro. Reason:" + error)
})
