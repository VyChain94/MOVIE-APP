//values
const API_KEY = '9a47690d9fbb865a90b888f8d6270a27'; //we got our api key

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; //use this img url where we are inserting it

//insert search/movie and api key so we can use 
const url = 'https://api.themoviedb.org/3/search/movie?api_key=9a47690d9fbb865a90b888f8d6270a27';

// responsible for making path dynamic
function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=9a47690d9fbb865a90b888f8d6270a27`;
    return url;
}

// responsible for when we want to request new movies 
function requestMovies( url, onComplete, onError){
    //fetch url
    fetch(url)
        .then(res => res.json()) // response as JSON
        .then(onComplete)    // whatever you get back, pass through on completion
        .catch((onError) => { // in case api goes down
            console.log('Erro: ', error);
        });
}

function searchMovie(value){
    const path = '/search/movie';
    const url = generateUrl(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function getTopRatedMovies(){
    const path = '/movie/top_rated';
    const url = generateUrl(path);

    const render = renderMovies.bind({title: 'Top Rated Movies'});
    requestMovies(url, render, handleError);
}

function getUpcomingMovies(){
    const path = '/movie/upcoming';
    const url = generateUrl(path);
    
    const render = renderMovies.bind({title: 'Upcoming Movies'});
    requestMovies(url, render, handleError);
}