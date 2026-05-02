# Agenttiohjeistus: oppimistyökalun laajentaminen fysiikan aihealueisiin

## Tavoite

Laajenna nykyinen oppimistyökalu yläasteen 7–9 fysiikan kokonaisuudeksi. Sovelluksessa on jo aaltoliikkeen visualisointi. Lisää siihen uudet aihealueet, lyhyet teoriakuvaukset ja jokaiselle aiheelle visuaalinen testaustyökalu, jolla oppilas voi kokeilla ilmiötä muuttamalla arvoja ja tarkkailemalla vaikutuksia.

Tee toteutus nykyiseen projektiin mahdollisimman kevyesti. Nykyinen sovellus on yhden `index.html`-tiedoston HTML/CSS/JavaScript-sovellus, joka julkaistaan GitHub Pagesiin. Älä lisää raskaita kirjastoja, bundleria tai palvelinpuolen koodia, ellei se ole välttämätöntä.

## Kohderyhmä ja pedagoginen taso

Sisältö on tarkoitettu yläasteen luokille 7–9.

Pidä kieli selkeänä, konkreettisena ja lyhyenä. Vältä lukiotason matemaattista käsittelyä. Kaavoja voi käyttää vain silloin, kun ne ovat yläasteelle sopivia ja ilmiön ymmärtämisen kannalta hyödyllisiä. Selitä suureet aina sanallisesti.

Hyvä tyyli:
- “Taajuus kertoo, montako värähdystä tapahtuu yhdessä sekunnissa.”
- “Mitä lyhyempi aallonpituus on, sitä tiheämmin aallonharjat ovat.”
- “Kokonaisheijastuminen voi tapahtua, kun valo tulee tiheämmästä aineesta harvempaan riittävän vinossa kulmassa.”

Vältä:
- differentiaaliyhtälöitä
- kompleksilukuja
- lukiotason optiikan johdantoja
- liian pitkää teoriaa yhdessä näkymässä

## Nykyinen sovellus

Nykyinen projekti sisältää ainakin:
- `index.html`
- GitHub Pages -julkaisun workflow’n `.github/workflows/deploy-pages.yml`

Nykyinen `index.html` sisältää aaltoliikkeen oppimispolun, canvas-visualisoinnin, säätimet, johdetut suureet, tehtävät, palautteen ja yhteenvedon.

Säilytä olemassa olevan sovelluksen visuaalinen tyyli: pehmeät paneelit, isot pyöristetyt kortit, lämmin taustaväri, canvas-pohjainen havainnollistaminen ja selkeät kontrollikortit.

## Kokonaisrakenne

Muuta sovellus moniaiheiseksi oppimistyökaluksi.

Lisää yläosaan aihevalikko tai sivunavigaatio, josta oppilas voi valita aihealueen:

1. Värähdys- ja aaltoliike
2. Ääni
3. Säteily
4. Valo
5. Peilit ja linssit

Jokaisen aihealueen näkymässä tulee olla:

1. Lyhyt kuvaus aiheesta
2. Tärkeät käsitteet korteissa
3. Visuaalinen testaustyökalu
4. Pieni tutkimustehtävä tai pohdintakysymys
5. Välitön palaute tai ohjaava vinkki
6. Selkeä “nollaa”, “kokeile” tai “näytä ilmiö” -toiminto

## Tekninen toteutustapa

Pidä sovellus edelleen yhdessä `index.html`-tiedostossa, ellei projektissa ole jo käytössä erillistä rakennetta. Rakenna dataohjattu toteutus, jotta uusia aiheita on helppo lisätä.

Suositeltu rakenne JavaScriptiin:

```js
const topics = [
  {
    id: "waves",
    title: "Värähdys- ja aaltoliike",
    intro: "...",
    concepts: [
      { title: "Värähdysliike", text: "..." },
      { title: "Aaltoliike", text: "..." }
    ],
    simulator: {
      type: "wave",
      controls: [...]
    },
    tasks: [...]
  }
];
```

Pidä renderöinti erillään simulaatiologiikasta:
- `renderTopicNav()`
- `renderTopic(topicId)`
- `renderConceptCards(topic)`
- `renderControls(simulator)`
- `drawSimulator(ctx, topic, state)`
- `updateDerivedValues()`
- `checkTaskAnswer()`

Jos nykyisessä koodissa on jo vastaavia funktioita, laajenna niitä rikkomatta olemassa olevaa aaltoliikenäkymää.

## Käyttöliittymävaatimukset

Toteuta selkeä rakenne:

### Hero / otsikkoalue
- Sovelluksen nimi: “Fysiikan ilmiölaboratorio”
- Alaotsikko: “Tutki aaltoja, ääntä, säteilyä, valoa, peilejä ja linssejä visuaalisesti.”
- Näytä valittu aihe ja lyhyt eteneminen.

### Aihevalikko
- Painikkeet kaikille viidelle aihealueelle
- Aktiivinen aihe selkeästi korostettuna
- Toimii myös mobiilissa, esimerkiksi vaakasuunnassa rullaavana painikerivinä

### Teoriakortit
- Lyhyet käsitteet kortteina
- 1–3 virkettä per käsite
- Ei pitkiä kappaleita
- Käytä konkreettisia esimerkkejä

### Testaustyökalu
- Canvas tai SVG, mielellään nykyistä canvas-ratkaisua laajentaen
- Säätimet näkyvät erillisissä korteissa
- Arvojen vaikutus päivittyy heti
- Näytä ilmiön selitys muuttuvana tekstinä

### Tehtävät
- Yksi pieni tehtävä per aihealue riittää ensimmäiseen versioon
- Monivalinta tai “kokeile säätimillä” -tehtävä
- Anna välitön palaute

## Aihealueiden sisältö

### 1. Värähdys- ja aaltoliike

Säilytä nykyinen aaltoliike mukana, mutta tee siitä osa laajempaa aihevalikkoa.

Käsitteet:
- Värähdysliike ja aaltoliike
- Värähtely ja värähdysaika
- Taajuus
- Poikittainen ja pitkittäinen aaltoliike
- Aallonpituus

