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

// let: declaración de una variable

// Función para actualizar el display
function updateDisplay() {
    currEL.textContent = current; // actualizar display actual
    prevEl.textContent = previous; // actualizar display anterior
}

// Función para añadir digitos al display
function appendNumber(num) {
    if (current === "0") {
        current = num; // si el display actual es 0, reemplazarlo
    } else {
        current += num // añadir el número al final del display actual
    }
    updateDisplay(); // actualizar el display
}

// Función para limpiar todo
function clearAll() {
    current = "0"; // resetear el display actual
    previous = ""; // resetear el display anterior
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
    if (!current.includes(".")) {
        current += "."; // Se agrega el punto solo sí no hay otro (!)
    }
    updateDisplay();
}

// Evento para cada botón
buttons.forEach((btn) => { // para cada botón
    btn.addEventListener("click", () => { // añadir un evento de click
        const value = btn.textContent; // obtener el texto del botón

        // Sí el botón es un número (0-9)
        if (!isNaN(value)) { // isNaN: función que verifica si no es un número
            appendNumber(value); // añadir el número al display
        } else if (value === "AC") { // Sí el botón es AC
            clearAll(); // limpiar todo
        } else if (value === "⌫") { // Sí el botón es ⌫
            deleteNumber(); // borrar
        } else if (value === ".") { // Sí el botón es .
            appendDecimal(); // añadir decimal
        }
    });
});



// Al iniciar, pintar el display
updateDisplay();