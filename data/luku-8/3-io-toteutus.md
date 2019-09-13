---
path: '/luku-8/3-io-toteutus'
title: 'I/O:n toteutus'
hidden: false
---

<div>
<lead>Pääoppimistavoitteena ... ?????
</lead>
</div>

## Laiteohjain ja laiteajuri
I/O:n toteutus on monimutkainen, koska siinä suoritetaan oikeasti samanaikaisesti kahta eri prosessia, joiden tulee koordinoida toimintaansa keskenään. Työnjako on jaettu kahteeneri prosessiin: suorittimella suorittavaan laiteajuriin (DD, device driver) ja laiteohjaimella suorittavaan laiteohjainprosessiin (DCP, device controller process). Laiteajuri on osa käyttöjärjestelmää ja jokaista laiteohjainta varten on siihen sopiva laiteajuri. 

Laiteajuri pääsee suorittimelle suorittamaan aika ajoin, mutta DCP on periaatteessa suorituksessa koko ajan, koska laiteohjaimella ei ole mitään muuta tekemistä. Laiteajuri voi olla itsenäinen prosessi, jolloin käyttäjätason prosessin kutsuvat sitä viestein. Laiteajuri voi olla toteutettuna myös aliohjelmana, jolloin käyttäjäprosessit kutsuvat sitä aliohjelmien kutsukäskyillä tai SVC:llä. Joka tapauksessa laiteajuri (tai ainakin sen tärkeimmät osat) suoritetaan etuoikeutetussa tilassa.

Laiteohjaimella on kaksi rajapintaa, toinen järjestelmään päin ja toinen sen kontrolloimiin laitteisiin. Emme käsittele varsinaisten laitteiden (esim. kovalevy, näyttä, näppäimistö) ohjauslogiikkaa.  Rajapinta järjestelmään tapahtuu väylän kautta ja siihen liittyy kolme muistialuetta, joita yleensä kutsutaan kontrolli-, status- ja datarekistereiksi. Suorittimella suorituksessa oleva laiteajuri pystyy viittaamaan näihin laiteohjaimen rekistereihin samalla tavalla kuin keskusmuistiinkin. 

<!-- kuva: ch-8-3-laiteohjain    -->

![Kaavakuva järjestelmästä, jossa on muisti, suoritin ja väylä. Muistissa on puskuri. Suorittimella on käyttäjäprosessi ja laiteajuri. Väylään on liitetty myös laiteohjain. Laiteohjaimen rajapinta väylälle koostuu data, kontrolli- ja statusrekistereistä. Laiteohjaimen ulkoiasten laitteiden rajapinnassa on kahden laittee ohjauslogiikat ja kumpaankin niistä on liitetty kovalevy. Laiteohjaimen toimintaa ohjaa siellä suorituksessa oleva laiteohjainprosssi.](./ch-8-3-laiteohjain.svg)
<div>
<illustrations motive="ch-8-3-laiteohjain"></illustrations>
</div>

Laiteohjaimen rekisterit ovat myös DCP:n viitattavissa, mistä voisi aiheutua samanaikaisuusongelmia. Esimerkiksi, jos sekä DD että DCP kirjoittaisivat yhtä aikaa samaan rekisteriin, niin lopputulos voisi olla hyvin sekava. Tämä mahdollisuus on vältetty ovelasti sillä tavoin, että ainoastaan DD kirjoittaa kontrollirekisteriin ja ainoastaan DCP kirjoittaa status-rekisteriin. DD viestii DCP:lle kontrollirekisterin kautta ja DCP viestii laiteajurille statusrekisterin kautta. 

Datarekisteri voi itse asiassa olla laitteesta riippuen hyvinkin suuri. Esimerkiksi levyohjaimien laiterekisterissä voi sijaita usea monen megatavun puskuri. Laiterekisteriä voivat lukea ja kirjoittaa sekä DD että DCP. Kirjoittamista ja lukemista synkronoidaan kontrolli- ja statusrekistereiden avulla.

#### I/O tyypit
????

#### I/O:n toteutus konekäskyillä
????
### Laiterekisterit
???

#### Laiterekistereihin osoittaminen laiteajurista
???

###  Laiteohjainprosessi


## I/O:n toteutustavat
???

## Esimerkki: ttk-91 kirjoittimen laiteajuri
????

#### Ttk-91 kirjoittimen laiteajuri
????


## Quizit 8.3 ????
<!--  quizit 8.3.???  -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>

<text-box variant="example" name="Historiaa:  Tyhjiöputki">

Fe.....
<!-- kuva: ch-8-3-tyhjioputki    -->

![Kuvaselitys puuttuu ???.](./ch-8-3-tyhjioputki.svg)
<div>
<illustrations motive="ch-8-3-tyhjioputki"></illustrations>
</div>
credit....????

</text-box>

<text-box variant="example" name="Historiaa:  Transistori ja mikropiiri">

Transtori kuva:  https://commons.wikimedia.org/wiki/File:1st-Transistor.jpg 
1947. 1956 Nobel (Shockleen, Bardeen, Brattain)

Mikropiirikuva??
Kilby & Noyce 1960, Noyce perustamassa Intel'iä 1968, Kilbylle Nobel 2000
Intel 4004 (1971)
  

<!-- kuva: ch-8-1-transitori    -->

![Vasemmalla  ](./ch-8-1-transitori.svg)
<div>
<illustrations motive="ch-8-1-transitori"></illustrations>
</div>

</text-box>

## Yhteenveto
Tämä luku ...

Vastaa alla olevaan kyselyyn, kun olet valmis tämän luvun tehtävien kanssa.

### summary quizit ???

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
