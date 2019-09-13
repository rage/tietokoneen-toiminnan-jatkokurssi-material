---
path: '/luku-8/3-io-toteutus'
title: 'I/O:n toteutus'
hidden: false
---

<div>
<lead>Pääoppimistavoitteena tässä aliluvussa on esitellä I/O:n erilaiset toteutustavat ja mitä ne vaativat I/O-laitteen laiteohjaimelta. Esittelemme myös erilaiset tavat suorittimelle tunnistaa, viittaako jokin konekäsky keskusmuistiin vai laiteohjaimen muistiin (laiterekisteriin). 
</lead>
</div>

## Laiteohjain ja laiteajuri
I/O:n toteutus on monimutkainen, koska siinä suoritetaan oikeasti täysin samanaikaisesti kahta eri prosessia, joiden tulee koordinoida toimintaansa keskenään. Työnjako on jaettu kahteen eri prosessiin: suorittimella suorittavaan laiteajuriin (DD, device driver) ja laiteohjaimella suorittavaan laiteohjainprosessiin (DCP, device controller process). Laiteajuri on osa käyttöjärjestelmää ja jokaista laiteohjainta varten on siihen sopiva laiteajuri. 

Laiteajuri pääsee suorittimelle suorittamaan aika ajoin, mutta DCP on periaatteessa suorituksessa koko ajan, koska laiteohjaimella ei ole mitään muuta tekemistä. Laiteajuri voi olla itsenäinen prosessi, jolloin käyttäjätason prosessin kutsuvat sitä viestein. Laiteajuri voi olla toteutettuna myös aliohjelmana, jolloin käyttäjäprosessit kutsuvat sitä aliohjelmien kutsukäskyillä tai SVC:llä. Tällöin laiteajuri suoritetaan osana käyttäjäprosessia. Joka tapauksessa laiteajuri (tai ainakin sen tärkeimmät osat) suoritetaan etuoikeutetussa tilassa.

Laiteohjaimella on kaksi rajapintaa, toinen järjestelmään päin ja toinen sen kontrolloimiin laitteisiin. Emme käsittele varsinaisten laitteiden (esim. kovalevy, näyttö, näppäimistö) ohjauslogiikkaa sen tarkemmin.  Rajapinta järjestelmään tapahtuu väylän kautta ja siihen liittyy kolme muistialuetta, joita yleensä kutsutaan kontrolli-, status- ja datarekistereiksi. Näitä voidaan kutsua myös kyseisen laitteen _portiksi_. Suorittimella suorituksessa oleva laiteajuri voi viitata laiteohjaimen rekistereihin samalla tavalla kuin keskusmuistiinkin. 

<!-- kuva: ch-8-3-laiteohjain    -->

![Kaavakuva järjestelmästä, jossa on muisti, suoritin ja väylä. Muistissa on puskuri. Suorittimella on käyttäjäprosessi ja laiteajuri. Väylään on liitetty myös laiteohjain. Laiteohjaimen rajapinta väylälle koostuu data, kontrolli- ja statusrekistereistä. Laiteohjaimen ulkoiasten laitteiden rajapinnassa on kahden laittee ohjauslogiikat ja kumpaankin niistä on liitetty kovalevy. Laiteohjaimen toimintaa ohjaa siellä suorituksessa oleva laiteohjainprosssi.](./ch-8-3-laiteohjain.svg)
<div>
<illustrations motive="ch-8-3-laiteohjain"></illustrations>
</div>

Laiteohjaimen rekisterit ovat myös DCP:n viitattavissa, mistä voisi aiheutua samanaikaisuusongelmia. Esimerkiksi, jos sekä DD että DCP kirjoittaisivat täsmälleen yhtä aikaa samaan rekisteriin, niin lopputulos voisi olla sekava tai ainakin epämääräinen. Tämä mahdollisuus on vältetty ovelasti sillä tavoin, että ainoastaan DD kirjoittaa kontrollirekisteriin ja ainoastaan DCP kirjoittaa status-rekisteriin. DD viestii DCP:lle kontrollirekisterin kautta ja DCP viestii laiteajurille statusrekisterin kautta. 

