const popup = document.querySelector('.popup');
const close = document.querySelector('.close');

function mostrarPopup() {
  popup.style.display = 'flex';
}

close.addEventListener('click', () => {
  popup.style.display = 'none';
});

setInterval(mostrarPopup, 30000);

function actualizarHora() {
  let fecha = new Date();
  let hora = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();

  hora = 23 - hora;
  minutos = 59 - minutos;
  segundos = 59 - segundos

  hora = (hora < 10) ? '0' + hora : hora;
  minutos = (minutos < 10) ? '0' + minutos : minutos;
  segundos = (segundos < 10) ? '0' + segundos : segundos;

  document.getElementById('current-date').innerHTML = fecha.toLocaleDateString();
  document.getElementById('countdown-hours').innerHTML = hora;
  document.getElementById('countdown-minutes').innerHTML = minutos;
  document.getElementById('countdown-seconds').innerHTML = segundos;
}

actualizarHora();
setInterval(actualizarHora, 1000);
