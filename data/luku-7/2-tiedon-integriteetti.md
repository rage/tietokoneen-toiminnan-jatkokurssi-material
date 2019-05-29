---
path: '/luku-7/2-tiedon-integriteetti'
title: 'Tiedon integriteetin turvaaminen'
hidden: false
---


<div>
<lead>Käymme ???</lead>
</div>

## Tiedon integriteetin turvaamisen pääperiaatteet
Lähtökohta riittävän hyvän tiedon integriteetin takaamiselle on hyväksyä se, että virheitä tapahtuu. Perusidea virheiden havaitsemiselle on ottaa mukaan ylimääräisiä bittejä, joiden avulla virhe voidaan havaita ja ehkä jopa korjata. Käytännössä tämä tarkoittaa sitä, että rekistereihin ja muistipiireihin laitetaan ylimääräisiä bittejä ja tiedonsiirtoväyliin ylimääräisiä johtimia. Näiden lisäksi virheen havaitseva koodi pitää myöskin toteuttaa ja sen voi tehdä joko suoraan laitteistolla tai erillisillä suoritettavilla ohjelmilla. Jos ajatellaan esimerkiksi muistiväylän suojaamista, niin nopeusvaatimusten vuoksi kaikki tarkistukset tulee tehdä laitteistototeutuksina.

Ylimääräiset bitit ja johtimet vaativat ylimääräistä tilaa ja tarkistusten tekeminen vaatii aikaa. Tiedon integriteetin suojaaminen kustannus maksetaan siten sekä tilassa että ajassa. 

