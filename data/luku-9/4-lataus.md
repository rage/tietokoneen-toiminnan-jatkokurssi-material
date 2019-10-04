---
path: '/luku-9/4-lataus'
title: 'Lataus'
hidden: false
---

<div>
<lead>Tässä aliluvussa kuvaamme, kuinka latausmoduulista saadaan järjestelmässä suorituskelpoinen prosessi. 
</lead>
</div>

## Latausmoduuli
Oletamme nyt, että latausmoduuli on staattisesti linkitetty moduuli, jonka voi sellaisenaan suorittaa. Esittelimme edellisessä aliluvussa dynaamisen linkityksen, emmekä käsittele sitä tässä sen enempää. 

Latausmoduulissa on ohjelman koodi konekielisessä esitysmuodossa ja mistä konekäskystä pääohjelman suoritus alkaa. Siellä on jo myös määritelty tilanvaraukset kaikille globaaleille (pääohjelmatasolla) määritellyille tietorakenteille mahdollisen alkuarvoineen. Siellä on kerrottu, kuinka suuri pino tälle ohjelmalle tulisi varata ja mitä tiedostoja tulisi avata ohjelman käynnistämisen yhteydessä. 

## Lataus, prosessin luonti
Käyttöjärjestelmä (KJ) luo uuden prosessin valitsemalla ensin sille uuden prosessin tunnisteen (PID, process identifier). Prosessille varataan muistitilaa keskusmuistista sen koodia ja hallintotietoja varten. Jos käytössä on virtuaalimuisti, niin prosessille varataan muistitilaa virtuaalimuistin sivutauluille ja massamuistitilaa prosessin koko muistiavaruuden tallettamiseksi virtuaalimuistin tukimuistiin (ks. Luku 8).

KJ luo prosessille sen kuvaajan (kontrollilohko, PCB, Process Control Block). Kuvaajassa on tallessa kaikki prosessin käyttämät resurssit (ks. Luku 4). Prosessille avataan sen tarvitsemat tiedostot, laitteet ja verkkoyhteydet joko tässä yhteydessä etukäteen tai vasta prosessin suorituksen aikana. Tiedot kaikista aukiolevista tiedostoista, laitteista ja verkkoyhteyksistä ovat myös kuvaajassa. Kuvaajat ovat usein vakiokokoisia ja KJ tallettaa ne omalle muistialueelleen. Kuvaajalle ei siten yleensä tarvitse varata muistitilaa, vaan ainoastaan otetaan joku vapaana oleva PCB uusiokäyttöön. Kuvaaja on (tietenkin) KJ:n omalla muistialueelle ja siihen voi viitata ainoastaan etuoikeutetussa suoritustilassa.

Prosessille varataan muistitilaa pinolle, keolle ja muiden prosessien kanssa yhteisille muistialueille sen latausmoduulissa annettujen määrittelyjen mukaisesti. Kaikki tiedot talletetaan kuvaajaan. 

<!-- kuva: ch-9-4-prosessi-pcb  -->
![Otsake Prosessi ja sen kuvaaja (PCB). Oikealla on iso laatikko, joka kuvaa muistia. Siinä on prosessin muistialueet PC, koodi ja pino. Vasemmalla on PCB suurennettuna ja siinä ensin kentät PID ja suoritinympäristö (PC, etc). Sitten varatut muistialueet (pcp, koodi, pino), joista kustakin on nuoli oikealla olevaan muistin vastaavaan alueeseen. Lopuksi PCB.ssä on kentät tiedostot, laitteet, verkkoyhteydet, CPU-prioriteetti, jne.  Alla on väylän takana massamuistina kovalevy, josta on varattu tietty määrä tilaa virtuaalimuistin tukimuistille.](./ch-9-4-prosessi-pcb.svg)
<div>
<illustrations motive="ch-9-4-prosessi-pcb"></illustrations>
</div>

Perusidea on, että _kaikki_ yhteen prosessiin liittyvät tiedot löytyvät sen kuvaajasta (ja siihen linkitetyistä muista tietorakenteista). Sitten kun prosessi aikanaan poistetaan järjestelmästä, käyttöjärjestelmä voi kuvaajan tietojen perusteella vapauttaa kaikki prosessin käyttämät resurssit ja lopulta vapauttaa sen tunnisteen (PID) uusiokäyttöön.

