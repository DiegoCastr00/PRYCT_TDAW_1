function validarFormulario() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  const vaEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const vaPassword = /^.{6,12}$/;

  if (!vaEmail.test(email) || !vaPassword.test(password)) {
    alert("Por favor, ingrese un correo electrónico válido y una contraseña con al menos 6 caracteres.");
    return false;
  }

  return true;
}