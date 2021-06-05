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
      "content": "Aktivitäten Zum Zeitvertreib haben wir uns folgende Belustigungen ausgedacht: Pfeilbogen schiessen Axtwerfen Gesellschaftsspiele Wir bringen einige Gesellschaftsspiele mit: Citadels Puerto Rico Hast du eine gute Idee? Bring einfach dein Spiel mit! Kochen Hilfe ist gern gesehen, wird aber nicht erwartet!"
    } ,    
    {
      "title": "Programm",
      "url": "/mittelalterfest/pages/agenda",
      "content": "Programm Freitag TODO Samstag TODO Sonntag TODO"
    } ,    
    {
      "title": "FAQ",
      "url": "/mittelalterfest/pages/faq",
      "content": "Fragen und Antworten Muss ich verkleidet kommen? Nein. Verkleidung ist nicht notwendig — aber gern gesehen! Kann ich vor Ort zelten? Sicher! Du musst auch keine 5 Franken für das Laken bezahlen! Hat es im Haus duschen? Kann ich mein eigenes Essen und Getränke mitbringen? Ja, natürlich! Was muss ich selbst mitbringen? Mittelalter-Stimmung! Mittelalterliche Bekleidung (wer möchte) Schlafsack (falls du übernachtest) Eigene Spiele Kann ich noch jemanden Mitbringen? Normal sollte dies kein Problem sein — bitte einfach vorher einen der Organisatoren fragen. Denkt bitte daran, dass die Schlafplätze limitiert sind! Ich habe noch eine geile Idee! Klar, schlag es uns vor! Ist die Homepage open-source? Ja, auf GitHub"
    } ,    
    {
      "title": "Festschmaus",
      "url": "/mittelalterfest/pages/food",
      "content": "Festschmaus Generell gilt: Wir sorgen dafür dass niemand hungern muss. Wir kochen Zmorgen, Zmittag und Znacht! Morgenessen TODO Freitag Znacht TODO Freitag Dessert TODO Samstag Zmittag: Dutch oven? TODO Samstag Znacht: Spanferkel und Buffet TODO Samstag Dessert TODO"
    } ,    
    {
      "title": "Mittelalterfest",
      "url": "/mittelalterfest/",
      "content": ""
    } ,      
    {
      "title": "Location",
      "url": "/mittelalterfest/pages/location",
      "content": "Location Naturfreundehaus Giesental Homepage Google Maps Anfahrt Öffentlicher Verkehr Das Haus ist von der SBB Station Elgg zu Fuss in 20 bis 30 Minuten erreichbar. Auto Die Fahrt bis ganz zur Hütte ist leider nicht erlaubt (nur für uns Organisatoren). Bitte parkiert bei “weitere Parkplätze Birmenstal” und geht den Rest zu Fuss:"
    } ,      
    {
      "title": "Anmeldung",
      "url": "/mittelalterfest/pages/signup",
      "content": "Anmeldung Bitte meldet euch bis spätestens am 7. 2. 2021 bei einer der folgenden Personen an: Timo Alessandro Michael Ives Silvan Hütte TODO Essen Für Speis und Trank vor Ort is gesorgt. Wie letztes Jahr auch sorgen wir für Zmorgen, Zmittag, und Znacht. Softdrinks und Bier sind vorhanden. Met können wir für euch Bestellen. Getränke Wir machen einen grossen Einkauf für Bier und Met. Bier Bier ist genug vorhanden. Wir kaufen Bier ein und dies ist im Preis inbegriffen. Met Den Met könnt ihr bei uns bestellen. Wir machen eine grosse Bestellung bei . Wenn ihr auch Met bestellen möchtet, gebt uns hier die Bestellung durch: Bitte sagt uns, wie viele Flaschen wir für euch einkaufen sollen. TBD: Form Link Anderes Ihr dürft auch selber mitnehmen, was euer Herz begehrt. Preis Position Kosten / Teilnehmer (CHF) Hütte, Holz, Fackeln, Diverses 60.— Essen und Trinken 80.— Met separate Abrechnung Bezahlung Bitte bezahle so bald wie möglich nach der Anmeldung! Die Zahlung nimmt jene Person entgegen, bei der du dich Angemeldet hast!"
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
