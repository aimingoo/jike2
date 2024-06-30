// 使用泛型来构建类型系统（使用“泛型函数”）

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

// CASE2：平台将为每一个transporter配备一个独立的控制器
type Transporter = T1 | T2 | T3;
let x0!: T<Transportations.motorcycle>
let x1!: T1; // more ...

class MyController {
    run(x: Transporter) {
        x.run();
    }
}

type MyController2 = {  // @see class MyController
    run: <T extends Transporter>(t: T) => void;
}

class Platform2 extends Array<[MyController2, Transporter]> {  // HOWTO FIX IT ?
    runAll() {
        this.forEach(([controller, transporter]) => {
            controller.run(transporter);
        })
    }
}

let p = new Platform2;
let ctrl!: MyController; // load from plugins library
let trans!: Transporter;
p.push([ctrl, trans]); // more...
p.runAll();