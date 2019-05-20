---
path: '/luku-6/1-aliohjelmat'
title: 'Aliohjelmat, parametrityypit, aktivaatiotietue (AT)'
---

<div>
<lead>Aliohjelmat ovat yleisin tapa toteuttaa uudelleenkäytettävää koodia. Aliohjelmien tarkkaa käyttäytymistä kussakin kutsutilanteessa säädellään parametreilla. Esittelemme tässä luvussa aliohjelmien toteutuksen ja käytön esimerkkikoneessa ttk-91.</lead>
</div>

## Aliohjelmat, funktiot, metodit
[Aliohjelma](https://fi.wikipedia.org/wiki/Aliohjelma) on koodia, jota voidaan _kutsumalla_ käyttää mistä tahansa ohjelmiston osasta. Aliohjelmista käytetään eri ohjelmointikielissä myös muita nimiä (proseduuri, funktio, metodi, rutiini), mutta periaate on kaikilla sama. Aliohjelman käyttäytymistä yhdessä kutsutilanteessa säädellään yleensä ainoastaan sen [parametrien](https://www.wikiwand.com/fi/Parametri_(tietotekniikka)) avulla, mutta tietenkin myös aliohjelman kontrolli voi olla sidonnainen globaalien (kaikkialla käytössä olevien) muuttujien arvoihin. Aliohjelmat voivat antaa _paluuarvon_, jolloin niitä voidaan kutsua yleisesti funktioiksi. 

Oliokielissä aliohjelmasta käytetään usein nimeä _metodi_. Metodeilla voi olla paluuarvo tai sitten ei.

Aliohjelmille on tyypillistä, että niihin sisältyy oma suoritusympäristö. Suoritusympäristöllä tarkoitetaan sitä, että mitkä tunnukset ovat käytettävissä tietyn aliohjelman suorituksen aikana. Yleensä käytettävä korkean tason ohjelmointikieli määrittelee _tunnusten näkyvyysalueet_. 

Esimerkiksi, C-kielessä jonkin aliohjelman suorituksen aikana voi viitata ainoastaan sen aliohjelman omiin tietorakenteisiin ja kaikkiin globaaleihin tietorakenteisiin. Esimerkiksi, jos pääohjelmasta on kutsuttu aliohjelmaa A, sieltä aliohjelmaa B ja sieltä aliohjelmaa C, niin C:n suorituksen aikana ei voi viitata aliohjelmien A tai B tietorakenteisiin. Lisäksi B:n suorituksen aikana aliohjelman C tietorakenteita ei edes ole olemassa ennen C:n kutsumista.

Jossain ohjelmointikielessä em. esimerkin tapauksessa aliohjelmaa C suoritettaessa myös B:n ja C:n tietorakenteet ovat viitattavissa, kun taas jossain toisessa kielessä tunnusten näkyvyysalueet määräytyvät sen mukaan, miten missä järjestyksessä aliohjelmat sijaitsevat alkuperäisessä koodissa. 

## Parametrien tyypit
Aliohjelmien parametreja on kolmen tyyppisiä: arvo- viite- ja nimiparametrit. Näistä arvo- ja viiteparametrit ovat yleisiä ohjelmointikielissä, mutta nimiparametreja käytetään yleensä vain skriptikielissä.

_Arvoparametri_ tarkoittaa, että aliohjelmalle annetaan jonkin lausekkeen _arvon kopio_ parametrina. Lauseke voi olla mikä tahansa sopivan tyyppinen aritmeettis-looginen lauseke tai vaikkapa muuttujan arvo. Aliohjelman suorituksen aikana tällaisen parametrin arvoa voi muuttaa, mutta muutos koskee vain parametrina välitettyä lausekkeen (tai muuttujan) arvon kopioita, joten arvoparametrin kautta ei voida muuttaa mitään aliohjelman ulkopuolisia tietoja. Jos muuttuja X välitetään arvoparametrina, niin sen arvo on varmasti ennallaa aliohjelmasta palatessa.

_Viiteparametri_ taas tarkoittaa, että parametrina välitetään jokin _tiedon osoite_. Se voi olla yksittäisen muuttujan osoite, tai rakenteisen tiedon osoite. Kutsuva ohjelman osa (pääohjelma tai toinen aliohjelma) välittää siis hallussaan olevabntiedon osoitteen aliohjelmalle. Tämän osoitteen avulla aliohjelma voi lukea annettua tietoa, mutta se voi myös muuttaa sitä! Aliohjelman paluuarvon lisäksi se voi siis palauttaa arvoja kutsuvalle rutiinille viiteparametrien kautta. Tällaisissa parametreja kutsutaan myös ulostuloparametreiksi. Jos muuttuja X välitetään viiteparametrina, niin sen arvo voi siis olla muuttunut aliohjelmasta palatessa.

Toisena esimerkkinä viiteparametrin käytöstä on 16MB kuva, joka on ilmaistu 4096x4096 taulukkona Sue. Taulukon Sue osoite annetaan kuvan käsittelurutiinille ColorMe, joka kirkastaa annetun kuvan värejä halutulla tavalla. Jos Sue haluttaisiin antaa arvoparametrina, niin sen alkuarvo pitäisi kutsun yhteydessä kopioida ColorMe'lle ja kuvan käsittelyn lopuksi uusi kuva pitäisi jälleen kopioida kutsuvalle rutiinille. On paljon helpompaa antaa ColrMe'n suoraa lukea ja muuttaa alkuperäistä viiteparametrina annettua kuvaa Sue. Toisaalta tässä on pieni riski, että muut parametrit on valittu huonosti ja ColorMe antaa Sue'lle liian punaiset posket. Sitä varten kuvankäsittelyjärjestelmät ottavat Sue'sta varmuuskopion ennen ColorMe-kutsua, jotta epäonnistunut värikäsittely voidaan tarvittaesa perua.

_Nimiparametri_ on aivan erilainen parametrityyppi. Kun arvoparametrillä välitetään tiedon arvo ja viiteparametrillä tiedon osoite, niin nimiparametrilla välitetään itse tieto merkkijonona. Tämä tarkoittaa sitä, että kutsuhetkellä aliohjelmassa käytetyn parametrin nimi (merkkijono) korvataan todellisen parametrilla (toinen merkkijono). 

Useimmat ohjelmointikielet eivät salli nimiparametreja, koska aliohjelman koodi pitää kääntää uudelleen aliohjelman kutsuhetkellä ja se on todettu liian vaikeaksi järjestelmäksi. 

[Skriptikielet](https://fi.wikipedia.org/wiki/Komentosarjakieli) ja [makrot](https://fi.wikipedia.org/wiki/Makro) sen sijaan käsitellään aina tulkitsemalla ja niissä nimiparametrit ovatkin yleisiä. Makrot ovat aliohjelman tapaisia usein toistuvan koodin määrittelyvälineitä, mutta ne laajennetaan koodiksi jo ennen varsinaista käännöstä. Makroilla ei ole omaa suoritusympäristöä. Koska makrot laajennetaan jo ennen ohjelman suoritusta, niiden muuttujilla ei voi olla suoritusaikaisia ominaisuuksia kuten arvo tai osoite. Ainoaksi parametrityypiksi jää nimiparametri.

Makro Swap(i, j) on mielenkiintoinen esimerkki makroista ja nimiparametrien käytöstä.

```
macro Swap (j, j)  -- vaihda i:n ja j:n arvot keskenään
tmp = i;
i = j;
j = tmp;
```

Tämä näyttää ihan järkevältä ja sitä se onkin, kunhan vain parametrit on valittu sopivasti. Esimerkiksi makron käytöstä Swap(x,y) generoituu koodi 

```
tmp = x;
x = y;
y = tmp;
```

mikä on juuri se mitä varmaankin haluttiinkin. Jos taas haluttaisiin vaihtaa muuttujan k ja taulukon alkion T[k] arvot keskenään, niin makrosta Swap(k, T[k]) generoituukin

```
tmp = k;
k = T[k];
T[k] = tmp;
```

jolloin jälkimmäinen T[k] viittaakiin väärään paikkaan, koska k:n arvo on jo ehtinyt muuttua.

Tällä kurssilla emme käsittele nimiparametreja tämän enempää, mutta on tärkeä olla tietoinen tästäkin parametrityypistä. Ttk-91:ssä on ainoastaan arvo- ja viiteparametreja.

## Aliohjelman toteutuksen osat
Aliohjelman toteutuksessa täytyy löytää ratkaisu seuraaviin osaongelmiin.

Aliohjelmille on ominaista, että niitä voidaan kutsua mistä päin tahansa koodi ja että aliohjelman suorituksen jälkeen kontrolli palaa kutsu kohtaa jälkeiseen konekäskyyn. Tämän toteuttamiseksi joka kutsukerralla _paluuosoite_ täytyy tallettaa johonkin.

Aliohjelmissa voi olla eri tyyppisiä parametreja ja ne täytyy välittää kutsuvalta rutiinilta aliohjelmalle. _Parametrien välityksen_ pitää tapahtua korkean tason kielen semantiikan mukaisesti. Käytännössä yleensä riittää toteuttaa arvo- ja viiteparametrien välitys oikein. parametreille on ominaista, että kutsuva rutiini voi kirjoittaa niihin ja aliohjelma voi lukea niitä. Viiteparametrien kautta aliohjelma pääsee myös lukemaan ja kirjoittamaan muita kutsuvan rutiinin tietoja. 

Jos aliohjelma (funktio) palauttaa jonkin arvon, meillä täytyy olla tätä _paluuarvoa_ varten oma muistialue. Aliohjelma voi kirjoittaa paluuarvon sinne ja kutsuva rutiini voi aliohjelmasta paluun jälkeen lukea paluuarvon sieltä. Tilanne on hyvin samanlainen kuin arvoparametrin käsittely, mutta tätä tietoa aliohjelma kirjoittaa ja kutsuva rutiini lukee.

Usein aliohjelmassa tarvitaan omia _paikallisia tietorakenteita_, jotka ovat olemassa ja viitattavissa ainoastaan aliohjelman suorituksen aikana. Tällaiset tiedoille pitää dynaamisesti varata muistitilaa joka kutsukerran yhteydessä ja vapauttaa tila aliohjelmasta paluun yhteydessä. Tila ei voi olla staattinen, koska samasta aliohjelmasta voi olla yhtä aikaa usea instassi suorituksessa. Esimerkiksi, [rekursiivisessa aliohjelmassa](https://fi.wikipedia.org/wiki/Rekursio) täytyy kaikki aliohjelman tietorakenteet varata joka kutsukertaa varten erikseen. Yleensä ohjelmointikielen semantiikka vaatii, että aliohjelman (metodin) tietorakenteet eivät ole viitattavissa muutoin kuin aliohjelman omassa koodissa. 

Aliohjelmilla ei saisi olla mitään sivuvaikutuksia. Rekistereiden tasolla tämä tarkoittaa sitä, että kaikkien rekistereiden arvot täytyy aliohjelmasta paluun yhteydessä olla samat kuin mitä ne olivat kutsuhetkellä. Tämä toteutetaan siten, että aliohjelman täytyy _tallettaa_ kaikki käyttämänsä _rekistereiden arvot_ suorituksensa alussa ja _palauttaa arvot_ ennalleen kutsuvaan rutiiniin paluun yhteydessä. Esimerkiksi, jos rekisterissä r4 oli muuntelumuuttujan i arvo ennen aliohjelman kutsua, niin meidän täytyy voida luottaa siihen, että r4:n arvo on ennallaan aliohjelmasta palun jälkeen. 


## Aktivaatiotietue (AT)
Aliohjelmien toteutusmekanismi on aktivaatiotietue, joka on suurehko tietorakenne. Eri ohjelmointikielillä aktivointitietue voi olla vähän erilainen, mutta ne kaikki antavat jonkinlaisen ratkaisun em. aliohjelmien toteutuksen osaongelmiin. AT talletetaan yleensä muistissa olevaan pinoon.

Ttk-91 järjestelmässä AT on talletettu pinoon. Se sisältää seuraavat tiedot, pienemmästä muistiosoitteesta isompaan (ks. alla oleva kuva). Ensimmäisenä siellä tila mahdolliselle paluuarvolle (jos sitä tarvitaan) ja sitten kaikkien parametrien arvot. Arvoparametreillä siis jokin kokonaislukuarvo ja viiteparametreillä jokin muistiosoite (joka sekin on kokonaisluku). Sitten sieltä löytyy paluuosoite ja kutsukohdan hetkellä käytössä olleen AT:n osoite. Tämän jälkeen siellä on tilanvaraukset kaikille paikallisille muuttujille ja muille tietorakenteille. Viimeisenä on tässä aliohjelmassa käytettävien työrekistereiden kutsuhetken arvot, jotta ne voidaan palauttaa ennalleen aliohjelmasta paluun yhteydessä. 

### aktivaatiotietue kuva  (puuttuu   ?????????)

Normaalitapa osoittaa monisanaiseen tietoon on käyttää sen ensimmäisen sanan osoitetta koko rakenteen osoitteena. AT:n kohdalla sen osoite on kuitenkin keskellä tietuetta, osoittaen siihen sanaan, johon on talletettu kutsukohdan AT:n osoite. AT:n osoite on talletettu rekisteriin FP (frame pointer). Rekisteri r7 in varattu tätä tarkoitusta varten ja FP on vain toinen nimi rekisterille r7.

Tästä on kaksi etua. AT:n koko on vaihteleva, koska parametrien ja paikallisten muuttujien (ym. paikallisten tietorakenteiden) määrä vaihtelee. Joissakin ohjelmointikielissä myös kutsuvan rutiinin tietorakenteet voivat olla viitattavissa. Nyt niihin pääsee helposti käsiksi, kun aliohjelman AT osoittaa suoraan kutsukohdan AT:hen, minkä kautta kutsuvan rutiinin tietorakenteet ovat helposti viitattavissa.

Tällöin esimerkiksi paluuosoitteen suhteellinen sijainti tietueen alusta lukien on eri AT:lla erilainen ja se tekisi aliohjelmasta paluun vaikeksi toteuttaa. Nyt paluuosoite ja paluukohdan AT löytyvät helposti, kun nykyinen AT osoittaa niihin. Toinen syy on vähän monimutkaisempi. ....?????


param sijainti...

paik muutt sijainti....

stack pointer.... 


?????

## Aktivaatiotietuepino
?????



## Quizit 6.1
<!-- quiz 6.1.??: ???? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
