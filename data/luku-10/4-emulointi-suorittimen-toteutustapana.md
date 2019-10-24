---
path: '/luku-10/4-emulointi-suorittimen-toteutustapana'
title: 'Emulointi suorittimen toteutustapana'
hidden: false
---

<div>
<lead>Tässä aliluvussa esittelemme, kuinka tulkintaan perustuva suoritus voi olla järkevää myös ohjelman konekieliselle esitysmuodolle.
</lead>
</div>

## Ttk-91
Jos varsinaista suoritinta ei aiotakaan toteuttaa fyysisesti, niin ainoa tapa suorittaa sen konekielelle käännettyjä ohjelmia on rakentaa niille emulaattori tai simulaattori. Myös uuden suorittimen suunnittelussa on tapana toteuttaa niille hyvin laitteistoläheinen emulaattori, jonka avulla uutta suoritinta voi testata oikeilla ohjelmilla emulaattorissa jo suunnitteluvaiheessa. Nykyisissä suorittimissa on hyvin vähän virheitä, koska suunnitelmassa olleet virheet on yleensä löydetty testausvaiheessa emulaattorin avulla etukäteen.

Ttk-91 suorittimen määrittely on puutteellinen, eikä sen pohjalta voisi mitenkään toteuttaa todellista suoritinta. Määrittely on kuitenkin riittävän hyvä, jotta sille voidaan rakentaa konekäskytason emulaattori määrittelyssä mukana oleville käskyille.

Ttk-91 emulaattori sisältyy [Titokone](https://www.cs.helsinki.fi/group/titokone/) ohjelmistoon sen yhtenä komponenttina. Emulaattori lukee ttk-91 suorittimen konekielisiä käskyjä yksi kerrallaan ja tekee niiden määrittelemät muutokset emuloidun ttk-91 suorittimen rekistereihin ja muistiin. Emulaattorin [koodi](https://www.cs.helsinki.fi/group/nodes/kurssit/tito/2012s/Processor.java) on kirjoitettu Javalla ja se on helposti luettavaa. Koodi on pitkähkö, koska siinä on mukana ohjelmankehitysympäristö ja suorituksen animaattori.

## Transmetan emulointiin perustuva suoritin
Intelin [x86](https://fi.wikipedia.org/wiki/X86)-arkkitehtuuri sisältää eri kokoisia ja hyvin erilaisia konekäskyjä, joiden nopea suoritus on vaikea toteuttaa. [Transmetan](https://fi.wikipedia.org/wiki/Transmeta) perusidea oli rakentaa x86-emulaattori ja sitä tukeva nykyteknologian nopea suoritin, joissa voisi emuloimalla suorittaa Intelin x86-koodia nopeammin kuin mihin Intelin omat suorittimet pystyivät. 

Yleensä konekielen emulaattorien ongelmana on suorituksen hitaus, joka aiheutuu siitä, että konekäskyjä täytyy emuloida yksi kerrallaan. Transmetassa oli kuitenkin hoksattu, että sopivalla laitteistotuella myös emuloinnissa voisi hyödyntää usean konekäskyn suoritusta limittäin ja samanaikaisesti. Idea oli lennossa kääntää (JIT-kääntämällä) x86-konekäskyjen lohkot oman suorittimen konekielelle, jossa oli saman mittaisia yksinkertaisia konekäskyjä. Transmetan oma tätä tarkoitusta varten suunniteltu suoritin sitten pystyisi suorittamaan näitä lyhyitä konekäskyjä hyvin nopeasti. 

Transmeta sivuaa suomalaisia, koska se palkkasi [Linux-käyttöjärjestelmän](https://fi.wikipedia.org/wiki/Linux) kehittäneen [Linus Torvaldsin](https://en.wikipedia.org/wiki/Linus_Torvalds) 1997-2003 mm. [porttaamaan](https://en.wikipedia.org/wiki/Porting) Linux-käyttöjärjestelmän Transmetan suorittimille.  

Idea oli hyvä, mutta Intel vastasi siihen uudella suorittimella (ks. alla), joka lennossa käänsi jokaisen x86-konekäskyn pienempiin rinnakkain suoritettaviin samanmittaisiin konekäskyihin. Näiden rinnakkainen suoritus oli vielä nopeampaa kuin Transmetan suorittimilla. Transmeta siirsi omien suorittimiensa painopisteen alhaiseen virrankulutukseen, millä alueella se saattoi vielä kilpailla kannettavissa laitteissa. Lopulta yhtiö lopetti toiminnan 2009. 

## Intel Pentium 4
Intel oli itsekin havainnut, että [x86](https://fi.wikipedia.org/wiki/X86)-arkkitehtuuri on vaikea sellaisenaan tehdä nopeaksi. X86-arkkitehtuuri juontaa juurensa jo vuoteen 1972. Se on toki kehittynyt siitä paljon vuosien saatossa ja Intel haluaa edelleen pitää uudet suorittimet sen kanssa yhteensopivina.

Intelin ratkaisu x86-koodin nopeaan suorittamisen [Pentium 4](https://en.wikipedia.org/wiki/Pentium_4) suorittimessa oli vähän saman kaltainen kuin Transmetalla, mutta kuitenkin merkittävästi erilainen. Kun Transmetan järjestelmässä x86-käskyt käännettiin JIT-kääntäjällä suurina lohkoina ennen suoritusta Transmetan suorittimen konekielelle, niin Pentium 4 suorittimessa kukin x86-konekäsky käännettiin laitteistossa suoritusaikana käskyn noudon yhteydessä pieniin saman kokoisiin _mikrokäskyihin_. 

Suorittimen sisällä varsinainen konekäskyjen suoritus perustui noihin mikrokäskyihin, joita oli helpompi suorittaa useaa limittäin ja samanaikaisesti. Tavallaan Pentium 4 siis emuloi x86-arkkitehtuuria puhtaalla laitteistototeutuksella.


## Quizit 10.3 ????
<!--  quizit 10.3.???  -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>

<text-box variant="example" name="Historiaa:  Ensimmäinen mikroprosessori Intel 4004">

Fe.....

![Valtava.](./ch-10-3-i4004.svg)
<div>
<illustrations motive="ch-10-3-i4004"></illustrations>
</div>
credit....????

</text-box>


## Yhteenveto
Tämä luku ...

Vastaa alla olevaan kyselyyn, kun olet valmis tämän luvun tehtävien kanssa.

### summary quizit ???

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
