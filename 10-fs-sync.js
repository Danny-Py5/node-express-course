const {readFileSync, writeFileSync} = require('fs');


const firstFileRead = readFileSync('./content/first.txt', 'utf8');
const secondFileRead = readFileSync('./content/second.txt', 'utf8');

console.log({firstFileRead, secondFileRead});

// writeFileSync('./content/first.txt', 'This is my first txt file changed', 'utf8')
writeFileSync(
    './content/result-txt.txt',  // file path we wanna write into 
    `\nHello this is the result : ${firstFileRead}, ${secondFileRead}`, // actuall text that we wanna append 
    {flag: 'a'} // the mode of which we are writing #append mode 
);




