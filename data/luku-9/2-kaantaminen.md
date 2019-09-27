---
path: '/luku-9/2-kaantaminen'
title: 'Kääntäminen'
hidden: false
---

<div>
<lead>Tässä aliluvussa esittelemme pääpiirteet, joilla käännösyksikkö käännetään objektimoduuliksi.</lead>
</div>

## Objektimoduulin rakenne
Käännöksessä luodaan objektimoduuli, joka sitten myöhemmin linkitetään muihin moduuleihin. Objektimoduulissa on kolme tärkeätä tietorakennetta: konekielinen ohjelmakoodi, linkityksen tarvitsemat tiedot _uudelleensijoitustaulussa_ ja kaikki ohjelman käytämät symbolit ja niiden arvot _symbolitaulussa_.

Objektimoduulissa on koodi konekielisessä muodossa ja kaikki moduulin sisäiset viitteet jo oikein, mutta vain tämän objektimoduulin omassa (pienehkössä) osoiteavaruudessa.

```
käännösyksikkö             osoite  data tai konekäskyn kentät
                                         opcode Rj Ri M Addr
x     dc 5             -->     0:                        5
y     dc 7             -->     1:                        7
      load r1, x       -->     2:           2  1  0 1    0 *
      add  r1, y       -->     3:          17  1  0 1    1 *
      ...
      call sp, matmul  -->    34:          49  6  0 1    0 *
      ...
aver  pushr sp         -->    77:          53  6  0 0    0 *
      ...
   
      svc  sp, =halt   -->   323:          112 6  0 0   11
```

Objektimoduulissa pitää jollain tavoin merkitä sellaisten viitteet _moduulin sisäisiin osoitteisiin_ sen omassa muistiavaruudessa, koska nämä pitää päivittää linkityksen yhteydessä. Ylläolevassa esimerkissä viitteet muuttujiin x (osoite 0) ja y (osoite 1) ovat tällaisia. Yleisesti ottaen linkityksen aikana päivitettävien osoitteiden sijainnit pidetään kääntäjän luomassa uudelleensijoitustaulussa.

Objektimoduulissa voi olla myäs viitteitä dataan tai koodiin muissa moduuleissa. Ylläolevassa esimerkissä muistipaikassa 34 on kutsu jossakin toisessa moduulissa olevaan aliohjelmaan _matmul_, jonka osoitetta ei ole lainkaan vielä tiedossa. Sitten kun tieto linkityksen yhteydessä löytyy, se pitää laittaa paikalleen tämän moduuliin koodiin. Myös tällaisten linkityksen aikana päivitettävien  _moduulin ulkopuolisten osoitteiden_ sijainnit ovat em. uudelleensijoitustaulussa, sen _IMPORT_-osiossa (import-taulussa).

Lisäksi uudelleensijoitustaulussa on vielä _EXPORT_-osio (export-taulu), jossa on tieto niistä data- tai koodiosoitteista, joihin saa tässä moduulissa viitata _muista moduuleista_. Ylläolevassa esimerkissä esimerkiksi funktio _aver_ osoitteesa 53 voisi olla tällainen muiden moduulien kutsuttavissa oleva rutiini.

### Symbolitaulu

Symbolitaulussa on siis kaikki ohjelman käyttämät symbolit ja niiden arvot. Joidenkin symbolien arvot annetaan, joidenkin arvot päätellään käännösmoduulista käännösvaiheessa, joidenkin arvot selviävät linkitysvaiheessa ja joidenkin vasta suoritusaikana. 

Kussakin (korkean tason ja symbolisen konekielen) ohjelmointikielessä on  merkittävä joukko etukäteen määriteltyjä symboleja, joiden arvot löytyvät myös symbolitaulusta. Tällaisia ovat esimerkiksi symbolisen konekielen operaatiokoodien nimet (add, comp, jump, etc), laiterekisterien nimet (r0, r4, sp, etc), laitteiden nimet (crt, kdb, etc) ja käyttöjärjestelmäpalvelujen nimet (halt, time, etc).

Esimerkiksi symbolisen konekielen equ-valekäskyllä määritellään jollekin symbolille arvo ja se talletetaan symbolitauluun. Moduulin omien tietorakenteiden sijainnit ja siten niitä vastaavien symbolien arvot määräytyvät täysin siitä, missä järjestyksessä ne on kirjoitettu käännösyksikön ohjelmakoodiin. Ihan vastaavasti kaikki koodissa olevat käskyjen osoitteet määräytyvät niiden tekstuaalisen sijainnin perusteellakäännösyksikössä.

