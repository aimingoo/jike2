type Trans<T> = T;

interface T1 {
    a: string;
}

interface T2 {
    a: string;
    b: number;
}

type X1 = Trans<keyof T2>;
type X2 = T1 & T2;
type X3 = Trans<T1 & T2>;
