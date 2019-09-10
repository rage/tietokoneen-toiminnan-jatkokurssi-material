---
path: '/luku-8/2-tiedostot-massamuisti'
title: 'Tiedostojärjestelmä, tiedostot ja massamuisti'
hidden: false
---

<div>
<lead>Tässä????</lead>
</div>

## Tiedostojärjestelmä ja tiedostot
Tieto massamuistissa on yleensä organisoitu erillisiksi tiedostoiksi. Esimerkiksi, tiedosto program.exe sisältää windows-käyttöjärjestelmän tunnistaman ladattavan ohjelman ja cute-cat.jpg sisältää käyttäjän tallettaman soman kissakuvan. Käyttöjärjestelmä pitää kirjaa kaikista tiedostoista ja niiden sijainneista massamuistissa. Se valvoo tiedon pääsyoikeuksia, jotta Pekka ei vahingossa pääse katsomaan Maijan kissakuvia, tai että kukaan tavallinen käyttäjä ei pääse ohjelmakoodeja ilman lupaa.

Tiedostolla voi olla oma sisäinen rakenteensa, jolloin se koostuu useasta erillisestä [tietueesta](https://fi.wikipedia.org/wiki/Tietue). Esimerkiksi lennonvarausjärjestelmässä yksi tietue voi sisältää yhden asiakkaan tietyn varatun lennon tiedot. Emme käsittele tällaisia tiedostojärjestelmiä tässä tämän enempää.

Yleensä tiedosto koostuu useasta tavusta, jotka esittävät merkkipohjaista tietoa tai jotain rakenteista tietoa kuten kuvaa tai ääninäytettä.  Tiedostoa voidaan käsitellä koknaisuutena (esim. kuva) tai tavu kerrallaan (esim. tekstinkäsittelyssä tekstitiedosto). 

Käyttöjärjestelmä muuntaa tekstimuotoiset tiedostonimet hakemistopolkuineen (esim. "/usr/home/kerola/pictures/cats/cute-cat.jpg") tiedostojärjestelmän sisäisiksi osoitteiksi, mikä tekee tiedostojen käyttämisestä helppoa ja kätevää. Tiedostojärjestelmä sitten tarkentaa sisäisen osoitteen suoritusaikana tiettyyn kovalevyyn ja täsmälliseen sijaintiin siellä. On hyvin kätevää, kun ohjelmaa kirjoittaessa ei tarvitse ottaa kantaa siihen, minkä tyyppisellä laitteella tai missä jokin tiedosto sijaitsee. 

Aina kun tiedostoa avataan käyttöä varten, järjestelmä tarkistaa, mitä oikeuksia tiedoston omistaja on antanut tiedoston avaamista haluavalle ohjelmalle. Ohjelman oikeudet taas määräytyvät sen mukaan, kuka käyttäjä on ohjelman käynnistänyt. Jos Maija ei ole antanut lukuoikeutta muille tiedostoonsa cute-cat.jpg, niin tavallisen käyttäjän Pekan (tai haittaohjelman TroubleMkr) käynnistämä ohjelma ei pysty avaamaan tiedostoa cute-cat.jpg ja Pekkaa harmittaa. Toisaalta, jos Pekka (tai haittaohjelma TroubleMkr) toimii järjestelmän ylläpitäjän oikeuksilla, niin hän (se) voi joka tapauksessa lukea tiedostoa cute-cat.jpg, mikä taas voi harmittaa Maijaa!

Jos tiedostoa luetaan vähän kerrallaan, niin tiedostojärjestelmä pitää kirjaa siitä, missä kohtaa kukin prosessi on kutakin tiedostoa lukemassa. Vaikka prosessi lukisi tiedostoa yksi merkki kerrallaan, niin tiedostojärjestelmä lukee niitä massamuistista isompi lohko kerrallaan muistiin ja lohkon koko sopii hyvin yhteen massamuistilaitteen teknologian kanssa. Esimerkiksi, levymuistista voisi lukea 4 KB lohkoja käyttöjärjestelmän ylläpitämään puskuriin, josta käyttäjäprosessi saa tietoja käyttöönsä tavu kerrallaan halutessaan. 

<!-- Kuva: ch-8-2-tiedoston-lohkot -->

![Vasemmalla on tiedoston cute-cat.jpg hakemistoalkio, keskellä sen lohkolista ja oikealla kovalevy. Hakemistoalkiossa on linkki lohkolistaan, josta taas on linkit kovalevylle kuhunkin kyseisen tiedoston levylohkoon.](./ch-8-2-tiedoston-lohkot.svg)
<div>
<illustrations motive="ch-8-2-tiedoston-lohkot" frombottom="0" totalheight="40%"></illustrations>
</div>

Tiedoston lohkot on talletettu kovalevylle siellä oleviin vapaisiin paikkoihin ja tiedostojärjestelmä pitää kirjaa lohkojen sijainnista kovalevyllä. Tiedoston nimen perusteella hakemistosta löytyy tiedoston hakemistoalkio, josta löytyy esim. linkki sen tiedoston lohkolistaan. Lohkolistassa on tiedot jokaisen tämän tiedoston levylohkon sijainnista.

Tiedostojärjestelmän tarkempi toiminta esitellään yliopiston käyttöjärjestelmäkurssilla.

## Kovalevyn (kiintolevyn) toteutus
Tyypillisin massamuistilaite nykyisissä tietokoneissa on edelleen kovalevy, vaikkakin varsinkin kannettavissa laitteissa SSD-levyt ovat yleistymässä. Käsittelemme SSD-levyjä lisää vähän myöhemmin.

Kovalevyä käytetään järjestelmässä kahteen tarkoitukseen, virtuaalimuistin tukimuistina ja tiedostojen talletukseen. Kummassakin tapauksessa tieto talletetaan levylle samalla tavalla, sektori kerrallaan. Sektori on pienin datamäärä, jota levylle voi yhdellä kertaa kirjoittaa tai jota sieltä voi lukea. Sektorin koko on tyypillisesti 0.5-4 KB. 

Tiedostojärjestelmä siirtää tietoja keskusmuistin ja levyn välillä tehokkuussyistä isohkoina _levylohkoina_. Levylohkon koko on kussakin tiedostojärjestelmässä vakio ja käytännössä sektorin koon pieni monikerta, esimerkiksi 2 tai 4 sektoria. Kunkin levylohkon sektorit ovat sellaisia, että ne on nopea lukea yhteen menoon levyltä. Jos tiedoston koko on pienempi kuin levylohkon koko, sille varataan silti aina kokonainen levylohko tilaa. Suuret tiedostot varaavat hukkatilaa levyltä keskimäärin puolikkaan levylohkon verran, koska viimeinen levylohko jää vajaaksi. 

Virtuaalimuisti siirtää tietoja keskusmuistin ja levyn välillä _sivuina_, mikä on vain eri nimi muistilohkoille. Usein sivun koko ja levylohkon koko ovat samoja.

<!-- kuva: ch-8-2-levyn-kaytto    -->

![Yksinkertaistettu kuva, jossa ylhäällä muisti, keskellä väylä ja alhaalla kovalevy. Levy on jaettu kahteen osaan, jossa vasemmalla puolella on paljon saman kokoisia sivuja ja oikealla puolella paljon saman kokoisia levylohkoja. Myös keskusmuisti on jaettu saman kokoisiin keskusmuistilohkoihin, joista vasemmalla puolella olevissa on virtuaalimuistin sivuja ja oikealla puolella levylohkoja.](./ch-8-2-levyn-kaytto.svg)
<div>
<illustrations motive="ch-8-2-levyn-kaytto" frombottom="0" totalheight="100%"></illustrations>
</div>

Virtuaalimuisti ja tiedostojärjestelmä siis käyttävät kovalevyä hyvin samalla tavalla. Tämän vuoksi käyttöjärjestelmissä on esimerkiksi toteutettu ensin tiedostojärjestelmä ja sitten sen päälle virtuaalimuisti, jotta samoja asioita ei tarvitse toteuttaa moneen kertaan. Tai sitten ensin on toteutettu virtuaalimuisti ja tiedostojärjestelmä sen päälle.

Kovalevyn kapasiteetista on huomattavan iso osuus varattu virtuaalimuistin tukimuistiksi. Siellä täytyy olla tilaa jokaiselle järjestelmässä olevan prosessin kaikille tiedoille. Et siis voi käyttää järjestelmäsi 500 GB kovalevyä pelkästää tiedostojen tallentamiseen! Käyttöjärjestelmä päättää järjestelmän alustuksen yhteydessä, kuinka suuri osuus kovalevystä varataan virtuaalimuistin toteutukseen.

### Kovalevyn rakenne ja saantiaika
???

## SSD ja NVMe
????


## Levypalvelimet
????

## Pilvipalvelimet

???

## Quizit 9.2
<!-- Quiz 9.2.?? -->

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
