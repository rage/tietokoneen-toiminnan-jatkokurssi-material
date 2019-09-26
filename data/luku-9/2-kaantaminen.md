---
path: '/luku-9/2-kaantaminen'
title: 'Kääntäminen'
hidden: false
---

<div>
<lead>Tässä aliluvussa esittelemme pääpiirteet, joilla käännösyksikkö käännetään objektimoduuliksi.</lead>
</div>

## Objektimoduulin rakenne
Käännöksessä luodaan objektimoduuli, joka sitten myöhemmin linkitetään muihin moduuleihin. Objektimoduulissa on koodi konekielisessä muodossa ja kaikki moduulin sisäiset viitteet jo oikein, mutta vain tämän objektimoduulin omassa (pienehkössä) osoiteavaruudessa.

```
käännösyksikkö            osoite    data tai konekäskyn kentät
                                   opcode Rj Ri M Addr
x   dc 5           -->     0:                        5
y   dc 7           -->     1:                        7
    load r1, x     -->     2:           2  1  0 1    0
    add  r1, y     -->     3:          17  1  0 1    1
    svc  sp, =halt -->     4:    
```

## Assembler kääntäminen
????

## Korkean tason kielen kääntäminen
????

## Quizit 9.2
<!-- Quiz 9.2.?? -->

<div><quiz id="4b44871b-2fe7-4fe1-978c-267d5bf8de80"></quiz></div>
