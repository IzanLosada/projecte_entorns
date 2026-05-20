# Manual Técnico de Arquitectura e Implementación - BLOKIC

## 1. Introducción y Especificaciones del Sistema

**BLOKIC** es un videojuego de puzzle lógico en dos dimensiones diseñado para navegadores web contemporáneos. Visualmente renderizado sobre el elemento `<canvas>` de HTML5, implementa una estética "Retro Edition" con un alto grado de interactividad responsiva. 

### Especificaciones Técnicas Básicas
* **Tecnología Base:** HTML5, CSS3, JavaScript Avanzado (ECMAScript 6+).
* **Dependencias Externas:** Ninguna (Vanilla JS puro).
* **Motor de Renderizado:** Canvas 2D API.
* **Persistencia:** Web Storage API (`localStorage`).
* **Soporte de Entrada:** API de Eventos de Puntero (`PointerEvents`: ratón y pantallas táctiles integrados).

---

## 2. Arquitectura del Software

El sistema sigue un enfoque orientado a objetos estructurado de forma modular y desacoplada en cuatro componentes principales:

[ index.html (DOM/Vistas/UI) ]│▼[ GameManager (main.js) ] ◄─── Bucle Principal (requestAnimationFrame)│              │▼              ▼[ Board (board.js) ] [ PieceManager (piece.js) ] ──► [ Piece ]
1. **Capa de Presentación (DOM / UI):** Administrada por `index.html`. Modula el árbol de nodos mediante un sistema jerárquico de pantallas activas/inactivas gobernadas por CSS.
2. **Controlador Central (`GameManager`):** Orquestador en `main.js`. Gobierna el bucle de juego, inicializa los submódulos, captura la interacción del usuario (`PointerEvents`) y calcula el delta de tiempo físico.
3. **Módulo de Entidades Espaciales (`Board`):** Definido en `board.js`. Estructura matricial que implementa el álgebra bidimensional para validar colisiones, inserciones y la destrucción de líneas.
4. **Módulo de Elementos de Juego (`Piece` y `PieceManager`):** Estructurado en `piece.js`. Administra las geometrías poliominoes, su generación aleatoria por lotes (*batches*) y sus estados de selección.

---

## 3. Especificación Detallada de Módulos

### 3.1. Clase `GameManager` (`main.js`)
Es el motor central del juego. Controla los estados y transiciones globales de la aplicación.

* **Propiedades Principales:**
  * `canvas`, `ctx`: Elemento de lienzo y su contexto de dibujo bidimensional.
  * `board`: Instancia de la clase `Board`.
  * `pieceManager`: Instancia de la clase `PieceManager`.
  * `gameMode`: Cadena de texto (`'zen'` | `'hard'`) que define las reglas activas.
  * `dragState`: Objeto compuesto que rastrea el arrastre de piezas: `{ active, pieceId, pointerX, pointerY, hoverCell }`.
  * `score`, `linesCleared`, `combo`: Primitivas numéricas para la computación del progreso del usuario.
  * `timeRemaining`, `timeElapsed`: Variables de control cronométrico de precisión flotante.

* **Métodos Críticos:**
  * `initEventListeners()`: Acopla los escuchas de eventos mecánicos (`pointermove`, `pointerdown`, `pointerup`) y eventos de la interfaz de usuario de los menús.
  * `resizeCanvas()`: Ajusta dinámicamente el tamaño físico y lógico del lienzo basándose en las dimensiones de la ventana (`window.innerWidth/Height`), modificando el tamaño de celda (`cellSize`) según el factor de forma del dispositivo (móvil vs. escritorio).
  * `animate(currentTime)`: Implementa el bucle de renderizado de alta frecuencia a través de `requestAnimationFrame`. Calcula el `deltaTime` para asegurar actualizaciones estables de tiempo de juego independientemente de los hertzios de refresco del monitor.
  * `tryPlaceSelectedPiece()`: Ejecuta la validación lógica con el tablero. Si es exitosa, procesa la inserción de la pieza, ejecuta el vaciado de líneas, computa la puntuación y remueve la pieza del set disponible.

### 3.2. Clase `Board` (`board.js`)
Administra una retícula de datos bidimensional y abstrae las colisiones físicas y lógicas del juego.

* **Estructura de Datos Interna:**
  * `matrix`: Matriz bidimensional de dimensiones prefijadas ($8 \times 8$ por defecto) inicializada con ceros (`0` = Vacío, `1` = Ocupado).
  * `colorMatrix`: Matriz bidimensional paralela que guarda cadenas hexadecimales representativas del color que ocupa dicha celda o `null`.

* **Métodos Críticos:**
  * `isInside(x, y)`: Validación booleana que garantiza que un par de coordenadas no desborde los límites de la matriz ($0 \le x < \text{width}$, $0 \le y < \text{height}$).
  * `canPlacePiece(piece, x, y)`: Comprueba si una pieza determinada puede insertarse de forma legal con su esquina superior izquierda situada en la coordenada `(x, y)`. Recorre los bloques internos de la pieza evaluando si `matrix[boardY][boardX] === 0`.
  * `placePiece(piece, x, y)`: Modifica las estructuras indexadas `matrix` y `colorMatrix` escribiendo los identificadores de bloqueo correspondientes a la pieza posicionada.
  * `getCompleteLines()`: Escanea de manera exhaustiva el tablero buscando índices de filas y columnas que contengan celdas completamente llenas (sin presencia de ceros), retornando un objeto con vectores de índices de filas y columnas completadas.
  * `clearLines()`: Limpia las celdas de las líneas pasadas como argumento, activando los estados internos de animación (`clearAnimation = 1.0`) y guardando las coordenadas en `lastClearedCells` para el efecto de destello visual.
  * `hasAvailableMoves(pieces)`: Algoritmo de fuerza bruta optimizado que evalúa si queda algún movimiento válido. Recorre cada celda del tablero probando si alguna de las piezas del jugador encaja mediante `canPlacePiece()`.

