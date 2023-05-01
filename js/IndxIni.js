
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open')
    //const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}


const popup = document.querySelector('.popup');
const close = document.querySelector('.close');
const acepto = document.querySelector('#boton');

window.onload = function (){
  setTimeout(function(){
    popup.style.display = "block"
  },2000)
}
  

close.addEventListener('click', () => {
    popup.style.display = "none";
});

acepto.addEventListener('click', () => {
  popup.style.display = "none";
});
setInterval(mostrarPopup, 500);