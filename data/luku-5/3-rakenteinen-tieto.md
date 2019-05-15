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

Per0    ds 3         ; kolme kappaletta Person-tyyppistä tietuetta
Per1    ds 3
Per2    ds 3

...               ; tietueiden alustus ja muuta koodia
 
   load r2, =Per1      ; r2 osoittaa tietueeseen Per1
   load  r1, Nr(r2)    ; hae rekisteriin r1 rekisterin r2  
                       ; osoittaman tietueen kentän Nr arvo
``` 

## 2-ulotteiset taulukot
Moniulotteiset taulukot ovat jo vaikeampi tapaus. Useimmissa konekielissä ei ole niitä tukevia tiedonosoitusmoodeja, joten tietoon viittaminen tapahtuu kahdessa vaiheessa. Ensin lasketaan omalla koodilla viitatun tiedon suhteellinen sijainti rakenteisen tiedon sisällä ja sitten indeksoitua tiedonosoitusmoodia käyttäen tehdään varsinainen tiedonosoitus.  

### Talletus riveittäin
2-ulotteiset taulukot voidaan tallettaa muistiin ainakin kolmella tavalla. Ne voidaan tallettaa yhtenäiselle alueelle _riveittäin_, jolloin esimerkiksi osoitteeseen 300 talletettu taulukko T[2,3] 

```
25  88  2
11  66  3
```

talletetaan rivi kerrallaa muistiin peräkkäisiin muistipaikkohin, muistipaikasta 300 alkaen.

```
300: 25  88  2 11  66  3
```

Nyt taulukon alkion T[i,j] osoite on T + 3\*i + j ja alkioon T[i,j] viittamminen tapahtuisi esimerkiksi näin:

```
     load r1, i
     mul r1, =3
     add r1, j
     load r2, T(r1)  ; lataa r2:een alkion T[i,j] arvo
```

### Talletus sarakettain
Jos taas taulukko T on talletettu sarakettain yhtenäiselle muistialueelle, niin se on talletettu järjestyksessä

```
300: 25  11 88  66  2  3
```

Alkion T[i,j] osoite on T + i + 2\*j ja alkioon T[i,j] viittamminen tapahtuisi esimerkiksi näin:

```
     load r1, j
     mul r1, =2
     add r1, i
     load r2, T(r1)  ; lataa r2:een alkion T[i,j] arvo
```

### Talletus linkitettynä rakenteena
Kolmas vaihtoehto on tallettaa (esim.) kukin rivi kerrallaan omalle yhtenäiselle muistialueelleen ja rivien alkuosoitteet omaan 1-ulotteiseen taulukkoon. Taulukko T voisi nyt olla talletettu muistiin esim. seuraavasti:

```
400: 25   88  2            (rivi 0)
430: 11   66  3            (rivi 1)
300: 400 430               (Taulukon T rivien osoitteet)
```

Alkioon T[i,j] viittaminen tapahtuu nyt kaksi vaiheisesti. Ensin haetaan rivin i osoite taulukosta T ja sitten tehdään varsinainen  viite kyseisen rivin alkioon j.

```
     load r1, i
     load r2, T(r1)    ; rivin T[i] osoite
     add r1, j         ; alkion T[i,j] osoite   
     load r2, 0(r1)    ; lataa r2:een alkion T[i,j] arvo
