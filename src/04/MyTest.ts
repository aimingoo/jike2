function getInputSomething() {
    return '1341534';
}

function loadFromDatabase(id: number) {
    if (isNaN(id)) return;

    // .... load from database
    return {
        id,
        name: '张三',
        age: 25
    }
}

// let s = getInputSomething();
// let id = parseInt(s);
let id: string | number | boolean | 1 | 2 = getInputSomething();
id = parseInt(id);

let {name, age} = loadFromDatabase(id);
console.log(name, age);
