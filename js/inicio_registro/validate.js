function validarFormulario(email, password) {
  const vaEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const vaPassword = /^.{6,12}$/;

  if (!vaEmail.test(email) || !vaPassword.test(password)) {
    alert("Por favor, ingrese un correo electrónico válido y una contraseña con al menos 6 caracteres.");
    return false;
  }

  return true;
}

// Función para iniciar sesión
const iniciarSesion = async (correo, contrasena) => {
  try {
    const respuesta = await axios.post('http://localhost:8081/LogIn', { correo, contrasena });
    return respuesta.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener referencia al formulario de inicio de sesión
const formulario = document.querySelector('.ingresoUsu form');

// Manejar el envío del formulario
formulario.addEventListener('submit', async (event) => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value; 
  console.log(email);
  console.log(password);
  //if (validarFormulario(email, password)){
    try{
      const { user } = await iniciarSesion(email, password);
      console.log(user);
      // Autenticación exitosa, redireccionar a otra página con el ID del usuario en la URL
      window.location.href = `../../scroll.html?id=${user}`;
    } catch (error) {
      // Error en la autenticación, manejar el error
      console.error(error);
    }
    
  //}
});

