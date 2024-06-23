// 1）使用类继承来替代“可辨识联合类型”

enum Transportations {motorcycle, car, truck}

abstract class T {
    abstract type: Transportations;
}

class T1 extends T {
    type =  Transportations.motorcycle as const;
    constructor(
        public make: number
    ) {
        super();
    }
}
type X1 = Omit<T1, never>;

class T2 extends T {
    type = Transportations.car as const;
    constructor(
        public transmission: string,
        public pow: number,
        public id = 'T2' as const
    ) {
        super();
    }
}

class T3 extends T {
    type = Transportations.truck as const;
    constructor(
        public capacity: number
    ) {
        super();
    }
}

type Transporter = T;

class MyController {
    run(x: Transporter) {
        x.run();
    }
}

// CASE1：使用一个平台（单例）来为所有的transporter提供服务
class Platform {
    static transporters = new Array<Transporter>;
    static controller = new MyController;
    static runAll() {
        this.transporters.forEach((transporter) => {
            this.controller.run(transporter)
        });
    }
}

// CASE2：平台将为每一个transporter配备一个独立的控制器
class Platform2 extends Array<[MyController, Transporter]> {
    runAll() {
        this.forEach(([controller, transporter]) => {
            controller.run(transporter);
        })
    }
}

let x1!: T1; // = new T1(...)
let x2!: T2; // = new T2(...)
let x3!: T3; // = new T3(...)

Platform.transporters.push(x1);  // more...
Platform.runAll();
