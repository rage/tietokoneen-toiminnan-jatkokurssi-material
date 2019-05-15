---
path: "/luku-5/3-rakenteinen-tieto"
title: "Rakenteisen tiedon toteutus ja siihen viittaminen"
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

Jos taas taulukko T on talletettu sarakettain yhtenäiselle muistialueelle, niin se on nyt muodossa

```
300: 25  11 88  66  2  3
```

Alkion T[i,j] osoite on nyt T + i + 2 * j ja alkioon T[i,j] viittamminen tapahtuisi esimerkiksi näin:

```
     load r1, j
     mul r1, =2
     add r1, i
     load r2, T(r1)  ; lataa r2:een alkion T[i,j] arvo
```

Kolmas vaihtoehto on tallettaa (esim.) kukin rivi kerrallaan omalle yhtenäiselle muistialueelleen ja rivien alkuosoitteet omaan 1-ulotteiseen taulukkoon. Taulukko T voisi nyt olla talletettu muistiin esim. seuraavasti:

```
400: 25   88  2            (rivi 0)
430: 11   66  3            (rivi 1)
300: 400 430               (rivien osoitteet, taulukko T)
```

Alkioon T[i,j] viittaminen tapahtuu nyt kaksi vaiheisesti. Ensin haetaan rivin i osoite taulukosta T ja sitten voi tehdä viitteen osoittamaan rivin i alkioon j.

```
     load r1, i
     load r2, T(r1)    ; rivin T[i] osoite
     add r1, j         ; alkion T[i,j] osoite   
     load r2, 0(r1)    ; lataa r2:een alkion T[i,j] arvo
```

## Moni-ulotteiset taulukot
Moniulotteiset taulukot talletetaan aivan vastaavasti kuten 2-ulotteiset taulukotkin. Käytetään esimerkkinä osoitteeseen 600 talletettua 3-ulotteista taulukkoa S[2,3,4]. Siinä on siis 2 tasoa, kullakin tasolla 3 riviä ja kullakin rivillä 4 alkiota. Tasolla nolla on alkiot

```
000 001 002 003
010 011 012 013
020 021 022 023
```

ja tasolla 1 alkiot

```
100 101 102 103
110 111 112 113
120 121 122 123
```

Jos S on talletettu "riveittäin", niin alkiot ovat muistissa riveittäin taso kerrallaan järjestyksessä 

```
600: 000 001 002 003  010 011 012 013  020 021 022 023
612: 100 101 102 103  110 111 112 113  120 121 122 123
```

ja niihen voisi viitata esimerkiksi seuraavasti:

```
     load r1, i
     mul r1, =12   ; joka tasossa 12 sanaa
     load r2, j
     mul r2, =4    ; joka rivillä 4 sanaa
     add r1, r2
     add r1, k
     load r2, S(r1)  ; lataa r2:een alkion S[i,j,k] arvo
```

Jos taas S on talletettu sarakettein, niin tasoja on viimeisen indeksin mukaisesti neljä ja alkiot ovat muistissa järjestyksessä

```
600: 000 100 010 110 020 120     (taso k=0)
606: 001 101 011 111 021 121     (taso k=1)
612: 002 102 012 112 022 122     (taso k=2)
606: 003 103 013 113 023 123     (taso k=3)
```

ja sama viite  (r2 = S[i,j,k]) toteutuisi nyt käskyillä

```
     load r1, k
     mul r1, =6   ; joka tasossa 6 sanaa
     load r2, j
     mul r2, =2    ; joka sarakkeella 2 sanaa
     add r1, r2
     add r1, i
     load r2, S(r1)  ; lataa r2:een alkion S[i,j,k] arvo
```

Jos taas S on talletettu (esim. riveittäin) linkitettynä rakenteena, niin tallennus voisi 

```
700:  000 001 002 003  (rivi S[0,0,*])
301:  010 011 012 013  (rivi S[0,1,*])
802:  020 021 022 023  (rivi S[0,2,*])
510:  100 101 102 103  (rivi S[1,2,*])
611:  110 111 112 113  (rivi S[1,2,*])
712:  120 121 122 123  (rivi S[1,2,*])

630:  700  301  802    (tason S[0,*,*] rivien osoitteet)
541:  510  611  712    (tason S[1,*,*] rivien osoitteet)

600:  630   541       (taulukon S tasojen osoitteet)
```

ja sama viite (r2 = S[i,j,k]) toteutuisi nyt käskyillä

```
     load r1, i
     load r2, S(r1)    ; tason i osoite
     add r2, j         ; rivin j osoitteen osoite
     load r1, 0(r2)    ; rivin j osoite
     add r1, k         ; alkio k osoite
     load r2, S(r1)    ; lataa r2:een alkion S[i,j,k] arvo
```

## Monimutkaiset rakenteiset tietorakenteet

## Quizit 5.3 ??????

<!-- quiz 5.3 ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


<!-- Luvun 1 yhteenveto, mitä tuli opittua quiz 1.summary -->