Datarekisteri voi itse asiassa olla laitteesta riippuen hyvinkin suuri. Esimerkiksi levyohjaimien laiterekisterissä voi sijaita usea monen megatavun puskuri. Laiterekisteriä voivat lukea ja kirjoittaa sekä DD että DCP. Datarekisterin kirjoittamista ja lukemista synkronoidaan kontrolli- ja statusrekistereiden avulla, joten sen käyttö on mahdollista ilman samanaikaisuusongelmia.

### Laiterekistereihin osoittaminen laiteajurista
Laiteajuri voi siis viitata laiteohjaimen rekistereihin samalla tavalla kuin keskusmuistiinkin. Tästä seuraa, että konekäskyissä pitää jollain tavoin määritellä, kumpaan muistiin (keskusmuistiin vai laiteohjaimen rekistereihin) ollaan viittaamassa. 

#### I/O-konekäskyt
Yksi tapa on käyttää erityiskonekäskyjä, jolloin näiden käskyjen yhteydessä viittaus tapahtuu aina laiteohjaimen rekistereihin. Ttk-91 koneessa in- ja out-käskyt toimivat juuri näin. Esimerkiksi out-käsky kirjoittaa aina näytön datarekisteriin sen sijaan, että kirjoitettasiin johonkin päin muistia. 

```
in  r1, =kbd
out r2, =crt
```

Intelin x86 arkkitehtuurissa on aivan vastaavat IN ja OUT käskyt. Esimerkiksi IN-käskyllä luetaan valitulta laitteelta 1, 2 tai neljä tavua dataa johonkin rekisteriin. Näitä käskyjä käyttämällä operaatiokoodista päätellään, mihin muistiin (keskusmuistiin vai laiteohjaimien rekistereihin) muistiviittaukset kohdistuvat.

I/O-konekäskyjen huonona puolena on niiden staattisuus. Ne on täytynyt suunnitella konekielen käskykannan suunnitteluaikana ja ne on toteutettu kiinteästi suorittimelle. Niitä ei voi myöhemmin muokata, eikä niitä voi tehdä lisää mahdollisia uusia I/O-laitteita varten.

#### Muistiinkuvattu I/O
Toinen tapa on käyttää _muistiinkuvattua I/O:ta_, jossa normaali ohjelman käyttämä muistiavaruus (muistiosoitteiden joukko) on jaettu kahteen osaan.  Esimerkiksi, jos 32-bittisen muistiosoitteen vasemmanpuolimmainen bitti on nolla (osoitteet 0x0000&nbsp;0000-0x7FF&nbsp;FFFF), niin kyseessä on keskusmuistiosoite, ja muutoin (osoitteet 0x8000&nbsp;0000-0xFFF&nbsp;FFFF) kyseessä on viittaus jonkin I/O-laitteen laiteohjaimelle. Jos bitit 24-30 (oikealta lukien) käytetään laitteen valitsemiseen, niin laitteita voisi olla 64 erilaista ja jokaiselle laitteelle jää vielä 24-bittiset osoitteet laiteohjaimen oman muistialueen (laiterekistereiden) viittamiseen. 

Huonona piirteenä tässä on, että suuri osa ohjelman muistiavaruudesta (edellisessä esimerkissä 50%) on nyt varattu I/O-laitteille. Etuna on, että I/O-laitteita kontrolloidaan tavallisilla muistiviitekäskyillä (load, store). Uuden tyyppisiä laitteita on helppo lisätä järjestelmään, kunhan niille vain kirjoitetaan sopiva laiteajuri. Tämä on yleisin tapa ohjata laitteita.

```
# uuden kirjoittimen 0x4 laiterekisterit
PrinterControl  equ 0x84000001  # kontrollirekisterin osoite
PrinterStatus   equ 0x84000002  # statusrekisterin osoite
PrinterData     equ 0x84000003  # datarekisterin osoite

CmdPrint  equ 1    # tulostuskomento

...
# tulosta luku 53 kirjoittimella 0x4
     load r1, =53            ; kirjoita luku 53 datarekisteriin
     store r1, PrinterData   ; kirjoittaa laiteohjaimen datarekisteriin
     load r1, =CmdPrint
     store r1, DiskControl   ; anna tulostuskäsky laiteohjaimelle 
```

### I/O-tyypit
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
