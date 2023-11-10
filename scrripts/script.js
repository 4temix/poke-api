const $container = document.querySelector(".pokemon-container")
const $fragmento = document.createDocumentFragment()
const $loader = document.querySelector(".ld")
const $buttons = document.querySelector(".buttons")
const $main = document.querySelector(".main")

let pokemons = "https://pokeapi.co/api/v2/pokemon/"


async function pokeAPI(url){
    $container.innerHTML=" "
    $loader.style.visibility = "visible"
    try {
        let peticion = await fetch(url)
        let json = await peticion.json()
        let next;
        let prev;
        console.log(json)
        
        if(!peticion.ok) throw {status: peticion.status, statusText: peticion.statusText}
         
        for (let i = 0; i < json.results.length; i++) {
            try {
                let res = await fetch(json.results[i].url)
                // let pokemon = await res.json()
                // if(!peticion.ok) throw {status: peticion.status, statusText: peticion.statusText}
                .then(result=> result.json())
                .then(ress=>{

                    let $article = document.createElement("article")
                    $article.classList.add("pokemon")  
    
                    $article.classList.add("col-lg-2")
                    $article.innerHTML = 
                    `
                        <div class="pokemon-div">           
                            <img src="${ress.sprites.front_default}" alt="${ress.name}">
                            <p>${ress.name}</p>
                            <p class="type">${ress.types[0].type.name}</p>
                        </div>`
                    $fragmento.appendChild($article)
                    console.log(ress.types[0].type)
                })
                

                // let $article = document.createElement("article")
                // $article.classList.add("pokemon")

                // $article.classList.add("col-lg-2")
                // $article.innerHTML = 
                // `
                //     <div class="pokemon-div">           
                //         <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                //         <p>${pokemon.name}</p>
                //     </div>`
                // $fragmento.appendChild($article)
                // $container.insertAdjacentElement("beforeend",$article)

            } catch (error) {
                let err = error || "ups ocurrio un error"
                console.log(err)
            }
            
        }



        $container.appendChild($fragmento)
        $loader.style.visibility = "hidden"

        next = json.next ? `<a href="${json.next}">siguiente</a>`: ""
        prev = json.previous ? `<a href="${json.previous}">atras</a>`: ""

        $buttons.innerHTML = prev +"    "+ next
            

    } catch (error) {
        let err = error || "ups ocurrio un error"
        console.log(err)
    }


}

document.addEventListener("click", (e)=>{
    if(e.target.matches(".buttons a")){
        e.preventDefault()

        pokeAPI(e.target.getAttribute("href"))
    }
})


document.addEventListener("DOMContentLoaded", (e)=> pokeAPI(pokemons))

