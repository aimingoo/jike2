// 使用泛型来构建类型系统（例如构建可标识联合的成员类型）

enum Transportations {motorcycle, car, truck}

interface T<T extends Transportations> {
    type: T;
}

interface T1 extends T<Transportations.motorcycle> {
  make: number;
}

interface T2 extends T<Transportations.car> {
  transmission: string;
  pow: number;
  id: 'T2';
}

interface T3 extends T<Transportations.truck> {
  capacity: number;
}

// CASE1: 使用循环处理的简单逻辑
type Transporter = T1 | T2 | T3;
let x0!: T<Transportations.motorcycle>
let x1!: T1; // = new T1(...)
let x2!: T2; // = new T2(...)
let x3!: T3; // = new T3(...)

let transporters = new Array<Transporter>;
function start() {
    transporters.forEach(x => {
        x.run();
    });
}

transporters.push(x1); // more...
start();


function IsTransporter<Target extends Transportations>(t: any, target: Target): t is T<Target> {
    return 'type' in t && t.type === target;
}

let xx!: T1 | T2 | T3;  // is Transporter type

if (IsTransporter(xx, Transportations.motorcycle)) {
    xx
}
else if (IsTransporter(xx, Transportations.car)) {
    xx
}
else if (IsTransporter(xx, Transportations.truck)) {
    xx
}

switch (true) {
    case IsTransporter(xx, Transportations.motorcycle):
        xx
        break;
    case IsTransporter(xx, Transportations.car):
        xx
        break;
    case IsTransporter(xx, Transportations.truck):
        xx
        break;
}