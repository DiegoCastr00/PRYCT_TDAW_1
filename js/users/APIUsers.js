const form = document.querySelector(".newpostform");
const descriptionPost = document.querySelector(".newpostform textarea");
const imagePost = document.querySelector("#fileElem");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const imageFile = imagePost.files[0];
  const formData = new FormData();
  formData.append("photo", imageFile);

  axios
    .post("http://localhost:8081/upload", formData)
    .then((response) => {
      const imageUrl = response.data.url;
      const postText = descriptionPost.value;
      descriptionPost.value = "";
      const postData = {
        imageUrl: imageUrl,
        postText: postText,
      };

      axios
        .post("http://localhost:8081/createPost", postData)
        .then((response) => {
          confirm(response.data.message);
          form.reset(); // Restablecer el formulario después de enviarlo con éxito
           // Restablecer el formulario después de enviarlo con éxito
        })
        .catch((error) => {
          console.error(error);
          confirm("Ocurrió un error al crear el post");
        });
    })
    .catch((error) => {
      console.error(error);
      confirm("Ocurrió un error al cargar la imagen");
    });
});
