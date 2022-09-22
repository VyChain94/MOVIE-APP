//select elements from the DOM
const inputEl = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer = document.querySelector('#movies-container')

// return movies in an img, where movies = data.reults
function movieSection(movies) {
  return movies.map((movie) => { 
        if (movie.poster_path)
            return `<img
            src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}
            />`;
    }).join("")

}

//create a container for the movies
//set class and movie attributes into the movieEl
function createMovieContainer(movies, title = ''){
    const movieEl = document.createElement('div');
    movieEl.setAttribute('class', 'movie');

    const movieTemplate = `
    <h2>${title}</h2>
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `;

    //container for our movies will be structured as above
    movieEl.innerHTML = movieTemplate;
    return movieEl
}


function renderSearchMovies(data){ 
    movieSearchable.innerHTML="";
                // data.results []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    //add movie container as a child to html div
    movieSearchable.appendChild(movieBlock);
}

function renderMovies(data){ 
                // data.results []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
}

function handleError(error) {
    console.log('Error: ', error);
}

        //UPON CLICKING SEARCH BTN
document.querySelector(".search").addEventListener("click", function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //create variable that has value of input
    const value = inputEl.value;
    //search movie relevant to our input value
    searchMovie(value);
    //empty input field upon search
        inputEl.value ="";
   console.log('Value: ', value); //when we click btn we will see the value of our input
});

function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true; 

    return iframe;
}

function createVideoTemplate(data, content){
                 //DISPLAY VIDEOS
                 content.innerHTML = '<p id="content-close">X</p>';
                 console.log('Videos:', data);
                 const videos = data.results;
                //  if videos are more than 4 then only return 4
                const length = videos.length > 4 ? 4 : videos.length;
                const iframeContainer = document.createElement('div');
                content.appendChild(iframeContainer);
    
                 for (let i = 0; i < length; i++){
                    const video = videos[i]; //video
                    const iframe = createIframe(video);
                    iframeContainer.appendChild(iframe);
                 }
}

//couldnt grab the img from the DOM, so..
// Event Delegation
//create an event to target img on click
document.addEventListener("click", function(event) {
    const target = event.target;
    
// if the target we click on is an img tag then.. 
    if(target.tagName.toLowerCase() ==='img' ){
        // target movieId dataset
        // console.log('Event:', event);
        const movieId = target.dataset.movieId
        console.log('Movie ID:', movieId)
        //target parent of img
        const section = event.target.parentElement; //section
        //get the next sibling of the section
        const content = section.nextElementSibling; //content
        //add a class to the content
        content.classList.add('content-display');

        const path =`/movie/${movieId}/videos`;
        const url = generateUrl(path)
        //NOW FETCH MOVIE VIDEOS
        fetch(url)
        .then(res => res.json())
        .then((data) => createVideoTemplate (data, content))
        .catch((error) => {
            console.log('Erro: ', error);
        });
    }
    
    //if what we click on has an id of content-close
    if (target.id === 'content-close'){
        // then select the parent. which is equal to content
        const content = target.parentElement;
        //then we remove whatever claSS THAT we had on
        content.classList.remove('content-display');
    }
})


getUpcomingMovies();

getTopRatedMovies();

