// Example using async/await

async function processT(): Promise<string|void> {

        // Your code logic here
        // ...

        // Simulate an asynchronous operation
        let x = await Promise.reject(new Error('Error'));
        await 5;

        return;

        // More code logic here
        // ...

        console.log('Process T completed successfully');

    return 'T';
}

processT().then((result) => {

}).catch((error) => {
    // ...
});