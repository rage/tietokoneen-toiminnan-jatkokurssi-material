---
path: '/luku-8/1-muistihierarkia'
title: 'Muistihierarkia ja virtuaalimuisti'
hidden: false
---

<div>
<lead>Käyttöjärjestelmän ?????</lead>
</div>

## Muistihierarkia
Tietoa talletetaan tietokonejärjestelmiin hyvin monella eri tasolla. Lähtökohta eri tasojen käytölle on periaate, että pienempi muisti on nopeampaa ja suurempi muisti on halvempi toteuttaa. Tämä on johtanut ns. muistihierarkiapyramidiin, jonka olennaisia osia illustroitiin  Luvun 1 Juustokakkuesimerkillä.


<!-- kuva: ch-1-3-muistihierarkia    -->

![Kolme sisäkkäistä aluetta. Sisimpänä on laitteisto, jossa on rekisterit, muisti ja niiden välissä välimuistit. Nuoli menee muistista välimuistien läpi rekistereihin. Keskellä on järjestelmätaso, jolla on laitteisto, massamuisti ja niiden välissä käyttöjärjestelmän ylläpitämä virtuaalimuisti ja levyvälimuisti. Nuoli menee massamuistista virtuaalimuistin ja levyvälimuistin läpi muistiin. Uloin alue on internet, jossa on tämä järjestelmän, pilvipalvelu/www ja niiden välissä välityspalvelin eli proxy. Nuoli pilvipalvelusta proxyn kautta massamuistiin. Laitteiston nopeus on ns-luokkaa, järjestelmän massamuistin nopeus ms-luokkaa. Pilvipalveluiden ja muun internetin nopeus on sekuntien luokkaa.](./ch-1-3-muistihierarkia.svg)
<div>
<illustrations motive="ch-1-3-muistihierarkia" frombottom="0" totalheight="100%"></illustrations>
</div>

Muistihierarkiassa on kolme selkeää tasoa. Sisimpänä ovat suorittimen kanssa samalla piirikortilla toteutetut muistit, keskimmäisellä tasolla yhdessä järjestelmässä (samassa kotelossa?) olevat nopeahkot muistit. Uloimpana verkossa olevat tai samassa järjestelmässä olevat hyvin hitaat laitteet. 

Kaikkien sisimpänä samalla mikropiirillä suorittimen laiterekistereiden kanssa ovat nopeimmat välimuistit. Esimerkiksi, nopeimmat tason L1 ja L2 välimuistit voi olla toteutettuna samalla mikropiirillä suorittimen kanssa, mutta vähän hitaammat tason L3 ja L4 välimuistit voivat sijaita omilla mikropiireillään välittömästi suorittimen vieressä.

Keskusmuisti sijaitsee samalla piirikortilla ([emolevyllä](https://fi.wikipedia.org/wiki/Emolevy)) suorittimen kanssa ja on yhteydessä siihen väylän kautta. Keskusmuistin käyttö on huomattavasti (esim. 50x) hitaampaa kuin rekistereiden, mutta keskusmuisti on kooltaan huomattavasti suurempi (esim. 10<sup>7</sup>x) kuin rekisterijoukko. Välimuistiteknologian avulla keskusmuisti saadaan tuntumaan lähes yhtä nopealta kuin rekisterit.

Massamuistilaitteet (esim. kovalevy, CD-levy, DVD-levy tai Blu-ray-levy) sijaitsevat samassa järjestelmässä ja niitä voi käyttää järjestelmän väylien kautta. Kullekin laitetyypille on sille sopivan nopeuksinen väylä. Eri nopeuksiset väylät muodostavat väylähierarkian järjestelmässä. Hitaammat väylät liitetään erityisen sovittimen kautta nopeampiin, jotta ne eivät hidastaisi nopeampien väylien toimintaa. 

Uusi flash-teknologiaan perustuva SSD (Solid State Disk) massamuisti on usein vielä toteutettu kovalevyn lailla ulkoisena massamuistina, mutta se voi sijaita myös valmiiksi asennettuna emolevyllä. 

levypalvelimet, pilvipalvelimet, magneettinauha, ....

Jotkut ulkoiset laitteet ovat niin hitait

??????????????????????????????????



## Virtuaalimuisti
????

### Massamuistin käyttö
???

<text-box variant="example" name="Historiaa:  Akustinen elohopeaviiveputki">

Akustinen elohopeaviiveputki
<!-- kuva: ch-7-3-ferriitti    -->

![kuvan selitysteksti puuttuu... ????.](./ch-8-1-viiveputki.svg)
<div>
<illustrations motive="ch-8-1-viiveputki"></illustrations>
</div>
credit....????

</text-box>

## Quizit 9.1
<!-- Quiz 9.1.?? -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
