// 使用类继承来替代“可辨识联合类型”（参考t2.ts）

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

class T2 extends T {
    type = Transportations.car as const;
    constructor(
        public transmission: string,
        public pow: number,
        public id: string = 'T2'
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

type Transporters = {
    [Transportations.motorcycle]: T1;
    [Transportations.car]: T2;
    [Transportations.truck]: T3;
};

// 1）使用与 t2.ts 一致的方式来实现
function IsTransporter<Target extends Transportations>(t: any, target: Target): t is Transporters[Target] {
    return 'type' in t && t.type === target;
}

// 2）使用基于 instanceof 的方法来实现
function IsTransporter2<Target extends Transportations>(t: T, target: Target): t is Transporters[Target] {
    return [T1, T2, T3].some(T => t instanceof T && t.type === target);
}

// 3) 基于类的类型信息来实现
function IsTransporter3<Target extends new(...args: any[]) => any>(t: T, target: Target): t is InstanceType<Target> {
    return t instanceof target;
}

let xx!: T;

if (IsTransporter(xx, Transportations.motorcycle)) {
    xx
}
else if (IsTransporter(xx, Transportations.car)) {
    xx
}
else if (IsTransporter(xx, Transportations.truck)) {
    xx
}
else if (IsTransporter3(xx, T3)) {
    xx
}
else if (xx instanceof T3) {  // （同上）
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