Lyhyet kuvaukset:

**Värähdysliike ja aaltoliike**  
Värähdysliike on edestakaista liikettä tasapainoaseman ympärillä. Aaltoliikkeessä värähtely etenee paikasta toiseen ja kuljettaa energiaa.

**Värähtely ja värähdysaika**  
Yksi kokonainen edestakainen liike on yksi värähdys. Värähdysaika kertoo, kuinka kauan yhteen värähdykseen kuluu.

**Taajuus**  
Taajuus kertoo, montako värähdystä tapahtuu sekunnissa. Taajuuden yksikkö on hertsi, Hz.

**Poikittainen ja pitkittäinen aaltoliike**  
Poikittaisessa aallossa värähtely on eri suunnassa kuin aallon eteneminen. Pitkittäisessä aallossa värähtely tapahtuu samassa suunnassa kuin eteneminen.

**Aallonpituus**  
Aallonpituus on kahden samanlaisen kohdan, esimerkiksi kahden aallonharjan, välinen matka.

Testaustyökalu:
- Säätimet: amplitudi, taajuus, aallonpituus, vaihe, animaation nopeus
- Lisää valinta: poikittainen / pitkittäinen aalto
- Poikittaisessa näkymässä piirrä siniaalto
- Pitkittäisessä näkymässä piirrä hiukkasjono, jossa tihentymät ja harventumat näkyvät
- Näytä lasketut suureet: värähdysaika `T = 1 / f` ja aallon nopeus `v = f * λ`
- Selitä arvot sanallisesti

Tutkimustehtävä:
“Kasvata taajuutta. Mitä tapahtuu värähdysajalle?”
Oikea palaute:
“Kun taajuus kasvaa, yhteen värähdykseen kuluva aika lyhenee.”

### 2. Ääni

Käsitteet:
- Äänen nopeus
- Äänen voimakkuus ja desibeli
- Ultraääni ja infraääni
- Resonanssi
- Ominaistaajuus

Lyhyet kuvaukset:

**Äänen nopeus**  
Ääni tarvitsee väliaineen, kuten ilman, veden tai kiinteän aineen. Ilmassa ääni kulkee noin 343 m/s huoneenlämpötilassa.

**Äänen voimakkuus ja desibeli**  
Äänen voimakkuus kertoo, kuinka voimakkaalta ääni tuntuu. Desibeli on äänenvoimakkuuden yksikkö.

**Ultraääni ja infraääni**  
Ihminen kuulee suunnilleen taajuudet 20–20 000 Hz. Ultraääni on tätä korkeampaa ääntä ja infraääni matalampaa ääntä.

**Resonanssi**  
Resonanssissa kappale alkaa värähdellä voimakkaasti, kun sitä ärsytetään sen omalla sopivalla taajuudella.

**Ominaistaajuus**  
Ominaistaajuus on taajuus, jolla kappale värähtelee helpoimmin.

Testaustyökalu:
- Näytä ääniaalto ja yksinkertainen “kaiutin”
- Säätimet: taajuus, voimakkuus, väliaine
- Väliainevaihtoehdot: ilma, vesi, teräs
- Näytä äänen nopeus valitussa väliaineessa yksinkertaistettuna:
  - ilma: 343 m/s
  - vesi: 1480 m/s
  - teräs: 5000 m/s
- Näytä aallonpituus laskettuna `λ = v / f`
- Lisää kuuluvuusluokitus:
  - alle 20 Hz: infraääni
  - 20–20 000 Hz: kuultava ääni
  - yli 20 000 Hz: ultraääni
- Lisää desibelisäädin, mutta älä tee todellista ääntä automaattisesti. Näytä vain visuaalinen voimakkuus.

Resonanssin visualisointi:
- Lisää erillinen pieni osio tai tila “resonanssikoe”
- Säätimet: ärsyttävä taajuus ja kappaleen ominaistaajuus
- Kun taajuudet ovat lähellä toisiaan, värähtelyn amplitudi kasvaa selvästi
- Näytä teksti: “Taajuudet ovat lähellä toisiaan: resonanssi voimistaa värähtelyä.”

Tutkimustehtävä:
“Säädä taajuus yli 20 000 hertsin. Mihin luokkaan ääni kuuluu?”
Oikea vastaus: ultraääni.

### 3. Säteily

Käsitteet:
- Sähkömagneettinen säteily
- Hiukkassäteily
- Radioaktiivisuus
- Ionisoiva säteily

Lyhyet kuvaukset:

**Sähkömagneettinen säteily**  
Sähkömagneettista säteilyä ovat esimerkiksi radioaallot, mikroaallot, infrapunasäteily, näkyvä valo, ultraviolettisäteily, röntgensäteily ja gammasäteily.

**Hiukkassäteily**  
Hiukkassäteilyssä energiaa kuljettavat pienet hiukkaset. Esimerkkejä ovat alfa- ja beetasäteily.

**Radioaktiivisuus**  
Radioaktiivinen aine lähettää säteilyä, kun sen atomiytimet muuttuvat toisiksi ytimiksi.

**Ionisoiva säteily**  
Ionisoiva säteily on niin voimakasta, että se voi irrottaa elektroneja aineen atomeista. Siksi se voi olla elävälle kudokselle haitallista.

Testaustyökalu:
- Tee “säteilykartta” tai spektri
- Näytä sähkömagneettisen säteilyn alueet vaakasuorana janana:
  - radioaallot
  - mikroaallot
  - infrapuna
  - näkyvä valo
  - ultravioletti
  - röntgen
  - gamma
- Säätimellä oppilas valitsee säteilyn tyypin tai taajuusalueen
- Näytä:
  - onko kyse ionisoivasta vai ionisoimattomasta säteilystä
  - esimerkki käytöstä
  - varoitus vain silloin, kun aihe on ionisoiva säteily
- Lisää yksinkertainen suojaustyökalu:
  - alfa: paperi pysäyttää
  - beeta: ohut metalli tai muovi vaimentaa
  - gamma: paksu lyijy tai betoni vaimentaa

