const path = require('path'); 

// to get the path seperator of your operating system use the path.sep
const myPathSep = path.sep;
console.log({myPathSep});

// join path;
const pathToNewTXT = path.join('/content', 'subfolder', 'new.txt');
console.log({pathToNewTXT});

// base name
const base = path.basename(pathToNewTXT)
console.log({base})

// the name of the directory to the file 
const dirname = path.dirname(pathToNewTXT);
console.log({dirname});


const absolutePath1 = path.resolve(__dirname, 'content', 'subfolder', 'text.txt');
const absolutePath2 = path.join(__dirname, 'content', 'subfolder', 'text.txt')
console.log(absolutePath1);
console.log(absolutePath2);
console.log();


const result = path.resolve('..','folder1', 'folder2', 'file.txt');
const result2 = path.join('..','folder1', 'folder2', 'file.txt');

console.log(result);
console.log(result2, '\n\n');

