---
path: '/luku-9/3-linkitys'
title: 'Linkitys'
hidden: false
---

<div>
<lead>Tässä aliluvussa annamme yleiskuvan linkityksen toteuttamisesta. Staattisesti ennen suoritusta 
</lead>
</div>

## Staattinen linkitys
Normaalitapaus linkityksestä on staattinen linkitys, jossa ohjelman kaikki objektimoduulit yhdistetään yhdeksi ajomoduuliksi ennen suoritusta. Kaikilla tunnuksilla on tunnettu arvo, eikä mitään ohjelman osia puutu.

Tämän pääluvun alussa ensimmäsessä aliluvussa esiteltiin linkityksen perusidea. Täsmennämme nyt sitä tässä esimerkin avulla.

Meillä on kolme käännettyä moduulia, jotka ovat GameX, Stats ja Math. Math-moduuli on kirjastomoduuli, vaikka sillä ei ole tässä merkitystä. Pääohjelma on moduulissa GameX, jonka osoiteavaruus on 0-7999. Siellä on määritelty ainakin yksi muuttuja X (osoitteessa 0), johon viitataan ainakin osoitteessa 234 olevassa konekäskyssä. Konekäskyssä osoitteessa 3333 kutsutaan moduulin Stats tilastorutiinia Report. GameX'n uudelleensijoitustaulusta löytyy paikallisen symbolin X arvo 0 ja sen viittauskohdat.  GameX'n EXPORT-hakemisto on tyhjä, koska siinä moduulissa ei ole muiden moduulien viitattavissa olevia rakenteita. Sen IMPORT-hakemistossa on tilastorutiini Stats.Report, johon on viitattu käskyssä 3333.

Moduulin Stats osoiteavaruus on 0-5999. Siellä on (ainakin) yksi muuttuja A, joka on osoitteessa 0 ja johon on viitattu osoitteissa 302 ja 850. EXPORT-hakemistossa on (ainakin) moduulin palvelurutiini Report, jonka osoite on 800. IMPORT-hakemistossa on (ainakin) matematiikkarutiini Math.Aver, johon on viitattu osoitteessa 840.

Moduulin Math osoiteavaruus on 0-4999. Siellä on (ainakin) yksi muuttuja Sum, joka on osoitteessa 0 ja johon on viitattu osoitteessa 5. EXPORT-hakemistossa on (ainakin) keskiarvon laskentarutiini Aver, jonka osoite on 2400. Sen IMPORT-hakemisto on tyhjä, koska moduuli Math ei käytä mitään moduulin ulkopuolisia rakenteita.

<!-- kuva: ch-9-3-moduulit-ennen-linkitysta  -->

![  Puuttuu ???? ch-9-3-moduulit-ennen-linkitysta.](./ch-9-3-moduulit-ennen-linkitysta.svg)
<div>
<illustrations motive="ch-9-3-moduulit-ennen-linkitysta"></illustrations>
</div>

Linkityksessä moduulit täytyy laittaa muistiin johonkin järjestykseen ja samalla niiden osoiteavaruudet täytyy yhdistää. Tällä kertaa laitamme ne edellä esitetyssä järjestyksessä, jolloin GameX tulee ensimmäisenä ja Math viimeisenä. Koska GameX on ensimmäisenä, niin sen osoitteet eivät muutu ja sen uudelleensijoitusvakio on nolla (0). 

Seuraavaksi tulee moduuli Stats. Sitä edeltää moduuli GameX, jonka koko on 8000 sanaa, joten uudelleensijoitusvakio on 8000. Moduulin Stats kaikkiin sisäisiin viitteisiin täytyy lisätä tuo 8000, joten kaikki muuttujan a viittaukset täytyy päivittää osoitteeseen 8000 (=0+8000). Palvelurutiinin Report osoite oli 800, mutta nyt se päivittyy osoitteeksi 8800 (=800+8000).  

Kirjastomoduuli Math on viimeisenä. Sitä edeltävät moduulit GameX ja Stats, joiden yhteinen koko 14000 on siten moduulin Math uudelleensijoitusvakio.  Kaikki viitteet muuttujaan Sum kohdistuvatkin nyt osoitteeseen 14000 (=0+14000) ja keskiarvon laskentarutiinin Aver osoite pitää päivittää arvoon 16400 (=2400+14000).

<!-- kuva: ch-9-3-moduulit-jalkeen-linkityksen  -->