```

## Moni-ulotteiset taulukot
Moniulotteiset taulukot talletetaan aivan vastaavasti. Käytetään esimerkkinä osoitteeseen 600 talletettua 3-ulotteista taulukkoa S[2,3,4]. Siinä on siis 2 tasoa, kullakin tasolla 3 riviä ja kullakin rivillä 4 alkiota. Tasolla nolla on alkiot

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
Alkioden arvot on tässä esimerkissä valittu tahallaan siten, että arvot vastaavat alkioiden indeksejä taulukossa S. Esimerkiksi alkion S[1,2,1] arvo on 121.

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

Näitä kaikki moniulotteisten taulukoiden talletusmuodot ovat käytössä. Useimmiten korkean tason kielellä ohjelmoitaessa niillä ei ole kovin paljon väliä, koska talletusmuoto ei näy korkean tason ohjelmointikielellä ohjelmoitaessa. Joissakin tapauksissa ohjelmien suoritusnopeutta voidaan kuitenkin huomattavasti nopeuttaa, jos talletusjärjestys otetaan huomoioon koodissa. Jos esimerkiksi käydään läpi 2-ulotteisen taulukon kaikki alkiot, niin välimuisti tekee niiden läpikäynnin muistiintallennusjärjestyksessä huomattavasti nopeammaksi kuin jossakin muussa järjestyksessä. Valitettavasti 2-ulotteisia taulukoita tarvitsee usein käydä läpi niin sarakettain kuin riveittäin, joten kumpi tahansa talletusmuoto on aina joskus huono.

## Monimutkaiset rakenteiset tietorakenteet
Monimutkaisemmat tietorakenteet talletetaan muistiin vastaavilla tavoilla. Usein talletusmuoto määräytyy suoraan käytettävän ohjelmointikielen perusteella, mutta joissakin tilanteissa ohjelmoija voi päästä vaikuttamaan talletusmuotoon itsekin. Kulloinkin kätössä oleva talletusmuoto pitää sitten tietenkin huomioida hyvin huolella jokaisen dataviitten kohdalla.

Esimerkiksi, jos R[20,30] on riveittäin talletettu 2-ulotteinen taulukko, jonka kukin alkio on 14-sanainen tietue, jonka kentät ovat id, lkm ja 12-alkionen taulukko pisteet, niin viite alkioon R[i,j].pisteet[kk] voisi olla toteutettuna

```
     load r1, i
     mul  r1, =420   ; rivillä 30 tietuetta, kussakin 14 sanaa
     load r2, j
     mul r2, 14      ; kussakin alkiossa 14 sanaa
     add r1, r2      ; alkion R[i,j] suhteellinen osoite R:n sisällä
     add r1, =2      ; taulukon R[i,j] kentän pisteet suhteellinen osoite
     add r1, kk      ; alkion R[i,j].pisteet[kk] suhteellinen osoite
     load r2, R(r1)  ; lataa r2:een alkion R[i,j].pisteet[kk] arvo
```

Toteutus on monimutkaisellakin rakenteella siis hyvinsuoraviivainen. Kääntäjät generoivat tällaista koodia hyvin helposti ja luotettavasti.

## Indeksitarkistukset
Indeksitarkistusten avulla pyritään suojaamaan järjestelmää tietynlaisista ohjelmointivirheistä ja tietosuojahyökkäyksistä. Ajatellaampa esimerkiksi tilannetta, jossa osoitteeseen 200 talletetulle taulukolle T[20] on varattu tilaa 20 sanaa, ja siihen kohdistuu viittaus "X = T[N]", kun N:n arvo on 73. Nyt X:n arvoksi tulee muistipaikan 93 arvo, vaikka kyseinen muistipaikka ei edes kuulu taulukolle T. Vastaavasti viitteellä "T[-187]\nbsp;=\nbsp;z" voidaan muokata muistipaikan 13 arvoksi muuttujan Z arvo. Jos muuttujan Z arvo oli esimerkiksi 35651571, niin muistipaikassa 13 ollut konekäsky olisi näin vaihdettu konekäskyyn "add r1, =87". 

Usein tällaiset taulukon ulkopuolelle tapahtuvat viittaukset ovat ihan ohjelmointivirheitä, jossa vaikka silmukan päättymisehdon toteutus sallii silmukan suorittamisen yhden kerran liikaa. Joissakin tapauksissa virhe on vain siinä, että indeksi arvoa ei tarkisteta ennen taulukkoviitteen käyttöä ja pahatahtoinen _hyökkääjä_ voi silloin ehkä käyttää tällaista tietoa _puskurin ylivuotohyökkäyksen_ tekemiseen. Tällöin taulukon kautta hyökkääjä voi muuttaa järjestelmän kriittisiä tietokenttiä tai sijoittaa haittaohjelman järjestelmän suoritettavaksi.

Yksinkertainen tapa torjua tällaiset ongelmat on joka kerta taulukkoviitteen yhteydessä tarkistaa indeksin oikeellisuus. Esimerkiksi aikaisempi taulukkoon T[2,3] kohdistuva viite "r2 = T[i,j]" olisi nyt muotoa

```
     load r1, i           ; tarkista I
     jneq r1, trouble
     comp r1, =2
     jnles trouble
     
     load r2, j           ; tarkista j
     jneq r2, trouble
     comp r2, =3
     jnles trouble
     
     mul r1, =3
     add r1, j
     load r2, T(r1)  ; lataa r2:een alkion T[i,j] arvo
     
     jump jatka
trouble svc sp, =BADINDEX  ; käsittele virhetilanne
jatka nop     
```

Kuten tästä esimerkistä huomataan, tarkistusten hinta voi olla korkea ylimääräisten suoritettavien konekäskyjen vuoksi. Toisaalta, haavoittuvaan järjestelmään kohdistuneen puskurin ylivuotohyökkäyksen kustannukset voivat olla valtaisat. On myös muita tapoja tehdä indeksitarkistuksia ja torjua puskurin ylivuotohyökkäyksiä, mutta ne eivät sisälly tämän kussin oppimistavoitteisiin. 

## Quizit 5.3 ??????

<!-- quiz 5.3 ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


<!-- Luvun 1 yhteenveto, mitä tuli opittua quiz 1.summary -->
