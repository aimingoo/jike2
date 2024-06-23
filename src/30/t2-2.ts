// 2）使用泛型来构建类型系统（例如构建可标识联合的成员类型）

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

// 注意这里不再是必须声明“Transporter”
//  - “可辨识”很重要，但“是不是联合”却并不太要紧
type Transporter = T1 | T2 | T3;

let x0!: T<Transportations.motorcycle>
let x1!: T1; // = new T1(...)
let x2!: T2; // = new T2(...)
let x3!: T3; // = new T3(...)

let transporters = new Array<Transporter>;
// (OR, )
// let transporters = new Array<T<Transportations>>;
function start() {
    transporters.forEach(x => {
        x.run();
    });
}

// 如上，显然x0~3所对应的类型，应当都是T<Transportations>的子类型（是泛型T的实例，亦即是它的具体类型）
// ...
transporters.push(x1);
start();

/* 泛型及其实例（实例可以理解为子类型）之间存在如下关系
  - T<any>是所有实例类型的超类型；T<never>是所有实例类型的底类型。
  - T<any>和T<never>用作extends约束或条件的右侧，可以有效检测T<>的类型系统。
*/