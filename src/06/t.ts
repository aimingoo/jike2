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

type T = Bird | Horse;