const submitPost = document.querySelector("#submitbtn");
const descriptionPost = document.querySelector(".newpostform textarea");
const imagePost = document.querySelector("#fileElem");
submitPost.addEventListener("click", (event) => {
  event.preventDefault();
  const imagePost = document.querySelector("#fileElem").files[0];
  const formData = new FormData();
  formData.append("photo", imageFile);
  axios
    .post("/upload", formData)
    .then((response) => {
      // Obtener la URL de la imagen cargada
      const imageUrl = response.data.url;

      // Obtener el texto del post
      const postText = document.getElementById("postText").value;

      // Crear un objeto con los datos del formulario
      const postData = {
        imageUrl: imageUrl,
        postText: postText,
      };
      
      axios
        .post("/createPost", postData)
        .then((response) => {
          // Mostrar un mensaje de éxito
          alert(response.data.message);
        })
        .catch((error) => {
          // Mostrar un mensaje de error
          alert("Ocurrió un error al crear el post");
          console.error(error);
        });
    })
    .catch((error) => {
      // Mostrar un mensaje de error
      alert("Ocurrió un error al cargar la imagen");
      console.error(error);
    });
});
