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

Keskusmuisti voidaan toteuttaa kahdella vähän erilaisella teknologialla. [DRAM](https://fi.wikipedia.org/wiki/DRAM) (Dynamic Random Access Memory) on halvempi ja hitaampi. Sen toiminta perustuu mikropiirillä toteutettuihin kondensaattoreihin, joiden varaus pikkuhiljaa haipuu koko ajan. Niissä olevia tietoja täytyy sen vuoksi vähän väliä (esim. 2 ms) "virkistää", mihin kuluu jonkin verran aikaa. DRAM on kuitenkin yksinkertainen ja halpa toteuttaa, minkä vuoksi niitä on useimmissa tietokoneissa jo yli 40 vuotta. 

Toinen yleinen vaihtoehto keskusmuistin toteutukseen on [SRAM](https://fi.wikipedia.org/wiki/SRAM) (Static Random Access Memory). Siinä tieto on talletettu mikropiiriin samanlaisilla loogisilla porteilla ([gate](https://en.wikipedia.org/wiki/Logic_gate)), kuin millä esimerkiksi suoritin on toteutettu. Porteilla voidaan toteuttaa myös tiedon säilyttäviä [kiikkuja](https://fi.wikipedia.org/wiki/Kiikku_(digitaalitekniikka)). Kiikuilla toteutetaan esimerkiksi kaikki suorittimen rekisterit. Kiikut eivät tarvitse tiedon virkistystä, mutta SRAM-muistin toteutus vaatii paljon enemmän (esim. 8x) tilaa mikropiiriltä ja on sen vuoksi paljon kalliimpaa kuin DRAM-muistin toteutus. SRAM-muistia käytetään yleensä välimuistien toteutukseen, mutta myös paljon nopeutta vaativissa järjestelmissä keskusmuistin toteutukseen. 

Keskusmuistiteknologiaa kehitetään kokoa ajan ja molemmista muistiteknologioista on useita erilaisia tyyppejä käytössä. SDRAM (Synchronous Dynamic RAM):ssa on sisäinen puskuri, jonka avulla useampi muistipaikan luku voi olla meneillään yhtä aikaa.

## Välimuisti
????

## Pysyväismuisti, ROM (Read Only Memory) 
???


## Quizit 7.3
<!-- Quiz 7.3.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>





<text-box variant="example" name="Historiaa:  Ferriittirengasmuisti">
  
Fe.....
<!-- kuva: ch-7-3-ferriitti    -->

![kuvan selitysteksti puuttuu... ????.](./ch-7-3-ferriitti.svg)
<div>
<illustrations motive="ch-7-3-ferriitti"></illustrations>
</div>
credit....???? 

</text-box>

## Yhteenveto
Tämä luku käsitteli ?????.


###  summary quizit ???
Vastaa alla olevaan kyselyyn kun olet valmis tämän luvun tehtävien kanssa.

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
