class MyClass {
    a = 100;
    foo() {
        console.log('foo');
    }
}

global.ACTIONS = {
    BEGIN: 'begin',
    STEP1: 'step1',
    END: 'end',
};

export { MyClass };