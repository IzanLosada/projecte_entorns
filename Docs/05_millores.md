# Propostes de Millores Futures per a BLOKIC

Aquest document recopila un seguit de propostes de millores i noves funcionalitats per al projecte **BLOKIC**, estructurades per blocs temàtics. L'objectiu és enriquir l'experiència de joc, millorar la interfície d'usuari i donar més dinamisme al sistema d'àudio i mecàniques en futures versions del projecte.

---

## 1. Sistema d'Àudio i Música de Fons

Actualment el joc no inclou elements sonors dinàmics, per la qual cosa es proposa una implementació integral basada en la Web Audio API:

* **Afegir Música de Fons (BGM):** Implementar un bucle de música retro / chiptune que acompanyi el jugador durant la partida, millorant la immersió sense necessitat de carregar fitxers externs pesats.
* **Efectes de So Integrats (SFX):** Desenvolupar efectes de so generatius mitjançant oscil·ladors per a accions clau del joc:
    * *So de clic* en prémer els botons dels menús.
    * *So de col·locació* en encaixar una peça correctament al tauler.
    * *So de línia completada* per celebrar quan s'esborren una o més línies de forma simultània.
    * *So d'alerta de temps* quan el temporitzador estigui a punt d'esgotar-se.
    * *So de combinació (Combo)* que pugi de to harmònic a mesura que es facin ratxes consecutives.
* **Control i Configuració del Volum:** Incorporar un panell d'ajust d'àudio que permeti als jugadors activar/desactivar la música i els efectes de forma independent, així com regular els seus volums mitjançant barres lliscants (*sliders*).

---

## 2. Millores Estètiques i Interfície d'Usuari (UI)

La presentació visual i els menús es poden potenciar per oferir un acabat molt més atractiu, immersiu i interactiu:

* **Estil Retro-Futurista i Neon Glow:** Enriquir l'estil CSS general utilitzant variables de colors vius (rosa, cian, groc) combinades amb efectes d'ombra (`text-shadow` i `box-shadow`) per simular un autèntic acabat de neó fluorescent.
* **Animacions de Transició i Fluïdesa:** Afegir animacions clau mitjançant CSS (`@keyframes`) per fer que les pantalles apareguin amb un efecte d'escala o lliscament en lloc d'un canvi brusc, incrementant la sensació de programari premium.
* **Selecció de Fons Dinàmics:** Dissenyar un selector de temes visuals des del menú d'ajustes, que permeti alternar entre diferents estils de fons:
    * *Neon Grid:* Una quadrícula clàssica d'estil retro d'estètica vuitantera.
    * *Matrix:* Un patró de línies de text digitals repetitives en color verd.
    * *Degradats de color animats:* Fons foscos amb transicions suaus de tons porpres o cian.
* **Persistència en LocalStorage:** Fer que les preferències de fons seleccionades i la configuració de volum es guardin automàticament al navegador, evitant que el jugador hagi de tornar-les a configurar cada vegada que obre el joc.

---

## 3. Funcionalitats i Estructura dels Menús

Es proposa reestructurar el flux de pantalles creant un sistema de navegació robust per capes (`.screen`) gestionat des de codi:

* **Pantalla de Benvinguda Principal:** Dissenyar una gran portada amb el títol del joc animat en efecte pols, separadors digitals i botons clars per accedir a la partida o a les configuracions.
* **Pantalla de Selecció de Mode de Joc:** Interpolar una pantalla intermèdia que permeti a l'usuari escollir la modalitat que prefereixi abans d'iniciar directament la partida.
* **Modals d'Interacció durant la Partida:**
    * *Menú de Pausa:* Crear una finestra emergent que aturi el flux temporal del joc, enfosqueixi el tauler i ofereixi l'opció de reanudar o tornar al menú.
    * *Menú de Game Over:* Un cop acabats els moviments, mostrar un resum detallat amb les línies completades, el temps jugat i la puntuació final, acompanyat de botons de reinici ràpid ("Jugar de nou").

---

## 4. Ampliació de Modes de Joc i Mecàniques

Per augmentar la rejugabilitat i el repte intel·lectual del títol, es proposa dividir l'experiència en dues modalitats clarament diferenciades:

* **Modus Zen:** Un mode de joc relaxat, sense la pressió del temps, enfocat a aconseguir la màxima puntuació possible col·locant peces fins que no quedin espais lliures al tauler.
* **Modus Panic (Contrarellotge):** Introduir un mode competitiu amb un temporitzador de compte enrere (per exemple, de 3 minuts). El jugador haurà d'esborrar línies ràpidament per guanyar temps extra o obtenir la millor puntuació abans que el comptador arribi a zero.
* **Sistema de Combos i Puntuació Avançada:** Premiar la destresa del jugador incrementant els punts si s'aconsegueixen esborrar línies de manera consecutiva (multiplicadors de combo).
* **Previsualització de Següents Peces:** Incloure un petit tauler adjacent que mostri el següent lot de peces que estaran disponibles, permetent al jugador planificar la seva estratègia a mitjà termini de la mateixa manera que es fa en jocs clàssics de trencaclosques.
