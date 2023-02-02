//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root"); 
  // accessing the element in the HTML document with the id "root"


  rootElem.innerHTML = "";
// By setting it to an empty string "", any previous content within the element will be deleted.


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
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

window.onload = setup;