Älä käytä pelottavaa kieltä. Pidä sävy neutraalina ja opetuksellisena.

Tutkimustehtävä:
“Mitkä spektrin alueet ovat näkyvää valoa energisempiä?”
Hyvä vastaus: ultravioletti, röntgen ja gamma.

### 4. Valo

Käsitteet:
- Valon eteneminen
- Valaisuvoimakkuus
- Valon heijastuminen
- Valon taittuminen
- Kokonaisheijastuminen

Korjaa kirjoitusasu: “valaisuvoimakkuss” → “valaisuvoimakkuus”.

Lyhyet kuvaukset:

**Valon eteneminen**  
Valo etenee suoraviivaisesti tasaisessa aineessa. Siksi varjot voivat olla teräväreunaisia.

**Valaisuvoimakkuus**  
Valaisuvoimakkuus kertoo, kuinka paljon valoa osuu tietylle pinnalle. Sen yksikkö on luksi, lx.

**Valon heijastuminen**  
Heijastumisessa valo kimpoaa pinnasta. Tasaisesta pinnasta valo heijastuu säännöllisesti.

**Valon taittuminen**  
Taittumisessa valon suunta muuttuu, kun valo siirtyy aineesta toiseen, esimerkiksi ilmasta veteen.

**Kokonaisheijastuminen**  
Kokonaisheijastuminen voi tapahtua, kun valo tulee tiheämmästä aineesta harvempaan riittävän vinosti. Silloin valo ei enää taitu ulos, vaan heijastuu takaisin.

Testaustyökalu:
- Näytä valonsäde canvasilla
- Tila: heijastuminen / taittuminen / kokonaisheijastuminen
- Säätimet:
  - tulokulma
  - aine 1
  - aine 2
  - valonlähteen etäisyys tai voimakkuus valaisuvoimakkuutta varten
- Aineiden taitekertoimet yksinkertaistettuna:
  - ilma: 1.00
  - vesi: 1.33
  - lasi: 1.50
- Heijastumisessa näytä, että tulokulma = heijastuskulma
- Taittumisessa käytä Snellin lakia laskennassa, mutta selitä se yläastetasoisesti:
  “Kun valo siirtyy aineesta toiseen, sen suunta voi muuttua.”
- Kokonaisheijastumisessa näytä tilanne, jossa valonsäde heijastuu takaisin
- Valaisuvoimakkuudessa näytä yksinkertaistettu etäisyyden vaikutus:
  kun etäisyys kasvaa, sama valo jakautuu suuremmalle alueelle ja pinta näyttää himmeämmältä

Tutkimustehtävä:
“Siirrä valo lasista ilmaan ja suurenna tulokulmaa. Mitä voi tapahtua?”
Oikea palaute:
“Kun tulokulma on tarpeeksi suuri, voi tapahtua kokonaisheijastuminen.”

### 5. Peilit ja linssit

Käsitteet:
- Tasopeili
- Kovera ja kupera peili
- Kovera ja kupera linssi
- Silmälasit

Lyhyet kuvaukset:

**Tasopeili**  
Tasopeili muodostaa kuvan, joka näyttää olevan peilin takana yhtä kaukana kuin esine on peilin edessä.

**Kovera peili**  
Kovera peili on sisäänpäin kaartuva peili. Se voi koota valonsäteitä kohti polttopistettä.

**Kupera peili**  
Kupera peili on ulospäin kaartuva peili. Se hajottaa valonsäteitä ja näyttää laajemman alueen.

**Kovera linssi**  
Kovera linssi on keskeltä ohuempi kuin reunoilta. Se hajottaa valonsäteitä.

**Kupera linssi**  
Kupera linssi on keskeltä paksumpi kuin reunoilta. Se voi koota valonsäteitä polttopisteeseen.

**Silmälasit**  
Silmälaseissa linssit ohjaavat valoa niin, että kuva muodostuu tarkemmin verkkokalvolle.

Testaustyökalu:
- Tee sädekaavio
- Tila: tasopeili / kovera peili / kupera peili / kovera linssi / kupera linssi / silmälasit
- Säätimet:
  - esineen etäisyys
  - polttoväli
  - linssin tai peilin tyyppi
- Tasopeilissä näytä esine ja virtuaalikuva peilin takana
- Koverassa peilissä näytä valonsäteiden kokoontuminen
- Kuperassa peilissä näytä säteiden hajaantuminen ja jatkeiden kohtaaminen peilin takana
- Kuperassa linssissä näytä valonsäteiden kokoontuminen
- Koverassa linssissä näytä valonsäteiden hajaantuminen
- Silmälasitilassa näytä yksinkertainen silmä ja valonsäteet:
  - likinäköisyys: kuva muodostuisi liian eteen, kovera linssi auttaa
  - kaukonäköisyys: kuva muodostuisi liian taakse, kupera linssi auttaa

Pidä sädekaavio havainnollisena, ei täydellisen optisena laskurina.

Tutkimustehtävä:
“Valitse kupera linssi. Mitä säteille tapahtuu linssin jälkeen?”
Oikea vastaus:
“Säteet taittuvat kohti toisiaan ja voivat kohdata polttopisteessä.”

## Sisältödata: ehdotettu rakenne

Lisää esimerkiksi seuraava tietorakenne ja täydennä se toteutukseen:

