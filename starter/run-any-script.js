const str = "i love to code everyday";
let regex = /[a-z]+/g;
// console.log(str.replace(regex, (s) => `[${s}]`));

const [name, age] = ["daniel", 44];
// console.log(name, age);

const createObject = (key1, key2, key3) => {
  return {
    [key1]: "value1",
    [key2]: "value2",
    [key3]: "value3",
  };
};
console.log(createObject("name", "age", "job"));
