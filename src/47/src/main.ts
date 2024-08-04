// 为一个按钮添加点击事件
function handleButton() {
    const button = document.querySelector('button');
    button?.addEventListener('click', () => {
        alert('XXX');
    });
}

// 创建一个按钮
function createButton() {
    const button = document.createElement('button');
    button.textContent = 'Click me!';
    document.body.appendChild(button);
}

createButton();
handleButton();