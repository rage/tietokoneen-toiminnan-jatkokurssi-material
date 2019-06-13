---
path: '/luku-7/2-tiedon-muuttumattomuus'
title: 'Tiedon muuttumattomuuden turvaaminen'
hidden: false
---


<div>
<lead>Käymme ???</lead>
</div>

## Tiedon muuttumattomuuden turvaamisen pääperiaatteet
Tässä osiossa tarkastelemme perusmenetelmiä, joilla voidaan valvoa tiedon muuttumattomuutta tietokonejärjestelmissä. Järjestelmään tallennettu tai siellä siirrettävä tieto voi muuttua esimerkiksi laitteistovian, satunnaisen avaruudesta tulleen hiukkasen tai tahallisen _tietoturvahyökkäyksen_ vuoksi. Syystä tai toisesta, järjestelmässä oleva tieto on muuttunut virheelliseksi.

Lähtökohta riittävän hyvän tiedon muuttumattomuuden takaamiselle on hyväksyä se, että virheitä tapahtuu. Perusidea virheiden havaitsemiselle on ottaa mukaan ylimääräisiä bittejä, joiden avulla virhe voidaan havaita ja ehkä jopa korjata. Käytännössä tämä tarkoittaa sitä, että rekistereihin ja muistipiireihin laitetaan ylimääräisiä bittejä ja tiedonsiirtoväyliin ylimääräisiä johtimia. Näiden lisäksi virheen havaitseva koodi pitää myöskin toteuttaa ja sen voi tehdä joko suoraan laitteistolla tai erillisillä suoritettavilla ohjelmilla. Jos ajatellaan esimerkiksi muistiväylän suojaamista, niin nopeusvaatimusten vuoksi kaikki tarkistukset tulee tehdä laitteistototeutuksina.

Ylimääräiset bitit ja johtimet vaativat ylimääräistä tilaa ja tarkistusten tekeminen vaatii aikaa. Tiedon muuttumattomuuden suojaamisen kustannus maksetaan siten sekä tilassa että ajassa. 

