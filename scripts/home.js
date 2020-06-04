const buttonSearch = document.querySelector("#page-home main a")

const model = document.querySelector("#modal")

const close= document.querySelector("#modal .header a")

buttonSearch.addEventListener("click",()=>{
    model.classList.toggle("hide")
} )

close.addEventListener("click", ()=>{
    close.classList.add("hide")
})