```js
const topicDefinitions = [
  {
    id: "waves",
    title: "Värähdys- ja aaltoliike",
    shortTitle: "Aallot",
    intro: "Tutki, miten värähtely etenee aaltona ja miten taajuus, värähdysaika ja aallonpituus liittyvät toisiinsa.",
    simulatorType: "waves",
    concepts: [
      {
        title: "Värähdysliike ja aaltoliike",
        text: "Värähdysliike on edestakaista liikettä tasapainoaseman ympärillä. Aaltoliikkeessä värähtely etenee paikasta toiseen ja kuljettaa energiaa."
      }
    ]
  },
  {
    id: "sound",
    title: "Ääni",
    shortTitle: "Ääni",
    intro: "Tutki ääntä aaltoliikkeenä ja huomaa, miten taajuus, voimakkuus ja väliaine vaikuttavat ääneen.",
    simulatorType: "sound",
    concepts: []
  },
  {
    id: "radiation",
    title: "Säteily",
    shortTitle: "Säteily",
    intro: "Tutki sähkömagneettista säteilyä, hiukkassäteilyä ja sitä, milloin säteily on ionisoivaa.",
    simulatorType: "radiation",
    concepts: []
  },
  {
    id: "light",
    title: "Valo",
    shortTitle: "Valo",
    intro: "Tutki, miten valo etenee, heijastuu ja taittuu eri aineiden rajapinnoilla.",
    simulatorType: "light",
    concepts: []
  },
  {
    id: "mirrors-lenses",
    title: "Peilit ja linssit",
    shortTitle: "Optiikka",
    intro: "Tutki, miten peilit ja linssit ohjaavat valonsäteitä ja muodostavat kuvia.",
    simulatorType: "optics",
    concepts: []
  }
];
```

## Simulaattorien vähimmäisvaatimukset

Toteuta ensimmäisessä versiossa vähintään nämä viisi simulaattorityyppiä:

### `waves`
- Nykyinen aaltosimulaatio toimii edelleen
- Lisää poikittaisen ja pitkittäisen aallon valinta
- Näytä taajuus, värähdysaika, aallonpituus ja aallon nopeus

### `sound`
- Näytä ääniaalto
- Taajuussäädin muuttaa aallon tiheyttä
- Voimakkuussäädin muuttaa amplitudia
- Väliainevalinta muuttaa äänen nopeutta ja aallonpituutta
- Näytä luokitus: infraääni / kuultava ääni / ultraääni
- Lisää resonanssikoe

### `radiation`
- Näytä sähkömagneettisen säteilyn spektri
- Valittu alue korostuu
- Näytä ionisoiva / ionisoimaton
- Näytä hiukkassäteilyn suojausesimerkit

### `light`
- Näytä valonsäde ja rajapinta
- Heijastumistilassa piirrä tulosäde ja heijastunut säde
- Taittumistilassa piirrä taittunut säde
- Kokonaisheijastumistilassa piirrä takaisin heijastuva säde
- Näytä kulmat asteina

### `optics`
- Näytä sädekaavio
- Peili- ja linssityypit valittavissa
- Näytä esine, optinen osa, valonsäteet ja muodostuva kuva tai suunta
- Silmälasitilassa näytä yksinkertainen silmä ja korjaava linssi

## Laskentaohjeet

Pidä laskenta yksinkertaisena ja turvallisena.

### Aallot

```js
const period = 1 / frequency;
const waveSpeed = frequency * wavelength;
```

### Ääni

```js
const speeds = {
  air: 343,
  water: 1480,
  steel: 5000
};

const wavelength = speed / frequency;
```

Luokittelu:

```js
function classifySound(frequency) {
  if (frequency < 20) return "infraääni";
  if (frequency <= 20000) return "kuultava ääni";
  return "ultraääni";
}
```

### Resonanssi

Käytä yksinkertaista havainnollistavaa mallia:

```js
const difference = Math.abs(drivingFrequency - naturalFrequency);
const resonanceStrength = Math.max(0, 1 - difference / 80);
const amplitude = baseAmplitude * (1 + resonanceStrength * 3);
```

### Valon taittuminen

Snellin lakia voi käyttää sisäisessä laskennassa:

```js
const sinTheta2 = (n1 / n2) * Math.sin(theta1);
```

Jos `Math.abs(sinTheta2) > 1`, tapahtuu kokonaisheijastuminen.

Älä nosta Snellin lakia pääsisällöksi. Näytä oppilaalle mieluummin selitys:
“Valon suunta muuttuu, koska valo kulkee eri aineissa eri tavalla.”

### Valaisuvoimakkuus

Käytä yksinkertaistettua mallia:

```js
const illuminance = intensity / (distance * distance);
```

Selitä:
“Kun etäisyys kaksinkertaistuu, sama valo jakautuu laajemmalle alueelle.”

## Saavutettavuus

Toteuta seuraavat:
- Kaikilla painikkeilla selkeät tekstit
- Säätimillä `label` ja näkyvä arvo
- Canvasin vieressä tekstiselitys, joka kertoo, mitä kuvassa tapahtuu
- Värien lisäksi käytä tekstiä ja muotoja
- Mobiilinäkymä toimii ilman vaakasuunnan pakottamista
- Fonttikoko riittävän suuri yläasteikäisille oppilaille

## Laadunvarmistus

Tee muutosten jälkeen seuraavat tarkistukset:

1. Sovellus avautuu ilman JavaScript-virheitä.
2. Nykyinen aaltoliikesimulaatio toimii edelleen.
3. Kaikki viisi aihepainiketta vaihtavat näkymää.
4. Jokaisessa aiheessa näkyy:
   - otsikko
   - lyhyt johdanto
   - käsitteet
   - simulaatio
   - säätimet
   - tutkimustehtävä
5. Säätimien liikuttaminen muuttaa visualisointia heti.
6. Mobiilinäkymässä kortit pinoutuvat siististi.
7. GitHub Pages -julkaisu ei vaadi uutta build-komentoa.
8. Konsolissa ei näy virheitä.
9. Tekstit ovat suomenkielisiä ja yläasteen tasoisia.
10. Laskennalliset arvot eivät näytä `NaN`, `Infinity` tai liian pitkiä desimaaleja.

## Hyväksymiskriteerit

Työ on valmis, kun:

- Oppimistyökalussa on viisi aihealuetta.
- Nykyinen aaltoliike on mukana ensimmäisenä aihealueena.
- Jokaisessa aihealueessa on lyhyt teoriaosuus ja visuaalinen kokeilutyökalu.
- Jokaisessa aihealueessa on vähintään yksi ohjaava tehtävä.
- Sovellus toimii yhdellä HTML-tiedostolla ja voidaan julkaista nykyisellä GitHub Pages -workflow’lla.
- Käyttöliittymä on yhtenäinen nykyisen ulkoasun kanssa.
- Sisältö ei ylitä yläasteen 7–9 fysiikan tasoa.

