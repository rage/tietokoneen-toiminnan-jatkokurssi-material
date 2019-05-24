---
path: '/luku-6/4-kj-palvelut'
title: 'Käyttöjärjestelmäpalvelujen käyttö'
---

<div><lead>
Tässä osiossa esitellään käyttöjärjestelmäpalvelujen käyttö ja kuinka se eroaa tavallisten aliohjelmien käyttämisesestä.
</lead></div>

## Käyttöjärjestelmäpalvelut kutsuttavina rutiineina
Käyttöjärjestelmä tarjoaa suorituksessa oleville ohjelmille erilaisia palveluja, kuten esimerkiksi oheislaitteiden käyttämisen. Näitä palveluja käytetään periaatteessa kahdella tavalla. 

Palvelut voivat olla suoraan kutsuttavissa tavallisina aliohjelmina tai etuoikeutettuina aliohjelmina. Kaikki käyttöjärjestelmän osat eivät tarvitse etuoikeutettua suoritustilaa ja on turvallisempaa pitää mahdollisimman suuri osa koodista tavallisessa suoritustilassa suoritettavana. Esimerkkinä tällaisesta palvelusta voisi olla joku yleinen tulostuspalvelu. Palveluja kutsutaan tavallisilla call-aliohjelmakutsuillla. 

Osa palveluista (esimerkiksi jotkut laiteajurit) vaativat kuitenkin etuoikeutettua suoritustilaa ja niitä kutsutaan tällöin svc-käskyillä. Svc-käsky vaihtaa suoritustilan etuoikeutetuksi samalla kun se siirtää kontrollin kutsutulle rutiinille. Etuoikeutetut palvelurutiinit ovat etukäteen kaikki tiedossa ja ne on usein nimetty pelkästään palvelun numeron mukaisesti. Esimerkiksi, ttk-91'ssä palvelurutiinin Halt (ohjelman suoritus päättyy) numero on 11, mikä on myös symbolin "halt" arvo.

```
     ...
     svc sp, =halt
```

Parametrien välitys käyttöjärjestelmärutiineille voi olla erilaista kuin tavallisille aliohjelmille ja tapauskohtaista. Joissakin tapauksissa KJ-palvelupyynnön yhteydessä ei haluta muodostaa tavanomaista aktivaatiotietuetta ja parametrit välitetään yksinkertaisesti sovittujen rekistereiden avulla. Toisaalta taas, usein on ihan järkevää noudattaa samaa aktivaatiotietuerakennetta kuin tavallisten aliohjelmien yhteydessä.

```
;
; laiteajurin DiskDriver=33 kutsu proseduraalisesti
;
      push  sp, =0             ; paluuarvo
      push  sp, =FileBuffer    ; datpuskuri tiedon siirtoa varten
      push  sp, ByteCnt        ; luettavien tavujen lukumäärä
      push  sp, ptrFile        ; luettava tiedosto
      
      svc   sp, =DiskDriver    ; lue laitteelta pyydetty määrä tavuja puskuriin
      pop   sp, r1
      jnzer r1, FileTrouble    ; käsittele virhetilanteet
```

Jos palvelu on suoritettu etuoikeutetussa tilassa, alkuperäinen suorittimen suoritustila (yleensä tavallinen suoritustila) täytyy palauttaa palvelusta paluun yhteydessä. Tätä varten on olemassa yleensä jokin etuoikeutettu konekäsky (esim. iret eli interrupt return). Aikaisemmin vallinnut suoritustila täytyy tietenkin tallettaa johonkin, esimerkiksi pinoon vanhan PC:n ja vanhan FP:n yhteyteen.

## Käyttöjärjestelmäpalvelut prosesseina
Osa käyttöjärjestelmäpalveluista on toteutettu omina suoritettavina ohjelmina eli prosesseina. Niitä ei voi kutsua, mutta niille voi lähettää palvelupyyntöviestejä ja sitten jäädä odottamaan vastausviestiä. Viestien lähetys ja vastaanotto taas ovat normaaleja etuoikeutettuja palveluita, joita kutsutaan proseduraalisesti. Esimerkiksi, joidenkin laitteiden laitajurit voi olla toteutettu näin.

