// When the user clicks on the search box, we want to toggle the search dropdown
function displayToggleSearch(e) {
  e.preventDefault();
  e.stopPropagation();

  closeDropdownSearch(e);
  
  if (idx === null) {
    console.log("Building search index...");
    prepareIdxAndDocMap();
    console.log("Search index built.");
  }
  const dropdown = document.querySelector("#search-dropdown-content");
  if (dropdown) {
    if (!dropdown.classList.contains("show")) {
      dropdown.classList.add("show");
    }
    document.addEventListener("click", closeDropdownSearch);
    document.addEventListener("keydown", searchOnKeyDown);
    document.addEventListener("keyup", searchOnKeyUp);
  }
}

//We want to prepare the index only after clicking the search bar
var idx = null
const docMap = new Map()

function prepareIdxAndDocMap() {
  const docs = [  
    {
      "title": "Aktivitäten",
      "url": "/mittelalterfest/pages/activities",
      "content": "Aktivitäten Zum Zeitvertreib haben wir uns folgende Belustigungen ausgedacht Pfeilbogen schiessen Axtwerfen Kubb Gesellschaftsspiele Wir bringen einige Gesellschaftsspiele mit: Citadels Puerto Rico Hast du eine gute Idee? Bring einfach dein Spiel mit! Kochen Hilfe ist gern gesehen, wird aber nicht erwartet!"
    } ,    
    {
      "title": "Programm",
      "url": "/mittelalterfest/pages/agenda",
      "content": "Programm Freitag 18:30 - Eintreffen, Einrichten 20:00 - Nachtessen 21:00 - Abendprogramm 21:00 - Dessert (Smores) Samstag 08:30 - Morgenessen 12:00 - Mittagessen 15:00 - Nachmittagsprogramm 19:30 - Nachtessen (Spanferkel, Stomp Pot) 21:00 - Dessert (Bratäpfel) 21:30 - Abendprogramm Sonntag 10:30 - Morgenessen 11:00 - Aufräumen 13:00 - Abschluss / Verabschiedung"
    } ,    
    {
      "title": "FAQ",
      "url": "/mittelalterfest/pages/faq",
      "content": "Fragen und Antworten Muss ich verkleidet kommen? Nein. Verkleidung ist nicht notwendig - aber gern gesehen! Kann ich vor Ort zelten? Sicher! Du musst auch keine 5 Franken für das Laken bezahlen! Hat es im Haus duschen? Ja, zwei Duschen und zwei Waschtröge. Kann ich mein eigenes Essen und Getränke mitbringen? Ja, natürlich! Was muss ich selbst mitbringen? Mittelalter-Stimmung! Mittelalterliche Bekleidung (wer möchte) Schlafsack (falls du übernachtest) - es hat nur Laken Eigene Spiele Kann ich noch jemanden Mitbringen? Natürlich - bitte einfach vorher im Gruppenchat oder direkt bei mir (Timo) anmelden. Denkt daran dass die Schlafplätze limitiert sind! Ich habe noch eine geile Idee! Klar, schlags im Gruppenchat vor! Ist die Homepage open-source? Ja, auf GitHub Frage unbeantwortet? Infos gibt’s natürlich auch im Gruppenchat, einfach fragen!"
    } ,    
    {
      "title": "Festschmaus",
      "url": "/mittelalterfest/pages/food",
      "content": "Festschmaus Generell gilt: Wir sorgen dafür dass niemand hungern muss. Wir kochen Zmorgen, Zmittag und Znacht! Morgenessen Wir haben vor im Pizzaofen Brot zu backen Speck Eier Konfitüre Butter Orangensaft Instant-Kaffee Freitag Znacht: Fleischpot Versch. Grilladen Kartoffeln Zwiebeln Speck Reibkäse Zum Dessert: Smores Samstag Zmittag: Dutch oven Schweinenacken Zwiebeln Speck Steaksauce / Ketchup Samstag Znacht: Spanferkel und Spitzkohleintopf Spanferkel Spitzkohl Pilze Speck Zwiebeln Samstag Dessert: Bratäpfel Äpfel Rosinen Butter"
    } ,    
    {
      "title": "Mittelalterfest",
      "url": "/mittelalterfest/",
      "content": ""
    } ,      
    {
      "title": "Location",
      "url": "/mittelalterfest/pages/location",
      "content": "Location Pfadihütte Falkbenburg Homepage Google Maps Anfahrt Öffentlicher Verkehr via Uetikon Schnellste Verbindung: Zug bis Uetikon, dann Bus 932 bis Uetikon Binzigerstrasse, dann 4 min zu Fuss Zug bis Uetikon, dann Bus 931 bis Uetikon am See, Brandrain, dann 21 min zu Fuss Zug bis Uetikon, dann 32 min zu Fuss via Männedorf Zug bis Männedorf, Bahnhof, dann Bus 925 (Richtung Meilen, Bahnhof), dann 17 min zu Fuss Zug bis Männedorf, Bahnhof, dann Bus 940 (Richtung Oetwil am See) bis Männedorf, Wiedenbad, dann 11m zu Fuss Zug bis Männedorf, Bahnhof, dann 33 min zu Fuss Auto Es hat in der Nähe gelegen einen Parkplatz."
    } ,      
    {
      "title": "Anmeldung",
      "url": "/mittelalterfest/pages/signup",
      "content": "Anmeldung Hier haben wir die Schätzung für die Kosten. Wir erwarten mindestens 10 Teilnehmer, denken aber es ist recht warscheihnlich dass mehr kommen. Hütte Denkt daran: Maximal können 18 Personen in der Hütte übernachten. Sagt uns deshalb bitte frühzeitig Bescheid, falls ihr übernachten wollt! Wer zuerst kommt, hat seinen Platz! Anzahl Personen 10 12 15 18 Hütte¹ 60.00 50.00 40.00 33.35 Fackeln¹ 8.50 7.05 5.65 4.75 Übernachtung² 5.00       Subtotal ohne Übernachtung 68.00 57.05 45.65 38.10 Subtotal mit Übernachtung 73.00 62.05 50.65 43.10 ¹ Wir rechnen so dass jeder Besucher bezahlt, ob mit oder ohne Übernachtung ² Für das Laken, pro Person (egal ob 1 oder 2 Nächte) Zur Anmeldung für die Telinahme und Übernachtung (verbindlich) Bitte ausfüllen bis spätestens Sonntag, 2. August. Essen Anzahl Personen 10 12 15 18 Pro Frühstück 5.00       Essen Freitag 15.00       Essen Samstag³ 25.00       Spanferkel (und Kohle) 34.50 28.75 23.00 19.20 ³ Exklusive Spanferkel Zur Anmeldung für das Essen (verbindlich) Bitte ausfüllen bis spätestens Sonntag, 2. August. Getränke Wir machen einen grossen Einkauf für Bier und Met. Wir bringen die Getränke dann mit ans Event, so könnt ihr euch das Schleppen sparen. Zur Getränke-Bestellung (verbindlich) Bitte ausfüllen bis spätestens Sonntag, 2. August. Met Vor Ort hat es 2 Kühlschränke, deshalb kaufen wir Flaschen und können den Met auch kühlen. Bitte sagt uns, wie viele Flaschen wir für euch einkaufen sollen. Pro Flasche (0.75l) rechnen wir mit ca. 13.-. Bier Natürlich können wir auch Bier einkaufen. Auch dies können wir kühl stellen! Anderes Ihr dürft auch alles selber mitnehmen. Bezahlung Sobald wir wissen wie viele Personen ans Fest kommen, schicke ich jedem den Endbetrag zu damit Ihr genau wisst wie viel Ihr bezahlen müsst. Bitte bezahlt danach im Voraus bis und mit 9. August! Schickt mir (Timo) das Geld entweder per Twint oder per Überweisung an: Timo Schmid CH63 0025 0250 7054 0140 M UBS AG Zürich Zahlungsgrund: Name + Mittelalterfest"
    }    
  ];

  idx = lunr(function () {
    this.ref("title");
    this.field("content");

    docs.forEach(function (doc) {
      this.add(doc);
    }, this);
  });

  docs.forEach(function (doc) {
    docMap.set(doc.title, doc.url);
  });
}

