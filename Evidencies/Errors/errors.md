# Errores BLOKIC

### 1. Defectos de Diseño Responsivo y Escalado Visual
* **Descripción:** Falta de adaptabilidad dinámica en el contenedor de piezas listas, el panel de vista previa y el tablero principal frente a cambios de resolución o redimensionamiento del *viewport*. 
* **Impacto y Consecuencias:** Bajo ciertas resoluciones de pantalla u orientaciones de dispositivos móviles (vertical/horizontal), los elementos esenciales de la interfaz de usuario se cortaban, se desalineaban o se renderizaban de forma incorrecta en el lienzo (*canvas*). Esto impedía una visualización íntegra del espacio jugable, afectando críticamente la experiencia del usuario (UX) al ocultar información visual necesaria para la partida.

### 2. Incompatibilidad y Fallos Críticos en el Sistema de Audio
* **Descripción:** Comportamiento anómalo e intermitente en la API de audio encargada de la gestión del sonido del sistema. Dependiendo del navegador o de la versión del motor de ejecución web, el sonido sufría de una calidad degradada o fallaba en su totalidad.
* **Impacto y Consecuencias:** El mal funcionamiento afectaba tanto a la música ambiental en bucle como a los efectos sonoros de interacción (colocación de piezas, destrucción de líneas, alertas). Esto anulaba el *feedback* auditivo del juego, disminuyendo drásticamente la inmersión del jugador y provocando que las alertas críticas del modo difícil pasaran desapercibidas.

### 3. Ausencia de Validación de Colisiones e Inserciones Ilegales
* **Descripción:** Defecto grave en el motor de reglas espaciales del tablero que permitía la superposición de entidades. El algoritmo no validaba correctamente si las casillas de destino ya contenían bloques fijos, permitiendo posicionar una pieza encima de otra.
* **Impacto y Consecuencias:** Al no existir un control estricto de ocupación de celdas, se rompía la mecánica base del juego. Como consecuencia inmediata, el tablero nunca llegaba a saturarse por completo, anulando la condición de derrota (*Game Over*) por falta de movimientos y haciendo que el juego fuera infinito de manera artificial y carente de reto.

### 4. Desincronización Lógica en Métricas de Competición (Hard Mode)
* **Descripción:** Presencia de fallos lógicos en los hilos de actualización del *Hard Mode*, específicamente en las funciones encargadas de procesar la adición de puntuación base, los multiplicadores por combos y la bonificación compensatoria de tiempo.
* **Impacto y Consecuencias:** Provocaba incoherencias numéricas donde las acciones del jugador (como limpiar múltiples líneas simultáneamente) no se reflejaban de forma justa o exacta en el temporizador ni en la puntuación global. Esto alteraba la curva de dificultad balanceada del modo, generando frustración o ventajas injustas durante la sesión de juego.

### 5. Solapamiento Funcional entre Modos de Juego
* **Descripción:** Existencia de un cruce o mezcla de variables de estado y directivas lógicas entre el Modo Zen (diseñado conceptualmente para ser libre de presión y sin límite de tiempo) y residuos de código pertenecientes a un "Modo Fácil".
* **Impacto y Consecuencias:** El flujo de ejecución de la máquina de estados se volvía ambiguo, provocando que ciertas restricciones temporales o mecánicas de puntuación se activaran de forma errónea en salas donde el jugador buscaba una experiencia puramente relajada, mermando la claridad y consistencia de los modos de juego ofrecidos.
