---
path: '/luku-7/1-vika-virhe-hairio'
title: 'Vika, virhe ja häiriö'
hidden: false
---

<div>
<lead>Kaikki tieto ?????.</lead>
</div>

## Virheen käsite
Oli tietenkin mukavaa, jos voisimme aina luottaa tietokoneisiin. Tämä tarkoittaa, että kaikki ohjelmat toimisivat aina oikein ja että tietokoneet antaisivat aina oikean tuloksen käyttäjälle. Valitettavsti emme ole lähelläkään tällaista ideaalitilaa. Vaikka pääsisimme yhteysymmärrykseen filosofisista käsitteistä "toimii oikein" ja "tulos on totta", tietokonejärjestelmien on silti vaikea aina tuottaa oikea lopputulos.

Suurten ohjelmistojen tekeminen on vaikeata, eikä meillä yleensä ole tarvittavia resursseja kaikkien ohjelmointivirheiden välttämiseksi. Useassa tapauksessa se ole edes tarkoituksenmukaista, koska järjestelmien täytyy valmistua järkevissä aikarajoissa ja budjeteissa. Joissakin tapauksissa ohjelmia voi suunnitella toimimaan oikein annettujen speksien mukaisesti, tai jota todistamaan, että ne toimivat oikein annettujen speksien mukaisesti. Emme käsittele tällä kurssilla enempää ohjelmien testaamista tai niiden toimivuuden oikeaksi todistamista.

Yleisesti ottaen tiedon oikeellisuutta ei voida tarkistaa. Jos muuttujassa X on talletettu Villen syntymävuodeksi 1973, niin ohjelma vain uskoo sen eikä yritäkään tarkistaa sitä mitenkään. Toisaalta, jos jokin virhe muuttaa muuttujan X arvoksi 1975, niin se voidaan ehkä havaita ja virhe ehkä jopa korjata! Tällaisen virheen voisi aiheuttaa esimerkiksi viallinen muistipiiri, johon bitti nro 1 (toinen bitti oikealta) tallettuu aina bittinä 1. Toinen syy virheeseen voisi olla, että avaruudesta on saapunut jokin alkeishiukkanen, joka on flipannut (kääntänyt) tuon saman bitin toisin päin. 

Muistipiissä oleva vika on pysyvää tyyppiä ja sen voi korjata vain vaihtamalla muistipiirin. Toisaalta, joissakin muistipiireissä on varabittejä auton vararenkaan tavoin, jolloin järjestelmä pystyy virheen havaitessaan ottamaan jatkossa tuon varabitin käyttöön bitin numero 1 asemesta.

Avaruudesta tulleen alkeishiukkasen aiheuttama virhe on ohimenevää (transienttia) tyyppiä, eikä sen järjestelmää pidä korjata millään tavalla. Olisi tietenkin mukavaa, jos virhe havaittaisiin ja ehkä jopa korjattaisiin.

## Vika, virhe ja häiriö
Tietokonejärjestelmissä erilaisten virhetilanteiden käsittely perustuu käsitteisiin _vika_, _virhe_ ja _häiriö_. "Vika" on joko ohjelmistossa tai laitteistossa oleva, joka voi suoritusaikana aiheuttaa "virheen" ohjelman suorituksessa tai sen käyttämässä datassa. Joissakin tapauksissa tämä virhe voi sitten aiheuttaa "häiriön" järjestelmään.

Kaikki viat eivät ole vaarallisia. Esimerkiksi voi olla, että jossakin koodinpätkässä on vika, mutta kyseistä koodia ei tulla koskaan suorittamaan. Toisaalta, kaikki virheetkään eivät ole merkittäviä. Esimerkiksi, jos tietokonepelissä Mörri-ötökältä jää piirtämättä näytölle vähäksi aikaa, niin pelaajan hahmo voi kuolla Mörrin yllätyshyökkäysessä. Toisaalta, joskus tämäkin voi olla hyvinkin tärkeätä. 
Jotkut virheet taas ovat hyvin vaarallisia. On tapauksia, jossa ohjelmointivirheen vuoksi [MRI](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging)-laite on antanut potilaille liian paljon säteilyä, tai Marsiin laskeutuva luotain tuhoutuu.  

<!-- Note: Rillit huurussa -->

<text-box variant="example" name="Milli-, mikro-, nano- ja pikosekunti">

Sekunti = 1 000 ms = 1 000 000 µs = 1 000 000 000 ns = 1 000 000 000 000 ps.
<br>
Millisekunti = 1 ms = 0.001 sekuntia = 1 000 µs = 1 000 000 000 ps.
<br>
Mikrosekunti = 1 µs = 0.000 001 sekuntia = 1 000 ns = 1 000 000 ps.
<br>
Nanosekunti = 1 ns = 0.000 000 001 sekuntia = 1 000 ps.
<br>
Pikosekunti = 1 ps = 0.000 000 000 001 sekuntia."

</text-box>

Olisi hyvä, jos kaikki ihmishenkiä uhkaavat tai suuria taloudellisia tappioita aiheuttavat häiriöt saataisiin kuriin. NASA:lla oli [avaruussukkulan](https://fi.wikipedia.org/wiki/Avaruussukkula) aikaan selkeä prosessi vakavien häiriöiden minimoimiseksi. Joka kerta, kun jokin järjestelmähäiriö ilmeni, paikallistettiin ensin sen aiheuttanut virhe järjestelmässä ja sitten sen jälkeen virheen aiheuttanut vika. 

Useimmissa tapauksissa virhe löytyi ohjelmakoodista. Kaikki virheet luokiteltiin niiden mahdollisesti aiheuttaman häiriön perusteella luokkiin 1-5. Luokan 1 virheet olivat merkityksettömiä, eivätkä aiheuttaneet mitään lisätoimia. Luokan 5 virheet olivat sellaisia, että  kyseisen koodinpätkän suoritus avaruuslennon aikana olisi johtanut sukkulan menetykseen. Luokan 5 virheitä löytyi joka vuosi.

Yleisin vika oli ohjelmoijien puutteellinen koulutus. Esimerkiksi, ohjelmoijat ei olleet hoksanneet, että heidän kirjoittamassa koodissa olisi samanaikaisuudesta aiheutuvia ongelmia. Tämän häiriön aiheuttaneen virheen lisäksi koko koodi käytiin läpi, josko sieltä löytyisi saman tyyppisiä virheitä. Yleensä löytyi ja myös nämä ohjelmistotuotantotiimit pääsivät lisäkoulutukseen. 




## Quizit 7.1
<!-- Quiz 7.1.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
