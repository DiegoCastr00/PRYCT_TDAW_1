function validarFormulario() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (email === "" || password.length < 6) {
      alert("Por favor, ingrese un correo electrónico válido y una contraseña con al menos 6 caracteres.");
      return false;
    }
    
    return true;
  }