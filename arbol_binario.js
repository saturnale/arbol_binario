class ArbolBinario { //Clase para los nodos
    constructor(valor) {
        this.valor = valor; //Aqui ingresaran los valores por ejemplo 4,6,*
        this.izq = null; //hijo izquierdo
        this.der = null; //hijo derecho
    }
}


//Creamos la función para construir el árbol
//Para poder respetar la jerarquia de operaciones y para eso usaremos 2 pilas
function construirArbol(exp){
    const ops = []; //pila para los operadores
    const valores = []; // pila de los nodos

    function jerarquia(op){
         //funcion que devuelve la jerarquia de operador
        if (op === '+' || op === '-') return 1; //Se pone el return 1 ya que estos operardores tienen menos prioridad
        if (op === '*' || op === '/') return 2; //y estos tienen más prioridad que la suma y resta
        return 0;
    }

     // cuando queremos poner el operador que está arriba de ops
    function aplicarOperacion() {
        // sacamos el operador
        const op = ops.pop();
        // sacamos dos nodos (derecha primero porque así se construye)
        const derecha = valores.pop();
        const izquierda = valores.pop();
        // creamos un nodo con op y lo enlazamos
        const nodo = new ArbolBinario(op);
        nodo.izq = izquierda;
        nodo.der = derecha;
        // lo ponemos en la pila de valores
        valores.push(nodo);
    }

    // Recorremos cada caracter de la expresión
    for (let i = 0; i < exp.length; i++) {
        const c = exp[i];

        // ignorar espacios (si es que hay)
        if (c === ' ') 
                continue;
        // si es un dígito es de 0-9 creamos la hoja o nodo
        else if (c >= '0' && c <= '9') {
            valores.push(new ArbolBinario(c));
            continue;
        }

        // si es que hay '(' lo apilamos
        else if (c === '(') {
            ops.push(c);
        }

        // si es ')' aplicamos operadores hasta encontrar '('
        else if (c === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                aplicarOperacion();
            }
            // quitar el '(' de la pila
            if (ops.length > 0 && ops[ops.length - 1] === '(') {
                ops.pop();
            }
            continue;
        }

        // si es un operador + - * /
        if (c === '+' || c === '-' || c === '*' || c === '/') {
            // mientras la pila de operadores no esté vacía y el operador
            // de arriba tenga mayor o igual importancia, aplicarlo primero
            while (
                ops.length > 0 &&
                jerarquia(ops[ops.length - 1]) >= jerarquia(c)
            ) {
                aplicarOperacion();
            }
            // luego apilar el operador actual
            ops.push(c);
        }else{

        // si llegamos aquí, es un carácter inesperado
        console.warn('No valido:', c);
        }
    }

    // al final, aplicar lo que quede en la pila de operadores
    while (ops.length > 0) {
        aplicarOperacion();
    }

    // el resultado final está en la cima de la pila de valores
    return valores.pop(); // raíz del árbol
}



function preorder(nodo, resultado = []) {
    if (!nodo) return resultado;
    resultado.push(nodo.valor);         // visitar nodo o raiz
    preorder(nodo.izq, resultado);      // ir a la izquierda
    preorder(nodo.der, resultado);      // ir a la derecha
    return resultado;
}

function postorder(nodo, resultado = []) {
    if (nodo === null) return resultado;
    postorder(nodo.izq, resultado);     // izquierda
    postorder(nodo.der, resultado);     // derecha
    resultado.push(nodo.valor);         // visitar nodo o raiz
    return resultado;
}


// evaluar PreOrder con recursión
// y partes puede ser número u operador
// si es número lo devolverlo
// si es operador lo toma para hacer recursivamente dos valores (izq y der) y aplicar
/*function evaluarPreorder(partes) {
    let indice = 0; // variable que avanza por la lista

    function aux() {
        const t = partes[indice++];
        // si es número de '0' a '9' devolvemos número
        if (t >= '0' && t <= '9') return Number(t);

        // si es operador, resolver subárbol izquierdo y derecho
        const a = aux(); // izquierda
        const b = aux(); // derecha

        // aplicar el operador t entre a y b
        if (t === '+') return a + b;
        if (t === '-') return a - b;
        if (t === '*') return a * b;
        if (t === '/') return a / b;

        // si llega algun valor de los que no estan aqui
        console.log('Este elemento no es permitido' + t);
    SACADO DE LA WEB
    return aux();
}*/


function evaluarPreorder2(partes) {
    const pila = []; // Se crea la pila para ir guardando los números y resultado

    //Se recorrre de derecha a izquierda
    for (let i = partes.length-1; i >=0; i--) {
        const t = partes[i];    //elemento actual

        // Si es número es del 0 al 9
        if (t >= '0' && t <= '9') {
            pila.push(Number(t));//Number convierte de texto a número real
        } else {
            // Si es un operador
            const a = pila.pop();
            const b = pila.pop();

            let resultado = 0;

            if (t === '+') resultado = a + b;
            else if (t === '-') resultado = a - b;
            else if (t === '*') resultado = a * b;
            else if (t === '/') resultado = a / b;
            else {
                console.log("Este elemento no es permitido:", t);
            }

            // Guardamos el resultado en la pila
            pila.push(resultado);
        }
    }

    return pila.pop(); // el último número es la respuesta final
}

// evaluar PostOrder con pila
// recorrer partes; si es número lo apilas; si es operador sacas dos números, aplicamos y ponemos el resultado.
function evaluarPostorder(partes) {
    const pila = [];

    for (let i = 0; i < partes.length; i++) {
        const t = partes[i];

        // Si es número es del 0 al 9
        if (t >= '0' && t <= '9') {
            pila.push(Number(t));
        } else {
            // Si es un operador
            const b = pila.pop();
            const a = pila.pop();

            let resultado = 0;

            if (t === '+') resultado = a + b;
            else if (t === '-') resultado = a - b;
            else if (t === '*') resultado = a * b;
            else if (t === '/') resultado = a / b;
            else {
                console.log("Este elemento no es permitido:", t);
            }

            // Guardamos el resultado en la pila
            pila.push(resultado);
        }
    }

    return pila.pop(); // el último número es la respuesta final
}



(function prueba() {

    const expresion = "3+5*(2-1)";

    console.log("Expresion:", expresion);

    const raiz = construirArbol(expresion);  

    const pre = preorder(raiz);
    const post = postorder(raiz);

    console.log("Preorder:", pre);
    console.log("Postorder:", post.join(" "));

    console.log("Resultado Preorder:", evaluarPreorder2(pre));
    console.log("Resultado Postorder:", evaluarPostorder(post));
})();
