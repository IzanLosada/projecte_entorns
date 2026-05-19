# 01_idea_i_abast.md

## 1. Títol provisional del joc
**Blokic**

## 2. Tipus de microvideojoc escollit
Es tracta d'un joc de **puzzle lògic sobre taulell** (estil *block-matching* o *grid-puzzle*), inspirat en mecàniques clàssiques de col·locació de peces on l'espai és el recurs principal.

## 3. Objectiu del joc
L'objectiu principal és aconseguir la màxima puntuació possible omplint files i columnes completes en un taulell de **8x8**. El joc busca oferir una experiència de "flux" on la satisfacció ve de netejar el taulell, afegint un component de tensió competitiva mitjançant un mode de dificultat basat en el temps.

---

## 4. Rol del jugador
El jugador actua com un estrateg que gestiona l'espai. El seu control és directe i intuïtiu:
* **Interacció:** El jugador selecciona i **arrossega (drag & drop)** peces de diferents formes des d'una reserva externa cap al taulell.
* **Decisions:** Ha de decidir on col·locar cada peça tenint en compte no només les línies immediates que pot tancar, sinó també els buits que deixa per a futures peces.

## 5. Regles bàsiques
* El taulell és una graella fixa de **8x8**.
* Les peces apareixen en grups de tres i s'han de col·locar totes abans de rebre una nova remesa.
* Una fila o columna s'elimina automàticament quan totes les seves cel·les estan ocupades.
* Les peces no es poden rotar, obligant al jugador a adaptar-se a la forma original.

## 6. Condicions de victòria i derrota
* **Victòria:** No hi ha una victòria definitiva; l'objectiu és la superació de rècords personals de puntuació.
* **Derrota:** Es produeix en dues situacions:
    1. **Bloqueig:** Quan cap de les peces disponibles es pot col·locar en cap lloc lliure del taulell.
    2. **Temps (Mode Difícil):** Si el temporitzador arriba a zero.

---

## 7. Bucle principal del joc
El bucle (core loop) es defineix en quatre passos cíclics:
1. **Analitzar:** Observar l'estat del taulell i les formes de les tres peces disponibles.
2. **Executar:** Arrossegar i deixar anar una peça en una posició vàlida.
3. **Avaluar:** El sistema comprova si hi ha línies completes, les neteja i actualitza la puntuació.
4. **Reposar:** Si s'han esgotat les peces, el sistema en genera tres de noves.

## 8. Repte principal i dificultat
El repte resideix en la **gestió de l'atzar**. La dificultat és progressiva: a mesura que puja la puntuació, el temporitzador es redueix més ràpidament. L'única manera de recuperar segons extres és completant línies (risc/recompensa).

## 9. Limitacions explícites
Per garantir que el projecte es finalitzi en 10 hores, el joc **NO** inclourà:
* Rotació de peces.
* Mode multijugador o rànquing en línia.
* Animacions 3D o efectes visuals complexos.
* Múltiples nivells (serà un mode infinit).

## 10. Riscos tècnics
1. **Lògica de col·lisió i "Snapping":** Programar la detecció exacta de quina cel·la ocupa la peça mentre s'arrossega per assegurar que encaixi perfectament.
2. **Algoritme de Game Over:** Implementar una comprovació que verifiqui si el joc ha de finalitzar per falta d'espai sense alentir el rendiment.
3. **Gestió d'estats del temporitzador:** Sincronitzar la recuperació de temps amb la destrucció de línies de forma equilibrada.

---

## 11. Exploració amb IA
* **Prompt 1:** "Necessito un algorisme en JavaScript per comprovar si una peça representada per una matriu de 3x3 pot encaixar en alguna posició lliure d'un taulell de 8x8."
    * **Resposta resumida:** La IA suggereix un doble bucle que recorre el taulell buscant una sub-matriu de zeros que coincideixi amb els "1" de la peça.
* **Prompt 2:** "Dissenya un sistema de puntuació que doni bonus per combos i explica com podria afectar això a un temporitzador."
    * **Resposta resumida:** Proposa una fórmula on $$Punts = (Línies \times 100) \times Multiplicador$$ i que cada línia sumi 5 segons al rellotge.

## 12. Proposta final escollida
S'ha escollit la creació de **Blokic** com un puzzle de blocs amb dos modes: **Zen** (sense temps) i **Panic** (amb temporitzador). És la millor opció per la seva escalabilitat i viabilitat tècnica.

## 13. Justificació de viabilitat
El projecte és viable perquè la mecànica base és purament matemàtica (matrius). No depèn d'actius artístics complexos i es pot programar un prototip funcional ràpidament, deixant temps per al poliment visual.

---

## 14. Mini pla de treball
* **Fase 1 (2h):** Configuració de l'entorn i lògica del taulell (matriu 8x8).
* **Fase 2 (3h):** Sistema d'arrossegar peces i detecció de línies completes.
* **Fase 3 (2h):** Lògica de puntuació, atzar en les peces i condició de derrota.
* **Fase 4 (2h):** Implementació del temporitzador i mode difícil.
* **Fase 5 (1h):** Disseny de la interfície (UI), menús i proves finals.

## 15. Eines previstes i justificació
* **Motor:** **Godot (GDScript)** o **Phaser (JS)** per la seva facilitat en la gestió de graelles i entrada de ratolí.
* **Gràfics:** **Piskel** o **Figma** per crear blocs minimalistes amb una estètica neta.
* **Codi:** **VS Code** per la seva agilitat en el desenvolupament.