// The onkeypress handler for search functionality
function searchOnKeyDown(e) {
  const keyCode = e.keyCode;
  const parent = e.target.parentElement;
  const isSearchBar = e.target.id === "search-bar";
  const isSearchResult = parent ? parent.id.startsWith("result-") : false;
  const isSearchBarOrResult = isSearchBar || isSearchResult;

  if (keyCode === 40 && isSearchBarOrResult) {
    // On 'down', try to navigate down the search results
    e.preventDefault();
    e.stopPropagation();
    selectDown(e);
  } else if (keyCode === 38 && isSearchBarOrResult) {
    // On 'up', try to navigate up the search results
    e.preventDefault();
    e.stopPropagation();
    selectUp(e);
  } else if (keyCode === 27 && isSearchBarOrResult) {
    // On 'ESC', close the search dropdown
    e.preventDefault();
    e.stopPropagation();
    closeDropdownSearch(e);
  }
}

// Search is only done on key-up so that the search terms are properly propagated
function searchOnKeyUp(e) {
  // Filter out up, down, esc keys
  const keyCode = e.keyCode;
  const cannotBe = [40, 38, 27];
  const isSearchBar = e.target.id === "search-bar";
  const keyIsNotWrong = !cannotBe.includes(keyCode);
  if (isSearchBar && keyIsNotWrong) {
    // Try to run a search
    runSearch(e);
  }
}

