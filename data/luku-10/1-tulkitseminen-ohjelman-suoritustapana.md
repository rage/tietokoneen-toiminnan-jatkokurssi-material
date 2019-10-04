---
path: '/luku-10/1-tulkitseminen-ohjelman-suoritustapana'
title: 'Tulkitseminen ohjelman suoritustapana'
hidden: false
---

<div>
<lead>Tässä aliluvussa esittelemme, mitä tarkoittaa ohjelmien suorittaminen tulkitsemalla. Käsittelemme myös, mitä tarkoittavat käsitteet suorittimen emulointi ja simulointi.</lead>
</div>

## Tulkitseminen ja tulkki
Tulkitseminen (tietokonejärjestelmissä) yleensä tarkoittaa sitä, että ohjelma (P) on kuvattu jollain säännöllisellä kuvauskielellä ja että meillä on tuota kuvauskieltä ymmärtävä tulkki-ohjelma. Tulkki (T) pystyy tulkitsemaan ohjelman P toiminnot ja suorittamaan ne järjestelmässä.

Suoritusaikana järjestelmässä on suorituksessa olevana prosessina ainoastaan T, jolle annetaan syötteenä ohjelma P. Ohjelman P tulkitsemisen aikana järjestelmä käyttäytyy hyvin samoin kuin ohjelma P olisi itse prosessina suorituksessa, mikä tässä on tarkoituskin. Käyttäjälle (ohjelman P suorittajalle) ei ole juurikaan eroa, suoritetaanko P sen kuvausta tulkitsemalla tai sen konekielistä esitysmuotoa suorittamalla.

Käytännössä näillä eri suoritustavoilla on kuitenkin merkittäviä eroja. Tulkittavaa ohjelmaa P ei tarvitse koskaan kääntää konekielelle, joten se on hyvin helposti siirrettävissä uuteen järjestelmään. Tämä tietenkin edellyttää, että tulkki T on toteutettu myös uudessa järjestelmässä.

### Skriptikielet ja niiden tulkit
Tietokonejärjestelmissä on (ehkä mukana olevan graafisen käyttöliittymän lisäksi) aina olemassa komentotulkki-käyttöliittymä. Linux-järjestelmissä komentotulkkeja on useita ja käyttäjä pystyy valitsemaan, mitä niistä hän haluaa käyttää. Tällainen on esimerkiksi [Bourne shell](https://en.wikipedia.org/wiki/Bourne_shell), joka alkuaan kehitettiin Unix-käyttöjärjestelmälle jo 1976. Muita esimerkkejä ovat [C shell](https://en.wikipedia.org/wiki/C_Shell) ja [Bash](https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29).

Windows-järjestelmissä on vain yksi komentotulkki ([cmd](https://en.wikipedia.org/wiki/Command_Prompt), joka on ollut käytössä vuodesta 1987.

Jos käyttöjärjestelmässä ei ole graafista käyttöliittymää, sitä käytetään suoraan komentotulkin kautta. Jos siinä on graafinen käyttöliittymä, niin komentotulkin voi käynnistää omaan käyttöliittymän ikkunaan. Esimerkiksi Windows-10 järjestelmässä komentotulkki cmd on sovelluksena Komentokehote (Command Prompt). Alla olevassa esimerkissä Windows-10 komentotulkille on annettu kaksi komentoa. Komento "C:" vaihtoi hakemiston tiedostojärjestelmän C-partition juureen ja komento "dir" tulosti juurihakemiston tiedot oletusarvoisilla parametreilla.

<!-- kuva: ch-10-1-command-prompt  -->

![Kolmen ?????   ch-10-1-command-prompt.](./ch-10-1-command-prompt.svg)
<div>
<illustrations motive="ch-10-1-command-prompt"></illustrations>
</div>

Komentotulkkien skriptikielet ovat normaali käyttöliittymä järjestelmien ylläpitäjille. Ne antavat suoran käyttöliittymän järjestelmän hallintaan ja uusien skriptien tekeminen erilaisiin hallintotehtäviin on hyvin helppoa. Skriptejä tulkitsee aina sen skriptikielen tulkki, jonka oikeudet määräytyvät sen mukaan miten se on käynnistetty. Windows-10:n graafisessa käyttöliittymässä klikkaamalla hiiren oikealla napilla sovellusta Komentokehote (Command Prompt) voidaan pyytää suorittamaan se pääkäyttäjän (admin) oikeuksin. Sen jälkeen komentotulkissa voi tehdä ihan mitä tahansa käyttöjärjestelmän toimintoja. Tehokkailla skripteillä saa paljon hyvää ja pahaa aikaiseksi hyvin kätevästi. 

Komentotulkille voi syöttää skriptejä rivi kerrallaan, kuten edellä olevassa esimerkissä tehtiin. Usein skriptit talletetaan omiin tiedostoihinsa, jotka suoritetaan sellaisenaan komentotulkissa. Linux-järjestelmissä skriptitiedostojen alussa on rivi, joka kertoo mikä skriptikieli siinä on käytössä. Näin skriptejä voi myös "suorittaa", kun käyttöjärjestelmä osaa käynnistää oikean tulkin kullekin skriptille. Käyttäjän näkökulmasta ne tuolloin todella näyttävät suoritettavilta ohjelmilta.

## Emulointi
????

## Simulointi
????


## Quizit 10.1
<!-- Quiz 10.1.?? -->
<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
