[![Netlify Status](https://api.netlify.com/api/v1/badges/b77e0d76-9524-4708-a311-9c28f86f27c7/deploy-status)](https://app.netlify.com/sites/vermillion-puppy-0acaf8/deploys)

# Segítség a tartalom feltöltéséhez

A /src/en/ és a /src/hu/ mappákon belül minden Markdown (.md) fájl a weboldal egy aloldalának felel meg. Az, hogy melyik almappába kerül, határozza meg, hogy milyen típusú oldal lesz belőle (pl. hír, kutató, publikáció, stb.).
_Ezeken kívül van minden mappában egy .json fájl, ezzel nem kell foglalkoznotok, ez az oldal működéséhez kell._

A Markdown file-ok kezdetén található egy "header", ami az oldalt összeállító program számára tartalmaz információkat. Ezt felül és alul három kötőjel különíti el:

```

---
title: Példa oldal
date: 2022-11-23
ref: peldaoldal
---

Ide jön az oldal szövege (ami például kutatók esetén a cv/bemutatkozás)...

```

## Alap attribútumok

- **ref:** ez minden dokumentumban kell, ez alapján fogja összekötni a program a magyar tartalmat az angol megfelelőjükkel. A tartalma mindegy, de betűről betűre meg kell egyeznie, úgyhogy érdemes egy egyszeru de egyedi id-t megadni (pl. tatrai-cv vagy stat-proj-1, stb)
- **title:** a dokumentum címe - ez egy címsorként automatikusan bekerül a kész weboldalra
- **date:** dátum, 2022-11-24 formátumban
- **subtitle:** alcím, cím alatt szürkén jelenik meg

## Kutatók/researchers almappában

- **name:** title helyett
- **pos:** pozíció vagy bármilyen rövid leírás, ez jelenik meg a "Rólunk" fülön
- **img:** profilkép, pl. "/img/bartal.jpg", ebbe a mappába is kell feltölteni a képeket (az img mappa a static mappán belül található)
- **ref:** ld. fent

## Linkek hozzáadása

Az összes link a Markdown link-formátumát követi:

```
[Link megjelenő szövege](/linkhez/vezeto/ut/)
```

ez így néz ki készen: [Link megjelenő szövege](/linkhez/vezeto/ut/)

Ha bármelyik link a static mappán belüli dolgokra mutat, azt a static mappán belüli mappából kell indítani.

Például: static/pdf/pdf-file.pdf -> /pdf/pdf-file.pdf

## észrevételek, igények, stb

Írjátok ide nyugodtan!

- pl. projektek oldalairól a publikációkhoz vezet vissza a nyíl
- ...
