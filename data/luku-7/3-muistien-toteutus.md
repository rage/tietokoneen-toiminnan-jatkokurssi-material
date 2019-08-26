---
path: '/luku-7/3-muisti-cache-ssd'
title: 'Järjestelmän sisäisten muistien toteutus'
hidden: false
---

<div>
<lead> johdanto ....???? </lead>
</div>

## Keskusmuisti
Tietokonejärjestelmän [keskusmuisti](https://fi.wikipedia.org/wiki/Keskusmuisti) on se muistialue, jossa ohjelman koodi ja data pääasiassa sijaitsevat ohjelman suorituksen aikana. Järjestelmän optimointitavoitteiden mukaisesti osa tiedoista voi sijaita eri tasoisissa välimuisteissa suorittimen lähellä tai erilaisissa massamuisteissa (ks. seuraava luku) paljon kauempana suorittimelta. Ohjelman suoritus perustuu kuitenkin ajatukseen, että suorituksessa olevat konekäskyt ja niiden käyttämä data ovat keskusmuistissa. 

Keskusmuisti ns. haipuvaa muistia, jolloin sen sisältö tyhjenee aina virran katkaisun yhteydessä. Tietokoneiden kehityksen alkuaikoina keskusmuistikin saatettiin toteuttaa sillä tavoin, että jotkut muistipaikat olivat nopeammin saatavilla kuin toiset. Nykyään kuitenkin keskusmuisti on lähes aina toteutettu RAM-muistina (Random Access Memory), mikä nimensä mukaisesti tarkoittaa, että kaikki muistipaikat ovat luettavissa tai kirjoitettavissa yhtä nopeasti. Järjestelmää käynnistettäessä (bootatessa) käynnistyskoodi pitää ensin ladata keskusmuistiin jostain pysyväismuistista, jotka nykyään on usein toteutettu [flash](https://fi.wikipedia.org/wiki/Flash-muisti)-muistina tietokoneen [emolevyllä](https://fi.wikipedia.org/wiki/Emolevy). Pysyväismuisti on paljon hitaampaa kuin keskusmuisti, mutta tieto säilyy siellä vuosia ilman sähkövirtaa.

Jotkut useamman suorittimen järjestelmien muisti on nykyään toteutettu [NUMA](https://en.wikipedia.org/wiki/Non-uniform_memory_access)-mallin (Non-Uniform Memory Access) avulla. Niissä kuhunkin suorittimeen on liitetty oma RAM-muistinsa, mutta kaikkeen muistiin pystyy viittaamaan jokaisesta suorittimesta. Tällöin lähellä oleva muisti on nopeampaa, kun muihin pitää viittaus toteuttaa suorittimien välissä olevien väylien ja muiden suorittimien kautta. Emme käsittele NUMA-mallia tämän enempää tällä kurssilla.

Keskusmuisti voidaan toteuttaa kahdella vähän erilaisella teknologialla. [DRAM](https://fi.wikipedia.org/wiki/DRAM) (Dynamic Random Access Memory) on halvempi ja hitaampi. Sen toiminta perustuu [mikropiirillä](https://fi.wikipedia.org/wiki/Mikropiiri) toteutettuihin kondensaattoreihin, joiden varaus pikkuhiljaa haipuu koko ajan. Niissä olevia tietoja täytyy sen vuoksi vähän väliä (esim. 2 ms) "virkistää", mihin kuluu jonkin verran aikaa. DRAM on kuitenkin yksinkertainen ja halpa toteuttaa, minkä vuoksi niitä on useimmissa tietokoneissa jo yli 40 vuotta. 

Toinen yleinen vaihtoehto keskusmuistin toteutukseen on [SRAM](https://fi.wikipedia.org/wiki/SRAM) (Static Random Access Memory). Siinä tieto on talletettu mikropiiriin samanlaisilla loogisilla porteilla ([gate](https://en.wikipedia.org/wiki/Logic_gate)), kuin millä suoritin on toteutettu. Porteilla voidaan toteuttaa myös tiedon säilyttäviä [kiikkuja](https://fi.wikipedia.org/wiki/Kiikku_(digitaalitekniikka)) (flip-flop). Kiikuilla toteutetaan myös kaikki suorittimen rekisterit. Kiikut eivät tarvitse tiedon virkistystä, mutta SRAM-muistin toteutus vaatii paljon enemmän (esim. 8x) tilaa mikropiiriltä ja on sen vuoksi paljon kalliimpaa kuin DRAM-muistin toteutus. SRAM-muistia käytetään yleensä välimuistien toteutukseen, mutta myös paljon nopeutta vaativissa järjestelmissä keskusmuistin toteutukseen. 

Keskusmuistiteknologiaa kehitetään kokoa ajan ja molemmista muistiteknologioista on useita erilaisia tyyppejä käytössä. Esimerkiksi [SDRAM](https://fi.wikipedia.org/wiki/SDRAM) (Synchronous Dynamic RAM) on DRAM:n tyyppi. Siinä on sisäinen puskuri, jonka avulla useampi muistipaikan luku voi olla meneillään yhtä aikaa. [DDR SDRAM](https://fi.wikipedia.org/wiki/SDRAM) (Double Data Rate SDRAM):ssa on tuplattu muistipiirin tiedonsiirtonopeus ovelasti hyödyntämällä mikropiirin toiminnan aikaansaavan [kellopulssin](https://en.wikipedia.org/wiki/Clock_cycle) nousevia ja laskevia jännitteitä. Emme käsittele keskusmuistin toteutusteknologioita tämän enempää tällä kurssilla.

## Välimuisti
[Välimuisti](https://fi.wikipedia.org/wiki/V%C3%A4limuisti) (cache) on suorittimen lähellä oleva muisti, joka sisältää kopioita keskusmuistissa olevista muistialueista. Ideana välimuistissa on, että tiedon löytyessä sieltä se on paljon nopeammin käytettävissä kuin jos se pitäisi hakea keskusmuistista. Välimuistin nopeus saadaan aikaan kahdella tavalla. Ensinnäkin, välimuisti on suorittimen puolella väylää, joten väylää eikä keskusmuistia tarvitse käyttää lainkaan tiedon löytyessä välimuistista. Toiseksi, välimuisti on yleensä toteutettu nopealla SRAM-teknologialla. Välimuisti voi olla toteutettu samalla mikropiirillä suorittimen kanssa, tai sitten omalla piirillään ihan suorittimen vieressä.

Välimuistin käyttö ohjelmalle on "tuntumatonta", eli konekäskyn suorituksen aikana ei tiedetä, löytyikö tieto välimuistista vai ei. Jos viitatut tiedot löytyvät usein välimuistista, niin ohjelma suoritus etenee nopeammin. 

Välimuistiteknologialle on tyypillistä, että pienempi on nopeampi. Tämän vuoksi välimuisteja on usein monta eri tasoista. Ainakin pienimmät ja nopeimmat on yleensä toteutettu samalla mikropiirillä suorittimen kanssa. Nykyisissä läppäreissä on yleensä 3-4 tasoa välimuisteja. Lisäksi alemman tason välimuisteja on erikseen koodille ja datalle. Koodi- ja dataviitteet käyttäytyvät vähän eri tavalla, joten on järkevää optimoida niiden välimuistit kullekin viitetyypille parhaiten sopivaksi.  

Välimuistissa olevaan tietoon ei siis viitata suoraan, vaan laitteisto tutkii jokaisen muistiviitteen yhteydessä (viitatun keskusmuistiosoitteen perusteella), löytyykö tieto välimuistista vai ei. Tiedon mahdollinen sijainti välimuistissa on tärkeä välimuistin toteutuksen osa. Jos mahdollisia paikkoja on vain yksi tai muutama, tiedon etsiminen sieltä on nopeata. Toisaalta taas tieto voidaan turhaan joutua poistamaan välimuistista, koska joku muu tieto pitää tallettaa juuri samalle alueelle välimuistissa. Toinen tärkeä ominaisuus on välimuistin lohkon ("rivin") koko, joka määrää kuinka monta peräkkäistä muistipaikkaa välimuistiin aina kerrallaan haetaan. 

Esimerkiksi, oletetaan, että rivin pituus on 8 sanaa. Taulukon T alkion T[0] lukeminen aiheuttaa koko välimuistilohkon T[0]-T[7] lukemisen muistista välimuistiin ja loput alkioista T[1]-T[7] löytyvätkin sitten (todennäköisesti) välimuistista. Keskusmuistiteknologiat SDRAM ja DDR SDRAM ovat suunnitellut tukemaan juuri välimuistilohkojen nopeata tiedonsiirtoa. Todellisuudessa keskusmuistia siis luetaan ja kirjoitetaan välimuistin rivi kerrallaan, vaikka ohjelmat viittaavatkin yksittäisiin muistipaikkoihin.

Sanaa "välimuisti" (cache) käytetään tietotekniikassa usealla eri tasolla. Niissä kaikissa pidetään lähempänä suoritinta kopioita kauempana olevasta tiedosta. Levyvälimuisti (file cache) pitää keskusmuistissa kopiota levyllä olevista tiedoista, selaimen välimuistissa ([web cache](https://en.wikipedia.org/wiki/Browser_cache)) on kaukanakin olevan verkkopalvelimen verkkosivuja tai musta dokumentteja. [DNS](https://fi.wikipedia.org/wiki/DNS)-välimuistissa taas on paikallisia kopioita verkon nimipalvelun tiedoista. Ole siis tarkkana, että termin "välimuisti" nähdessäsi yhdistät sen oikeaan käsitteeseen. Yleensä pelkällä sanalla "välimuisti" (cahe) tarkoitetaan juuri edelläesitettyä keskusmuistin välimuistia, mutta ei aina.

## Pysyväismuisti, ROM (Read Only Memory) 
???


## Quizit 7.3
<!-- Quiz 7.3.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


<text-box variant="example" name="Historiaa:  Ferriittirengasmuisti">
  
Jay Forrester kehitti [MIT](https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology):n [Whirlwind](https://en.wikipedia.org/wiki/Whirlwind_I)-projektissa [ferriittirengasmuistin](https://fi.m.wikipedia.org/wiki/Ferriittirengasmuisti) ([magnetic core memory](https://en.wikipedia.org/wiki/Magnetic-core_memory)), joka patentoitiin 1951. Ferriittirengasmuisti syrjäytti Williams Tube ja elohopeaviiveputkimuistit muutamassa vuodessa keskusmuistin yleisimpänä toteutustapana. Ferriittirengasmuisti perustui pieniin magneettisiin renkaisiin ja bitit talletettiin sinne renkaiden polarisaatiota vaihdellen. Renkaat olivat 2-ulotteisessa matriisissa, ja jokainen bitti oli osoitettavissa sen xy-koordinaattijohtimien avulla. Kolmas johdin tarvittiin tiedon luku- ja kirjoitusoperaatioihin. Renkaiden asentaminen ohuine sähköjohtimineen oli tarkkaa käsityötä. Hyvänä puolena ferriittirenkaissa oli, että tieto säilyi niissä ilman sähkövirtaa. Toisena hyvä ominaisuutena oli, että säteily ei aiheuttanut häiriöitä talletettuun tietoon, mikä oli tärkeää sen ajan sotilas- ja avaruusteknologioille. Vielä 1970-luvulla ferriittirengasmuistia käytettiin Apollo-ohjelmassa kuulennoilla. Nyt muistista on jäljellä enää käsitteet "core" ja "core memory", joilla viitataan keskusmuistiin yleensä.

<!-- kuva: ch-7-5-ferriitti    -->

![Vasemmalla valokuva ferriittirengasmuistista ja oikealla sen piirretty skeema. Valokuvassa noin 20x20 hilassa on noin 400 ferriittirengasta. Renkaiden läpi kulkee x-ja y-akselien suuntaisesti koordinaattijohtimet, noin 20 kapppaletta kumpaakin. Lisäksi kaikkien johtimien läpi kulkee yksi yhteinen luku- ja kirjoitusjohdin. Kuvassa mukana mittakaavana 1€ kolikko, joka on noin 1/4 ferriittirengas hilan koosta. Oikealla skeemakuvassa on suurennettuna 4x4 hilan 16 ferriittirengasta, koordinaatti- ja luku/kirjoitusjohtimineen. ](./ch-7-5-ferriitti.svg)
<div>
<illustrations motive="ch-7-5-ferriitti"></illustrations>
</div>

</text-box>

## Yhteenveto
Tämä luku käsitteli ?????.


###  summary quizit ???
Vastaa alla olevaan kyselyyn kun olet valmis tämän luvun tehtävien kanssa.

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
