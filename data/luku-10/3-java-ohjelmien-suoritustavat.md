---
path: '/luku-10/3-java-ohjelmien-suoritustavat'
title: 'Java-ohjelmien suoritustavat'
hidden: false
---

<div>
<lead>Tässä aliluvussa (10.3) esittelemme neljä erilaista tapaa toteuttaa Java virtuaalikone (JVM). Näytämme myös, kuinka java-ohjelmia suoritetaan niissä kaikissa. 
</lead>
</div>

## Java-tulkki
Helpoin tapa suorittaa Java-ohjelmia on rakentaa Java-tulkki, joka emuloi JVM:n toimintaa omien tietorakenteidensa avulla. Java-tulkissa on emuloitu JVM:n rekisterit SP, LV, CPP ja PC. Samoin siellä suuret taulukot, joiden avulla emuloidaan JVM:n kekoa, pinoa, vakioallasta ja metodialuetta. 

<!-- Kuva: ch-10-3-suoritus-tulkki -->

![Neljä ??????  ch-10-3-suoritus-tulkki.](./ch-10-3-suoritus-tulkki.svg)
<div>
<illustrations motive="ch-10-3-suoritus-tulkki" frombottom="0" totalheight="40%"></illustrations>
</div>

Java tulkki alustaa ensin JVM:n. Tavukoodin on yksinkertaista, koska JVM:ssä on tarkalleen määritelty jokaisen tavukoodisen käskyn toiminnot. Tulkki muokkaa emuloituja JVM:n rakenteita yksi tavukoodin käsky kerrallaan. 

Tämä on hyvin joustava tapa suorittaa tavukoodia. Jos koodissa tapahtuu viittaus johonkin muuhun Java-luokkaan, siirrytään suorittamaan sen tavukoodia. Tarvittaessa se voidaan ladata tässä vaiheessa levyltä tai jopa verkosta, koska tavukoodiset tiedostot ovat tavallista dataa tulkille. 

Heikkoutena tässä suoritustavassa on suorituksen näennäinen hitaus. Koska tavukoodin käskyjä suoritetaan vain yksi kerrallaan, normaalin suorittimen erilaisia suoritusnopeuden optimointimenetelmiä on vaikea käyttää. Toisena heikkoutena on jo aikaisemmin mainittu pipnokoneen emuloinnin vaikeus rekisterikoneella, koska lähes kaikki viiteeet kohdistuvat muistissa oleviin tietorakenteisiin. Tottakai tulkki voi säilyttää JVM:n rekistereitä SP, LV,CPP ja PC omissa rekeistereissään, mutta se ei paljoa auta.

### Java-tulkki vs. Titokone
Java-tulkki on hyvin samanlainen siis kuin ttk-91 tietokoneen tulkki Titokone-ohjelmassa. Titokone lukee datana ttk-91 koneen "konekieltä" yksi konekäsky kerrallaan ja tekee sen aiheuttamat muutokset emuloituihin ttk-91 rekistereihin ja muistiin. Ttk-91 suorittimen rekisterit ja muisti ovat tavallisia tietorakenteita Titokoneessa.

## Kääntäminen natiivikoneelle
Java-ohjelma voidaan myös kääntää ja linkittää natiivikoneelle, samalla tavalla kuin edellisessä luvussa esitettiin. Tämä tarkoittaa, että Java-ohjelmasta tehdään ihan tavallinen prosessi, joka suorittaa järjestelmän suorittimen konekielistä koodia.

<!-- Kuva: ch-10-3-suoritus-kaannos -->

![Neljä ??????  ch-10-3-suoritus-kaannos.](./ch-10-3-suoritus-kaannos.svg)
<div>
<illustrations motive="ch-10-3-suoritus-kaannos" frombottom="0" totalheight="40%"></illustrations>
</div>

Kääntäminen järjestelmän omalle konekielelle tehdään nyt kuitenkin vain tavukoodisesta esitysmuodosta. Edellisen luvun terminologian mukaisesti kääntämisessä tarvitsee nyt ajaa ainoastaan kääntäjän _back end_. Etuna kääntämisestä on ohjelman suorituksen nopeus, koska kääntäjä voi nyt tehokkaasti optimoida koodin juuri tälle suorittimelle. 

Käännöksen natiivikoneen konekielelle voi tehdä myös vähän "huijaten" hyödyntäen C-kielen kääntäjää. Näin tehdään sen vuoksi, että todella hyvin optimoidun koodin tekeminen on vaikeata ja kuitenkin liki jokaisesta käyttöjärjestelmästä löytyy hyvin optimoitua koodia tuottava C-kielen kääntäjä jo valmiina eri suorittimille. Tässä tapauksessa tavukoodi käännetään ensin C-kielelle, mikä on suhteellisen helppoa. C-kielinen esitysmuoto annetaan sitten C-kääntäjälle, joka tuottaa hyvin optimoitua koodia halutulle suorittimelle.

Huonona puolena natiivikoneelle kääntämisestä on joustamattomuus, koska koko ohjelma täytyy kokonaisuudessaan kääntää ja linkittää valmiiksi latausmoduuliksi. Dynaamista linkitystä ei voi käyttää. 

## JIT-käännös
????

<!-- Kuva: ch-10-3-suoritus-jit -->

![Neljä ??????  ch-10-3-suoritus-jit.](./ch-10-3-suoritus-jit.svg)
<div>
<illustrations motive="ch-10-3-suoritus-jit" frombottom="0" totalheight="40%"></illustrations>
</div>


## Java-suoritin
????

<!-- Kuva: ch-10-3-suoritus-natiivi -->

![Neljä ??????  ch-10-3-suoritus-natiivi.](./ch-10-3-suoritus-natiivi.svg)
<div>
<illustrations motive="ch-10-3-suoritus-natiivi" frombottom="0" totalheight="40%"></illustrations>
</div>


## Quizit 10.3 ????
<!--  quizit 10.3.???  -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
