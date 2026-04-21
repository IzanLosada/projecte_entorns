# 03_entorn_i_prototip.md

## 1. IDE utilitzat i configuració bàsica

### IDE escollit

S’ha utilitzat **Visual Studio Code (VS Code)** com a entorn de desenvolupament principal.

### Justificació

VS Code ja estava previst a la Fase 1 i és adequat per treballar amb **JavaScript** i projectes web. Permet una integració senzilla amb estructures modulars com la definida a la Fase 2.

### Extensions utilitzades

* **Live Server** → execució en navegador
* **Prettier** → format automàtic del codi
* **ESLint** → control d’errors

### Configuració del projecte

S’ha respectat l’estructura definida a la Fase 2:

```text
blokic-project/
├── assets/
├── diagrames/
├── src/
│   ├── main.js
│   ├── board.js
│   ├── piece.js
│   └── ui.js
├── docs/
├── index.html
├── README.md
└── .gitignore
```

### Execució del projecte

* Obrir el projecte amb VS Code
* Executar `index.html` amb Live Server
* El joc funciona al navegador (HTML5)

---

## 2. Decisions inicials d’implementació

### Tecnologia utilitzada

A la Fase 1 es proposaven dues opcions (**Godot o Phaser**).
Finalment, per al prototip s’ha optat per:

👉 **JavaScript amb HTML5 Canvas (sense motor extern)**

### Justificació

* Redueix la complexitat inicial
* Permet implementar ràpidament la lògica basada en matrius (tal com es defineix a la Fase 1)
* Manté compatibilitat amb l’estructura JS definida a la Fase 2

---

### Arquitectura del projecte

Totalment alineada amb el model de la Fase 2:

* **Board (`board.js`)**

  * Gestiona la matriu 8x8
  * Controla col·lisions i línies

* **Piece (`piece.js`)**

  * Defineix formes (matrius)
  * Gestiona estat de col·locació

* **GameManager (`main.js`)**

  * Controla el bucle de joc
  * Gestiona estat global

---

### Representació de dades

Seguint exactament la Fase 2:

* Taulell → `matrix[8][8]`

* Valors:

  * `0` = buit
  * `1` = ocupat

* Peces → matrius (3x3 principalment)

---

### Sistema d’interacció

⚠️ Adaptació conscient respecte a la Fase 1:

A la idea original:

* Drag & drop

En el prototip:

* Selecció amb clic
* Col·locació amb clic

👉 Justificació:
Simplificació tècnica per assegurar un prototip funcional dins del temps disponible.

---

### Generació de peces

* Es generen en grups de **3 peces** (coherent amb Fase 1)
* Formes predefinides
* Selecció aleatòria

---

### Lògica implementada

Totalment alineada amb el **Game Loop de la Fase 1**:

1. Analitzar → estat del taulell + peces
2. Executar → col·locació
3. Avaluar → neteja de línies
4. Reposar → noves peces

També inclou:

* Validació de posicions (`checkFit`)
* Eliminació de línies (`clearLines`)

---

## 3. Evidències visuals

*(Afegir captures en el lliurament)*

* VS Code amb el projecte obert
* Estructura de carpetes
* Joc executant-se al navegador
* Taulell 8x8 amb peces

---

## 4. Codi: prototip executable

### Estat del prototip

El prototip actual implementa:

✔ Inicialització del taulell 8x8
✔ Generació de peces (3 per torn)
✔ Col·locació de peces
✔ Validació de moviments
✔ Eliminació de files i columnes
✔ Reposició de peces
✔ Bucle de joc funcional

---

### Bucle de joc

Implementat amb `requestAnimationFrame`, seguint el model definit:

* Loop continu
* Actualització d’estat
* Renderitzat del taulell

---

## 5. Interacció amb l’usuari

L’usuari pot:

* Seleccionar una peça disponible
* Intentar col·locar-la al taulell

El sistema:

* Comprova si encaixa (`checkFit`)
* Actualitza la matriu
* Elimina línies completes

---

## 6. Control de versions

### Commits realitzats

1. `init project structure based on phase 2 model`
2. `implement board matrix and fit validation logic`
3. `add piece system and line clearing mechanics`

### Bones pràctiques

* Missatges descriptius
* Commits separats per funcionalitat
* Evitat ús de “update/test”

---

## 7. Compliment de condicions mínimes

✔ El projecte s’executa sense errors crítics
✔ Existeix interacció amb l’usuari
✔ Existeix un bucle de joc funcional
✔ El joc arrenca correctament

---

## 8. Estat actual del projecte

El prototip de **Blokic** valida correctament la mecànica principal definida a la Fase 1:

* Gestió d’espai en graella 8x8
* Col·locació estratègica de peces
* Eliminació de línies

Encara no s’han implementat:

* Temporitzador (mode Panic)
* Sistema complet de puntuació
* Drag & drop real

Aquestes funcionalitats es desenvolupen en fases posteriors.