// Move the cursor up the search list
function selectUp(e) {
  if (e.target.parentElement.id.startsWith("result-")) {
    const index = parseInt(e.target.parentElement.id.substring(7));
    if (!isNaN(index) && (index > 0)) {
      const nextIndexStr = "result-" + (index - 1);
      const querySel = "li[id$='" + nextIndexStr + "'";
      const nextResult = document.querySelector(querySel);
      if (nextResult) {
        nextResult.firstChild.focus();
      }
    }
  }
}

// Move the cursor down the search list
function selectDown(e) {
  if (e.target.id === "search-bar") {
    const firstResult = document.querySelector("li[id$='result-0']");
    if (firstResult) {
      firstResult.firstChild.focus();
    }
  } else if (e.target.parentElement.id.startsWith("result-")) {
    const index = parseInt(e.target.parentElement.id.substring(7));
    if (!isNaN(index)) {
      const nextIndexStr = "result-" + (index + 1);
      const querySel = "li[id$='" + nextIndexStr + "'";
      const nextResult = document.querySelector(querySel);
      if (nextResult) {
        nextResult.firstChild.focus();
      }
    }
  }
}

// Search for whatever the user has typed so far
function runSearch(e) {
  if (e.target.value === "") {
    // On empty string, remove all search results
    // Otherwise this may show all results as everything is a "match"
    applySearchResults([]);
  } else {
    const tokens = e.target.value.split(" ");
    const moddedTokens = tokens.map(function (token) {
      // "*" + token + "*"
      return token;
    })
    const searchTerm = moddedTokens.join(" ");
    const searchResults = idx.search(searchTerm);
    const mapResults = searchResults.map(function (result) {
      const resultUrl = docMap.get(result.ref);
      return { name: result.ref, url: resultUrl };
    })

    applySearchResults(mapResults);
  }

}

// After a search, modify the search dropdown to contain the search results
function applySearchResults(results) {
  const dropdown = document.querySelector("div[id$='search-dropdown'] > .dropdown-content.show");
  if (dropdown) {
    //Remove each child
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }

    //Add each result as an element in the list
    results.forEach(function (result, i) {
      const elem = document.createElement("li");
      elem.setAttribute("class", "dropdown-item");
      elem.setAttribute("id", "result-" + i);

      const elemLink = document.createElement("a");
      elemLink.setAttribute("title", result.name);
      elemLink.setAttribute("href", result.url);
      elemLink.setAttribute("class", "dropdown-item-link");

      const elemLinkText = document.createElement("span");
      elemLinkText.setAttribute("class", "dropdown-item-link-text");
      elemLinkText.innerHTML = result.name;

      elemLink.appendChild(elemLinkText);
      elem.appendChild(elemLink);
      dropdown.appendChild(elem);
    });
  }
}

// Close the dropdown if the user clicks (only) outside of it
function closeDropdownSearch(e) {
  // Check if where we're clicking is the search dropdown
  if (e.target.id !== "search-bar") {
    const dropdown = document.querySelector("div[id$='search-dropdown'] > .dropdown-content.show");
    if (dropdown) {
      dropdown.classList.remove("show");
      document.documentElement.removeEventListener("click", closeDropdownSearch);
    }
  }
}
