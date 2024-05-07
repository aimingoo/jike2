function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id) {
    return {
        id,
        name: '张三',
        age: 25
    }
}

let id = getInputSomething();
id = parseInt(id);

let {name, age} = loadFromDatabase(id);
console.log(name, age);
