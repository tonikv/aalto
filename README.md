# Fysiikan ilmiölaboratorio

Interaktiivinen fysiikan simulaattori lukio-opiskelijoille. Käsittelee aaltoliikkeen, äänen, sähkömagneettisen säteilyn ja geometrisen optiikan keskeisiä ilmiöitä.

## Käynnistä paikallisesti

ES-modulit vaativat HTTP-palvelimen — pelkkä `index.html`-tiedoston tuplaklikkaus ei riitä.

```bash
# Pythonilla (esiasennettu useimmissa Windows-ympäristöissä Python 3:n mukana)
python -m http.server 8000

# Tai Node.js:llä
npx serve
```

Avaa selaimessa `http://localhost:8000`.

## Projektin rakenne

```
src/
  styles/      — CSS-modulit (yksi tiedosto per vastuualue)
  data/        — Aiheet ja harjoitukset puhtaana datana
  physics/     — Puhtaat fysiikan kaavat ilman riippuvuuksia
  simulators/  — Canvas-pohjaiset visualisoinnit
  ui/          — DOM-renderöinti
  state/       — Yksinkertainen tila + tilaaja-malli
  main.js      — Pääsisäänajopiste
```

## Kontribuointi

Lue `REFACTOR_BRIEF.md` ennen muutoksia. Erityisesti:
- Ei build-vaihetta — kaikki on selaimen suoraan ajettavissa.
- Yksi tiedosto = yksi vastuu.
- Tiedostot ≤ 300 riviä.
- Harjoitukset noudattavat skeemaa kohdassa "Exercise schema".

## Käytössä oleva fysiikka

Kaikki kaavat sopivat lukion FY1–FY8 -kursseille. Lähteet löytyvät `REFACTOR_BRIEF.md`:n liitteestä A.
