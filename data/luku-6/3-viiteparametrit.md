---
path: '/luku-6/3-viiteparametrit'
title: 'Viiteparametrit ja ulostuloparametrit'
---

<div>
<lead>Tässä osiossa esitellään, kuinka viiteparametreja käytetään kutsuvassa rutiinissa ja kuinka niihin viitataan aliohjelmissa.</lead>
</div>

## Viiteparametrit
Viiteparametrien käyttäminen on usein ainoa järkevä tapa välittää rakenteista tietoa aliohjelmille. Usein rakenteinen tieto on sen verran suurta, että sitä ei haluta kopioida moneen kertaan. Joiden järjestelmien aliohjelmien toteutus voi olla tehokkuussyistä rakennettu niin, että aktivointitietueen (AT) koko on rajattu. Jotkut ohjelmointikielet antavat myös parametreille kokorajoituksia, jolloin parametrit (ja paluuarvo) voivat olla ainoastaan yksinkertaisia tietotyyppejä. Joissakin ohjelmointikielissä sallitaan esim. taulukoiden käyttö parametreina, mutta ne on käytännössä aina kuitenkin toteutettu viiteparametrien avulla.

Aivan samalla tavalla myös suuret paikalliset tietorakenteet kasvattavat AT:n kokoa huomattavasti, mikä voi vaikuttaa merkittävästi toteutuken tehokkuuteen. Tämän vuoksi jotkut ohjelmointikielet rajaavat AT:hen talletettavien paikallisten tietorakenteiden kokoa.

Käytämme tässä esimerkkinä funktiota fB(r,s,t), joka palauttaa arvonaan lausekkeen x\*y+z arvon. Nyt x on arvoparametri, kun y ja z ovat viiteparametreja. Funktiota fB käytetään lauseen t = fB(r,s,t) toteutuksessa, kun r, s ja t ovat globaaleja muuttujia. Funktion kutsu on hyvin samanlainen kuin aikaisemminkin, mutta nyt funktiolle välitetään s:n ja t:n osoitteet.

```
r   dc 24
s   dc 56
t   dc 77
pt  dc  0          ; osoitin, joka tulee osoittamaan t:hen
    ...
    load r1, =r
    store r1, pt   ; alusta osoitinmuuttuja pt
    ... 
;
; toteuta lause t = fB(r,s,t) 
;
     push sp, =0    ; tila paluuarvolle
     push sp, r     ; r:n arvo
     push sp, =s    ; s:n osoite
     push sp, pt    ; pt:n arvo eli t:n osoite
     call sp, fB
     pop sp, r1
     store r1, t
```

Viiteparametreihin viittaamisessa täytyy muistaa, että parametrina on annettu vasta viitattavan tiedon osoite eikä sen arvoa. Yksinkertaiseen tietoon viittaus on silti helppo toteuttaa epäsuoraa tiedonsoitusmoodia käyttäen. Helppo tapa pitää viiteparametrit erillää arvoparametreista on nimetä ne vähän eri tavalla.

```
;
; funktio fB(x,y,z).  X on arvoparametri. Y ja Z ovat viiteparametreja.
;
retfB   equ  -5    ; paluuarvon suhteellinen osoite
parX    equ -4     ; arvoparametrin X osoite AT:ssä
vparY   equ -3     ; viiteparametrin osoite AT:ssä
vparZ   equ -3

fB      push sp, r1  ; talleta r1
        
        load r1, parX(fp)   ; laske X*Y+Z
        mul  r1, @vparY(fp)
        add  r1, @vparZ(fp)
        
        store r1, retfB(fp) ; talleta paluuarvo
        
        pop sp, r1 ; palauta r1
        exit sp, =3
```

Yksiulotteisiin taulukoihin viittaaminen aliohjelmissa on vaikeampaa kuin pääohjelmatasolla, koska kaikki viittaukset täytyy tehdä osoitinmuuttujien kautta. Emme voi suoraan hyödyntää indeksoitua tiedonosoitusmoodia. Esimerkiksi, jos viiteparametrina on annettu taulukon T osoite, niin lauseen r1=T[r2] toteutus vaatii erikseen viitatun taulukon alkion sijainnin laskemisen.

```
        ...
        load r3, vparT(fp)   ; parametritaulukon T osoite
        add r3, r2           ; alkion T[r2] osoite
        load r1, 0(r3)       ; alkion T[r2] arvo
        ...
```

Sen sijaan tietueisiin viittaaminen viiteparametrin kautta toimii ihan samalla tavalla kuin pääohjelmatasollakin. Esimerkkinä on tyyppiä Person oleva tietue, jonka kentät ovat Number, Age ja Salary. Aliohjelman parametri vparP osoittaa tyyppiä Person olevaan tietueeseen.

```
        ...
Number  equ  0   ; kentän Number suhteelinen sijainti tietueessa
Age     equ  1
Salary  equ  2
        ...
        load r3, vparP(fp)   ; viitatun tietueen osoite
        load r1, Age(r3)     ; kentän Age arvo
        ... 
```

## Ulostuloparametrit
Ulostuloparametrit ovat tavallisia viiteparametreja, joita käytetään parametrina välitetyn tietorakenteen muokkaamiseen. Esimerkiksi aikaisemmin mainitun kuvan käsittelyn yhteydessä tämän on selvästi järkevin vaihtoehto, koska näin vältetään suurehkon kuvan kopiointi jokaisen kuvanksäittelyrutiinin kutsun ja paluun yhteydessä.

```
   push sp, =0      ; paluuarvo
   push sp, =photo  ; manipuloitava kuva
   push sp, =op1    ; haluttu kuvankäsittelyoperaatio
   call  sp, photoedit
   pop sp, r1
   jneq r1, badresult
``` 

## Viiteparametrien riskit
Toisaalta jokainen viiteparametri voi olla riski, koska sen kautta pääsee muuttamaan kutsuvan rutiinin dataa. Esimerkiksi, jos henkilörekisterin palkkataulukko annetaan parametrina tulostusrutiinille, olisi toivottavaa, että tulostusrutiini ei muuta käyttäjien palkkatietoja samalla! Tällaista _hyökkäystä_ vastaan voi suojautua käyttämällä vain luotettavissa kirjastoissa olevia tulostusrutiineja.

Joissakin ohjelmointikielissä jokainen merkkijono välitetään viiteparametrina, jolloin aliohjelmat voisivat manipuloida parametreina annettuja merkkijonoja haluamikseen. Tältä voidaan suojautua tallettamalla merkkijonot _read only_ muistialueelle ja rajaamalla merkkijonojen käsittely luotettaville kirjastoaliohjelmille.



## Quizit 6.3 ??????
<!-- quiz 6.3.??  ????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
