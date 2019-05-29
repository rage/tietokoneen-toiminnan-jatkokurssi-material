---
path: '/luku-7/2-pariteetti-hamming'
title: 'Muuttuneen bitin havaitseminen ja korjaaminen'
hidden: false
---


<div>
<lead>Käymme ???</lead>
</div>

## Tiedon tarkistuksen pääperiaatteet
Lähtökohta riittävän hyvän tiedon integriteetin takaamiselle on hyväksyä se, että virheitä tapahtuu. Perusidea virheiden havaitsemiselle on ottaa mukaan ylimääräisiä bittejä, joiden avulla virhe voidaan havaita ja ehkä jopa korjata. Käytännössä tämä tarkoittaa sitä, että rekistereihin ja muistipiireihin laitetaan ylimääräisiä bittejä, ja tiedonsiirtoväliin ylimääräisiä johtimia. Näiden lisäksi virheen havaitseva koodi pitää myöskin toteuttaa ja sen voi tehdä joko suoraan laitteistolla tai erillisillä ohjelmilla. Jos ajatellaan esimerkiksi muistiväylän suojaamista, niin nopeusvaatimusten vuoksi kaikki tarkistukset tulee tehdä laitteistototeutuksina.

Ylimääräiset bitit ja johtimet vaativat ylimääräistä tilaa ja tarkistusten tekeminen vaatii aikaa. Tiedon integriteetin suojaaminen kustannus maksetaan siten sekä tilassa että ajassa. 

Se, paljonko olemme valmiita maksamaan järjestelmässä olevan tiedon integriteetistä, riippuu järjestelmästä. Esimerkiksi kotikoneessa on usein tavallista muistia eikä virheen korjaavaa ([ECC](https://en.wikipedia.org/wiki/ECC_memory)) muistia, koska tavallinen muisti on halvempaa. Lääketieteellisen [MRI](https://simple.wikipedia.org/wiki/Magnetic_resonance_imaging)-laitteen muisti taas on ainakin yhden virheen havaitsevaa ja korjaavaa muistia, koska kukaan ei halua liikaa säteilyä satunnaisen avaruushiukkasen vuoksi.

## Tiedon integriteetin turvausmenetelmien ominaisuudet
Luokittelemme tiedon integriteettimenetelmiä useiden ominaisuuksien perusteella. Yleensä kuhunkin käyttöön sopivan menetelmän valinta tapahtuu usean ominaisuuden yhdistelmänä, ottaen huomioon riskien hallinta hyväksytyllä tasolla.

Kuinka monen bitin muuttuminen havaitaan? Menetelmä, joka havaitsee kahden bitin muuttumisen on parempi kuin sellainen, joka havaitsee vain yhden bitin muuttumisen, mutta se on myös kalliimpi toteuttaa. Esimerkiksi, jos virheet ovat satunnaisia ja yhden virheen esiintymis todennäköisyys on P(virhe)&nbsp;=&nbsp;1:1&nbsp;000&nbsp;000, niin kahden virheen yhtäaikaa tapahtumisen todennäköisyys on sama kuin yhden virheen P(virhe) potensssiin 2 eli P(2 virhettä)&nbsp;=&nbsp;1:1&nbsp;000&nbsp;0001&nbsp;000&nbsp;000. Pienlentokoneen järjestelmän suunnittelijat voivat hyvin päättää, että riittää varautua yhteen virheeseen kerrallaan, koska kahden samanaikaisen virheen todennäköisyys on niin pieni. Toisaalta, jos kyseessä on suuri matkustajalentokone, niin ehkä olisi parempi varautua myös kahteen samanaikaiseen virheeseen.

Kuinka monen viallista bittiä voidaan korjata? Joissakin tapauksissa riittää, että virhe havaitaan ja raportoidaan, jonka jälkeen jokin ulkopuolinen taho korjaa tilanteen. Esimerkiksi verkkoliikenteessä on tyypillistä, että tietoliikennepaketteja katoaa tai menee rikki matkalla. Jos paketissa on viallisia bittejä, niin niitä on helposti niin monta, että niiden korjaaminen ei kuitenkaan onnistu. On helpompi pyytää lähettäjää lähettämään kyseinen paketti uudelleen ja toivoa parasta. 

Mikä on virheen kustannus muistitilan tai piirin pinta-alan suhteen? Tämä tarkoittaa yksinkertaisesti sitä, että kuinka paljon ylimääräisiä bittejä tai johtimia tarvitaan (esimerkiksi) 64-bittistä sanaa kohden. Johtimien vetäminen mikropiirin pinnalla voi viedä yllättävän paljon arvokasta pinta-alaa, jolle voisi löytyä muutakin käyttöä - esimerkiksi isompana välimuistina.

Mikä on virheen kustannus ajassa ja tehdäänkö virheiden havaitsemis/korjauslaskelmat laitteistolla vai ohjelmistolla? Tarkiskoodin suorittamismenetelmä määräytyy yleensä suoraan siitä, minkä tasontiedosta on kyse. Suorittimen sisäisen tiedonsiirron turvaaminen täytyy tapahtua laitteistototeutuksena, koska sen pitää tapahtua huomattavasti nopeammin kuin yhden konekäskyn suoritusaika. Massamuistin ja pilvipalvelimien tiedon tarkistus voidaan hyvin tehdä ohjelmallisesti, koska niiden käyttö on joka tapauksessa hidasta. Jos toteutus on laitteistolla, se pitää tehdä niin nopeasti, että se ei hidasta konekäskyjen suoritusnopeutta. 


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
