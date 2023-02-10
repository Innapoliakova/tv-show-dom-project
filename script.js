//You can edit ALL of the code here

const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];

//You can edit ALL of the code here
function setup() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // in here we can do whatever we want with the data
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    })
    .catch((err) => console.error(err));
}
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root"); 
  // accessing the element in the HTML document with the id "root"

  rootElem.innerHTML = "";
// By setting it to an empty string "", any previous content within the element will be deleted.

allEpisodes = episodeList;

// Create the select element
const select = document.createElement("select");
select.id = "episode-select";
rootElem.appendChild(select);

// Create the default option
const defaultOption = document.createElement("option");
defaultOption.text = "Select an episode";
defaultOption.value = "";
select.add(defaultOption);

for (const episode of allEpisodes) {
  const option = document.createElement("option");
  option.text = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name} `;
  option.value = `S0${episode.season}E0${episode.episode}`;
  select.add(option);
}


select.addEventListener("change", function() {
  const selectedEpisode = this.value
  episodeContainer.innerHTML = "";

  for (const episode of allEpisodes) {
    if (`S0${episode.season}E0${episode.episode}` === selectedEpisode) {
      
      const episodeElement = document.createElement("div");
      episodeElement.classList.add("episode-filter");
      episodeElement.innerHTML = `
        <h2>${`${episode.name} - S${episode.season
          .toString()
          .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`}</h2>
        <img src=" ${episode.image.medium}" alt="${episode.name} image">
        <p>${episode.summary}</p>
      `;
      episodeContainer.appendChild(episodeElement);

      episodeElement.scrollIntoView();
      break;
    }
  }
});


// create a new input element and assigns it to the searchInput constant:
const searchInput = document.createElement("input");
// create a text input field:
searchInput.setAttribute("type", "text");
searchInput.setAttribute("id", "search-input");
searchInput.setAttribute("placeholder", "Search for episodes");
rootElem.appendChild(searchInput);

 // create element to display the number of episodes that match the current search:
const countElem = document.createElement("div");
countElem.setAttribute("id", "count");
rootElem.appendChild(countElem);


  // Create a CONTAINER element for ALL EPISODES:
  const episodeContainer = document.createElement("div");
  episodeContainer.classList.add("episode-container");


  // Iterate over each episode in the list:
  episodeList.forEach(episode => {
    
    // Create a BIG CONTAINER for HOLE EACH EPISODE:
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    // Create a div for the EPISODE INFORMATION (include: episode name, season number and episode number):
    const episodeInfo = document.createElement("div");
    episodeInfo.classList.add("episode-info");

    // Create a heading for the episode NAME:
    const episodeName = document.createElement("h2");
    episodeName.textContent = episode.name;
    episodeInfo.appendChild(episodeName);
     episodeElem.appendChild(episodeInfo);

    episodeName.innerText = `${episode.name} - S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

// Create a div - CONTAINER for image:
const episodeImageContainer = document.createElement("div");
    episodeImageContainer.classList.add("episode-image-container");
 episodeElem.appendChild(episodeImageContainer);
 

 // Create an IMAGE element for the episode:
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    // // By setting the src property to the value of episode.image.medium, we are defining the source of the image to be the URL stored in the medium property of the current episode object.
    episodeImage.alt = `Image for ${episode.name}`;
    // The value of alt is set to a template string that contains the name of the episode, so in case the image can't be loaded, the user will see a text description indicating the name of the episode.
    episodeImageContainer.appendChild(episodeImage);


      // Create a div for the EPISODE INFORMATION-summery:
    const episodeInfoSummery = document.createElement("div");
    episodeInfoSummery.classList.add("episode-info-sum");

    // Create a paragraph for the episode SUMMARY:
    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
  
    episodeInfoSummery.appendChild(episodeSummary);

    episodeElem.appendChild(episodeInfoSummery);
     // Append the episode information to the episode element: episodeInfo is being added as a child node to episodeElem. 

    episodeContainer.appendChild(episodeElem);
      // Append the episode element to the episode container: similar like previos step 
  });

  rootElem.appendChild(episodeContainer);
   // Append the episode container to the root element



// add an event listener to the searchInput element to listen for an "input" event:
searchInput.addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  
  const filteredEpisodes = allEpisodes.filter(episode => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });

  renderEpisodes(filteredEpisodes);
  // calls the renderEpisodes function to re-render the episodes on the page, using only the filtered episodes
});

// function which responsible for rendering the list of episodes on the page:
function renderEpisodes(episodes) {
 
  episodeContainer.innerHTML = "";
  // first clearing the HTML content 

  countElem.innerText = `Displaing ${episodes.length}/73 episodes.`;
  // count all filtered episodes

  episodes.forEach(episode => {
    
    const episodeElement = document.createElement("div");
    episodeElement.classList.add("episode-filter");

    episodeElement.innerHTML = `
    <h2>${`${episode.name} - S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`}</h2>
  <img src=" ${episode.image.medium}" alt="${episode.name} image">
 <p>${episode.summary}</p>
    `;

    episodeContainer.appendChild(episodeElement);
  });
}
}


window.onload = setup;


// const url = "https://api.tvmaze.com/shows/82/episodes";
// let allEpisodes = [];

// //You can edit ALL of the code here
// function setup() {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       // in here we can do whatever we want with the data
//       allEpisodes = data;
//       makePageForEpisodes(allEpisodes);
//     })
//     .catch((err) => console.error(err));
// }

// function makeSeasonAndEpisode(episode) {
//   const { season, number } = episode;
//   const paddedSeason = season.toString().padStart(2, "0");
//   const paddedEpisode = number.toString().padStart(2, "0");

//   return `S${paddedSeason}E${paddedEpisode}`;
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   const selectElem = document.getElementById("select-input");

//   // clear out the rootElement's HTML before we add the new stuff
//   rootElem.innerHTML = "";
//   const countParagraph = document.createElement("p");
//   countParagraph.innerText = `Showing ${episodeList.length} episodes`;
//   rootElem.appendChild(countParagraph);

//   episodeList.forEach((episode) => {
//     // add the season and episode and name
//     const paragraph = document.createElement("p");
//     paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
//     rootElem.appendChild(paragraph);

//     // add the image
//     const image = document.createElement("img");
//     image.src = episode.image.medium;
//     rootElem.appendChild(image);

//     // add the summary paragraph nb the episode.summary is actually HTML
//     rootElem.innerHTML += episode.summary;

//     // also, one more thing, add it to the select element as an option
//     const option = document.createElement("option");
//     option.textContent = `${makeSeasonAndEpisode(episode)} - ${episode.name}`;
//     option.value = episode.id;
//     selectElem.appendChild(option);
//   });
// }

// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredEpisodes = allEpisodes.filter((episode) => {
//     // localeCompare might be neater here
//     return (
//       episode.summary.toLowerCase().includes(searchString) ||
//       episode.name.toLowerCase().includes(searchString)
//     );
//   });
//   makePageForEpisodes(filteredEpisodes);
// });

// const selectInput = document.getElementById("select-input");
// selectInput.addEventListener("change", (e) => {
//   // we now have shown that e.target.value === the episode id that has been clicked on
//   const idSelectedByUser = Number(e.target.value);
//   const selectedEpisode = allEpisodes.find((ep) => ep.id === idSelectedByUser);
//   if (selectedEpisode) {
//     makePageForEpisodes([selectedEpisode]);
//   }
// });

// window.onload = setup;

