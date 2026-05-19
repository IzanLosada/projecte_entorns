# BLOKIC - Manual de Usuario

## 🎮 Bienvenido a BLOKIC

BLOKIC es un juego de puzzle lógico retro con un estilo neon vibrante. Combina mecánicas de Tetris con un tablero de 8x8 casillas donde debes colocar piezas estratégicamente para completar líneas y filas.

---

## 📋 Índice

1. [Inicio Rápido](#inicio-rápido)
2. [Modos de Juego](#modos-de-juego)
3. [Controles](#controles)
4. [Mecánicas del Juego](#mecánicas-del-juego)
5. [Puntuación](#puntuación)
6. [Ajustes](#ajustes)
7. [Resolución de Problemas](#resolución-de-problemas)

---

## 🚀 Inicio Rápido

### Primer Paso: Inicia el Juego

1. Abre `index.html` en tu navegador
2. Haz clic en el botón **JUGAR** en la pantalla de inicio
3. Selecciona uno de los dos modos disponibles

### Segundo Paso: Coloca Piezas

1. Selecciona una pieza en la sección **PIEZAS DISPONIBLES** (abajo)
2. Arrastra la pieza hacia el tablero (centro de la pantalla)
3. ¡Completa líneas y columnas para ganar puntos!

---

## 🎯 Modos de Juego

### CHILL MODE (Modo Relajado) ☮️

- **Sin límite de tiempo** - Juega a tu propio ritmo
- **Menos presión** - Perfecto para aprender a jugar
- **Objetivo**: Coloca el máximo número de piezas sin quedarte sin movimientos
- **Duración**: Variable según tu estrategia

**Estrategia recomendada:**
- Piensa bien antes de colocar cada pieza
- Intenta completar líneas y filas para ganar más puntos
- Evita llenar las esquinas sin dejar espacio para piezas futuras

---

### HARD MODE (Modo Intenso) ⚡

- **3 minutos de juego** - ¡El tiempo es tu enemigo!
- **Tiempo acelerado** - Según subes de puntuación, el tiempo baja más rápido
- **Bonus de tiempo** - Completa líneas para ganar segundos extra
- **Mayor dificultad**: Requiere rapidez y precisión

**Estrategia recomendada:**
- Aprende a jugar primero en Chill Mode
- Practica movimientos rápidos y decisiones intuitivas
- Prioriza completar líneas para ganar tiempo extra
- Mantén el tablero desorganizado - un tablero muy limpio es difícil de llenar

---

## 🖱️ Controles

### En el Tablero

| Acción | Control |
|--------|---------|
| **Seleccionar pieza** | Haz clic en la pieza en la sección de piezas disponibles |
| **Mover pieza** | Arrastra (drag) la pieza al tablero con el mouse |
| **Colocar pieza** | Suelta el botón del mouse sobre una casilla válida |
| **Vista previa** | La pieza se muestra en verde (válida) o rojo (inválida) |

### Botones del Juego

- **PAUSAR** - Pausa el juego en cualquier momento (excepto al arrastrar)
- **MENÚ** - Vuelve a la pantalla principal (sin guardar)
- **REANUDAR** - Continúa el juego después de pausar
- **JUGAR DE NUEVO** - Inicia una nueva partida tras game over

### Controles de Pantalla

- **× (Cerrar)** - Vuelve a la pantalla anterior
- **AJUSTES** - Accede a la configuración de sonido y fondos

---

## 🎮 Mecánicas del Juego

### El Tablero

- **Tamaño**: Cuadrícula de 8x8 casillas
- **Objetivo**: Completar filas y columnas para limpiar el tablero
- **Límite**: No puedes colocar piezas una encima de otra

### Piezas

- **Variedad**: 22 formas diferentes de piezas (desde bloques únicos hasta L-shapes)
- **Colores**: Cada pieza tiene un color distintivo para mejor visualización
- **Cantidad**: Siempre tienes 3 piezas disponibles
- **Renovación**: Cuando colocas todas las piezas, cargas 3 nuevas automáticamente

### Sistema de Líneas

**Completar una línea horizontal:**
- Todas las 8 casillas de una fila están llenas
- La fila se limpia automáticamente
- Ganas puntos y combos

**Completar una columna vertical:**
- Todas las 8 casillas de una columna están llenas
- La columna se limpia automáticamente
- Ganas puntos y combos

**Limpiar múltiples líneas:**
- Si completas varios líneas al mismo tiempo, se limpian todas
- Tu combo aumenta (multiplicador de puntos)

### Game Over

El juego termina cuando:
1. **Sin movimientos disponibles** - No caben más piezas en el tablero
2. **Tiempo agotado** (solo en Hard Mode)

---

## 📊 Puntuación

### Cálculo de Puntos

```
Puntos por pieza = 10
Puntos por línea = 50 × (Combo + 1) × Número de líneas
Combo = Incrementa cada vez que completas líneas consecutivas
```

### Ejemplos

- **Colocar una pieza sin completar líneas**: +10 puntos
- **Completar 1 línea (combo x1)**: 50 × 1 × 1 = **50 puntos**
- **Completar 1 línea (combo x3)**: 50 × 4 × 1 = **200 puntos**
- **Completar 2 líneas (combo x2)**: 50 × 3 × 2 = **300 puntos**

### Bonus en Hard Mode

- Cada línea completada suma **5 segundos** al cronómetro
- Cuantos más puntos tengas, más rápido baja el tiempo (efecto acelerador)
- Estrategia: Completa líneas para ganar tiempo extra

### Mejor Puntuación

Las puntuaciones máximas dependen de tu estrategia:
- **Chill Mode**: Ilimitado - juega hasta que no haya movimientos
- **Hard Mode**: 3 minutos máximo, busca el equilibrio entre velocidad y puntos

---

## ⚙️ Ajustes

Accede a **AJUSTES** desde la pantalla principal para personalizar tu experiencia.

### Volumen 🔊

- **Volumen Música**: 0-100% (música de fondo)
- **Volumen Efectos**: 0-100% (sonidos de juego)
- Usa los sliders para ajustar a tu preferencia

### Opciones

- **Activar/Desactivar Música**: Toggle para música de fondo
- **Activar/Desactivar Efectos**: Toggle para sonidos de juego

### Fondos 🎨

Selecciona entre 6 temas visuales diferentes:

1. **Oscuro** - Degradado oscuro clásico
2. **Neon** - Grid neon puro
3. **Púrpura** - Colores púrpura profundos
4. **Cian** - Tonos azul cian
5. **Matrix** - Estilo matrix con líneas verdes
6. **Fuego** - Tonos rojos incandescentes

Los ajustes se guardan automáticamente en tu navegador.

---

## 🎵 Sonido

### Efectos de Sonido

- **Colocar pieza**: Sonido agudo y limpio
- **Línea completada**: Progresión de 3 notas ascendentes
- **Lote completado**: Progresión musical al cargar nuevas piezas
- **Game Over**: Sonido descendente de derrota
- **Warning/Crítico**: Beeps de tensión en Hard Mode cuando el tiempo baja
- **Click UI**: Sonidos suaves para botones
- **Error**: Sonido de buzzer cuando colocas una pieza de forma inválida

### Música de Fondo

- Melodía tipo Tetris que se repite cada 3.5 segundos
- Sintetizada en tiempo real sin archivos de audio
- Completamente desactivable en ajustes

---

## 📱 Compatibilidad y Dispositivos

### Escritorio
- ✅ Chrome, Firefox, Edge, Safari
- ✅ Resolución completa recomendada para mejor experiencia
- ✅ Mejor con mouse/trackpad

### Tablet
- ✅ Compatible con touch
- ✅ Se adapta a diferentes tamaños de pantalla
- ✅ Funciona en orientación vertical y horizontal

### Móvil
- ✅ Totalmente responsive
- ✅ Optimizado para pantallas pequeñas
- ✅ Controles táctiles nativos
- ⚠️ Mejor experiencia en orientación horizontal

---

## 🔧 Resolución de Problemas

### El sonido no funciona

1. Verifica que los efectos estén habilitados en **AJUSTES**
2. Comprueba que el volumen del navegador no esté en 0%
3. Prueba a recargar la página
4. Algunos navegadores requieren interacción antes de reproducir audio

**Nota**: El audio se sintetiza en tiempo real. Si tu navegador es muy antiguo, puede no funcionar.

### El juego va lento

1. Cierra otras pestañas/aplicaciones
2. Comprueba tu conexión a internet (aunque sea offline)
3. Intenta recargar la página
4. En dispositivos móviles, esto es normal en piezas muy grandes

### Las piezas no se colocan

Verifica que:
1. La pieza esté **seleccionada** (borde amarillo/dorado)
2. Estés soltando la pieza **dentro del tablero**
3. Haya **espacio disponible** en esa ubicación
4. La pieza en verde significa que es válida; en rojo que no cabe

### El juego se congela

1. Presiona **PAUSAR** y luego **REANUDAR**
2. Si persiste, recarga la página
3. Asegúrate de que tu navegador esté actualizado

### La puntuación no se guarda

Las puntuaciones de juego NO se guardan automáticamente. BLOKIC es un juego sin servidor.

**Solución**: Toma una captura de pantalla del modal de Game Over si quieres guardar tu puntuación.

---

## 💡 Tips y Trucos

### Para Principiantes

1. **Comienza en Chill Mode** - Aprende las mecánicas sin presión de tiempo
2. **Estudia el tablero** - Antes de colocar, piensa en las piezas futuras
3. **Completa líneas** - Esto da mucho más puntos que solo llenar casillas
4. **Deja espacio** - No rellenes todo el tablero, deja huecos estratégicos

### Estrategia Avanzada

1. **Aprende los patrones** - Memoriza las formas de las piezas
2. **Modo anticipatorio** - Consulta "PRÓXIMAS" para planificar
3. **Combo chaining** - Intenta completar líneas consecutivamente para multiplicadores
4. **Control del caos** - A veces un tablero "feo" es mejor que uno "limpio"

### Para Hard Mode

1. **Velocidad sobre perfección** - Coloca rápido, no pienses demasiado
2. **Prioriza líneas** - Las líneas = tiempo = victoria
3. **Reconocimiento rápido** - Asocia colores a posiciones
4. **Practice Mode** - Juega Chill primero para calentar

---

## 🏆 Objetivos Sugeridos

Prueba a alcanzar estos hitos:

- **Principiante**: 500 puntos en Chill Mode
- **Intermedio**: 1000 puntos completando 10+ líneas
- **Avanzado**: 200+ puntos en Hard Mode
- **Master**: +500 puntos con combo x5 o superior
- **Speedrunner**: 30+ segundos restantes en Hard Mode

---

## 📞 Soporte Técnico

Si encuentras bugs o problemas:

1. **Recarga la página** - Soluciona la mayoría de problemas
2. **Limpia el caché** - Ctrl+Shift+Supr (Ctrl+Cmd+Supr en Mac)
3. **Comprueba el navegador** - Usa navegadores modernos (Chrome, Firefox, Safari, Edge)
4. **Verifica los archivos** - Asegúrate de que todos los archivos .js y .css estén presentes

---

## 📖 Información del Juego

**Nombre**: BLOKIC  
**Versión**: 1.0 - Retro Edition  
**Género**: Puzzle de Lógica  
**Plataforma**: Web (HTML5 Canvas, Vanilla JavaScript)  
**Tamaño**: Micro-aplicación  
**Audio**: Sintetizado en tiempo real  

**Créditos**:
- Inspirado en clásicos de puzzle como Tetris
- Diseño retro-neon moderno
- Audio sintetizado con Web Audio API

---

## 🎓 Aprende Más

Para información técnica sobre cómo está hecho el juego, consulta el **Manual Técnico** incluido en el proyecto.

---

**¡Que disfrutes jugando BLOKIC! 🎮✨**

*Última actualización: Mayo 2026*
