interface IMyObject {
    f(a: string): void;
    x: string;
}

interface IMyObject {
    f(b: number): void;
    y: number;
}

type T = Omit<IMyObject, never>;