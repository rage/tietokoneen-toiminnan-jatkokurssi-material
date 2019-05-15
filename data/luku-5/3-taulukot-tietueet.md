---
path: "/luku-5/3-taulukot-tietueet"
title: "Taulukoiden ja tietueiden toteutus"
---

<div>
<lead>Ihmisen ???????+</lead>
</div>

Kuten Tietokoneen toiminnan perusteet -kurssilla jo kävimme läpi, rakenteiseen tietoon viittaaminen tapahtuu yleisesti ottaen tietorakenteen alkuosoitteen ja indeksirekisterin avulla. Joissakin tapauksissa viittaaminen on helppoa ja voidaan suorittaa yhden konekäskyn avulla, kun taas monimutkaisimmissa tapauksissa viitatun tiuedon osoitteen laskenta voi vaatia useankin konekäskyn suorituksen.

## 1-ulotteiset taulukot ja tietueet
Yleisimmät tapaukset ovat peräkkäistalletetut 1-ulotteinen taulukko ja tietue. Peräkkäistalletus tarkoittaa sitä, että koko taulukko tai tietue on talletettu muistissa peräkkäisiin muistipaikkoihin. 1-ulotteisen taulukon alkion osoite on yksinkertaisesti taulukon alkuosoite lisättynä indeksin osoittaman määrällä. Tässä perustapauksessa oletamme, että taulukon alkion koko on yksi sana. Useimmissa konekielissä on tätä perustapausta varten indeksoitu tiedonosoitusmuoto, jolloin taulukon alkioon viittaaminen voidaan tehdä yhdellä konekäskyllä. Siinä taulukon alkuosoite on käskyn vakio-osassa ja viitatun alkion indeksi indeksirekisterissä.

```
      load r1, =0     ;  muuntelumuuttujan i alustus, arvo r1:ssä
loop  comp r1, =30      ; silmukan lopetustesti
      jequ done
      load r2, r1       ; silmukan runko
      mul  r2, =4
      store r2, A(r1)   ; taulukon A viitatun alkion indeksi on r1:ssä
      jump
done  nop               ; poistu silmukasta      
```

Toinen tyypillinen ohjelmissa käytetty tietorakenne on tietue, jossa samaan tietoon liittyvät eri kentät on talletettu peräkäisiin mustipaikkoihin. Tällä kertaa viitatun tiedon (tietueen jokin kenttä) osoite saadaan laskemalla yhteen tietueen allkuosoite ja viitatun kentän suhteellinen sijainti tietueen sisällä. Vähän yllättävästi, tällaiseenkin tietoon viittaaminen voidaan toteuttaa indeksoidulla tiedonosoitusmoodilla yhdessäkonekäskyssä. Tällä kertaa kuitenkin tietueen alkuosoite annetaankin indeksirekisterissä ja viitatun kentän suhteellinen sijainti on käskyn vakiokentässä.

```
Id      equ 0        ; tietueen Person kenttien suhteeliset sijainnit
Age     equ 1
Nr      equ 2

Per0    ds 3         ; kolme kappaletta Person-tyyppistä tietuessa
Per1    ds 3
Per2    ds 3
...
 
   load r2, =Per1      ; r2 osoittaa tietueeseen Per1
   load  r1, Nr(r2)    ; hae rekisteriin r1 rekisterin r2  
                       ; osoittaman tietueen kentän Nr arvo
``` 

## 2-ulotteiset taulukot
Moniulotteiset taulukot ovat jo vaikeampi tapaus. Useimmissa konekielissä ei ole niitä tukevia tiedonosoitusmoodeja, joten tietoon viittaminen tapahtuu kahdessa vaiheessa. Ensin lasketaan omalla koodilla viitatun tiedon suhteellinen sijainti rakenteisen tiedon sisällä ja sitten indeksoitua tiedonosoitusmoodia käyttäen tehdään varsinainen tiedonosoitus.  

2-ulotteiset taulukot voidaan tallettaa ainakin kolmella tavalla. Ne voidaan tallettaa yhtenäiselle alueelle _riveittäin_, jolloin esimerkiksi muistiosoitteeseen 300 talletettu taulukko T[2,3] 

```
25  88  2
11  66  3
```
talletetaan muistiin peräkkäisiin muistipaikkohin, muistipaikasta 300 alkaen.

```
300: 25  88  2 11  66  3
```

Nyt taulukon alkion T[i,j] osoite on T + 3 * i + j ja alkioon T[i,j] viittamminen tapahtuisi esimerkiksi näin:

```
     load r1, i
     mul r1, =3
     add r1, j
     load r2, T(r1)  ; lataa r2:een alkion T[i,j] arvo
```

Jos taas taulukko T on talletettu sarakettain yhtenäiselle muistialueelle, ......?????????


## Moni-ulotteiset taulukot
???

## Monimutkaiset rakenteiset tietorakenteet
????


## Quizit 5.3 ??????

<!-- quiz 5.3 ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


<!-- Luvun 1 yhteenveto, mitä tuli opittua quiz 1.summary -->
