---
path: "/luku-5/5-titokone-titotrainer"
title: "Titokone ja TitoTrainer"
---

<div>
<lead>Kurssin oppimistavoitteisiin sisältyy konekielisen ohjelmoinnin perusteet. Konekielistäkään ohjelmointia ei opi ilman harjoittelua. Titokone on ttk-91 ohjelmien kehittämis- ja suoritusympäristö. TitoTrainer on Titokoneen päälle rakennettu harjoitteluympäristö, jossa annettujen ttk-91 ohjelmointitehtävien vastauksien oikeellisuus tarkistetaan automaattisesti.</lead>
</div>

## Titokone
Titokone on simulaattori, jossa voi suorittaa ttk-91 ohjelmia. Titokoneelle voi antaa suoritettavan ttk-91 ohjelman käyttäen joko symbolista (k91) tai numeerista (b91) esitysmuotoa. Yleensä ohjelmat annetaan kirjoitettuna symbolisella ttk-91 konekielellä ja ne käännetään numeeriseen muotoon ennen suoritusta. Titokone ei ole ainoastaan simulaattori, vaan siihen sisältyy seuraavakse esiteltävät komponentit.

_Symbolisen konekielen kääntäjä_ lukee ttk-91 symbolisella konekielellä kirjoitetun ohjelman (esim. hello.k91) ja kääntää sen ttk-91 konekielelle (esim. hello.b91). Symbolisia konekielisiä ohjelmia voi kirjoittaa millä tahansa tekstieditorilla, kunhan vain muistaa laittaa tiedoston nimen loppuliitteeksi ".k91".

_Simulaattori_ lukee konekielisiä ohjelmia (hello.b91) yksi konekäsky kerrallaan ja emuloi sen aiheuttamat toiminnot simuloidussa ttk-91 järjestelmässä (ks. Luku 5.1). Esimerkiksi, konekäskyn "add&nbsp;r1,&nbsp;=1000" suorittamisen tuloksena simuloidun rekisterin r1 arvoa kasvatetaan luvulla 1000 ja simuloidun tilarekisterin SR bitit GEL asetetaan ilmaisemaan tuloksen suhdetta lukuun nolla. Jos yhteenlaskusta aiheutui ylivuoto, se merkitään tilarekisteriin SR bittiin O.

_Ohjelmiston kehitysympäristön_ avulla voidaan säätää kommentoinnin määrää symbolisen konekielen käännösaikana ja ohjelman suoritusaikana simulaattorissa. Se näyttää suoritusaikana järjestelmän rekistereiden ja muistin sisällön. Lisäksi se sallii suorituksen vain yksi konekäsky kerrallaan, mikä helpottaa ohjelmointivirheiden löytämistä.

_Animaattori_ aukeaa ohjelman suoritusaikana omaan ikkunaansa ja näyttää ohjelman suorituksen animoidusti suoriutimen rekisterien ja muistin tasolla. Esimerkiksi konekäskyn "add&nbsp;r1,&nbsp;=1000" muistista noudon yhteydessä se näyttää, kuinka kyseinen konekäsky haetaan muistista väylän kautta suorittimen käskyrekisteriin IR. Saman käskyn suorituksen yhteydessä se näyttää, kuinka a) rekisterin r1 arvo viedään ALU:un, b) vakion 1000 arvo viedään IR:stä ALU:un ja d) lopulta ALU:n tulos viedään r1:een.

_Graafinen käyttöliittymä_ kokoaa kaikki edellämainitut komponentit yhteen, jolloin niitä on helppo käyttää. Se koostuu useasta eri ikkunasta ja kehyksestä, joiden kokoa voi dynaamisesti säätää.

### Titokoneen käyttö
Titokonetta on tarkoitus käyttää symbolisen konekielen perusteiden harjoitteluun. Ohjelmat kirjoitetaan tekstieditorilla ttk-91 symbolisella konekielellä, ladataan Titokoneelle, käännetään ja lopuksi suoritetaan simulaattorissa hyödyntäen ohjelmiston kehitysympäristöä ja animaattoria.

Titokoneen omalle koneelle asennettavat eri versiot ja käyttöohjeet löytyvät verkkosivulta https://www.cs.helsinki.fi/group/titokone/. Titokoneen verkkosivulla on useita eri [jar](https://en.wikipedia.org/wiki/JAR_(file_format))-paketteja. Suosittelen käyttämään versiota [titokone_1.203.jar](https://www.cs.helsinki.fi/group/titokone/distr/titokone-1.203.jar), koska sitä käytetään seuraavaksi esiteltävässä TitoTrainer'issa. Helpoin tapa suorittaa Titokonetta on ladata (klikkaamalla ylläolevaa linkkiä) sen jar-paketti omalle koneelle ja avata se Javan suoritusympäristössä ([JRE](https://en.wikipedia.org/wiki/JRE), Java Runtime Environment). 

Java-ohjelmien suorittamista varten järjestelmässäsi täytyy olla asennetuna jokin Javan suoritusympäristö. Se voi olla Oraclen oma toteutus (esim. _Java SE_) tai avoimen lähdekoodin toteutus (esim. _OpenJDK (Java)_ tai _Amazon Corretto_). Viimeksi mainitut ympäristöt löytyvät Windows'in Software Center'istä, joka löytyy Windows-haulla näytön vas. alanurkasta hakusanalla "Software Center" (Windows-10).

