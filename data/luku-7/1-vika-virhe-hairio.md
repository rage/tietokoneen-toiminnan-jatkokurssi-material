---
path: '/luku-7/1-vika-virhe-hairio'
title: 'Vika, virhe ja häiriö'
hidden: false
---

<div>
<lead>Kaikki tieto ?????.</lead>
</div>

## Virheen käsite
Olisi tietenkin mukavaa, jos voisimme aina luottaa tietokoneisiin. Tämä tarkoittaa, että kaikki ohjelmat toimisivat aina oikein ja että tietokoneet antaisivat aina oikean tuloksen käyttäjälle. Valitettavasti emme ole lähelläkään tällaista ideaalitilaa. Vaikka pääsisimme yhteysymmärrykseen filosofisista käsitteistä "toimii oikein" ja "tulos on totta", tietokonejärjestelmien on silti vaikea aina tuottaa oikea lopputulos.

Suurten ohjelmistojen tekeminen on vaikeata, eikä meillä yleensä ole tarvittavia resursseja kaikkien ohjelmointivirheiden välttämiseksi. Useassa tapauksessa se ole edes tarkoituksenmukaista, koska järjestelmien täytyy valmistua järkevissä aikarajoissa ja budjeteissa. Joissakin tapauksissa ohjelmia voi suunnitella toimimaan oikein annettujen speksien mukaisesti, tai voimme jopa todistaa, että ne toimivat oikein annettujen speksien mukaisesti. Emme kuitenkaan käsittele tällä kurssilla ohjelmien testaamista tai niiden toimivuuden oikeaksi todistamista.

Yleisesti ottaen tiedon oikeellisuutta ei voida tarkistaa. Jos muuttujassa X on talletettu Villen syntymävuodeksi 1973, niin ohjelma vain uskoo sen eikä yritäkään tarkistaa sitä mitenkään. Toisaalta, jos jokin virhe muuttaa muuttujan X arvoksi 1975, niin se voidaan ehkä havaita ja virhe ehkä jopa korjata! Tällaisen virheen voisi aiheuttaa esimerkiksi viallinen muistipiiri, johon bitti nro 1 (toinen bitti oikealta) tallentuu aina bittinä 1. Toinen syy virheeseen voisi olla, että avaruudesta on saapunut jokin alkeishiukkanen, joka on flipannut (kääntänyt) tuon saman bitin toisin päin. 

Muistipiissä oleva vika on pysyvää tyyppiä ja sen voi korjata vain vaihtamalla muistipiirin. Toisaalta, joissakin muistipiireissä on varabittejä auton vararenkaan tavoin, jolloin järjestelmä pystyy vian havaitessaan ottamaan jatkossa tuon varabitin käyttöön bitin numero 1 asemesta.

Avaruudesta tulleen alkeishiukkasen aiheuttama virhe on ohimenevää (transienttia) tyyppiä, eikä järjestelmää pidä sen vuoksi korjata millään tavalla. Olisi tietenkin mukavaa, jos satunnaisesti syntynyt virhe havaittaisiin ja ehkä jopa korjattaisiin.

## Vika, virhe ja häiriö
Tietokonejärjestelmissä erilaisten virhetilanteiden käsittely perustuu käsitteisiin _vika_, _virhe_ ja _häiriö_. "Vika" on joko ohjelmistossa tai laitteistossa oleva rakenteellinen vika, joka voi suoritusaikana aiheuttaa "virheen" ohjelman suorituksessa tai sen käyttämässä datassa. Joissakin tapauksissa tämä virhe voi sitten aiheuttaa "häiriön" järjestelmään.


<!-- Note: Rillit huurussa -->

<text-box variant="example" name="Vika, virhe häiriö Rillit huurussa -sarjassa">

Tv-sarjassa [Rillit huurussa](https://fi.wikipedia.org/wiki/Rillit_huurussa) Penny liukastuu ammeessa ja pyytää Sheldonia viemään hänet ensiapuun. Kun lääkäri kysyy Pennyltä, että mikä on vialla, ja Penny vastaa "liukastuneensa ammeessa". Sheldon kuitenkin ymmärtää asiat "paremmin" ja kertoo lääkärille, että varsinainen vika on siinä, että Pennyllä ei ole liukuestemattoa ammeessaan. Pennyn liukastuminen oli tästä viasta aiheutunut virhe ja käden murtuma virheen aiheuttama häiriö.  Sheldonin selitys ei oikeastaan auttanut tässätilanteessa paljoakaan, vaikka olikin ehkä teknisesti oikein.

</text-box>

Kaikki viat eivät ole vaarallisia. Esimerkiksi voi olla, että jossakin koodinpätkässä on vika, mutta kyseistä koodia ei tulla koskaan suorittamaan. Toisaalta, kaikki virheetkään eivät ole merkittäviä. Esimerkiksi, jos tietokonepelissä Mörri-ötökkä jää piirtämättä näytölle vähäksi aikaa, niin pelaajan hahmo voi kuolla Mörrin yllätyshyökkäyksessä. Toisaalta, joskus tämäkin voi olla hyvinkin tärkeätä, ainakin jos kyseessä on suurista palkinnoista pelattava peliturnaus. 

Jotkut virheet taas ovat hyvin vaarallisia. On tapauksia, jossa ohjelmointivirheen vuoksi [MRI](https://en.wikipedia.org/wiki/Magnetic_resonance_imaging)-laite on antanut potilaille liian paljon säteilyä, tai Marsiin laskeutuva luotain [tuhoutuu](https://en.wikipedia.org/wiki/Mars_Polar_Lander).  

Olisi hyvä, jos kaikki ihmishenkiä uhkaavat tai suuria taloudellisia tappioita aiheuttavat häiriöt saataisiin kuriin. NASA:lla oli [avaruussukkulan](https://fi.wikipedia.org/wiki/Avaruussukkula) ohjelmiston kehittämisessä selkeä prosessi vakavien häiriöiden minimoimiseksi. Joka kerta, kun jokin järjestelmähäiriö ilmeni, paikallistettiin ensin sen aiheuttanut virhe järjestelmässä ja sitten virheen aiheuttanut vika. 

Useimmissa tapauksissa virhe löytyi ohjelmakoodista. Kaikki virheet luokiteltiin niiden mahdollisesti aiheuttaman häiriön perusteella luokkiin 1-5. Luokan 1 virheet olivat merkityksettömiä, eivätkä aiheuttaneet mitään lisätoimia. Luokan 5 virheet olivat sellaisia, että  kyseisen koodinpätkän suoritus avaruuslennon aikana olisi johtanut sukkulan menetykseen. Luokan 5 virheitä löytyi joka vuosi.

Yleisin vika oli ohjelmoijien puutteellinen koulutus. Esimerkiksi, ohjelmoijat ei olleet hoksanneet, että heidän kirjoittamassa koodissa olisi samanaikaisuudesta aiheutuvia ongelmia. Tämän häiriön aiheuttaneen virheen lisäksi koko koodi käytiin läpi, josko sieltä löytyisi saman tyyppisiä virheitä. Yleensä löytyi ja myös nämä ohjelmistotuotantotiimit pääsivät lisäkoulutukseen. 

?????????


## Quizit 7.1
<!-- Quiz 7.1.?? -->
<div><quiznator id="5caf0493fd9fd71425c6d6c6"></quiznator></div>