## Työskentelyohje Codex-agentille

1. Avaa projekti VS Codessa.
2. Tutki nykyinen `index.html` kokonaan ennen muutoksia.
3. Tunnista nykyiset osat:
   - tilaobjekti
   - oppimisaskeleet
   - canvas-piirtofunktiot
   - kontrollien renderöinti
   - tehtävien tarkistus
4. Refaktoroi vain sen verran kuin moniaiheinen rakenne vaatii.
5. Älä poista toimivaa aaltoliikesimulaatiota.
6. Lisää uusi aihedata ja simulaattorityypit.
7. Lisää navigaatio aiheiden vaihtamiseen.
8. Lisää tai muokkaa CSS:ää niin, että uudet kortit ja navigaatio sopivat nykyiseen tyyliin.
9. Testaa selaimessa.
10. Korjaa virheet ja varmista, ettei GitHub Pages -julkaisu rikkoudu.

## Windows-ympäristö ja muutosten paloittelu

Työ tehdään Windows-ympäristössä VS Code Codex -laajennuksella. Koska `index.html` on suuri yhden tiedoston sovellus, agentin ei pidä yrittää korvata koko tiedostoa kerralla. Tee muutokset pieninä, selvästi rajattuina vaiheina.

Tärkein sääntö:
- Älä tee massiivista koko tiedoston uudelleenkirjoitusta.
- Älä vaihda koko sovelluksen arkkitehtuuria yhdellä kertaa.
- Tee yksi toimiva muutoskategoria kerrallaan.
- Testaa jokaisen vaiheen jälkeen, että sovellus edelleen avautuu.
- Jos jokin vaihe epäonnistuu, palauta vain kyseisen vaiheen muutos, älä koko projektia.

Windowsissa huomioi:
- Käytä polkuja muodossa `index.html` ja `.github/workflows/deploy-pages.yml`.
- Älä oleta Linux-komentoja kuten `grep`, `sed`, `awk` tai `rm`.
- Jos tarvitset komentoriviä, käytä PowerShell-yhteensopivia komentoja.
- Vältä pitkiä komentorivikomentoja; tee mieluummin muokkaukset editorissa.
- Säilytä tiedoston UTF-8-merkistö, jotta suomenkieliset ääkköset toimivat.
- Testaa tiedosto avaamalla `index.html` selaimessa tai käyttämällä VS Coden Live Server -laajennusta, jos se on käytössä.

## Paloiteltu toteutussuunnitelma agentille

Tee työ seuraavassa järjestyksessä. Älä siirry seuraavaan vaiheeseen ennen kuin edellinen toimii selaimessa ilman konsolivirheitä.

### Vaihe 0: Turvatarkistus ennen muutoksia

Tee ensin vain selvitys, älä vielä muokkaa koodia.

Tarkista:
- missä nykyinen tilaobjekti sijaitsee
- missä nykyiset oppimisaskeleet tai tehtävät määritellään
- missä canvas piirretään
- missä kontrollit renderöidään
- missä tapahtumankuuntelijat ovat
- mitkä funktiot on turvallisinta säilyttää ennallaan

Kirjoita lyhyt suunnitelma ennen ensimmäistä koodimuutosta.

### Vaihe 1: Lisää aihevalikko ilman uusia simulaattoreita

Tavoite:
- Lisää yläosaan aihevalikko viidelle aiheelle.
- Pidä nykyinen aaltoliikesovellus toiminnassa.
- Muut aihepainikkeet voivat aluksi näyttää väliaikaisen “Tulossa”-, teoria- tai tyhjän näkymän.

Tee vain nämä:
- lisää aihedata otsikoilla ja lyhyillä introilla
- lisää aktiivisen aiheen tila, esimerkiksi `state.activeTopicId`
- lisää navigaatiopainikkeiden renderöinti
- lisää click-käsittely aihepainikkeille
- varmista, että nykyinen aaltoliike toimii edelleen

Älä vielä lisää äänen, säteilyn, valon tai optiikan canvas-logiikkaa.

Testaa:
- sivu avautuu
- aihepainikkeet näkyvät
- aaltoliike toimii
- aihetta voi vaihtaa ilman JavaScript-virhettä

### Vaihe 2: Lisää teoriakortit kaikille aiheille

Tavoite:
- Jokaisella aiheella on lyhyt johdanto ja käsitteet kortteina.
- Ei vielä uusia simulaattoreita, paitsi nykyinen aaltoliike.

Tee vain nämä:
- lisää `concepts`-listat kaikille aiheille
- tee yhteinen `renderConceptCards(topic)` -funktio
- varmista, että teksti vaihtuu aihevalinnan mukaan
- pidä tekstimäärä lyhyenä

Testaa:
- jokainen aihe näyttää oikeat käsitteet
- mobiilinäkymä ei hajoa
- aaltoliike toimii edelleen

### Vaihe 3: Yleistä kontrollien ja johdettujen arvojen renderöinti

Tavoite:
- Valmistele sovellus useille simulaattoreille ilman, että visualisointeja vielä rakennetaan kaikkia kerralla.

Tee vain nämä:
- erota kontrollien data ja renderöinti toisistaan
- lisää simulaattorityyppi `simulatorType`
- varmista, että `waves` käyttää edelleen nykyisiä säätimiä
- lisää turvallinen fallback muille aiheille, esimerkiksi “Valitse arvoja ja tutki ilmiötä” ilman monimutkaista piirtoa

Testaa:
- aaltoliikkeen säätimet toimivat
- muut aiheet eivät kaada sovellusta
- konsolissa ei ole virheitä

### Vaihe 4: Laajenna aaltoliike valmiiksi

Tavoite:
- Tee nykyisestä aaltoliikkeestä lopullinen ensimmäinen aihealue.

