// Example using Promise

function fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
        const data = "Hello, world!";
        resolve(data);
    });
}

let x = Promise.reject('Error');

// let y = fetchData();
fetchData()
    .then((result) => {
        return Promise.resolve('abc'); // PromiseLike<>
    })
    .then((result) => {
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        return x;
    });