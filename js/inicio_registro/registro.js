function validarFormulario() {
  const nombre = document.getElementById("nombre").value;
  const usuario = document.getElementById("usuario").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  let vaEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let vaNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/
  let vaUsuario = /^[a-zA-Z0-9\_\-]{6,10}$/
  let vaPassword = /^.{6,12}$/ 

   if(!vaNombre.test(nombre)){
     alert("El nombre es obligatorio");
     }

  if ( !vaUsuario.test(usuario) || !vaEmail.test(email) || !vaPassword.test(password2)) {
    console.log("mensaje")
    alert("Por favor, ingrese un usuario, correo electrónico válido y una contraseña con al menos 6 caracteres.");
    return false;
  }
  if (password != password2) {
    alert("Las contraseñas no coinciden.");
    return false;
    }
  return true;
}