Tee vain nämä:
- lisää poikittainen / pitkittäinen aalto -valinta
- piirrä pitkittäinen aalto hiukkasjonona
- näytä värähdysaika `T = 1 / f`
- näytä aallon nopeus `v = f * λ`
- lisää yksi tutkimustehtävä taajuuden ja värähdysajan suhteesta

Testaa:
- poikittainen aalto toimii
- pitkittäinen aalto toimii
- arvot päivittyvät
- tehtävä antaa palautteen

### Vaihe 5: Lisää ääni omana rajattuna kokonaisuutena

Tavoite:
- Lisää vain ääni-aiheen simulaattori ja tehtävä.

Tee vain nämä:
- lisää `drawSoundSimulator(...)`
- lisää taajuus-, voimakkuus- ja väliainekontrollit
- lisää äänen nopeuden arvot: ilma, vesi, teräs
- lisää infraääni / kuultava ääni / ultraääni -luokitus
- lisää yksinkertainen resonanssikoe samaan näkymään tai erilliseen tilaan
- lisää yksi tehtävä ultraäänestä

Älä muokkaa säteilyn, valon tai optiikan simulaattoreita tässä vaiheessa.

Testaa:
- ääni-aihe avautuu
- säätimet muuttavat ääniaaltoa
- väliaine vaihtaa nopeutta ja aallonpituutta
- resonanssi voimistuu, kun taajuudet ovat lähellä
- muut aiheet toimivat edelleen

### Vaihe 6: Lisää säteily omana rajattuna kokonaisuutena

Tavoite:
- Lisää vain säteily-aiheen visualisointi ja tehtävä.

Tee vain nämä:
- lisää `drawRadiationSimulator(...)`
- piirrä sähkömagneettisen säteilyn spektri
- lisää valinta säteilyalueelle
- näytä ionisoiva / ionisoimaton luokitus
- lisää hiukkassäteilyn suojausesimerkit: alfa, beeta, gamma
- lisää yksi tehtävä näkyvää valoa energisemmistä alueista

Älä tee muutoksia äänen tai aaltoliikkeen toimivaan logiikkaan, ellei bugikorjaus ole välttämätön.

Testaa:
- spektri näkyy
- valittu alue korostuu
- luokitus vaihtuu oikein
- suojausesimerkit näkyvät

### Vaihe 7: Lisää valo omana rajattuna kokonaisuutena

Tavoite:
- Lisää vain valo-aiheen simulaattori ja tehtävä.

Tee vain nämä:
- lisää `drawLightSimulator(...)`
- lisää tilat: heijastuminen, taittuminen, kokonaisheijastuminen
- lisää tulokulman säädin
- lisää ainevalinnat: ilma, vesi, lasi
- käytä sisäisesti yksinkertaista Snellin lain laskentaa
- näytä kokonaisheijastuminen, jos taittumiskulmaa ei voi muodostaa
- lisää valaisuvoimakkuuden etäisyysvaikutus
- korjaa kirjoitusasu: `valaisuvoimakkuss` → `valaisuvoimakkuus`

Testaa:
- heijastuskulma seuraa tulokulmaa
- taittuminen muuttuu aineiden mukaan
- kokonaisheijastuminen näkyy lasista ilmaan suurella kulmalla
- valaisuvoimakkuuden selitys muuttuu etäisyyden mukaan

### Vaihe 8: Lisää peilit ja linssit omana rajattuna kokonaisuutena

Tavoite:
- Lisää vain peilit ja linssit -aiheen simulaattori ja tehtävä.

Tee vain nämä:
- lisää `drawOpticsSimulator(...)`
- lisää tilat: tasopeili, kovera peili, kupera peili, kovera linssi, kupera linssi, silmälasit
- lisää esineen etäisyys ja polttoväli säätimiksi
- piirrä yksinkertainen sädekaavio
- lisää silmälasitilaan likinäköisyys ja kaukonäköisyys yksinkertaisena havainnollistuksena
- lisää yksi tehtävä kuperasta linssistä

Testaa:
- kaikki optiikan tilat vaihtuvat
- säteet piirretään ymmärrettävästi
- tehtävä toimii
- muut aihealueet toimivat edelleen

### Vaihe 9: Yhtenäistä ulkoasu ja mobiilinäkymä

Tavoite:
- Tee vain viimeistelyä, älä enää lisää uusia isoja toimintoja.

Tee vain nämä:
- siisti korttien välit
- varmista, että aihevalikko toimii pienellä näytöllä
- varmista, että kontrollit pinoutuvat mobiilissa
- lisää tarvittaessa lyhyitä canvas-selitystekstejä
- tarkista kontrasti ja luettavuus

Testaa:
- leveä työpöytänäkymä
- kapea mobiilinäkymä
- kaikki aihealueet

### Vaihe 10: Lopputestaus ja korjaukset

Tee lopuksi koko sovelluksen testaus.

Tarkista:
- `index.html` avautuu selaimessa
- konsolissa ei ole virheitä
- kaikki viisi aihetta avautuvat
- kaikki säätimet toimivat
- arvot eivät näytä `NaN`, `Infinity` tai liian pitkiä desimaaleja
- kaikki tekstit ovat suomeksi
- taso pysyy yläasteen 7–9 fysiikassa
- GitHub Pages -workflow’hun ei tarvitse tehdä muutoksia

## Agentin työskentelytapa isoissa tiedostoissa

Kun muokkaat suurta `index.html`-tiedostoa:

1. Etsi ensin tarkka kohta, johon muutos kuuluu.
2. Tee pieni paikallinen muutos.
3. Älä korvaa koko `<script>`-osiota, ellei se ole aivan välttämätöntä.
4. Älä korvaa koko `<style>`-osiota, vaan lisää tarvittavat luokat nykyisten jatkoksi.
5. Jos funktio pitää korvata, korvaa vain kyseinen funktio.
6. Jos lisäät uuden simulaattorin, lisää ensin tyhjä runko ja varmista, että se kutsutaan oikein.
7. Lisää piirto- ja laskentalogiikka vasta rungon toimivuuden jälkeen.
8. Pidä jokaisen vaiheen muutos sellaisena, että sen voi helposti perua.

