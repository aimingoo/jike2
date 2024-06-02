let T = {
    // [k: string]: string | number;
    a: 'abc',
    b: 100,
    c: 1
}

let T1 = {};
Object.keys(T).forEach(k => T1[k] = T[k]);
