let abrirmenu  = document.getElementById("btn-menu")
let menuMobile = document.getElementById("menu-mobile")
let overlay = document.getElementById('overlay-menu')

abrirmenu.addEventListener('click',()=>{

menuMobile.classList.add('abrir-menu')

})

menuMobile.addEventListener('click',()=>{

    menuMobile.classList.remove('abrir-menu')

})

overlay.addEventListener('click',()=>{

    menuMobile.classList.remove('abrir-menu')

})


