---
path: '/luku-6/2-akt-tiet-rakentaminen'
title: 'Aktivaatiotietueen rakentaminen'
---

<div>
<lead>Tässä osiossa käydään läpi protokolla, joka kutsuvan ja kutsutun rutiinin pitää noudattaa aktivaatiotietueiden rakentamisessa ja purkamisessa.</lead>
</div>


## Aktivaatiotietueen rakentaminen ja purku
Aktivaatio tietueen rakentaminen ja purku tapahtuvat kolmessa vaiheessa. Osan työstä tekee kutsuva rutiini usean konekäskyn avulla, osan tyästä tekee kutsuttu rutiini niin ikään usean konekäskyn avulla. Kontrollin siirrot tehdään konekäskyjen call ja exit avulla.

Kutsuva rutiini aloittaa työn ja laittaa pinoon ensin tilan paluuarvolle (jos kyseessä on funktio) ja sitten kaikki parametrien arvot, oman tyyppinsä mukaisesti. 

```
push sp, =0        ; tila paluuarvolle                                
push sp, x         ; arvoparametri esimerkki
pushsp, =x         ; viiteparametri esimerkki
```

Seuraavaksi call-käskyllä pinoon laitetaan PC:n nykyarvo eli paluuosoite ja FP nykyarvo eli kutsuvan rutiin AT:n osoite. Tässä yheydessä kontrolli siirtyy kutsutulle rutiinille, jonka pitää sitten rakentaa loput aktivaatiotietueesta.

```
call sp, funcX     ; pinoon vanha PC ja vanha FP
```

Kutsuttu rutiini tekee nyt aluksi hallinnolliset alkutoimet, joiden avulla AT rakennetaan valmiiksi. Näitä alkutoimia kutsutaan nimellä _prolog_. Siinä varataan ensin tilaa paikallisille tietorakenteille ja talletetaan tarvittavien työrekisterien arvot. 

```
push sp, =0    ; tila ensimmäiselle paikalliselle muuttujalle, alkuarvo 0
pushr  sp      ; talleta kaikki työrekisterit
```

Nyt aktivaatiotietue on valmis ja itse rutiinin työ voidaan tehdä. Jos kyseessä on funktio, niin paluuarvo pitää asettaa paikalleen.

Sitten voidaankin aloittaa aktivaatiotietueen purku. Kutsutussa rutiinissa tätä kutsutaan nimellä _prolog_. Hyvin usein todellisissa symbolisissa konekielissä on tehokkaat _makrot_ epilogin ja prologin koodien tuottamiseksi. Palautamme ensin talletettujen työrekistereiden arvot ja vapautamme paikallisten tietorakenteiden tilanvaraukset. Lopuksi palautamme kontrollin kutsuvalle rutiinille exit-käskyllä, joka samalla vapauttaa parametrien tilanvaraukset pinosta.

```
popr sp     ; palauta kaikki työrekisterit
sub sp, =1  ; vapauta paikallisen muuttujan tilanvaraus
exit sp, =2 ; palauta PC ja FP, vapauta 2 parametrin tila
```

Nyt kontrolli on takaisin kutsuvalla rutiinilla, joka ottaa funktion paluuarvon käyttöönsä pinosta (jos kutsuttu rutiini oli funktio). Näin koko kutsutun rutiinin AT on purettu ja pinon sisältö on täsmälleen sama kuin mitä se oli ennen

## Esimerkki
Käytetään esimerkkinä kokonaislukuarvoista funktiota fA(x,y), joka käyttää paikallista muuttujaa z (alkuarvo 5) ja palauttaa arvonaan lausekkeen x\*z+y arvon. 

```
int fA (int x, y) {  /* x ja y arvoparametreja */
    int z = 5;
    
    z = x * z + y;
    return(z)
    }
```

Funktiota käytetään lauseen t = fA(200, R) toteutukseen, kun R on globaali muuttuja.

### Kutsuvan rutiinin koodiesimerkki
Kutsuvassa rutiinissa funktion käyttö tapahtuu konekielellä seuraavanlaisesti.

```
r  dc 24      ; r on globaali muuttuja, alkuarvo 24
t  dc 55      ; t on globaali muuttuja, alkuarvo 55
   ...
   ; toteuta t = fA(200, r)
r1 push sp, =0   ; tila paluuarvolle
r2 push sp, =200 ; vakio 200
r3 push sp, r    ; muuttujan r arvo
r4 call sp, fA   ; funktion kutsu
r5 pop sp, r1    ; paluuarvon talletus
r6 store r1, t

```
Ennen funktion kutsun aloittamista (käsky r1) pinossa on kutsuvan rutiinin AT.

```
    FP  -->   ??    ; kutsuvan rutiinin AT
              ...
    SP -->    ??
```


Juuri ennen funktion kutsua (käsky r4) pinossa on paikka paluuarvolle ja parametrit.

```
    FP  -->   ??    ; kutsuvan rutiinin AT
              ...
              ??
              0
              200
    SP -->    24
```

Heti funktiosta palattua (ennen käskyn r5 suoritusta) pinossa on kutsutun rutiiin AT:stä jäljellä vain paluuarvo (jos sitä yleensä oli).

```
    FP  -->   ??    ; kutsuvan rutiinin AT
              ...
              ??
    SP -->    1024  ; funktion paluuarvo
```

Lopulta, käskyn r6 suorittamisen jälkeen pino on ennallaan ja suoritus jatkuu kutsuvan rutiinin ympäristössä.

```
    FP  -->   ??    ; kutsuvan rutiinin AT
              ...
    SP -->    ??
```


### Quizes 6.2 ??????
<!-- quiz 6.2.?? ???  -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
