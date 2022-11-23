# Segítség a tartalom feltöltéséhez

A /src/en/ és a /src/hu/ mappákon belül minden Markdown (.md) fájl a weboldal egy aloldalának felel meg. Az, hogy melyik almappába kerül, határozza meg, hogy milyen típusú oldal lesz belőle (pl. hír, kutató, publikáció, stb.).
*Ezeken kívül van minden mappában egy .json fájl, ezzel nem kell foglalkoznotok, ez az oldal működéséhez kell.*

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

**ref:** ez minden dokumentumban kell, ez alapján fogja összekötni a program a magyar tartalmat az angol megfelelőjükkel. A tartalma mindegy, de betűről betűre meg kell egyeznie, úgyhogy érdemes egy egyszeru de egyedi id-t megadni (pl. tatrai-cv vagy stat-proj-1, stb)
**title:** a dokumentum címe - ez egy címsorként automatikusan bekerül a kész weboldalra
**date:** dátum, 2022-11-24 formátumban

## Kutatók/researchers almappában

**name:** title helyett
**pos:** pozíció vagy bármilyen rövid leírás, ez jelenik meg a "Rólunk" fülön
**img:** profilkép, pl. "/static/img/bartal.jpg", ebbe a mappába is kell feltölteni a képeket
**ref:** ld. fent