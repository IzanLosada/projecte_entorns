# 02_model_del_joc.md

## 1. Components principals del joc
El sistema de **Blokic** es divideix en tres mòduls que col·laboren per mantenir el flux del joc:

* **Gestor de Graella (Grid Engine):** Controla la matriu de 8x8, la validesa de les posicions i l'eliminació de files/columnes.
* **Controlador de Peces (Piece Controller):** Gestiona la creació de les peces (formes), el moviment de "arrossegar i deixar anar" (Drag & Drop) i el "snapping" (encaix) a la graella.
* **Nucli de Partida (Game Core):** Gestiona la puntuació, els modes de joc (Zen/Panic), el temporitzador i la detecció de Game Over per bloqueig.

---

## 2. Entitats identificades
1. **Board (Taulell):** L'entitat que conté l'estat actual de la graella.
2. **Piece (Peça):** Representa cada una de les formes que el jugador pot col·locar.
3. **GameManager:** L'entitat que orquestra el temps, la puntuació i les regles de negoci.

---

## 3. Atributs clau de cada entitat

| Entitat | Atributs principals |
| :--- | :--- |
| **Board** | `matrix` (Array 2D), `cellSize` (int), `gridColor` (Color) |
| **Piece** | `shape` (Matriu 3x3/5x5), `color` (String), `isPlaced` (Bool), `originalPos` (Vector2) |
| **GameManager** | `score` (int), `timer` (float), `gameMode` (String), `isGameOver` (Bool) |

---

## 4. Accions, mètodes o funcions principals

### Board
* `checkFit(piece, x, y)`: Valida si una peça cap en una posició específica.
* `clearLines()`: Revisa i buida línies completes, retornant el nombre de línies netejades.

### Piece
* `drag(position)`: Segueix el moviment del ratolí o el dit.
* `snapToGrid()`: Calcula la cel·la més propera per encaixar-hi.

### GameManager
* `spawnPieces()`: Genera una nova remesa de 3 peces aleatòries.
* `updateScore(lines)`: Calcula els punts aplicant bonus de combo.
* `checkLoseCondition()`: Executa l'algoritme de comprovació de bloqueig per falta d'espai.

---

## 5. Explicació del diagrama de classes

<img width="211" height="337" alt="image" src="https://github.com/user-attachments/assets/c7feb2e5-7623-42aa-8c66-354930762267" />

* **Què representa:** L'arquitectura estàtica del joc. Mostra com el `GameManager` actua com a cervell central que té una relació de possessió sobre el `Board` i una llista de `Piece`.
* **Organització:** S'ha organitzat per separar la representació visual (Peça) de la lògica de dades (Board). Això permet que, si en un futur vols afegir rotació, només hagis de modificar la classe `Piece` sense afectar el funcionament de la graella.

---

## 6. Explicació del diagrama de comportament

graph TD
    A([Inicio del Turno]) --> B[Jugador arrastra Pieza]
    B --> C[Jugador suelta Pieza]
    C --> D{¿Encaja en<br/>el Board?}
    
    D -- NO --> E[Vuelve a posición original]
    E --> B
    
    D -- SÍ --> F[Fijar en Matriz]
    F --> G[Limpiar Líneas]
    G --> H[Sumar Puntos / Tiempo]
    H --> I{¿Quedan Piezas?}
    
    I -- NO --> J[Spawn 3 nuevas piezas]
    J --> K
    I -- SÍ --> K[Comprobar Bloqueo]
    
    K --> L{¿Hay movimientos?}
    L -- SÍ --> M([Fin del Turno])
    L -- NO --> N[Game Over]

* **Tipus triat:** Diagrama d'Activitat (Game Loop).
* **Representació:** El diagrama mostra el cicle de vida d'un moviment: des que el jugador selecciona una peça, passant per la comprovació de col·lisió, fins a l'actualització del taulell i la recuperació de temps en el mode "Panic".
* **Flux del joc:** Reflecteix el bucle de "Analitzar -> Executar -> Avaluar -> Reposar" definit a la Fase 1.

---

## 7. Correspondència entre diagrames i codi futur
* **Classes a Codi:** Cada entitat es convertirà en un fitxer de script separat (ex: `board.js`). Els mètodes UML seran les funcions principals del codi.
* **Matrius:** L'atribut `matrix` del diagrama es programarà com un array de dos nivells (`board[x][y]`), on un `0` significa buit i un `1` significa ocupat.
* **Events:** El diagrama de comportament guiarà la implementació dels senyals: quan s'emet l'esdeveniment de "peça deixada", s'executaran les funcions de validació en l'ordre marcat pel diagrama.

---

## 8. Estructura inicial del repositori
L'organització del projecte és la següent:

```text
blokic-project/
├── assets/             # Sprites de blocs i fitxers d'àudio
├── diagrames/          # FASE 2: diagrames exportats
│   ├── diagrama_classes.png
│   └── diagrama_comportament.png
├── src/                # Codi font organitzat per entitats
│   ├── main.js         # Punt d'entrada del joc
│   ├── board.js        # Lògica del taulell
│   ├── piece.js        # Lògica de les peces
│   └── ui.js           # Gestió del menú i temporitzador
├── docs/               # Documentació del projecte
│   ├── 01_idea_i_abast.md
│   └── 02_model_del_joc.md
├── README.md           # Descripció i instruccions d'execució
└── .gitignore          # Exclusió de fitxers temporals
