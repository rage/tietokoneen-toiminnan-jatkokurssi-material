---
path: '/luku-5/2-valinta-ja-toistolauseet'
title: 'Valinta- ja toistolauseiden toteutus'
---

<div>
<lead>Normaalitapauksessa seuraavaksi suoritettava konekäsky on muistissa heti suorituksesaolevan konekäskyn jälkeen. Valintalauseella suorituspolku voi haarautua jonkin ehdon perusteella kahden tai useamman suoritushaaran välillä. Toistolause tarkoittaa sitä, että sama koodinpätkä suoritetaan uudestaan monta kertaa peräkkäin ja suorituskerrat eroavat yleensä vain yhden muuttujan (ns. muuntelumuuttujan) arvon osalta.</lead>
</div>

## Valintalauseet korkean tason kielissä
Tyypillisesti kaikissa korkean tason ohjelmointikielissä on ehdollinen "_if&nbsp;...&nbsp;then&nbsp;...&nbsp;else&nbsp;..._" kontrollirakenne, jonka avulla valitaan kumpi mahdollisista koodinpätkistä suoritetaan. Tästä on myös yksinkertainen "_if&nbsp;...&nbsp;then&nbsp;_" muoto, jossa then-haaran koodi suoritetaan vain jos annettu ehto on voimassa. Sen jälkeen suoritus jatkuu normaalisti "_if&nbsp;...&nbsp;then&nbsp;_" lauseen jälkeisessä koodissa joka tapauksessa.

Joissakin ohjelmointikielissä on myös ns. _swicth_ tai _case_ lause, jolla mahdollinen suorituspolku valitaan useammn vaihtoehdon väliltä. Esimerkiksi C-kielen switch-lauseella voidaan suoritettava koodinpätkä sen mukaan mikä jonkin lausekkeen arvo tällä hetkellä on. Lisäksi mukana on oletusarvo vaihtoehto, joka valitaan silloin kun mikään erikseen nimetty vaihtoehto ei toteutunut. 

```
switch(error-number)  {

    case 1: ... ; break;
    case 2: ... ; break;
    case 8: ... ; break;
    default: ...
    }
```

## Valintalauseet konekielessä
Konekielessä valintalauseet toteutetaan yksinkertaisesti ehdollisilla hyppykäskyillä.

```
      load r1, X
      jnzer r1, Xnotz
      ...                   ; then branch
      jump done
xnzer ...                ; else branch
done  nop
```

Monivalinta tehdään tyypillisesti vain vertailemalla.....??????

```
  ??????? case esim
```

Joissakin tapauksissa monivalinta voidaan toteuttaa ns. _hyppytaulun_ (jump table) avulla. Hyppytaulussa on talletettuna eri vaihtoehtojen _hyppyosoitteet_, joista yksi valitaan haarautumisehdon perusteella.

```
  ??????? hyppytauluesim
```

Toinen vaihtoehto on, että hyppytaulussa onkin eri vaihtoehtoihin johtavat _hyppykäskyt_, joista yksi valitaan suoritukseen haarautumisehdon perusteella.

```
  ??????? hyppytauluesim, taulussa käskyt
```

Ongelmana molemmissa hyppytauluissa on 

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
