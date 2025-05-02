console.log("this is titorial 8");

let a = "Harry bhai";
a = undefined;
if (a !==undefined){
    throw new error('this is not undefined');
}
else{
    console.log('this is undefined');
}

try{
    null.console
    console.log("We are inside try block");

    functionHarry();

} catch (error) {
    console.log(error)
    console.log("Are you okay?");
    console.log(error.name);
    console.log(error.message);

} finally {
    console.log("finally we will run this")
}
