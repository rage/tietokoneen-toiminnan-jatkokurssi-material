---
path: "/luku-5/5-titokone-titotrainer"
title: "Titokone ja TitoTrainer"
---

<div>
<lead>Ihmisen ???????</lead>
</div>

## Titokone
Titokone on simulaattori, jossa voi suorittaa ttk-91 ohjelmia. Titokoneelle voi antaa suoritettavan ttk-91 ohjelman käyttäen joko symbolista tai numeerista esitysmuotoa. Yleensä ohjelmat annetaan kirjoitettuna symbolisella ttk-91 konekielellä ja ne käännetään numeeriseen muotoon ennen suoritusta. Titokone ei ole ainoastaan simulaattori, vaan siihen sisältyy useita komponentteja.

_Symbolisen konekielen kääntäjä_ kääntää ttk-91 symbolisella konekielellä kirjoitetut ohjelmat (esim. hello.k91) ttk-91 konekielelle (esim. hello.b91). Symbolisia konekielisiä ohjelmia (hello.k91) voi kirjoittaa millä tahansa tekstieditorilla.

_Simulaattori_ lukee konekielisiä ohjelmia (hello.b91) yksi konekäsky kerrallaan ja emuloi sen aiheuttamat toiminnot simuloidussa ttk-91 järjestelmässä (ks. Luku 5.1). Esimerkiksi, konekäskyn "add&nbsp;r1,&nbsp;1000" suorittamisen tuloksena simuloidun rekisterin r1 arvoa on kasvatetty luvulla 1000 ja simuloidun tilarekisterin SR bitit GEL asetetaan ilmaisemaan tuloksen suhdetta lukuun nolla. Jos yhteenlaskusta aiheutui ylivuoto, se merkitään tilarekisteriin bittiin O.

_Ohjelmiston kehitysympäristön_ avulla voidaan säätää kommentoinnin määrää symbolisen konekielen käännösaika ja ohjelman suoritusaikana simulaattorissa. Se näyttää suoritusaikana järjestelmän rekistereiden ja muistin sisällön. Lisäksi se sallii suorituksen vain yksi konekäsky kerrallaan, mikä helpottaa huomattavasti ohjelmointivirheiden löytämistä.

_Animaattori_ aukeaa ohjelman suoritusaikana omaan ikkunaansa ja näyttää ohjelmansuorituksen animoidusti suoriutimen rekisterien ja muistin tasolla. Esimerkiksi konekäskyn "add&nbsp;r1,&nbsp;1000" muistista noudon yhteydessä se näyttää, kuinka kyseinen konekäsky haetaan muistista väylän kautta suorittimen käskyrekisteriin IR.

_Graafinen käyttöliittymä_ kokoaa kaikki edellämainitut komponentit yhteen, jolloin niitä on helppo käyttää. Se koostuu useasta eri ikkunasta tai kehyksestä, joiden kokoa voi dynaamisesti säätää.

### Titokoneen käyttö
?????

### Titokoneen historia
?????


## TitoTrainer
???

### TitoTrainerin tavoite
?????

### TitoTrainerin tehtävät
?????

### TitoTrainerin käyttö
?????

### TitoTrainerin historia
?????

## Quizit 5.5.?? ??????

<!-- quiz 5.5.??? ????????????????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


## Yhteenveto
Tämä luku käsitteli .....?????

Vastaa alla olevaan kyselyyn kun olet valmis ensimmäisen luvun tehtävien kanssa.

### summary quiz ?????

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
