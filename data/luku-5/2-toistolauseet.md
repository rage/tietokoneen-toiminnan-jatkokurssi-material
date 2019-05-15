---
path: '/luku-5/2-toistolauseet'
title: 'Toistolauseiden toteutus'
---

<div>
<lead>Toistolause tarkoittaa sitä, että sama koodinpätkä suoritetaan uudestaan monta kertaa peräkkäin ja suorituskerrat eroavat yleensä vain tyhden muuttujan (ns. muuntelumuuttujan) arvon osalta.</lead>
</div>

## Erilaiset toistolauseet korkean tason kielissä
Korkean tason kielissä on tyypillisesti muutama eri tyyppinen toistolause. For-silmukassa muuntelumuuttujalle annetaan alkuarvo, sen muutoksen ilmaisema lauseke ja silmukan lopetusehto.

```
for (i=0; i++; i<30) {    /* i++ on sama kuin i = i+1   */
    A[i] = 4*i; 
    }
```

Useimmissa kielissä ehtolauseke tarkistetaan ennen silmukan koodin suorittamista ja tällöin on mahdollista, että silmukan koodia (_runkoa_) ei suoriteta lainkaan. Joissakin kielissä ehtolauseke tarkistetaan vasta silmukan koodin suorittamisen jälkeen. Tuolloin silmukan koodi suoritetaan aina vähintään yhden kerran. 

```
do 50 i = 0, 30, 1 
A[i] = 4*i; 
50 continue
```

Toinen tyypillinen toistolause on while-silmukka, jossa silmukkaa suoritetaan kunnes jokin ehto tulee voimaan. Muuntelumuuttujia voi tällöin olla silmukassa useitakin, mutta ne täytyy alustaa do-lauseen ulkopuolella.

```
i=0; j= 50;
while (i<j) do {
    x = T[i];
    T[i] = T[j];
    T[j] = x;
    i++; j++;
    }
```
 
Tästäkin on muoto, jossa silmukan runko suoritetaan ainakin kerran. Joissakin kielissä siitä käytetään nimeä do-until silmukka.

```
i=0; j= 50;
do {
    x = T[i];
    T[i] = T[j];
    T[j] = x;
    i++; j++;
    }
until i>j;
```

Eri ohjelmointikielissä on vielä paljon muitakin toistolauseen muotoja, mutta yleensä ne ovat näiden neljän muunnoksia. Saman näköisilläkin toistolauseilla voi olla eri ohjelmointikielissä erilaisen merkitys (_semantiikka_). Joissakin ohjelmointikielissä silmukan rungosta tai koko silmukasta voi poistua esim. _exit_-lauseella. Joissakin ohjelmointikielissä voi silmukan yhteydessä määritellä uusia muuttujia, jotka ovat olemassa ja viitattavissa vain tuon silmukan sisällä. Emme käsittele näitä silmukoiden erityispiirteitä tässä sen enempää.

## Toistolauseet konekielessä
Konekielessä toistolauseita on vain kahden tyyppisiä. Molemmisssa alustetaan ensin mahdolliset muuntelumuuttujat. Ensimmäisessä tapauksessa tarkistetaan heti, josko silmukasta poistutaan tällä hetkellä. Jos ei poistuta niin silmukan runko suoritetaan ja sen jälkeen tehdään mahdolliset muutokset muuntelumuuttujiin. Toisessa vaihtoehdossa silmukan runko ja muutokset muuuntelumuuttujiin suoritetaan ensin ja sitten vasta testataan silmukan päättymisehtoa. Näillä kahdella vaihtoehdolla voidaan toteuttaa kaikki korkean tason kieleten toistolauseet. Totta kai varsinaisessa konekielisessä toteutuksessa pitää huomioida kunkin korkean tason kielen semanttiset erityispiirteet. 

Esimerkiksi, edellä oleva C-kielen taulukon alustus for-silmukalla voitaisiin toteuttaa konekielellä seuraavasti:

```
      load r1, =0     ;  muuntelumuuttujan i alustus, arvo r1:ssä
loop  comp r1, =30      ; silmukan lopetustesti
      jequ done
      load r2, r1       ; silmukan runko
      mul  r2, =4
      store r2, A(r1)
      jump
done  nop               ; poistu silmukasta      
```

Vastaavasti edellä oleva Fortran-kielinen do-silmukka ("do 50") olisi konekielellä:

```
      load r1, =0     ;  muuntelumuuttujan i alustus, arvo r1:ssä
loop  load r2, r1       ; silmukan runko
      mul  r2, =4
      store r2, A(r1)
      comp r1, =30      ; silmukan lopetustesti
      jless loop     
```

Vaikka silmukat näyttävät kovin samanlaisilta, niissä on merkittävä semanttinen ero. Ei ole ollenkaan yhdentekevää, testataanko silmukan lopetusehto ennen ensimmäistä silmukan rungon suorituskertaa vai ei.

## Quizit 5.2  ????
<!-- quiz 5.2.?? ???? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