Titokoneen verkkosivulta löytyy myös sen [käyttöohje](https://www.cs.helsinki.fi/group/titokone/v1.100/kayttoohje/manual_fi.html) ja [asennusohje omalle koneelle](https://www.cs.helsinki.fi/group/titokone/v1.100/INSTALL_fi.txt). Huomaa, että Titokoneessa on se piirre, että oletusarvoisesti siinä on valittuna valmiiksi käännetyt "_b91 binary_" -tyyppiset tiedostot, joten valitse ohjelmatiedoston tyypiksi "_k91 source_".

Samalta verkkosivulta löytyy myös kokoelma ttk-91 esimerkkiohjelmia, hakemistossa [esimerkit](https://www.cs.helsinki.fi/group/nodes/kurssit/tito/esimerkit/). Voit ladata ne omalle koneellesi, ja valita ne sitten Titokoneelle syötteeksi käännöstä ja suoritusta varten. 

## TitoTrainer
TitoTrainer on ttk-91 symbolisen konekielisen ohjelmoinnin harjoitteluympäristö. Se sisältää n. 50 ttk-91 ohjelmoinnin harjoitustehtävää. TitoTrainer pitää kirjaa kunkin opiskelijan edistymisestä.

Tehtävissä pyydetään toteutamaan joko kokonainen ttk-91 ohjelma tai sen osa. Kun tehtävän vastaus on valmis, opiskelija painaa Lähetä-nappia. Järjestelmä kääntää ja suorittaa näin määritellyn ohjelman Titokoneessa (versio 1.203) ja antaa palautteessaan tiedon ohjelman oikeellisuudesta sekä rekistereiden, muistin ja symbolitaulun sisällöstä suorituksen päättymishetkellä. Virhetilanteissa se voi antaa myös vihjeitä virheen laadusta.

TitoTraineria ei ole integroitu Titokoneen ohjelmiston kehitysympäristöön, joten isompien ohjelmointiongelmien sattuessa tehtävän kannattaa ratkaista ensin Titokoneessa ja sitten kopioida toimiva vastaus TitoTraineriin. Jos TitoTrainer tehtävässä pyydettiin toteuttamaan vain ohjelman osa, niin muista kopioida myös ne valmiiksi annetut ohjelman osat Titokoneella testattavaan ohjelmaan. Vastaavasti, muista tässä tapauksessa kopioida van pyydetty ohjelman osa TitoTraineriin.

TitoTraineria käytetään suoraan yliopiston palvelimella osoitteessa [TitoTrainer2](http://titotrainer2.users.cs.helsinki.fi/). Luo sinne oma tunnus ja kirjaudu sopivalle kurssille (esim. "MOOC 2019-2020"). Jos TitoTrainer ei jostain syystä tunnu toimivan (verkkosivu valittaa sisäisestä virheestä, tms), se täytyy käynnistää uudelleen.  Mailaa ongelmasta osoitteeseen mailto:atk-apu@cs.helsinki.fi, jolloin tilanne korjataan yleensä aika pian. Joidenkin päivitysten jälkeen TitoTrainer ei vain käynnisty uudelleen automaattisesti, vaikka näin pitäisi tapahtua.  

### TitoTrainer tehtävät
Tito-Trainer tehtävissä on niiden nimen alussa luokittelutietoa (esim. a-150 Simppeli koodisegmentti), jossa ensimmäisenä oleva kirjain kertoo päätason:

```
a. aloittelija, yksinkertainen koodi, if-then-else, silmukat 
b. monimutkaisempaa koodia, tietorakenteiden käyttö 
c. aliohjelmien kutsuminen, konekielen hyvä ymmärrys, koodin optimointi 
d. aliohjelmien toteutus, moniulotteiset taulukot 
e. kokonaiset ohjelmat aliohjelmineen, laiteajuri 
f. itse muokkaavaa koodia, ihan mitä vain 
```

Päätason perässä oleva kolminumeroinen luku kertoo päätason sisällä vaikeusasteen (100=helppo, 900=vaikea). On suositeltavaa, että tehtävät tehdään tasojärjestyksessä helpoimmasta vaikeampaan. Vaikeusasteella 700 tehtävät millä tahansa tasolla voivat olla haastavia. Vaikeusasteen 900 tehtävät menevät jo syventävien oppimistavoitteiden puolelle.

Ohjelmointi on hauskaa ja siten myös konekielinen ohjelmointi. Älä kuitenkaan käytä kaikkea aikaasi näiden 50 tehtävän tekemiseen, koska kurssilla on paljon muutakin opittavaa. Hyvä tavoite olisi tehdä vaikeusasteen 100-660 tehtävät tasoilla a-d.

Perustavoitteet symbolisella konekielellä ohjelmoinnille tällä kurssilla ovat seuraavat. Osaat toteuttaa symbolisella ttk-91 konekielellä erilaisten tietorakenteiden (muuttujat, 1- ja 2-ulotteiset taulukot, tietueet) muistivaraukset ja niihin viittaamiset. Osaat käyttää tietorakenteita myös osoitinmuuttujien avulla. Osaat toteuttaa koodissa haarautumiset (if-then-else) ja erilaiset toistolauseet (for, while-do, do-until, ...). Osaat käyttää (seuraavassa luvussa esiteltäviä) aliohjelmia ja funktioita sekä toteuttaa ne. Osaat selittää, mikä on aktivointitietue ja aktivointitietuepino. Osaat käyttää arvo- ja viiteparametreja. Osaat varata globaaleja tietorakenteita ja aliohjelmien paikallisia tietorakenteita. Osaat viitata aliohjelmissa parametreihin sekä globaaleihin ja paikallisiin tietorakenteisiin.

## Quizit 5.5.?? ??????

<!-- quiz 5.5.??? ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


## Yhteenveto
Tämä luku käsitteli .....?????

Vastaa alla olevaan kyselyyn kun olet valmis ensimmäisen luvun tehtävien kanssa.

### summary quiz ?????

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
