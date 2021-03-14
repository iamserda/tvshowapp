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

const findShow = async (query) => {
    const embed = "&embed=seasons";
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${ query }${ embed }`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Error: findShow(url) ${ response.status }`);
        }
    } catch (err) {
        console.error(err);
    }
};

const createApp = () => {
    const app = document.createElement("div");
    app.id = "app";
    app.classList.add("app");

    return app;
};

const displayShow = async () => {
    const data = await findShow("Smackdown");
    console.log(data);
    const {
        name,
        image: { medium },
        summary,
        _embedded: { seasons },
    } = data;
    console.log(data);
    let html = `
                <div class='showHeader title'>
                    <img class="cover" href=${ medium } alt="someAltName: ${ name }" />
                    <h3 class="show-title">${ name }</h3>
                </div>
                <div class="summary">${ summary }</div>
                <div class="seasons"></div>
             `;
    document.getElementById("app").innerHTML = html;
    console.log(medium);
    return seasons;
};

// const displaySeasons = async (data) => {
//     //   const seasonsDiv = document.getElementById("seasons");
//     //   console.log(seasonsDiv);
//     //   console.log(data[1]);
//     //   data.forEach((item) => {
//     //     const { name, number, image } = item;
//     //     if (!name) {
//     //       name = document.getElementById("title").innerText;
//     //     }
//     //     if (!image) {
//     //       // let imgElement = document.getElementsByClassName('showHeader').item(0);
//     //       // image = imgElement.href;
//     //       image = "576808.jpg";
//     //     }
//     //     console.log(name, number, image);
//     //     const html = `
//     //             <div class="season">
//     //                 <img class="cover" href=${image}/>
//     //                 <p class"title">${name}</p>
//     //                 <p class"title">Season: ${name}</p>
//     //             </div>
//     //            `;
//     //     seasonsDiv.innerHTML += html;
//     //   });
// };

(async function () {
    const app = createApp();
    document.getElementById('main').appendChild(app);
    //   const main = document.getElementById("main");
    //   const app = createApp();
    //   main.prepend(app);
    //   const ss = await displayShow();
    //   displaySeasons(ss);
})();