Kun moduulissa viitataan moduuliin ulkopuoliseen dataan tai koodiin, niin niitä vastaavien symbolien arvo selviää vasta linkitysvaiheessa. Dynaamisesti linkitettävät moduulien osalta symbolin arvo tarkentuu vasta suoritusaikana.

Jos dynaamista linkitystä ei ole käytössä, niin koko symbolitaulun voi jättää pois ajomoduulista. Kaikilla symboleilla  on jo arvot ja ne on päivitetty koodiin. Usein symbolitaulu pidetään kuitenkin tallessa ainakin ohjelmiston kehitysaikana, jotta sen avulla voidaan tehdä järkevämpiä virheilmoituksia. Ohjelmoijalle on paljon mukavampaa lukea "Integer overflow for variable X in line 4226 in module Statistics" kuin "Integer overflow in 0x00004321". Toisaalta taas älykellon käyttäjä ei missään tapauksessa halua nähdä kumpaakaan noista ilmoituksista ja symbolintaulun vaatiman muistitilan voi käyttää paremminkin.

### Literaalit
Literaali tarkoittaa ohjelmassa olevia vakioita. Ne on usein sijoitettu omalle muistialueelle, eikä tällaisella _literaalialueella_ olevia arvoja saisi muuttaa. On ilmeisen virhealtista muuttaa literaalin Sata arvoksi 101, jne. Esimerkkikonekielessä ttk-91 kaikki vakiot ovat literaaleja, mutta niiden muuttamattomuutta valvotaan vain ohjelmointikurilla. Useissa järjestelmissä vakiot talletetaan omalle suojatulle muistisegmentille. Siellä olevia tietoja voi lukea ja niitä voi lisätä, mutta tietoja ei voi muuttaa.

Joissakin kielissä kaikki merkkijonot ovat literaaleja. Joissakin kielissä kaikki koodissa isot vakiot ovat literaaleja, jolloin ison vakion käyttäminen koodissa automaattisesti johtaa uuden vakion määrittelyyn.

```
load r2, "mystring" -->   Lmystring  ds "mystring"
                          load r2, &Lmystring  ; merkkijonon osoite

load r1, =800000    -->   L800000 dc 800000
                          load r1, L800000   ; viittaus muistiin ei vakio-osaan
```
Literaalia ei saisi välittää viiteparametrina, koska tällöin kutsuttu rutiini voisi (vahingossa) muuttaa sen arvoa. Useissa kielissä esimerkiksi kaikki merkkijonot välitetään joka tapauksessa viiteparametreina. Arvon muutoksen voi kuitenkin estää, jos literaalit on talletettu suojatulle literaalialueelle. 

Joissakin kielissä kaikki koodissa olevat vakiot ovat literaaleja. Tämä tekee vakioiden käsittelystä linjakasta, mutta toisaalta pienten vakioiden talletus literaalialueelle hidastaa suoritusta verrattuna tilanteeseen, jossa ne talletettaisiin käskyjen vakiokenttiin.

```
load    r1,=5    -->    L5  dc 5
                        load r1, L5
```

Jos literaalin arvoja voisi muuttaa, niin myös seuraava koodinpätkä olisi mahdollinen.

```
load    r1, =5    -->    L5  dc 5
                         load r1, L5
store   r1, =6    -->    L6  dc 6
                         store r1, L6
```
Ohjelmointikuri on selvästi pettänyt ja vakion L6 arvo on nyt 5, mistä seuraisi jatkossa luultavasti hyvin paljon ongelmia.  Joissakin (vanhemmissa) kielissä oli mahdollista kirjoittaa lause "6=5;", millä oli juuri sama lopputulos. Nykyisissä kielissä tämä ei ole mahdollista, koska ensinnäkin kielen määrittely estää sen ja toiseksi literaalit sijaitsevat suojatulla muistialueella.

### Makrot
Useissa korkean tason kielissä ja symbolisissa konekielissä on mahdollisuus käyttää _makroja_. Makrot ovat usein toistettavia koodisarjoja ja niiden käyttö helpottaa ohjelmointia. Niissä voi olla parametreja, minkä vuoksi ne voi joskus sekoittaa alioohjelmiin vaikka ne ovat täysin erilaisia.

Makrot käsitellään ennen kääntämistä. Ennen varsinaista käännöstä koko ohjelmakoodi käydään läpi ja kukin makro _laajennetaan_ tekstuaalisesti sitä vastaavaksi koodinpätkäksi. Tämän vuoksi makroissa voi käyttää ainoastaan _nimiparametreja_, koska arvo- ja viiteparametrit ovat käsitteinä olemassa ainoastaan suoritusaikana. 

