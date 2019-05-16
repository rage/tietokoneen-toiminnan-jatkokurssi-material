---
path: "/luku-5/4-optimoitu-koodi"
title: "Optimoitu koodi"
---

<div>
<lead> ????? </lead>
</div>

## Optimoidun koodin tarkoitus
Tietokoneohjelmien suoritusnopeus on monissa sovelluksissa hyvin tärkeätä. Esimerkiksi sääennustemallin ratkaisu pitäisi pystyä laskemaan muutamassa tunnissa, jotta ennuste voidaan antaa ajoissa. Toinen hyvä esimerkki on tietokonepelit, joissa vaaditaan huima määrä laskentaa realiaikaisen pelitilanteen ylläpitämiseksi ja sen näyttämiseen pelaajalle.

Ohjelman koodi voidaan toteuttaa sillä tavoin, että sen suoritusaika olisi mahdollisimman pieni. Koodin optimoinnilla tarkoitetaan juuri tätä. Yleisesti ottaen, koodin optimointi on vaikeata ja korkean tason kielten kääntäjät voivat helposti käyttää yli puolet ajastaan koodin optimointiin. 

Optimoinnin vaatiman käännösajan vuoksi useissa suurissa ohjelmistoprojekteissa koodi käännetään ohjelmiston kehitysaikana ilman optimointia. Ohjelmiston valmistuttua se käännetään sitten hyvin optimoidusti, jotta lopputuote toimisi mahdollisimman nopeasti.

## Optimoidun koodin toteutus
Koodin optimointia tehdään usealla eri tasolla. Tavoite koodin optimoinnilla on aina tuottaa koodia, jonka suoritusaika olisi mahdollismman pieni. Tämän takia yleensä pyritään suorittamaan mahdollisimman vähän konekäskyjä ja mahdollisimman vähän muistiviitteitä. Viimeksimainittuun tavoitteeseen sisältyy sellainen koodi, joka ottaa täyden hyödyn irti välimuistista. Ongelmakenttä on selvästikin monimuotoinen ja käsittelemme sitä tässä vain kursoorisesti. 

[Rekistereiden allokointi](https://en.wikipedia.org/wiki/Register_allocation) on yksi tärkeimmistä optimoinnin osa-alueista. Rekistereiden allokoinnissa päätetään, mihin tarkoitukseen kutakin rekisteriä käytetään milloinkin ohjelman suoritusaikana. Onko muuttujan X arvo nyt rekisterissä r3, rekisterissä r5 ja ainoastaan muistissa. Silmukan muuntelumuuttujan arvo olisi usein kätevää pitää rekisterissä, mutta onko nyt juuri vapaata rekisteriä sitä varten? Allokointiongelman ydin on siinä, että rekisteitä on vähän ja viitattavaa dataa paljon.

Yksi optimoinnin kohde on siinä, että milloin jotkut taulukoiden indeksitarkistukset voisi jättää pois ohjelman turvallisuuden siitä kärsimättä. On helppo havaita, että silmukassa

```
for (i=1 to 499) {
   ...
   T[i] = ...
   ...
   }
```

taulukkoviite T[i] on turvallinen, jos taulukon T koko on ainakin 500 ja i:n arvoa ei muuteta muualla silmukassa. Tämän päättelyn tekeminen algoritmisesti on kuitenkin yleisessä tapauksessa vaikeata. Silmukka voi olla hyvinkin suuri ja viitattavan taulukon voi olla vaikea päätellä.

Esimerkkinä optimoinnista ajatellaan vaikkapa silmukkaa

```
for (i=0 to 499)
   T[i] = 0;
```

Se voisi ilman optimointia kääntyä konekieliseksi koodiksi

```
      load  r5,=0     ; alusta i
      store r5, i
      load  r2, =0    ; r2 = 0 (vakio)
      
Loop  load r1, i      ; silmukan runko
      store r2, T(r1)
      
      load r3, i       ; kasvata i
      add  r3,=1
      store r3, i
      
      load r4, i       ; silmukan lopetustesti
      comp r4,=500
	    jles  Loop
```
Tämä koodi tuottaa täsmälleen oikean lopputuloksen eli se on virheetön. Siinä on kuitenkin useita suoritusnopeuden kannalta huonoja piirteitä. Koodi käyttää viittä työrekisteriä (r1-r5), joten niillä ei voi olla mitään muuta käyttöä samanaikaisesti. Muuttujan i arvo pidetään koko ajan muistissa, joten siihen kohdistuu valtava määrä muistiviitteitä. osa muistiviitteistä on ihan turhia, kun tarvittava arvo oli jo valmiiksi jossain rekisterissä. Lopetustesti perustuu vertailuun lukuun 500, joten vertailu ja sitä seuraava ehdollinen hyppykäsky vaativat aina kaksi konekäskyä.

Saman taulukon alustuksebn voisi toteuttaa optimoidulla koodilla

```
      load  r1,=499   ; i:n viimeinen arvo r1:ssä
      load  r2, =0    ; r2 = 0 (vakio)
Loop  store r2, T(r1)
      add    sub,=1
	    jnneg  Loop
Done  store r1, i  ; jos ohjelmointi kielen semantiikka vaatii tätä

```

Optimoidussa koodissa suoritetaan yhteensä 1503 konekäskyä, kun optimoimaton koodi tarvitsi 4003 konekäskyä. Optimoitu kodi teki ???? muistiviitettä, kun ???????

## Quizit 5.4 ??????

<!-- quiz 5.4 ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