Viestienvälitykseen liittyvän palvelun toteutus on monimutkaisempaa, koska siihen yleensä liittyy prosessin vaihtoja. Esimerkiksi, kun otetaan vastaan viesti joltain toiselta prosessilta, niin tyypillisesti vastaanottava prosessi odottaa odotustilassa, kunnes viesti on saapunut.

```
;
; laiteajurin DiskDriver (pid=3254) käyttö viestien avulla
;
pidDriver  equ 3254  ; laiteajuriprosessin tunniste
MsgService equ   52
      ...
      ;  lähetä palvelupyyntöviesti
      push  sp, =0             ; paluuarvo
      push  sp, =pidDriver     ; viestin vastaanottajan tunniste (pid)
      push  sp, =Send          ; viestin tyyppi
      push  sp, =FileBuffer    ; datapuskuri tiedon siirtoa varten
      push  sp, ByteCnt        ; luettavien tavujen lukumäärä
      push  sp, ptrFile        ; luettava tiedosto
      
      svc   sp, =MsgService    ; lähetä viesti DiskDrive-prosessille
      pop   sp, r1
      jnzer r1, SendTrouble    ; käsittele virhetilanteet
      
      ; vastaanota vastaus palvelupyyntöön
      push  sp, =0             ; paluuarvo
      push  sp, =pidDriver     ; viestin lähettäjän tunniste (pid)
      push  sp, =Receive       ; viestin tyyppi
      push  sp, =maxWaitTime   ; maksimiodotusaika viestin vastaanotolle
      push  sp, =MsgBuffer     ; datapuskuri tiedon siirtoa varten
      push  sp, &MsgByteCnt        ; luettavien tavujen lukumäärä
      
      svc   sp, =MsgService    ; vastaanota viesti DiskDrive-prosessilta
      pop   sp, r1
      jnzer r1, RecvTrouble    ; käsittele virhetilanteet
```



## Quizit 6.4 ??????  e-300, e-310, e-450, f410??
<!-- quiz 6.4.??  ????? -->

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>

## Note  EDSAC   ?????

<text-box variant="example" name="Historiaa:  EDSAC">
  
Vuonna 1949 rakennettu EDSAC oli ensimmäisiä tietokoneita, joka suoritti muistissa olevaa ohjelmaa. Siinä oli kuusi kappaletta tyhjiöputkilla toteutettua rekisteriä. Käsky- ja datamuisti oli toteutettu 32 elohopeaviiveputkella, joihin kuhinkin mahtui 32 kappaletta 18-bittistä sanaa. Myös (little-endian) kaksois-sana oli mahdollinen. Kertolasku kesti 5.4 ms. Koko toteutus vaati 3000 tyhjiöputkea, sähkön kulutus oli 12 kW ja  laitteistoi vaati 5x4 metrin tilan. Tyhjiöputkien kestävyys oli ongelma, kunnes keksittiin, että niitä ei kannata koskaan sammuttaa. 

<!-- kuva: ch-6-4-edsac    -->

![T?????     selitys PUUTTUU ???????.](./ch-6-4-edsac.svg)
<div>
<illustrations motive="ch-6-4-edsac"></illustrations>
</div>

</text-box>
EDSAC I, W. Renwick, M.V. Wilkes.<br>
Copyright Computer Laboratory, University of Cambridge. Reproduced by permission.<br>
This photo is licensed under the Creative Commons Attribution 2.0 Generic license.


## Yhteenveto
Tämä luku käsitteli ??????.

Vastaa alla olevaan kyselyyn kun olet valmis tämän luvun tehtävien kanssa.


###  summary quizit ????

<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