Kukin makro pitää määritellä ennen sen käyttöä. Esimerkiksi, luvussa 6 esitelty makro Swap määritellään seuraavanalaisesti.

```
macro Swap (j, j)  -- vaihda i:n ja j:n arvot keskenään
tmp = i;
i = j;
j = tmp;
```

Makroja laajennettaessa kukin muodollinen nimiparametri korvataan tekstuaalisesti sen käyttökerran vastaavalla merkkijonolla. Esimerkiksi, makron Swap() käyttö _Swap(x, tbl[y])_ laajenisi koodiksi

```
tmp = x;
x = tbl[y];
tbl[y] = tmp;
```

mikä toimii suoritusaikana aivan oikein, vaihtaen muuttuja X ja taulukon tbl alkion tbl[y] arvot keskenään. 

Symbolisissa konekielissä on tyypillistä käyttää makroja esimerkiksi aliohjelmien prologin ja preluden toteutukseen. Esimerkiksi Luvussa 6 esitetyn funktion fA(x,y) preludin voisi toteuttaa makrolla 

```
-- funktion prelude, 2 parametria, 1 paikallinen muuttuja
macro Prelude-f-2-l-1 (fnimi, ret, par1, par2, loc1, loc1val)  
ret equ -4
par1 equ -3
par2 equ -2
loc1 equ 1

fnimi push sp, 0
      pushr sp
      load r1, loc1val
      store r1, loc1(fp)
```

Nyt funktion fa() koodi olisi

```
    Prelude-f-2-1-1 (fa, retfA, parX, parY, locZ, 5)
    
    ...                -- funktion varsinainen koodi
    
f10 Epilog-f-2-1-1 ()  -- 1 paik. muuttuja, 2 parametria
```

Makron _Epilog-f-2-1-1()_ jätetään harjoitustehtäväksi. 

Tässä esimerkissä makro Prelude-f-2-1-1() on vähän kompelö, koska sen käyttö sopii vain funktioille, joilla on kaksi parametria ja yksi paikallinen muuttuja. Hyvä ohjelmoija kirjoittasi käyttökelpoisempia makroja, jos vain käytettävissä oleva makrojen määrittelykieli sen vain sallisi.

Makroilla on muutama tärkeä ominaisuus verrattuna aliohjelmiin. Mainitsimmekin jo, että makrot siis lajennetaan koodiksi ennen käännöstä, kun taas aliohjelmia kutsutaan suoritusaikana. Koska jokainen makron käyttökerta laajenee aina koodiksi, niin 100 50-rivisen makron käyttökertaa laajenee 5000 riviksi koodia. Jos 50-rivistä aliohjelmaa kutsutaan 100 kertaa, niin koodin määrä on vain yhden aliohjelman toteutuksen n. 60 riviä. Lisäksi jokaisen kutsukerran toteutus on ehkä 10 riviä, joten yhteistarve on ehkä 60+100\*10&nbsp;=&nbsp;1060 riviä koodia. Makrosta generoitu koodi on paikallaan sellaisenaan, eikä vaadi kontrollin siirtoa suoritusaikana. Aliohjelman yhteydessä taas jokainen kontrollin siirto vaatii esim. 10-15 konekäskyn suorituksen aktivaatiotietuetta rakennettaessa tai purettaessa.

Makrojen merkittävä ero aliohjelmiin on, että makroilla ei ole omaa viiteympäristöä, koska makrot laajennetaan sellaisenaan käyttökohtiinsa. Aliohjelmilla voidaan toteuttaa korkean tason kielten erilaiset viiteympäristöt. Esimerkiksi C-kielessä kussakin aliohjelmassa voi viitata vain sen omiin paikallisiin tietorakenteisiin ja globaaleihin kaikkialla viitattaviin tietorakenteisiin, mutta ei minkään muun aliohjelman paikallisiin tietorakenteisiin. Kullakin ohjelmointikielellä on omat määrittelynsä siitä, mikä on kunkin tunnuksen näkyvyysalue (käyttöalue). Tunnusten näkyvyysalueet toteutetaan aktivaatiotietueiden avulla. 

## Assembler kääntäminen
Symbolisen konekielen käännös tapahtuu periaatteesa kolmessa eri vaiheessa, mutta joskus näitä vaiheita voi yhdistellä. Kussakin vaiheessa käydään läpi koko käännösyksikkö alusta loppuun. Ensimmäisessä vaiheessa lasketaan kunkin konekäskyn vievä tila, generoidaan symbolitaulu ja uudelleensijoitustaulu. Ttk-91 koneessa kukin konekäsky on saman mittainen (4 tavua), mutta esimerkiksi Intelin x86 arkkitehtuurin käskyt voivat olla 1-21 tavua mittaisia. Ensimmäisen vaiheen jälkeen symbolitauluun on saatu tieto kaikkien tämän moduulin symbolien arvoista.