Prosessin suoritinympäristössä (processor context) on arvot kaikille laiterekistereille, jotka pitää ladata, kun tämä prosessi aikanaan pääsee suoritukseen. Kun (jos) prosessi joutuu myöhemmin odottamaan mistä tahansa syystä, suoritinympäristö kopioidaan suorittimelta tänne sitä varten, että suoritus voisi joskus jatkua samasta kohtaa (saman konekäskystä sen alusta pitäen) täsmälleen samassa ympäristössä kuin mitä se oli suorituksen keskeytyessä. Suoritinympäristöön kuuluvat kaikki rekisterit ja prosessin hallintaan liittyvät rekisterit em. tarkoitusta varten. Siihen sisältyvät esimerkiksi kaikki laskentaan tarvittavat työ- ja indeksirekisterit sekä erilaiset suorittimen kontrolliin liittyvät rekisterit kuten paikanlaskuri PC, pinorekisteri SP, kekorekisteri HP, tilarekisteri SR, vertailujen tulosrekisterit CR, muistialueiden rajarekisterit BASE ja LIMIT, virtuaalimuistin sivutaulujen osoiterekisterit PT, jne.

Nyt prosessi on valmis ja järjestelmä tunnistaa sen uniikista PID:stä. Jos prosessin kaikki tarvittavat resurssit (esim. riittävä määrä keskusmuistia) on heti saatu käyttöön, prosessi voidaan siirtää R-to-R jonoon (valmis suoritukseen jono, Ready-jono, Ready-to-Run jono) odottamaan suoritusta suorittimella. Muussa tapauksessa prosessi laitetaan odotustilaan (esim. keskusmuistia odottavien prosessien jonoon), josta se sitten joskus myöhemmin resurssien vapauduttua pääsee R-to-R jonoon odottamaan suoritusvuoroaan.

Prosessin kuvaajan tietoja ja prosessien hallintaa yleensä käsitellään tarkemmin yliopistojen käyttöjärjestelmäkursseilla.



## Quizit 9.4 lataus
<!--  quizit 9.4.???  -->
<div><quiz id="98478074-7943-4b62-a2f3-c94c6fd5b260"></quiz></div>

<text-box variant="example" name="Historiaa:  Nykyaikainen suoritin Intel Core i9-9900K">

Suorittimessa on 8 ydintä (core), jotka ovat kukin tällä kurssilla esitetyn mallin mukaisia suorittimia. Lisäksi kuhunkin ytimeen sisältyy kaksi joukkoa kaikkia laiterekistereitä, joiden avulla kukin ydin voi olla suorittamassa kahta eri prosessia (säiettä, thread), mutta yhtä kerrallaan. Idea tässä on, että kun yksi säie tekee muistiviitteen välimuistihudin takia, niin suoritus siirtyy saman ytimen toiselle säikeelle. Jos sekin tarvitsee muistiviitteen, niin sitten vain odotellaan. Tällä tavoin yhdestä ytimestä saadaan kuitenkin esim. 50-70% enemmän laskentatehoa kuin vain yhtä rekisterijoukkoa käytettäessä. Intel käyttää teknologiasta nimeä Intel Hyper-Threading.

Kullakin ytimellä on 64 KB L1-välimuisti, 256 KB L2-välimuisti ja 2 MB L3-välimuisti. Muistinhallintayksikkö nopealle DDR-keskusmuistille ja se voi pitää yllä kahta yhteyttä yhtäaikaisesti. Muistiosoitteet ovat 64-bittisiä. Oikealla kuvassa on samalle mikropiirille toteutettu näytönohjain. Ytimet ja näytönohjain on yhdistetty toisiinsa rengasmaisesti. 

Joka ytimen säikeellä on 16 kappaletta 64-bittistä yleisrekisteriä. Lisäksi siellä on 16 kappaletta 128-bittistä XMM-rekisteriä (MultiMedia eXtension). Niitä voidaan kutakin käyttää grafiikkasovelluksissa esimerkiksi 16 kappaleena 8-bitin vektorirekistereitä ja XMM-konekäskyt voivat vastaavasti toteuttaa operaatioita yhdellä kertaa kaikille 16 kappaleelle 8-bitin tietoalkioita. Liukulukulaskenta tapahtuu omien 8 liukulukurekisterin avulla. Nimettyjen rekistereiden asemesta liukulukurekistereitä käsitellään pinona. Kaikki konekäskyjen viittaukset liukulukurekistereihin tapahtuvat suhteessa tämänhetkiseen pinon huippuun.

![???? selitys puuttuu ch-9-4-i9-9900k ????.](./ch-9-4-i9-9900k.svg)
<div>
<illustrations motive="ch-9-4-i9-9900k"></illustrations>
</div>

</text-box>

## Yhteenveto
Tämä luku ...

Vastaa alla olevaan kyselyyn, kun olet valmis tämän luvun tehtävien kanssa.

### summary quizit lukuun 9 ???

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
© 2019 GitHub, Inc.