Hyvä etenemistapa:
- ensin data
- sitten navigaatio
- sitten tekstikortit
- sitten kontrollit
- sitten yksi simulaattori kerrallaan
- lopuksi ulkoasu ja testaus

Huono etenemistapa:
- koko sovelluksen korvaaminen uudella tiedostolla
- kaikkien simulaattorien lisääminen yhdellä valtavalla muutoksella
- nykyisen aaltoliikkeen poistaminen ja uudelleenkirjoitus alusta asti
- CSS:n ja JavaScriptin täydellinen uudelleenjärjestely ilman välitestejä

## Windows-yhteensopiva testausohje agentille

Käytä jotakin näistä tavoista:

1. Avaa `index.html` suoraan selaimessa.
2. Käytä VS Coden Live Server -laajennusta, jos se on asennettu.
3. Käytä PowerShelliä vain tarvittaessa.

PowerShellissä voit esimerkiksi tarkistaa nykyisen sijainnin:

```powershell
Get-Location
```

Ja listata tiedostot:

```powershell
Get-ChildItem
```

Älä lisää projektiin Node-, npm- tai build-riippuvuuksia vain testauksen takia.

## Jos Codex-agentti törmää muokkausrajaan

Jos agentti ei pysty tekemään liian suurta muokkausta, sen tulee pienentää tehtävää näin:

1. Tee vain Vaihe 1 ja lopeta.
2. Palauta yhteenveto siitä, mikä onnistui.
3. Jatka seuraavassa agenttiajossa Vaiheesta 2.
4. Älä yritä pakottaa kaikkia muutoksia samaan vastaukseen.

Suositeltu jako useaan agenttiajoon:

- Ajo 1: Vaiheet 0–2  
  Aihevalikko ja teoriakortit.

- Ajo 2: Vaiheet 3–4  
  Kontrollien yleistäminen ja aaltoliikkeen viimeistely.

- Ajo 3: Vaihe 5  
  Ääni ja resonanssi.

- Ajo 4: Vaihe 6  
  Säteily.

- Ajo 5: Vaihe 7  
  Valo.

- Ajo 6: Vaihe 8  
  Peilit ja linssit.

- Ajo 7: Vaiheet 9–10  
  Ulkoasu, mobiili ja lopputestaus.

Jokaisen ajon lopussa agentin pitää kertoa:
- mitä muutettiin
- mitä testattiin
- onnistuiko vaihe
- mistä seuraava ajo kannattaa aloittaa

## Paloitellut agenttipromptit

Käytä näitä mieluummin kuin yhtä liian suurta promptia, jos Codex-laajennus ei jaksa tehdä koko muutosta kerralla.

### Agenttiajo 1: aihevalikko ja teoriakortit

```text
Tee vain ensimmäinen pieni vaihe nykyiseen index.html-tiedostoon.

Työ tehdään Windowsissa VS Code Codex -laajennuksella. Älä korvaa koko tiedostoa. Älä lisää kirjastoja.

Lisää moniaiheisen oppimistyökalun perusrakenne:
- sovelluksen nimeksi “Fysiikan ilmiölaboratorio”
- aihevalikko viidelle aiheelle: Värähdys- ja aaltoliike, Ääni, Säteily, Valo, Peilit ja linssit
- aktiivisen aiheen tila
- lyhyt intro ja käsitteet kortteina jokaiselle aiheelle

Säilytä nykyinen aaltoliikkeen simulaatio toiminnassa. Muiden aiheiden simulaattorit voivat tässä vaiheessa näyttää vain väliaikaisen tekstin tai tyhjän visualisointialueen.

Testaa, että kaikki aihepainikkeet vaihtavat näkymää eikä konsolissa ole virheitä.
```

### Agenttiajo 2: aaltoliikkeen viimeistely

```text
Jatka edellisestä toimivasta versiosta. Tee vain aaltoliikkeen parannukset.

Älä korvaa koko index.html-tiedostoa. Muokkaa vain tarvittavia kohtia.

Lisää Värähdys- ja aaltoliike -aiheeseen:
- poikittainen / pitkittäinen aalto -valinta
- pitkittäisen aallon hiukkasjono
- värähdysaika T = 1 / f
- aallon nopeus v = f * λ
- tutkimustehtävä: mitä värähdysajalle tapahtuu, kun taajuus kasvaa

Testaa, että nykyinen aaltoliike toimii edelleen ja aihevalikko ei hajoa.
```

### Agenttiajo 3: ääni

```text
Jatka edellisestä toimivasta versiosta. Tee vain Ääni-aiheen simulaattori.

Älä muokkaa säteilyn, valon tai optiikan simulaattoreita vielä. Älä korvaa koko tiedostoa.

Lisää Ääni-aiheeseen:
- ääniaalto canvasille
- taajuussäädin
- voimakkuussäädin
- väliainevalinta: ilma, vesi, teräs
- äänen nopeus valitussa väliaineessa
- aallonpituus λ = v / f
- luokitus: infraääni, kuultava ääni, ultraääni
- yksinkertainen resonanssikoe
- tutkimustehtävä ultraäänestä

Testaa vain tämä aihe ja varmista, että muut aiheet avautuvat edelleen.
```

### Agenttiajo 4: säteily

```text
Jatka edellisestä toimivasta versiosta. Tee vain Säteily-aiheen visualisointi.

Älä korvaa koko index.html-tiedostoa.

Lisää Säteily-aiheeseen:
- sähkömagneettisen säteilyn spektri
- valittu säteilyalue korostettuna
- ionisoiva / ionisoimaton luokitus
- käyttökohde-esimerkki
- hiukkassäteilyn suojausesimerkit: alfa, beeta, gamma
- tutkimustehtävä näkyvää valoa energisemmistä alueista

Pidä sävy neutraalina ja yläastetasoisena. Testaa, ettei aiemmat aiheet rikkoudu.
```

### Agenttiajo 5: valo