``` 
Ensimmäisen vaiheen (koodin läpikäynnin) jälkeen
käännösyksikkö                  data/koodi  symb.taulu
x 	dc 	13   -->  0:            13       x: 0
y 	dc 	15   -->  1:            15       y: 1

st   in   r1, =kbd   -->  2:   3 1 0 0   1      st: 2
     jzer r1, done   -->  3:  34 1 0 0   ?    done: ? 
     out r1, =crt    -->  4:   4 1 0 0   0
     jump st         -->  5:  32 0 0 0   2
done svc sp,=halt    -->  6: 112 6 0 0  11    done: 6
```

Huomaa, että kun symboli _done_ esitellään käskyn 3 yhteydessä, sen arvoa ei vielä tunneta. Käskyn 6 kohdalla tunnus _done_ esiintyy osoitekentässä, joten sen arvo 6 määräytyy symbolitauluun. Yhden läpikäynnin jälkeen kaikilla tämän moduulin sisäisillä tunnuksilla on arvo.

Toisella läpikäynnillä koodi käydään uudestaan läpi konekäsky kerrallaan ja kaikki ensimmäisellä kerralla tuntemattomaksi jääneet tunnukset korvataan niiden arvolla symbolitaulusta. Koodissa voi tietenkin olla vielä viittauksia muihin moduuleihin, mutta ne ratkotaan vasta linkityksessä. Konekäskyt voivat tässä vaiheessa olla vielä kentittäin koodattuna, eikä välttämättä vielä lopullisessa muodossa.
``` 
Toisen vaiheen (koodin läpikäynnin) jälkeen
käännösyksikkö                  data/koodi  symb.taulu
x 	dc 	13   -->  0:            13       x: 0
y 	dc 	15   -->  1:            15       y: 1

st   in   r1, =kbd   -->  2:   3 1 0 0   1      st: 2
     jzer r1, done   -->  3:  34 1 0 0   6    done: 6 
     out r1, =crt    -->  4:   4 1 0 0   0
     jump st         -->  5:  32 0 0 0   2
done svc sp,=halt    -->  6: 112 6 0 0  11    
```

Kolmannella läpikäynnillä varsinainen konekielinen koodi yhdistelemällä kentät ja samalla optimoimalla koodia suoritusajan suhteen. Yleensä symbolisella konekielellä kirjoitettua ei juurikaan enää optimoida, koska ohjelmoija on nimenomaan halunnut kirjoittaa kyseisen ohjelman osan annetussa muodossa. Optimoidun konekielisen koodin kirjoittaminen on vaikeata, koska siinä pitää ottaa huomioon kyseessä olevan suorittimen, väylän ja muistin yksityiskohdat. Korkean tason kielten kääntäjien tekijät ovat tässä asiantuntijoita ja sen vuoksi korkean tason kielten kääntäjien tekemää koodia on vaikea tavallisen ohjelmoijan tehdä paremmaksi.

``` 
Kolmannen vaiheen (koodin läpikäynnin) jälkeen
käännösyksikkö                data/koodi   symb.taulu
x 	dc 	13    -->  0:         13       x:  0
y 	dc 	15    -->  1:         15       y:  1
st   in   r1, =kbd    -->  2:   52428801      st:  2
     jzer r1, done    -->  3:  572522500    done:  6 
     out r1, =crt     -->  4:   69206016    add:  17
     jump st          -->  5:  536870912    scv: 112
done svc sp,=halt     -->  6: 1891631115    ...
```

## Korkean tason kielen kääntäminen
????

### Koodin optimointi
Koodin optimointi on vaikeata ja voi kestää hyvin kauan sen mukaan miten tehokkaasti koodia halutaan optimoida. Rekistereiden allokointiongelma on tärekeä osa optimointia. Sen avulla päätellään, milloin ja mihin laiterekisteriin mitäkin dataa tulisi ohjelman suoritusaikana tallettaa.  Rekistereitä on vähän ja niiden optimaalinen käyttö on tärkeätä. Samoin pohditaan, minkälaisilla konekäskyillä jokin tietty koodinpätkä olisi nopeinta suorittaa. Ongelman tekee vielä vaativammaksi se, että nykyisissä suorittimissa voi useaa (eri tyyppistä?) konekäskyä oikeasti suorittaa samanaikaisesti. Monen samaan aikaan suoritettavan konekäskyvirran optimointi on vielä vaativampaa kuin yhden.



## Quizit 9.2
<!-- Quiz 9.2.?? -->

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
