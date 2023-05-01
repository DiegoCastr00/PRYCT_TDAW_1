function validarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    

    if ( usuario ==="" || email === "" || password.length < 6 ) {
      alert("Por favor, ingrese un usuario, correo electrónico válido y una contraseña con al menos 6 caracteres.");
      return false;
    }
    
    return true;
  }