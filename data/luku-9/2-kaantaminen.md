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

## Assembler kääntäminen
????

## Korkean tason kielen kääntäminen
????

## Quizit 9.2
<!-- Quiz 9.2.?? -->

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
