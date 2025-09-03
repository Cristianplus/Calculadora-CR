// Seleccion de los elementos del DOM 
const currEL = document.getElementById("curr"); // display actual

//const: declaración de una constante
//currEL: nombre de la constante creada (current + Element)
//document: objeto global que representa el documento HTML (DOM)
//getElementById: método que selecciona (get) un elemento por su ID
//"curr": ID del elemento que se quiere seleccionar (actual)

const prevEl = document.getElementById("prev"); // display anterior
const buttons = document.querySelectorAll(".btn"); // seleccionar todos los botones

// Estados de la calculadora
let current = "0"; // lo que se ve en curr (display actual)
let previous = ""; // lo que se ve en prev (display anterior)
let operation = null; // operación actual (+, -, x, ÷)
let expression = ""; // operación visible

// let: declaración de una variable

// Función para actualizar el display
function updateDisplay() {
    if (expression !== "") {
        currEL.textContent = expression;
    } else {
        currEL.textContent = current || "0"; // si current está vacío, mostrar 0
    }
}

// Función para añadir digitos al display
function appendNumber(num) {
    if (current === "0" || current === "") {
        current = num; // si el display actual es 0, reemplazarlo
    } else {
        current += num // añadir el número al final del display actual
    }
    expression = previous && operation ? previous + " " + operation + " " + current : current; // actualizar la expresión visible
    updateDisplay(); // actualizar el display
}

// Función para limpiar todo
function clearAll() {
    current = "0"; // resetear el display actual
    previous = ""; // resetear el display anterior
    expression = ""; // resetear la expresión visible
    prevEl.textContent = ""; // limpiar el display anterior
    updateDisplay(); // actualizar el display
}

// Función para borrar un dígito
function deleteNumber() {
    if (current.length === 1) {
        current = "0"; // si solo queda un dígito, se reemplaza por 0
    } else {
        current = current.slice(0, -1); // eliminar el último dígito
    }
    updateDisplay();
}

// Función para punto decimal
function appendDecimal() {
    if (current.includes(".")) return; // si ya hay un punto, no hacer nada
    if (current === "") current = "0"; // Si el display está vacío, empezar con 0
        current += "."; // Se agrega el punto solo sí no hay otro (!)
        expression = previous && operation ? previous + " " + operation + " " + current : current; // actualizar la expresión visible
    
    updateDisplay();
}

// Función para elegir el operador
function chooseOperation(op) {
    if (current === "") return; // si no hay número actual, no hacer nada
    if (previous !== "") {
        compute(); // si ya hay una operación pendiente, calcularla antes
    }
    operation = op; // guardar la operación
    expression = current + " " + op; // crear la expresión visible
    previous = current; // mover el número actual a anterior
    current = "0"; // limpiamos el display para el siguiente número
    updateDisplay();
}

// Función para calcular el resultado (cuando presionamos =)
function compute() {
    const a = parseFloat(previous); // convertir el número anterior a float
    const b = parseFloat(current); // convertir el número actual a float
    let result; // variable para el resultado

    switch (operation) { // según la operación
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "x":
            result = a * b;
            break;
        case "÷":
            result = b === 0 ? "Que pendejo 😅" : a / b; // Mensaje de error al dividir entre 0
            break;
        default:
            return; // si no hay operación, no hacer nada
    }

    prevEl.textContent = expression + " ="; // mostrar la operación completa en el display anterior

    current = result.toString(); // guardar el resultado como string en current
    currEL.textContent = current; // actualizar el display actual con el resultado

    previous = ""; // limpiar previous
    operation = null; // limpiar la operación
    expression = ""; // limpiar la expresión visible
    updateDisplay(); // actualizar el display
}

// Evento para el Botón de cambiarde signo (+/-)
function toggleSign() {
    if (current === "0") return; // si el número es 0, no hacer nada
    if (current.startsWith("-")) { // si el número es negativo
        current = current.slice(1); // quitar el signo negativo
    } else {
        current = "-" + current; // añadir el signo negativo
    }
    updateDisplay();
}

// Evento para el Botón de porcentaje (%)
function percent() {
    const num = parseFloat(current); // convertir el número actual a float
    if (isNaN(num)) return; // si es un número, no hacer nada

    if (previous !== "" && operation) { // si hay una operación pendiente
        const base = parseFloat(previous); // convertir el número anterior a float
        current = ((base*num)/100).toString(); // calcular el porcentaje respecto al número anterior
    } else { 
            current = (num / 100).toString(); // calcular el porcentaje respecto a 100
    }
    updateDisplay();
}

// Evento para cada Botón
buttons.forEach((btn) => { // para cada botón
    btn.addEventListener("click", () => { // añadir un evento de click al hacer click en el botón
        const value = btn.textContent; // obtener el texto del botón

        if (!isNaN(value)) { // si es un número
            appendNumber(value); // añadir número
            } else if (value === "AC") {
                clearAll(); // limpiar todo
            } else if (value === "⌫") {
                deleteNumber(); // borrar número
            } else if (value === ".") {
                appendDecimal(); // añadir decimal
            } else if (["+", "-", "x", "÷"].includes(value)) { // si es un operador
                chooseOperation(value); // elegir operador
            } else if (value === "=") { 
                compute(); // calcular resultado
            } else if (value === "±") {
                toggleSign(); // cambiar signo
            } else if (value === "%") {
                percent(); // calcular porcentaje
            }
    });
});

// Al iniciar, pintar el display
updateDisplay();