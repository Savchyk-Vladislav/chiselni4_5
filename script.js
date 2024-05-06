// Функція Лагранжа - Ця функція використовується для обчислення інтерполяційного поліному Лагранжа. 
// Вона приймає на вхід масиви x та y, які представляють відповідні значення x та y ваших даних, а також значення x0, в якому ви хочете обчислити поліном. 
// Функція повертає значення поліному Лагранжа в точці x0.
function lagrange(x, y, x0) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        let prod = 1;
        for (let j = 0; j < x.length; j++) {
            if (i != j) prod *= (x0 - x[j]) / (x[i] - x[j]);
        }
        sum += y[i] * prod;
    }
    return sum;
}

// Поліноми першого та другого ступеня - Ця функція використовується для обчислення коефіцієнтів поліному заданого ступеня, який апроксимує ваші дані. 
// Вона приймає на вхід масиви x та y, які представляють відповідні значення x та y ваших даних, а також ступінь поліному, який ви хочете обчислити. 
// Функція повертає масив коефіцієнтів поліному.
function polynomial(x, y, degree) {
    let X = [];
    let Y = [];
    for (let i = 0; i <= degree; i++) {
        X[i] = [];
        for (let j = 0; j <= degree; j++) {
            X[i][j] = x.reduce((sum, xi) => sum + Math.pow(xi, i+j), 0);
        }
        Y[i] = x.reduce((sum, xi, index) => sum + y[index]*Math.pow(xi, i), 0);
    }

    // Розв'язок системи лінійних рівнянь
    let a = math.lusolve(X, Y);
    return a.map(ai => ai[0]);
}

// Функція для обчислення значення поліному в точці - Ця функція використовується для обчислення значення поліному в заданій точці. 
// Вона приймає на вхід масив a коефіцієнтів поліному та значення x, в якому ви хочете обчислити поліном. 
// Функція повертає значення поліному в точці x.
function evaluatePolynomial(a, x) {
    return a.reduce((sum, ai, index) => sum + ai*Math.pow(x, index), 0);
}

// Функція, яка викликається при натисканні кнопки
function calculate() {
    // Отримання вхідних даних з форми
    let x = document.getElementById('x').value.split(',').map(Number);
    let y = document.getElementById('y').value.split(',').map(Number);
    let x0 = 4; // Точка, в якій обчислюємо значення функцій

    // Обчислення інтерполяційної та апроксимаційних функцій
    let y0_interpolation = lagrange(x, y, x0);
    let a1 = polynomial(x, y, 1);
    let a2 = polynomial(x, y, 2);
    let y0_approximation1 = evaluatePolynomial(a1, x0);
    let y0_approximation2 = evaluatePolynomial(a2, x0);

    // Обчислення суми квадратів різниць для обох поліномів
    let sum_of_squares1 = x.reduce((sum, xi, index) => sum + Math.pow(y[index] - evaluatePolynomial(a1, xi), 2), 0);
    let sum_of_squares2 = x.reduce((sum, xi, index) => sum + Math.pow(y[index] - evaluatePolynomial(a2, xi), 2), 0);

    // Вибір кращого поліному
    let best_polynomial = sum_of_squares1 < sum_of_squares2 ? "1-го ступеня" : "2-го ступеня";

    // Виведення результату на екран
    document.getElementById('result').innerHTML = 
        "Інтерполяційна функція в точці " + x0 + ": " + y0_interpolation + "<br>" +
        "Апроксимаційна функція 1-го ступеня в точці " + x0 + ": " + y0_approximation1 + "<br>" +
        "Апроксимаційна функція 2-го ступеня в точці " + x0 + ": " + y0_approximation2 + "<br>" +
        "Кращий поліном за методом найменших квадратів: поліном " + best_polynomial;
}

// Функція, яка викликається при натисканні кнопки "Ввести дані задачі"
function enterData() {
    document.getElementById('x').value = '3,4,5,6,7';
    document.getElementById('y').value = '2,5,6,4,3';
}