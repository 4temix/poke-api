const $container = document.querySelector(".pokemon-container");
const $fragmento = document.createDocumentFragment();
const $loader = document.querySelector(".ld");
const $buttons = document.querySelector(".buttons");
const $main = document.querySelector(".main");

let pokemons = "https://pokeapi.co/api/v2/pokemon/";

async function pokeAPI(url) {
  $container.innerHTML = " ";
  $loader.style.visibility = "visible";
  try {
    let peticion = await fetch(url);
    let json = await peticion.json();
    let next;
    let prev;
    console.log(json.results);

    if (!peticion.ok)
      throw { status: peticion.status, statusText: peticion.statusText };
    console.time("");
    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = fetch(json.results[i].url)
          .then((result) => result.json())
          .then((ress) => {
            let $article = document.createElement("article");
            $article.classList.add("pokemon");

            $article.classList.add("col-lg-2");
            $article.innerHTML = `
                        <div class="pokemon-div">           
                            <img src="${ress.sprites.front_default}" alt="${ress.name}">
                            <p>${ress.name}</p>
                            <p class="type">${ress.types[0].type.name}</p>
                        </div>`;
            $container.appendChild($article);
          });
      } catch (error) {
        let err = error || "ups ocurrio un error";
        console.log(err);
      }
    }
    console.timeEnd("");

    $loader.style.visibility = "hidden";

    next = json.next ? `<a href="${json.next}" class="pag">siguiente</a>` : "";
    prev = json.previous
      ? `<a href="${json.previous}" class="pag">atras</a>`
      : "";

    $buttons.innerHTML = prev + "    " + next;
  } catch (error) {
    let err = error || "ups ocurrio un error";
    console.log(err);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.matches(".buttons a")) {
    e.preventDefault();

    pokeAPI(e.target.getAttribute("href"));
  }
});

document.addEventListener("DOMContentLoaded", (e) => pokeAPI(pokemons));