![  Puuttuu ???? ch-9-3-moduulit-jalkeen-linkityksen .](./ch-9-3-moduulit-jalkeen-linkityksen.svg)
<div>
<illustrations motive="ch-9-3-moduulit-jalkeen-linkityksen"></illustrations>
</div>

Linkitetyn moduulissa kaikilla symboleilla on arvo. Sen EXPORT-hakemistossa on uuden linkitetyn moduulin osoitteet kaikille palvelurutiineille ja IMPORT-hakemisto on tyhjä, koska kaikki viitteet muihin moduuleihin on ratkaistu. 

Symbolien viittauskohdat on päivitetty linkitetyn moduulin uudelleensijoitustauluun siltä varalta, että linkitys vielä jostain syystä jatkuisi eteenpäin. 

## Quizit 9.3 staattinen linkitys
<!--  quizit 9.3.???  -->
<div><quiz id="aec1b502-8b29-4f47-a0a8-e702f13cbda7"></quiz></div>

## Dynaaminen linkitys
Useissa tapauksissa voi olla järkevää tehdä linkitys dynaamisesti vasta suoritusaikana. Oletetaan esimerkiksi, että edellisen esimerkin GameX kirjastomoduuli Math olisi dynaamisesti linkitettävä moduuli. Nyt latausmoduulista puuttuu moduuli Math ja rutiini Math.Aver on merkitty puuttuvaksi latausmoduulin IMPORT-hakemistoon. Rutiinin Math.Aver kutsukohtaan on jollain tavoin koodattu, että viite kohdistuu dynaamiseksi linkitettävään moduuliin. Koodaus voisi olla esimerkiksi epäkelpo muistiosoite, jonka avulla käyttöjärjestelmälle voidaan antaa suoritusvuoro tarpeen tullessa.

Jos nyt suoritusaikana tulee kutsu rutiiniin Math.Aver, niin epäkelvon muistiosoitteen kautta kontrolli siirtyy keskeytyskäsittelijälle, joka (a) huomaa, että kysymyksessä on dynaamisen linkityksen tarve ja (b) huomaa, että kyseessä on moduuli Math. Keskeytyskäsittelijä laittaa prosessin GameX odotustilaan, etsii moduulin Math (sen uusimman version) ja käynnistää linkittäjän. Kun linkitys on valmis, prosessi GameX voi taas jatkaa suoritusta (samasta konekäskystä), mutta tällä kertaa rutiinin Math.Aver kutsu voidaan toteuttaa normaalisti.

<!-- kuva: ch-9-3-ajomoduuli-ennen-dyn-linkitysta  -->

![  Puuttuu ???? ch-9-3-ajomoduuli-ennen-dyn-linkitysta.](./ch-9-3-ajomoduuli-ennen-dyn-linkitysta.svg)
<div>
<illustrations motive="ch-9-3-ajomoduuli-ennen-dyn-linkitysta"></illustrations>
</div>

Dynaamisen linkityksen käytöstä ohjelman GameX yhteydessä on useita etuja. Sen latausmoduuli on pienempi, koska siitä puuttuu moduuli Math. Jos tietyllä suorituskerralla moduulin Math palveluja ei tarvita lainkaan, niin sitä ei tarvitse linkittää paikalleen missään vaiheessa. Lisäksi dynaamisesti linkitettävästä moduulista Math voidaan helposti ottaa aina uusin versio käyttöön ilman että sitä käyttäviä ohjelmia tarvitsisi kääntää uudelleen. Tämä on erityisen kätevää esimerkiksi verkosta ladatun pelin GameX yhteydessä, koska alkuperäistä korkean tason kielellä kirjoitettua ohjelmaa ei ole saatavilla.

Dynaaminen linkitys ei sovi kaikkialle. Esimerkiksi, jos kyseessä on lentokoneen ohjausjärjestelmä, niin siinä ei välttämättä ole aikaa ruveta linkittämään lennon aikana. Usein halutaan, että latausmoduulissa on nimenomaan kaikki mahdolliset osat valmiina. Tällöin riittää latausmoduulin kopiointi toiseen järjestelmään. Jos dynaamista linkitystä käytetään, niin sitten kaikki mahdollisesti dynaamisesti linkitettävät moduulit täytyy olla myös saaavutettavissa. Lisäksi järjestelmään täytyy tietenkin kuulua käyttöjärjestelmän osana dynaaminen linkittäjä.

### Windowsin kaksi eri dynaamista linkitystä
????


## Quizit 9.3 ????
<!--  quizit 9.3.???  -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
