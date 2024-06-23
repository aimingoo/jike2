// 3）使用基于表达式的泛型声明（参考t2-2.ts）

enum Transportations {motorcycle, car, truck}

interface T<T extends Transportations> {
    type: T;
}

type T1 = T<Transportations.motorcycle> & {
  make: number;
}

type T2 = T<Transportations.car> & {
  transmission: string;
  pow: number;
  id: 'T2';
}

type T3 = T<Transportations.truck> & {
  capacity: number;
}

type Transporter = T1 | T2 | T3;

// ...