### 3.3. Clases `Piece` y `PieceManager` (`piece.js`)
Gobiernan la geometría y el ciclo de vida de los bloques utilizables.

* **Clase `Piece`:**
  * Contiene un diccionario estático `SHAPES` con matrices binarias rígidas que definen formas como `single` ($1 \times 1$), `horizontal2`/`vertical2`, hasta estructuras complejas de tipo `square2x2`, `lBlock`, `tBlock`, `sBlock`, `zBlock`, y `plus` (cruz de 5 bloques).
  * Contiene un vector estático `COLORS` con 6 variables cromáticas vibrantes de estilo retro/neón.
  * El método `getBlocks()` mapea la matriz de la forma activa hacia un array indexado de coordenadas locales `{ x, y }` omitiendo los espacios vacíos (`0`).

* **Clase `PieceManager`:**
  * Almacena buffers separados para el turno activo (`currentPieces`) y la vista previa (`nextPieces`).
  * `refillIfNeeded()`: Evalúa si `currentPieces` se ha vaciado por completo. Si es verdadero, transfiere el lote de `nextPieces` hacia `currentPieces` y genera un nuevo lote aleatorio para `nextPieces` llamando a `createBatch()`.

---

## 4. Lógica de Negocio y Algoritmos Matemáticos

### 4.1. Sistema de Puntuación y Multiplicadores de Combo
Cuando una pieza es posicionada con éxito en el tablero, se adjudican puntos en base al número de bloques insertados y a la ejecución de combos por destrucción de líneas.

La puntuación base por inserción de pieza se define de forma constante:
$$\text{Score}_{\text{base}} = 10$$

Cuando se limpian líneas de forma simultánea, se aplica la siguiente fórmula polinomial parametrizada por el multiplicador de combo actual:
$$\text{Score}_{\text{líneas}} = 50 \times (\text{combo} + 1) \times L$$

Donde:
* $L$: Cantidad total de líneas completadas simultáneamente (Filas + Columnas).
* $\text{combo}$: Contador entero incremental que denota cuántas piezas seguidas han generado destrucción de líneas. Si una pieza se coloca sin limpiar ninguna línea, el `combo` se reinicia inmediatamente a $0$.

### 4.2. Algoritmo de Dificultad Dinámica y Consumo de Tiempo (Hard Mode)
En el modo de juego "Hard Mode", el sistema gestiona un temporizador regresivo que drena el tiempo disponible de forma continua en el bucle principal empleando una tasa adaptativa indexada al rendimiento del jugador.

El decremento de tiempo en cada cuadro de animación sigue la ecuación lineal:
$$T_{\text{restante}} = T_{\text{restante}} - (\Delta t \times R_{\text{drenaje}})$$

Donde $\Delta t$ es el desfase de tiempo real transcurrido entre cuadros (expresado en segundos) y $R_{\text{drenaje}}$ es el coeficiente de drenaje acelerado, calculado mediante la siguiente función de saturación:
$$R_{\text{drenaje}} = 1 + \min\left(1.5, \frac{\text{Score}}{1800}\right)$$

* **Análisis de Límite:** Al inicio del juego ($\text{Score} = 0$), la tasa de drenaje es simétrica al tiempo real ($1.0$ segundo por segundo). A medida que la puntuación incrementa, la velocidad de consumo escala proporcionalmente hasta saturarse en un límite superior asintótico de $2.5$ segundos de penalización por cada segundo cronológico transcurrido, aumentando significativamente la dificultad en etapas avanzadas.
* **Bonificación de Tiempo:** Por cada línea destruida con éxito, el usuario recibe un crédito de compensación directa en el buffer temporal:
  $$\Delta T_{\text{bono}} = L \times 5\text{ segundos}$$

### 4.3. Algoritmo de Detección de Líneas Completas
La verificación de líneas es simétrica y simultánea. El motor analiza de forma ortogonal el estado lógico del tablero en busca de vectores llenos:

```javascript
// Proceso algorítmico implementado en board.js
getCompleteLines() {
    let rows = [];
    let cols = [];

    // Verificación Horizontal (Filas)
    for (let y = 0; y < this.height; y++) {
        if (this.matrix[y].every(cell => cell === 1)) {
            rows.push(y);
        }
    }

    // Verificación Vertical (Columnas)
    for (let x = 0; x < this.width; x++) {
        let colFilled = true;
        for (let y = 0; y < this.height; y++) {
            if (this.matrix[y][x] === 0) {
                colFilled = false;
                break;
            }
        }
        if (colFilled) cols.push(x);
    }
    return { rows, cols };
}
5. Gestión del Estado de Juego y Ciclo de VidaEl ciclo de ejecución global es gobernado por una máquina de estados finitos (FSM) implícita en la propiedad currentScreen y las variables de control de flujo booleanas de GameManager:               ┌───────────────┐
               │  START SCREEN │
               └───────┬───────┘
                       │ Jugar()
                       ▼
               ┌───────────────┐
 ┌────────────►│  GAME SCREEN  │◄────────────┐
 │             └───────┬───────┘             │
 │                     │                     │
 │ Pausa()             │ GameOver()          │ Reanudar()
 ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  PAUSE MODAL  │     │   GAME OVER   │     │ AJUSTES/MODOS │
└───────────────┘     └───────────────┘     └───────────────┘