```text
Jatka edellisestä toimivasta versiosta. Tee vain Valo-aiheen simulaattori.

Älä korvaa koko index.html-tiedostoa.

Lisää Valo-aiheeseen:
- valonsäteen canvas-visualisointi
- tilat: heijastuminen, taittuminen, kokonaisheijastuminen
- tulokulman säädin
- ainevalinnat: ilma, vesi, lasi
- sisäinen laskenta taittumiselle
- kokonaisheijastuminen tilanteessa, jossa taittunutta sädettä ei muodostu
- valaisuvoimakkuuden etäisyysvaikutus
- korjaa kirjoitusasu “valaisuvoimakkuss” muotoon “valaisuvoimakkuus”
- tutkimustehtävä kokonaisheijastumisesta

Testaa valoaihe ja tarkista, että muut aiheet toimivat edelleen.
```

### Agenttiajo 6: peilit ja linssit

```text
Jatka edellisestä toimivasta versiosta. Tee vain Peilit ja linssit -aiheen simulaattori.

Älä korvaa koko index.html-tiedostoa.

Lisää Peilit ja linssit -aiheeseen:
- sädekaavio canvasille
- tilat: tasopeili, kovera peili, kupera peili, kovera linssi, kupera linssi, silmälasit
- esineen etäisyyden säädin
- polttovälin säädin
- yksinkertaiset valonsäteet ja kuva tai säteiden suunta
- silmälasitilaan likinäköisyys ja kaukonäköisyys
- tutkimustehtävä kuperasta linssistä

Pidä kaavio havainnollisena eikä liian matemaattisena. Testaa, että muut aiheet toimivat.
```

### Agenttiajo 7: viimeistely ja lopputestaus

```text
Jatka edellisestä toimivasta versiosta. Tee vain viimeistely ja virhekorjaukset.

Älä lisää uusia isoja ominaisuuksia.

Tarkista:
- kaikki viisi aihealuetta avautuvat
- kaikki säätimet toimivat
- canvas päivittyy jokaisessa aiheessa
- konsolissa ei ole virheitä
- mobiilinäkymä toimii
- tekstit ovat suomeksi
- fysiikan taso on yläaste 7–9
- arvot eivät näytä NaN, Infinity tai liian pitkiä desimaaleja

Korjaa vain löydetyt ongelmat. Lopuksi palauta yhteenveto muutetuista kohdista ja testauksesta.
```



## Vältettävät asiat

Älä:
- muuta projektia React-, Vue- tai muuksi framework-sovellukseksi
- lisää ulkoisia kirjastoja ilman pakottavaa syytä
- tee sisällöstä lukiotasoista
- tee pelkkää tekstisivua ilman visuaalisia kokeiluja
- poista olemassa olevaa aaltoliikkeen visualisointia
- jätä simulaatioita staattisiksi kuvitetuiksi korteiksi
- käytä englanninkielisiä käyttöliittymätekstejä
- tee automaattisesti kovaa ääntä selaimessa

## Ehdotettu kokoava agenttiprompti

Käytä tätä vain, jos Codex-agentti pystyy käsittelemään laajan muutoksen. Windows-ympäristössä suositeltavampaa on käyttää yllä olevia paloiteltuja agenttipromptteja yksi ajo kerrallaan.

Kopioi tämä VS Code Codex -laajennuksen agentille:

```text
Laajenna nykyinen yhden tiedoston HTML/CSS/JavaScript-oppimistyökalu yläasteen 7–9 fysiikan moniaiheiseksi “Fysiikan ilmiölaboratorio” -sovellukseksi.

Työ tehdään Windows-ympäristössä VS Code Codex -laajennuksella. Älä korvaa koko index.html-tiedostoa kerralla. Tee muutokset pieninä vaiheina, testaa jokaisen vaiheen jälkeen ja jatka seuraavaan vaiheeseen vasta, kun edellinen toimii ilman konsolivirheitä.

Nykyisessä sovelluksessa on jo aaltoliikkeen oppimispolku ja canvas-visualisointi. Säilytä se, mutta tee siitä ensimmäinen aihealue. Lisää aihevalikko ja seuraavat aihealueet: Värähdys- ja aaltoliike, Ääni, Säteily, Valo, Peilit ja linssit.

Jokaisessa aihealueessa pitää olla lyhyt yläastetasoinen teoriaosuus, tärkeät käsitteet kortteina, visuaalinen testaustyökalu canvasilla tai vastaavalla, säätimet ja yksi tutkimustehtävä välittömällä palautteella.

Pidä toteutus nykyisessä index.html-tiedostossa. Älä lisää frameworkeja, bundleria tai ulkoisia kirjastoja. Säilytä nykyinen visuaalinen tyyli ja GitHub Pages -yhteensopivuus.

Toteuta vähintään:
1. Aallot: poikittainen/pitkittäinen aalto, amplitudi, taajuus, aallonpituus, värähdysaika ja aallon nopeus.
2. Ääni: ääniaalto, voimakkuus, taajuus, väliaine, äänen nopeus, infraääni/kuultava ääni/ultraääni ja resonanssikoe.
3. Säteily: sähkömagneettisen säteilyn spektri, ionisoiva/ionisoimaton luokitus, hiukkassäteilyn suojausesimerkit.
4. Valo: valon eteneminen, heijastuminen, taittuminen, kokonaisheijastuminen ja valaisuvoimakkuuden etäisyysvaikutus.
5. Peilit ja linssit: tasopeili, kovera/kupera peili, kovera/kupera linssi ja silmälasien periaate.

Pidä kieli suomena. Korjaa kirjoitusasu “valaisuvoimakkuss” muotoon “valaisuvoimakkuus”. Testaa lopuksi, että kaikki aihepainikkeet toimivat, säätimet päivittävät visualisointia, konsolissa ei ole virheitä ja sivu toimii mobiilissa.
```

## Lopputulos, jonka agentin tulee palauttaa

Kun agentti on valmis, sen tulee kertoa:
- mitä tiedostoja muutettiin
- mitkä aihealueet lisättiin
- miten simulaattorit toimivat
- miten sovellus testattiin
- jäikö jotain rajattua jatkokehitykseen