Se, paljonko olemme valmiita maksamaan järjestelmässä olevan tiedon muuttumattomuudesta, riippuu järjestelmästä. Esimerkiksi kotikoneessa on usein tavallista muistia eikä virheen korjaavaa ([ECC muistia](https://en.wikipedia.org/wiki/ECC_memory)), koska tavallinen muisti on halvempaa. Lääketieteellisen [MRI](https://simple.wikipedia.org/wiki/Magnetic_resonance_imaging)-laitteen muisti taas on ainakin yhden virheen havaitsevaa ja korjaavaa muistia, koska kukaan ei halua liikaa säteilyä satunnaisen avaruushiukkasen vuoksi.

## Tiedon muuttumattomuuden turvausmenetelmien ominaisuudet
Luokittelemme tiedon muuttumattomuuden turvausmenetelmiä useiden ominaisuuksien perusteella. Yleensä kuhunkin käyttöön sopivan menetelmän valinta tapahtuu usean ominaisuuden yhdistelmänä, ottaen huomioon riskien hallinta hyväksytyllä tasolla.

Kuinka monen bitin muuttuminen havaitaan? Menetelmä, joka havaitsee kahden bitin muuttumisen on parempi kuin sellainen, joka havaitsee vain yhden bitin muuttumisen, mutta se on myös kalliimpi toteuttaa. Esimerkiksi, jos virheet ovat satunnaisia ja yhden virheen esiintymis todennäköisyys on P(virhe)&nbsp;=&nbsp;1:1&nbsp;000&nbsp;000, niin kahden virheen yhtäaikaa tapahtumisen todennäköisyys on sama kuin yhden virheen P(virhe) potensssiin 2 eli P(2&nbsp;virhettä)&nbsp;=&nbsp;0:1&nbsp;000&nbsp;0001&nbsp;000&nbsp;000. Pienlentokoneen järjestelmän suunnittelijat voivat hyvin päättää, että riittää varautua yhteen virheeseen kerrallaan, koska kahden samanaikaisen virheen todennäköisyys on niin pieni. Toisaalta, jos kyseessä on suuri matkustajalentokone, niin olisiko parempi varautua myös kahteen samanaikaiseen virheeseen?

Kuinka monen viallista bittiä voidaan korjata? Joissakin tapauksissa riittää, että virhe havaitaan ja raportoidaan, jonka jälkeen jokin ulkopuolinen taho korjaa tilanteen. Esimerkiksi verkkoliikenteessä on tyypillistä, että tietoliikennepaketteja katoaa tai menee rikki matkalla. Jos paketissa on viallisia bittejä, niin niitä on helposti niin monta, että niiden korjaaminen ei kuitenkaan onnistu. On helpompi pyytää lähettäjää lähettämään kyseinen paketti uudelleen ja toivoa parasta. Toisaalta, jos muistipiiri on ECC-tyyppinen, niin sitä voi hyvin käyttää ainakin vähän aikaa, vaikka jokin bitti olisikin rikki. Rikkinäisen bitin tieto voidaan lennossa laskea ylimääräisten virheen korjaavien bittien avulla.

Mikä on virheen kustannus muistitilan tai piirin pinta-alan suhteen? Tämä tarkoittaa yksinkertaisesti sitä, että kuinka paljon ylimääräisiä bittejä tai johtimia tarvitaan (esimerkiksi) 64-bittistä sanaa kohden. Johtimien vetäminen mikropiirin pinnalla voi viedä yllättävän paljon arvokasta pinta-alaa, jolle voisi löytyä muutakin käyttöä - esimerkiksi isompana välimuistina.

Mikä on virheen kustannus ajassa ja tehdäänkö virheiden havaitsemis/korjauslaskelmat laitteistolla vai ohjelmistolla? Tarkiskoodin suorittamismenetelmä määräytyy yleensä suoraan siitä, minkä tason tiedosta on kyse. Suorittimen sisäisen väylän tai muistiväylän tiedonsiirron turvaaminen täytyy tapahtua laitteistototeutuksena, koska tarkistus pitää tehdä huomattavasti nopeammin kuin yhden konekäskyn suoritusajassa. Massamuistin ja pilvipalvelimien tiedon tarkistus voidaan hyvin tehdä ohjelmallisesti, koska niiden käyttö on joka tapauksessa hidasta. 

Esimerkkinä tiedot muuttamattomuuden tarkistamisesta voidaan käyttää henkilötunnusta, vaikka tietoa siinä käsitelläänkin merkkikohtaisesti eikä bitteinä. Henkilötunnus on muotoa 120364-121K, jossa alkuosa "120364" on syntymäaika ilman vuosisataa, välimerkki ´-´ ilmaisee syntymäajan vuosisadan 1900-luku, "121" ilmaisee parittomana lukuna sukupuoleksi miehen ja muutoin uniikin arkistointinumeron tälle henkilölle. Viimeinen merkki ´K´on tarkistusmerkki, jonka arvo saadaan jakamalla edellä oleva 9-numeroinen luku 120364121 luvulla 31 ja koodaamalla jakojäännös sopivasti. Merkki ´K´ kertoo, että jakojäännös on 18. Matemaattisesti voidaan osoittaa, että tämän tarkistusmerkin avulla löydetään ainakin kaikki yhden merkin virheet ja kaikki kahden merkit vaihtumiset. Rakenteellisena puutteena järjestelmässä on, että välimerkin muuttumattomuutta ei valvota lainkaan. Tämän vuoksi kaikkien käytössä olevien henkilötunnusten on pakko erota myös muutoin kuin välimerkin osalta. Tästä taas on seurauksena arkistointinumeroiden loppuminen piakkoin, joten uuden henkilötunnuksen käyttöönotolla alkaa olla kiire. Henkiltunnuksessa havaitaa yhden merkin muuttuminen, mutta virhettä ei voi paikallistaa eikä korjata. Tarkistusmerkin kustannus on 10%, koska 10 datamerkin lisäksi tarvitaan yksi lisämerkki. Tarkistus vaatii jonkin verran laskentaa ja tehdään aina ohjelmallisesti.

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
Bittitasolla yksinkertaisin ja yleinen tarkistusmenetelmä on pariteettibitti. Se on ylimääräinen bitti, jonka avulla tiedon 1-bittien lukumäärästä tehdään parillinen tai pariton. Käytössä sanotaan tuolloin olevan joko _parillinen_ tai _pariton pariteetti_. Esimerkiksi, 32-bittisessä sanassa voidaan varata 31 bittiä datalle ja 1 bitti pariteettibitille. Tietoa talletettaessa pariteettibitin arvo lasketaan ja talletetaan paikalleen. Joka kerta tietoa luettaessa tarkistetaan, että pariteetti on oikein. Jos se ei ole, niin virhe käsitellään esimerkiksi kutsumalla jotain aliohjelmaa tai aiheuttamalla sopiva keskeytys.

```
Esimerkki 15-bittisen datan suojaamisesta parillisella pariteettibitillä,
kun tietoalkio on 16-bittinen. Pariteettibitti on oikean-puoleisin bitti 
eli bitti numero 0.

0111 0001 1110 0100   - pariteettibitti on 0
1010 1111 0010 1101   - pariteettibitti on 1
```

Pariteettibitin kustannustietoalkiota kohden on 1 bitti, joten suuremmilla tietoalkioilla sen suhteellinen osuus on pienempi. 
Pariteettibitin avulla voidaan havaita kaikki yhden bitin virheet, mutta kaikki kahden bitin virheet jäävät havaitsematta. 

```
0111 0001 1110 0000   - bitti nro 2 muuttunut, virheellinen pariteetti
1010 1111 0010 1011   - bitit nro 2 ja 3 muuttuneet, oikea pariteetti
```

Pariteettibitin avulla ei voida mitenkään paikallistaa virhettä, joten virheen mahdollinen korjaus täytyy tehdä ylemmällä tasolla ohjelmistoa jollain muulla tavalla. Pariteettibitti kuitenkin sopii hyvin tilanteisiin, joissa yhden bitin virhe on aika pieni, mutta kahden bitin samanaikainen vikaantuminen on hyvin epätodennäköistä. Tällaisissa tilanteissa kolmen bitin yhtäaikaisen vikaantumisen todennäköisyys on vielä paljon pienempi.

```
P(1 bitin virhe) = 1:1000 0000                 = 1E-6
P(2 bitin virhe) = 1:1000 0000 000 000         = 1E-12
P(1 bitin virhe) = 1:1000 0000 000 000 000 000 = 1E-18
```

## Quizit 7.2   ?????
<!-- Quiz 7.2.?? pariteetti etc -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>


## Hamming-etäisyys ja Hamming-koodi
[Richard Hamming](https://en.wikipedia.org/wiki/Richard_Hamming) oli tietojenkäsittelytieteen pioneereja. Ennen tietojenkäsittelyyn liittyvää uraansa hän osallistui Manhattan-projektissa atomipommin kehitystyöhön. Vuonna 1945 hän mm. tarkasti laskelmia siitä, tuhoaisiko atomipommi maapallon koko ilmakehän vai ei. Hänen mielestään laskelmat oli tehty oikein, mutta hän ollut varma kaikkien oletusten paikkansapitävyydestä. Sodan jälkeen hän siirtyi [Bell Labs](https://en.wikipedia.org/wiki/Bell_Labs)'iin ja työskenteli osan aikaa samassa työhuoneessa informaatiotieteen isäksi kutsutun [Claude Shannonin](https://en.wikipedia.org/wiki/Claude_Shannon) kanssa.

### Hamming-etäisyys
Hamming tutki 1950-luvulla koodatun tiedon muuttumattomuutta eri koodijärjestelmissä. Hän määritteli _Hamming-etäisyydeksi_ niiden bittien lukumäärän, jonka mukaisen määrän bittejä täytyy muuttua, jotta jokin laillinen merkki muuttuu toiseksi saman koodijärjestelmän lailliseksi merkiksi. Mitä isompi Hamming-etäisyys tietyssä koodausjärjestelmässä on, sitä parempi. Jos virheitä (bittien muuttumisia) tapahtuu vähemmän kuin Hamming-etäisyyden verran, niin tuloksena on aina virheelliseksi havaittava tietoalkio.

```
7-bittinen ASCII-merkistö

'A' = 0x41 =  100 0001 
'B' = 0x42 =  100 0010   Hamming-etäisyys (A,B) = 2
'C' = 0x43 =  100 0011   Hamming-etäisyys (B,C) = 1
```

Koodijärjestelmän Hamming-etäisyys on pienin Hamming-etäisyys kyseisen järjestelmän merkkien välillä. Edellisen esimerkin ASCII-koodiston Hamming-etäisyys on siten yksi. Tämä tarkoittaa, että yhden bitin virheet voivat helposti jäädä huomaamatta. Esimerkiksi, merkin 'B' bitin 0 muuttuminen nollasta ykköseksi muuttaa sen merkiksi 'C', eikä virhettä voida mitenkään havaita.

Jos 7-bittiseen ASCII-koodistoon lisätään pariteetti-bitti, niin koodijärjestelmän Hamming-etäisyys kasvaa kahteen. Nyt kaikki yhden bitin virheet havaitaan ja järjestelmä on paljon turvallisempi. Jos merkin 'B' bitti 0 muuttuu ykkösestä nollaksi, niin virhe havaittaisiin nyt siitä, että pariteettibitti on väärin.

```
7-bittinen ASCII-merkistö + pariteettibitti (bitti 7)
Parillinen pariteetti

'A' = 0x41 = 0100 0001 
'B' = 0x42 = 0100 0010   Hamming-etäisyys (A,B) = 3
'C' = 0x43 = 1100 0011   Hamming-etäisyys (B,C) = 2
```

### Hamming-koodi
Hamming-koodissa data-bittien joukkoon lisätään useita pariteetti-bittejä, joiden avulla yhden bitin virheet voidaan paikallistaa ja sen jälkeen korjata.  Esimerkiksi nyt myytävissä virheenkorjaavissa [ECC-muistipiireissä](https://en.wikipedia.org/wiki/ECC_memory) virheenkorjaus useimmiten edelleen perustuu Hamming-koodiin, vaikka myös muita menetelmiä on käytössä.

Hamming-koodin perusidea on jakaa data-bitit erilaisiin ryhmiin (pariteettiluokkiin) sillä tavoin, että jokainen databitti kuuluu uniikkiin joukkoon näitä ryhmiä. Jokaisella ryhmällä on oma pariteettibittinsä. Jos joku bitti muuttuu, niin virheellisen bitin sijainti voidaan päätellä virheellisistä pariteettibiteistä.  

#### Hamming(7,4) esimerkki
Tyypillinen yksinkertainen esimerkki Hamming-koodista on [Hamming(7,4)](https://en.wikipedia.org/wiki/Hamming(7,4)), jossa seitsemästä bitistä vain neljä on data-bittejä ja niitä vartioi kolme pariteettibittiä. 

<!-- kuva: ch-7-2-Hamming-7-4  -->

![Hamming(7,4) esimerkki, jossa 7 tietobitistä 4 kappaletta on databittejä ja 3 pariteettibittejä. Kuvassa on neljä osaa: (a), (b), (c) ja (d). Osassa (a) on databitit a, b, c ja d, joiden arvot ovat a=0, b=1, c=1 ja d=0. Bitti b on keskellä, bitti a on bitin b vasemmalla puolella, bitti c on bitin b yläpuolella oikealla ja bitti d on bitin b alapuolella oikealla. Bitit a, b ja c kuuluvat pariteettiryhmään A, bitit a, b ja d ryhmään B sekä bitit b, c ja d ryhmään C. Osassa (b) ovat myös ryhmien parilliset pariteettibitit mukana: A=0, B=1 ja C=0. Ryhmät on piirretty ympyröinä, joihon kuuluvat kunkin ryhmän data- ja pariteettibitit. Osassa (c) databitti d on vaihtunut virheelliseen arvoon 1, jolloin ryhmien B ja C pariteettibitit B=1 ja C=0 ovat väärin. Osassa (d) databitti d on korjattu oikeaksi arvoon 0 ja kaikki pariteettibitit ovat taas oikein.](./ch-7-2-Hamming-7-4.svg)
<div>
<illustrations motive="ch-7-2-Hamming-7-4"></illustrations>
</div>

Lähtötilanteessa (a) on merkittynä databittien arvot ja pariteettiluokat. Huomaa, että jokainen databitti kuuluu uniikkiin joukkoon pariteettiluokkia (A, B ja C). Esimerkiksi vasemmanpuolimmainen databitti kuuluu ryhmiin A ja B, mutta ei ryhmään C. Tällainen ryhmiin kuuluminen ei päde millekään muulle bitille. 

Jokaiselle pariteettiluokalle on oma pariteettibittinsä. Tilanne (b) näyttää kunkin pariteettibitin arvon, parillista pariteettia käyttäen.

Ajatellaan nyt, että yksi data-biteistä vaihtuu virheelliseksi, jolloin tilanne on kohdan (c) mukainen. Kyseinen databitti oikealla alhaalla kuuluu pariteettiluokkiin B ja C, joten niiden pariteettibitit ovat virheellisiä. 

Virheen korjaus tapahtuu useassa vaiheessa. Ensinnäkin, jokin pariteettibiteistä on väärin, joten jossakin täytyy olla virhe. Seuraavaksi havaitaan virheen olevan pariteettiluokissa B ja C, mutta ei luokassa A. Vain yksi bitti täyttää nämä ehdot, joten virheellisen bitin täytyy olla oikealla alhaalla oleva databitti. Lopuksi virheellinen bitti _käännetään_ (flipataan) kohdan (d) mukaisesti toisin päin, jolloin sen arvo tulee korjatuksi. Binäärijärjestelmä on tässä tosi kätevä, kun virheelliselle binääriarvolle on vain yksi oikea vaihtoehto. Jos desimaalinumeron tiedettäisiin olevan väärin, niin silti olisi jäljellä yhdeksän muuta vaihtoehtoa.

Entäpä jo virhe onkin pariteettibitissä, eikä databitissä? Ei huolta, Hamming-koodi toimii myös siinä tapauksessa. Esimerkiksi, jos ryhmän A pariteettibitti (0) vaihtuu ykköseksi, niin silloin ryhmän A pariteettibitti on väärin ja muiden ryhmien pariteettibitit ovat oikein. Ainoa bitti, joka kuuluu ryhmään A mutta ei ryhmiin B tai C, on ryhmän A pariteettibitti. Virhe on näin paikallistettu ja voidaan korjata.

Esimerkin Hamming-koodin kustannut on aika korkea. Lähes puolet (3/7 = 43%) biteistä on pariteettibittejä. Lisäksi vaatii aika paljon laskenta-aikaa asettaa pariteettibitit paikalleen ja tarkistaa niiden oikeellisuus. Todellisuudessa käytettävä Hamming-koodi yksinkertaisuudessaan vielä nerokkaampi ja skaalautuu hyvin myös suurempien data-alkioden virheenkorjaukseen. Virheellisen bitin sijainnin päättely tapahtuu yksinkertaisen yhteenlaskun avulla.

#### Virheen korjaava Hamming-koodi
Hamming-koodissa pariteettiluokat määritellään ovelasti ja sillä tavoin, että ryhmät ovat erikokoisia. Ensinnäkin on huomattava, että bitit numeroidaan (esimerkiksi oikealta päin) alkaen ykkösestä (ei nollasta, kuten yleensä bittien numeroinnin kanssa on). Seuraavaksi tarkastellaan bitin numeron binääriesitystä.  

```
Bitin      Numeron        
numero     binääriesitys  

1          001
2          010
3          011
4          100
5          101
6          110
7          111
...                 ...
```

Kukin bitti kuuluu pariteettijoukkoon i, jos bitin numeron binääriesityksessä i:nnes bitti oikealta on 1. Äskeisessä esimerkissä pariteettijoukkoon 1 kuuluvat siten bitit 1, 3, 5 ja 7. Pariteettiryhmään 2 kuuluvat bitit 2, 3, 6 ja 7. Pariteettijoukkoonn 3 kuuluvat bitit 4, 5, 6 ja 7. Toisin päin katsottuna, bitti 3 kuuluu pariteettiluokkiin 1 ja 2, mutta ei pariteettiluokkaan 3. Bitti 7 kuuluu kaikkiin pariteettijoukkoon 1, 2 ja 3. Jokainen bitti kuuluu erilaiseen joukkoon pariteettijoukkoja, koska kunkin bitin numeron binääriesitys on uniikki.

Lopuksi määritellään, että kaikki bitit, joiden numero on kakkosen potenssi, ovat pariteettibittejä. Näin jokaiseen pariteettijoukkoon saadaan yksi pariteettibitti.

Esimerkiksi, 7-bittisellä tietoalkiolla bitit 1, 2 ja 4 ovat pariteettibittejä, jotka määrittelevät kukin oman pariteettijoukkonsa. Bitti 1 on pariteettijoukon 1 pariteettibitti, bitti 2 pariteettijoukon 2 pariteettibitti, jne. Vastaavasti 63-bittisellä tietoalkiolla bitit 1, 2, 4, 8, 16 ja 32 ovat pariteettibittejä ja käytössä on yhteensä 6 pariteettijoukkoa.

Jos tarvitsemme 32 databittiä, niin niitä turvaamaan tarvitaan 6 pariteettibittiä (bitit 1, 2, 4, 8, 16 ja 32). Varsinaisessa tietoalkiossa pariteettibitit ovat databittien välissä omilla paikoillaan. Tietoa käsitellessä tietoalkiosta käytetään vain databittejä, mutta tiedon muuttumattomuuden varmistettaessa käytetään kaikkia bittejä.

Yhden virheellisen bitin paikallistaminen tapahtuu kuten aikaisemmin esitettiin, tutkimalla ensin mitkä paritettibitit ovat väärin. Käytämme tässä esimerkkinä 7-bittistä tietoalkiota 100&nbsp;1100, jossa on siis neljän bitin data 1001 ja kolme pariteettibittiä (bitit numero 1, 2 ja 4). Käytössä on parillinen pariteetti.

```
                Alkuperäinen   Virheellinen  Korjattu

Tietoalkio:     100 1100       110 1100      100 1100 
Bitin numero:   765 4321       765 4321      765 4321

```

Esimerkissä bitti numero 6 on kääntynyt virheelliseksi. Bitti 6 kuuluu pariteettijoukkoihin 2 ja 4, joten pariteettibitit 2 ja 4 ovat nyt väärin. Virheen olemassaolo havaitaan jälleen siitä, että jokin pariteettibitti on väärin. Virhe paikallistetaan laskemalla yhteen virheen indikoivien pariteettijoukkojen numerot, eli tässä tapauksessa 2+4=6. Virhe korjataan kääntämällä bitti 6. Lopuksi tarkistetaan vielä, että kaikki pariteettibitit ovat nyt oikein. Jos ne eivät ole, niin virheitä oli useampi ja peli on menetetty. 

Entäpä, jos virhe onkin vain pariteettibitissä? Se ei haittaa, pariteettibitti sisältyy vain yhteen pariteettijoukkoon ja identifioituu aivan oikein. 

Toisaalta, voi olla, että useamman bitin virheitä ei edes havaita alkuaankaan. Esimerkiksi, jos edellisen esimerkin tietoalkiossa 100&nbsp;1100 kaksi bittiä (bitit 1 ja 6) kääntyvät virheellisiksi (tietoalkioksi 110&nbsp;1101), niin kaikki pariteettibitit ovat väärin. Sen mukaisesti virheelliseksi bitiksi lasketaan 1+2+4=7 eli bitti 7 on muka virheellinen. Kun se käännetään vielä ympäri, saadaan tietoalkioksi 010&nbsp;1101. Siinä ei ole pariteettivirheitä, mutta sen sijaan 3 virheellistä bittiä. Aina ei voi voittaa!

```
                Alkuperäinen   Virheellinen    Korjattu
                0 virhettä     2 virhettä      3 virhettä
                
Tietoalkio:     100 1100       110 1101        010 1101 
Bitin numero:   765 4321       765 4321        765 4321

```

Hamming-koodin tilakustannus on sitä pienempi, mitä suuremmasta tietoalkiosta on kyse, koska vain kakkosen potenssin numeroiset bitit ovat pariteettibittejä. Esimerkiksi, 1024 databitin turvaamiseen tarvitaan vain 10 ylimääräistä pariteettibittiä. 

Hamming-koodin aikakustannus vaihtelee sen mukaan, toteutetaanko tiedon muuttumattomuuden tarkistus laitteistolla vai ohjelmistolla. Jos Hamming-koodia käytetään muistipiirin tai väylän suojaamiseen, niin toteutus täytyy tehdä laitteistolla, koska toteutuksen täytyy olla paljon nopeampi kuin yhden konekäskyn suoritusaika. Esimerkiksi ECC-muistipiiriä käytettäessä muistipiiri laskee ja sijoittaa pariteettibitit paikalleen jokaisen muistiinkirjoituksen yhdessä. Vastaavasti muistia luettaessa muistipiiri tarkistaa luetun tiedon muuttumattomuuden suoraan laitteistolla, ennen kuin se antaa tiedon väylää pitkin eteenpäin. Jos Hamming-koodi toteutetaan ohjelmistolla, se vaatii jonkin verran konekäskyjä bittimanipulaatioiden toteuttamiseksi.Se on työlästä puuhaa, mutta ei kovin monimutkaista.

Käytännössä pelkkä virheen paikallistaminen ja korjaaminen ei tietenkään riitä. Se on vain tilapäinen lääke havaittuun virhetilanteeseen. Virheistä täytyy pitää kirjaa. Jos virhe toistuu saman muistipiirin kohdalla usein, niin ilmeisesti muistipiirissä on vika, joka pitää korjata jollain tavain. Useimmiten se tarkoittaa muistipiirin vaihtamista uuteen. Jos vika on muistiväylässä, sen korjaaminen on vielä hankalampaa ja voi vaatia koko laitteiston uusimista.

Hamming-koodista on useita laajennuksia. Esimerkiksi lisäämällä pariteettibitti 0 voidaan havaita kaikki kahden bitin virheet, mutta niitä ei voi korjata. Lisäämällä vielä enemmän pariteettibittejä pystytään korjaamaan myös kaikki kahden bitin virheet, jne. Sopiva tiedon muuttumattomuuden suojaustaso määritellään tapauskohtaisesti sen mukaan kuinka todennäköisiä virheet ovat ja kuinka suuret kustannukset havaitsemattomista (tai ei-korjattavissa olevista) virheistä aiheutuu.


## Quizit 7.2  - Hamming
<!-- Quiz 7.2.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>

## Cyclic Redundancy Code (CRC)
jkjkjkjkj

## Laitteiden monistaminen
???
