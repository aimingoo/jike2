interface Bird {
    weight: number;
    leg: number;
    wings: number;
}

interface Horse {
    weight: number;
    leg: number;
    id: string;
}

type BirdOrHorse = Bird | Horse;
type Animal = Omit<BirdOrHorse, never>;
type BirdAndHorse = Bird & Horse;

class MyClass implements Bird, Horse { // or BirdAndHorse
  weight: number = 100;
  leg: number = 4;
  wings: number = 2;
  id: string = '001';
}
let x = new MyClass();
console.log(x.leg);