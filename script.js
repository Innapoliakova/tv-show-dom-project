

// //You can edit ALL of the code here

const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];

const rootElem = document.getElementById("root"); 
rootElem.innerHTML = "";

const selectShow = document.createElement("select");
selectShow.id = "show-select";
rootElem.appendChild(selectShow);

const defaultOptionShow = document.createElement("option");
defaultOptionShow.text = "Select a show";
defaultOptionShow.value = "";
selectShow.add(defaultOptionShow);

const selectEp = document.createElement("select");
selectEp.id = "episode-select";
rootElem.appendChild(selectEp);

const defaultOptionForSelectEp = document.createElement("option");
defaultOptionForSelectEp.text = "Select an episode";
defaultOptionForSelectEp.value = "";
selectEp.add(defaultOptionForSelectEp);

const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("id", "search-input");
searchInput.setAttribute("placeholder", "Search for episodes");
rootElem.appendChild(searchInput);


const countElem = document.createElement("div");
countElem.setAttribute("id", "count");
rootElem.appendChild(countElem);

const episodeContainer = document.createElement("div");
episodeContainer.classList.add("episode-container");
rootElem.appendChild(episodeContainer);


function setup() {
  const allShows = getAllShows();
  makeSelectShows(allShows);              
  fetchingShows()
}

function makeSelectShows(shows) {
  shows.forEach(eachShow => {
    const option = document.createElement("option");
    option.textContent = eachShow.name;
    option.value = eachShow.id;
    selectShow.appendChild(option);
  })
}


function fetchingShows() {
  selectShow.addEventListener("change", () => {
    if (selectShow.value === "") {
      allEpisodes = [];
      selectEp.innerHTML = "";
      defaultOptionForSelectEp.selected = true;
      defaultOptionForSelectEp.hidden = false;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          allEpisodes = data;
          makePageForEpisodes(allEpisodes);
        })
        .catch(error => console.log(error));
    } else {
      fetch(`https://api.tvmaze.com/shows/${selectShow.value}/episodes`)
        .then(response => response.json())
        .then(data => {
          allEpisodes = data;
          makePageForEpisodes(allEpisodes);
        })
        .catch(error => console.log(error));
    }
  })
}


function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
}


function makePageForEpisodes(episodeList) {
  
allEpisodes = episodeList;  

for (const episode of allEpisodes) {
  const optionForEl = document.createElement("option");
  optionForEl.text = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name} `;
  optionForEl.value = `S0${episode.season}E0${episode.number}`;
  selectEp.add(optionForEl);
}
 
selectEp.addEventListener("change", function() {
  const selectedEpisode = this.value
  episodeContainer.innerHTML = "";


  for (const episode of allEpisodes) {
    if (`S0${episode.season}E0${episode.number}` === selectedEpisode) {
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


episodeList.forEach(episode => {
    
    const episodeElem = document.createElement("div");
    episodeElem.classList.add("episode");

    const episodeInfo = document.createElement("div");
    episodeInfo.classList.add("episode-info");

    const episodeName = document.createElement("h2");
    episodeName.textContent = episode.name;
    
    episodeInfo.appendChild(episodeName);
    episodeElem.appendChild(episodeInfo);

    episodeName.innerText = `${episode.name} - S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    const episodeImageContainer = document.createElement("div");
    episodeImageContainer.classList.add("episode-image-container");
    episodeElem.appendChild(episodeImageContainer);
 
    const episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    episodeImage.alt = `Image for ${episode.name}`;
    episodeImageContainer.appendChild(episodeImage);

    const episodeInfoSummery = document.createElement("div");
    episodeInfoSummery.classList.add("episode-info-sum");

    const episodeSummary = document.createElement("p");
    episodeSummary.innerHTML = episode.summary;
    episodeInfoSummery.appendChild(episodeSummary);

    episodeElem.appendChild(episodeInfoSummery);

    episodeContainer.appendChild(episodeElem);
  });

 
searchInput.addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode => {
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
  });

  renderEpisodes(filteredEpisodes);
});


function renderEpisodes(episodes) {
  episodeContainer.innerHTML = "";
  countElem.innerText = `Displaing ${episodes.length}/${allEpisodes.length} episodes.`;

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



