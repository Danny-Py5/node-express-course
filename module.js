const names = require("./names.js");
const sayHi = require('./sayHi.js');
const data = require('./06-module-export2.js');
require('./07-run-default-in-other-module.js');

// console.log(names.name2);
// console.log(sayHi(names.name1));
// console.log(data.items);
// console.log(data.item2)





const promise = ()  =>  {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Hello ' + [names.name1, names.name2][Math.floor(Math.random() * [names.name1, names.name2].length)])
            resolve('done');
        }, 3000);
    }).then((msg) => {
        console.log(msg, 'Logged after 3s.')
    });
};
promise().then(() => {
    console.log('next step');
});