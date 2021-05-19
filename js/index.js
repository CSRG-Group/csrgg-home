// const revisionGuides = [
//     {
//         moduleCode: "CS118",
//         moduleName: "Programming for Computer Scientists",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS118/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS126",
//         moduleName: "Design of Information Structures",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS126/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS130",
//         moduleName: "Mathematics for Computer Scientists I",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS130/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS131",
//         moduleName: "Mathematics for Computer Scientists II",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS131/",
//         complete: false,
//     },
//     {
//         moduleCode: "CS132",
//         moduleName: "Computer Systems and Architecture",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS132/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS139",
//         moduleName: "Web Development Technologies",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS139/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS140",
//         moduleName: "Computer Security",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS140/",
//         complete: true,
//     },
//     {
//         moduleCode: "CS141",
//         moduleName: "Functional Programming",
//         href: "https://csrg-group.github.io/dcs-notes.github.io/CS141/",
//         complete: false,
//     },
// ];

// const searchGuides = (query = "") => {
//     query = query.toLowerCase();

//     const results = revisionGuides.filter(
//         (g) =>
//             g.moduleCode.toLowerCase().includes(query) ||
//             g.moduleName.toLowerCase().includes(query)
//     );

//     const displayResults = results.splice(0, 3);

//     console.log(displayResults);

//     let resultsElements = displayResults.map((g) => {
//         const result = `${g.moduleCode}: ${g.moduleName}${
//             !g.complete ? " (Incomplete)" : ""
//         }`;

//         const resultLink = document.createElement("a");
//         resultLink.href = g.href;
//         resultLink.className = "block font-fira-code underline text-center";

//         const resultText = document.createElement("p");
//         resultText.className = "text-xl font-semibold";
//         resultText.textContent = result;

//         resultLink.append(resultText);

//         const resultContainer = document.createElement("div");

//         resultContainer.append(resultLink);

//         return resultContainer.innerHTML;
//     });

//     const resultsContainer = document.getElementById("results");

//     resultsContainer.innerHTML = resultsElements.join("");
// };

// document.getElementById("query").addEventListener("input", (e) => {
//     const query = e.target.value;

//     searchGuides(query);
// });

// searchGuides();


const search = instantsearch({
    appId: 'APP_ID',
    apiKey: 'API_KEY',
    indexName: 'csrg_index',
    routing: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for content',
      cssClasses: {
        root: 'ais-search-box--override',
      },
    })
);

search.addWidget(
    instantsearch.widgets.hits({
      container: '#results',
      escapeHTML: true,
      templates: {
        empty: 'No results for <q>{{ query }}</q>',
        item: `
        <div class="search-result">
        <p>
            <a href="https://csrg-group.github.io/dcs-notes.github.io/{{url}}" class="text-lg font-fira-code font-semibold underline">{{ collection }}: {{ title }}</a>
        </p>
        <p>{{ excerpt_text }}</p>
        </div>
        `,
      },
      transformItems(items) {
          return items.slice(0, Math.min(3, items.length))
      }
    })
);

  
search.start();