Se, paljonko olemme valmiita maksamaan järjestelmässä olevan tiedon integriteetistä, riippuu järjestelmästä. Esimerkiksi kotikoneessa on usein tavallista muistia eikä virheen korjaavaa ([ECC muistia](https://en.wikipedia.org/wiki/ECC_memory)), koska tavallinen muisti on halvempaa. Lääketieteellisen [MRI](https://simple.wikipedia.org/wiki/Magnetic_resonance_imaging)-laitteen muisti taas on ainakin yhden virheen havaitsevaa ja korjaavaa muistia, koska kukaan ei halua liikaa säteilyä satunnaisen avaruushiukkasen vuoksi.

## Tiedon integriteetin turvausmenetelmien ominaisuudet
Luokittelemme tiedon integriteettimenetelmiä useiden ominaisuuksien perusteella. Yleensä kuhunkin käyttöön sopivan menetelmän valinta tapahtuu usean ominaisuuden yhdistelmänä, ottaen huomioon riskien hallinta hyväksytyllä tasolla.

Kuinka monen bitin muuttuminen havaitaan? Menetelmä, joka havaitsee kahden bitin muuttumisen on parempi kuin sellainen, joka havaitsee vain yhden bitin muuttumisen, mutta se on myös kalliimpi toteuttaa. Esimerkiksi, jos virheet ovat satunnaisia ja yhden virheen esiintymis todennäköisyys on P(virhe)&nbsp;=&nbsp;1:1&nbsp;000&nbsp;000, niin kahden virheen yhtäaikaa tapahtumisen todennäköisyys on sama kuin yhden virheen P(virhe) potensssiin 2 eli P(2&nbsp;virhettä)&nbsp;=&nbsp;0:1&nbsp;000&nbsp;0001&nbsp;000&nbsp;000. Pienlentokoneen järjestelmän suunnittelijat voivat hyvin päättää, että riittää varautua yhteen virheeseen kerrallaan, koska kahden samanaikaisen virheen todennäköisyys on niin pieni. Toisaalta, jos kyseessä on suuri matkustajalentokone, niin olisiko parempi varautua myös kahteen samanaikaiseen virheeseen?

Kuinka monen viallista bittiä voidaan korjata? Joissakin tapauksissa riittää, että virhe havaitaan ja raportoidaan, jonka jälkeen jokin ulkopuolinen taho korjaa tilanteen. Esimerkiksi verkkoliikenteessä on tyypillistä, että tietoliikennepaketteja katoaa tai menee rikki matkalla. Jos paketissa on viallisia bittejä, niin niitä on helposti niin monta, että niiden korjaaminen ei kuitenkaan onnistu. On helpompi pyytää lähettäjää lähettämään kyseinen paketti uudelleen ja toivoa parasta. Toisaalta, jos muistipiiri on ECC-tyyppinen, niin sitä voi hyvin käyttää ainakin vähän aikaa, vaikka jokin bitti olisikin rikki. Rikkinäisen bitin tieto voidaan lennossa laskea ylimääräisten virheen korjaavien bittien avulla.

Mikä on virheen kustannus muistitilan tai piirin pinta-alan suhteen? Tämä tarkoittaa yksinkertaisesti sitä, että kuinka paljon ylimääräisiä bittejä tai johtimia tarvitaan (esimerkiksi) 64-bittistä sanaa kohden. Johtimien vetäminen mikropiirin pinnalla voi viedä yllättävän paljon arvokasta pinta-alaa, jolle voisi löytyä muutakin käyttöä - esimerkiksi isompana välimuistina.

Mikä on virheen kustannus ajassa ja tehdäänkö virheiden havaitsemis/korjauslaskelmat laitteistolla vai ohjelmistolla? Tarkiskoodin suorittamismenetelmä määräytyy yleensä suoraan siitä, minkä tason tiedosta on kyse. Suorittimen sisäisen väylän tai muistiväylän tiedonsiirron turvaaminen täytyy tapahtua laitteistototeutuksena, koska tarkistus pitää tehdä huomattavasti nopeammin kuin yhden konekäskyn suoritusajassa. Massamuistin ja pilvipalvelimien tiedon tarkistus voidaan hyvin tehdä ohjelmallisesti, koska niiden käyttö on joka tapauksessa hidasta. 

Esimerkkinä tiedot muuttamattomuuden tarkistamisesta voidaan käyttää henkilötunnusta, vaikka tietoa siinä käsitelläänkin merkkikohtaisesti eikä bitteinä. Henkilötunnus on muotoa 120364-121K, jossa alkuosa "120364" on syntymäaika ilman vuosisataa, välimerkki ´-´ ilmaisee syntymäajan vuosisadan 1900-luku, "121" ilmaisee parittomana lukuna sukupuoleksi miehen ja muutoin uniikin arkistointinumeron tälle henkilölle. Viimeinen merkki ´K´on tarkistusmerkki, jonka arvo saadaan jakamalla edellä oleva 9-numeroinen luku 120364121 luvulla 31 ja koodaamalla jakojäännös sopivasti. Merkki ´K´ kertoo, että jakojäännös on 18. Matemaattisesti voidaan osoittaa, että tämän tarkistusmerkin avulla löydetään ainakin kaikki yhden merkin virheet ja kaikki kahden merkit vaihtumiset. Rakenteellisena puutteena järjestelmässä on, että välimerkin integriteettiä ei valvota lainkaan. Tämän vuoksi kaikkien käytössä olevien henkilötunnusten on pakko erota myös muutoin kuin välimerkin osalta. Tästä taas on seurauksena arkistointinumeroiden loppuminen piakkoin, joten uuden henkilötunnuksen käyttöönotolla alkaa olla kiire. Henkiltunnuksessa havaitaa yhden merkin muuttuminen, mutta virhettä ei voi paikallistaa eikä korjata. Tarkistusmerkin kustannus on 10%, koska 10 datamerkin lisäksi tarvitaan yksi lisämerkki. Tarkistus vaatii jonkin verran laskentaa ja tehdään aina ohjelmallisesti.

Toinen esimerkki tarkistusmerkeistä on Suomessa käytetty IBAN tulinumero. Siinä olevien kahden tarkistusmerkin (numeron) avulla havaitaan kaikki yhden merkin virheet ja useimmat kahden merkin virheet. Kaikki kahden merkin vaihtumiset huomataan samoin kuin useimmat muutkin virheet. Virheitä ei voi korjata lainkaan.

```
500015-123                  vanha pankkitilin numero: muotoa "pankki"-"tili" 
5000 1500 0001 23           laajenna pankkiosa 14-numeroiseksi 
5000 1500 0001 23 FI00      lisää loppuun FI00 
5000 1500 0001 23 15 18 00                  muuta  F="15", I="18"
5000 1500 0001 23 15 18 00 mod 97 = 61      laske modulo 97                      
5000 1500 0001 23 FI37      laske 98-61=37 ja aseta 37 FI-merkkien jälkeen 
FI37 5000 1500 0001 23      Siirrä FI-osa alkuun, uusi IBAN-numero
```

Tarkistusmerkkien kustannus on 2 merkkiä 18:sta eli yli 10%. Tarkismerkkien oikeellisuuden laskenta tehdään ohjelmallisesti.

## Pariteettibitti
???

## Hamming-koodi
???

## Cyclic Redundancy Code (CRC)
???

## Laitteiden monistaminen
???

## Quizit 8.2
<!-- Quiz 8.2.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
