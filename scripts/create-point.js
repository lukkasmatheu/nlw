//http://servicodados.ibge.gov.br/api/v2/malhas/{id}
// endereço api ibge
//document.querySelector("select[name=uf]").addEventListener("change",() =>{
  //  console.log("mudança")
//})


function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(resp=> resp.json())
    .then( date => {
        for(const dates of date){
            ufSelect.innerHTML+= `<option value="${dates.id}">${dates.nome}</option>`
        }
    })
}

populateUfs()

function getCity(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const id = event.target.value;
    const indexOfSelected = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelected].text
    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change",getCity)