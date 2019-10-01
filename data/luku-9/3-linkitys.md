---
path: '/luku-9/3-linkitys'
title: 'Linkitys'
hidden: false
---

<div>
<lead>Tässä aliluvussa annamme yleiskuvan linkityksen toteuttamisesta. Staattisesti ennen suoritusta 
</lead>
</div>

## Staattinen linkitys
Normaalitapaus linkityksestä on staattinen linkitys, jossa ohjelman kaikki objektimoduulit yhdistetään yhdeksi ajomoduuliksi ennen suoritusta. Kaikilla tunnuksilla on tunnettu arvo, eikä mitään ohjelman osia puutu.

Tämän pääluvun alussa ensimmäsessä aliluvussa esiteltiin linkityksen perusidea. Täsmennämme nyt sitä tässä esimerkin avulla.

Meillä on kolme käännettyä moduulia, jotka ovat Main, Stats ja Math. Math-moduuli voi olla kirjastomoduuli, mutta sillä ei ole tässä merkitystä. Pääohjelma on moduulissa Main. Siellä o nmääritelty ainakin yksi muuttuja X (osoitteessa 0), johon viitataan ainakin osoitteessa 234 olevassa konekäskyssä. Konekäskyssä osoitteessa 3333 kutsutaan moduulin Stats tilastorutiinia Report. Main'in uudelleensijoitustaulusta löytyy paikallisen symbolin X arvo 0 ja sen viittauskohdat.  Main'in EXPORT-hakemisto on tyhjä, koska siinä moduulissa ei ole muiden moduulien viitattavissa olevia rakenteita. Sen IMPORT-hakemistossa on tilastorutiini Stats.Report, johon on viitattu käskyssä 3333.

Moduulissa Stats on (ainakin) yksi muuttuja A, joka on osoitteessa 0 ja johon on viitattu osoitteissa 302 ja 850. EXPORT-hakemistossa on (ainakin) moduulin palvelurutiini Report, jonka osoite on 800. IMPORT-hakemistossa on (ainakin) matematiikkarutiini Math.Aver, johon on viitattu osoitteessa 840.

Moduulissa Math on (ainakin) yksi muuttuja Sum, joka on osoitteessa 0 ja johon on viitattu osoitteessa 5. EXPORT-hakemistossa on keskiarvon laskentarutiini Aver, jonka osoite on 2400. SenIMPORT-hakemisto on tyhjä, koska se ei käytä mitään moduulin ulkopuolisia rakenteita.

<!-- kuva: ch-9-3-moduulit-ennen-linkitysta  -->

![  Puuttuu ???? .](./ch-9-3-moduulit-ennen-linkitysta.svg)
<div>
<illustrations motive="ch-9-3-moduulit-ennen-linkitysta"></illustrations>
</div>

<!-- kuva: ch-9-3-moduulit-jälkeen-linkityksen  -->

![  Puuttuu ???? .](./ch-9-3-moduulit-jälkeen-linkityksen.svg)
<div>
<illustrations motive="ch-9-3-moduulit-jälkeen-linkityksen"></illustrations>
</div>


???

## Dynaaminen linkitys
????

### Windowsin kaksi eri dynaamista linkitystä
????


## Quizit 9.3 ????
<!--  quizit 9.3.???  -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
