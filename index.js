/* 
    TV Guide
    
    Write an async function called findShow(query)
        performs a fetch call to:
        https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=seasons
        and returns the resulting show object
        
    Build a layout to display the show
        - Title
        - Summary
        - Seasons listed as individual divs
*/

/* fetches an api: tvMaze, returns an object containing data points about a tvshow */
/* tvshow: smackdown, name, pictures, summary of the show */
const findShow = async (query) => {
    const embed = '&embed=seasons';
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${ query }${ embed }`;
    const response = await fetch(url);

    try {
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error(`Error: findShow(url) ${ response.status }`);
        }
    } catch (err) { console.error(err); }

};

/* creates the container that will host the app */
const createApp = () => {
    const app = document.createElement('div');
    app.id = "app";
    app.classList.add('app');

    return app;
};

/*allowing the user to request a new show from the api.*/
const displaySearchBar = () => {
    // I know, it does not do anything,
    // TODO: rearrange code to make use of this function
    // TODO: to add the item to the DOM.
    const searchDiv = `
        <div id="searchBar" class="search">
            <input type="text" id="search-term" name="search-bar" placeholder="Enter Show Name" />
            <button id="submit">Search</search>
        </div>
        `;
    return searchDiv;
};

const displayShow = async (query) => {
    if (!query) {
        query = 'Smackdown';
    }

    const data = await findShow(query);
    // console.log(data);
    const { name, image: { medium }, summary, _embedded: { seasons } } = data;
    // console.log(name);
    let html = `
        <img class="cover" src=${ medium } alt="${ name }" />
        <h2 class="title">${ name }</h2>
        <div class="summary">${ summary }</div>
        <div id="seasons" class="seasons"></div>
     `;
    document.getElementById('app').innerHTML = html;
    // console.log(medium)
    return seasons;
};

const displaySeasons = async (data) => {
    const seasonsDiv = document.getElementById('seasons');

    data.forEach(
        item => {
            let html = "";
            let { name, number, image } = item;

            if (!name) {
                /*at random, for some items, the api returns null or an empty string
                this would handle that using the name of the show, as the season name. */
                name = document.getElementsByClassName('title').item(0).textContent;
            }

            if (!image) {
                /*at random, for some items, the api returns null 
                or an empty string as URL for the image URL.
                This code block handles this. */
                image = document.getElementsByClassName('cover').item(0).src;
            } else {
                let { medium } = image;
                image = medium;
            }
            html = `<div class="season">
                    <img 
                        class="season-cover" src=${ image }
                    alt=${ name }/>
                    <p class="season-title">${ name }</p>
                    <p class="season-number">Season: ${ number }</p>
                </div>`;
            seasonsDiv.innerHTML += html;
        });
};

(
    async function () {
        let loaded = false;
        let query = "";
        const body = document.body;
        const app = createApp();
        const h1 = document.createElement('h1');
        const searchDiv = displaySearchBar();

        h1.classList.add('app-title');
        h1.innerText = "CSS Grid: TVMaze API";

        body.prepend(app);
        body.prepend(h1); // positions h1 as 1st element.
        h1.insertAdjacentHTML('afterend', searchDiv);

        // const ss = await displayShow();
        // displaySeasons(ss);

        const submitButton = document.getElementById('submit');
        submitButton.onclick = async () => {
            /* clear div, before show up a new show
            if (loaded) {
                const seasonsDiv = document.getElementById('seasons');
                seasonsDiv.innerHTML = "";
            } */
            const search = document.getElementById('search-term');
            query = search.value;
            // console.log(query);
            const ss = await displayShow(query);
            displaySeasons(ss);
            search.value = "";
        };
        // query
    }

)();