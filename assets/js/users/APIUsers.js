const form = document.querySelector(".newpostform");
const descriptionPost = document.querySelector(".newpostform textarea");
const imagePost = document.querySelector("#fileElem");

const profPhoto = document.querySelector("#profilePhoto");
const nameUser = document.querySelector("#nameUs");
const usu = document.querySelector("#user");
const followers = document.querySelector("#fllwers");
const following = document.querySelector("#fllwing");
const descrip = document.querySelector(".content p");

var url = new URL(window.location.href);
var searchParams = new URLSearchParams(url.search);
var userP = searchParams.get("u");
console.log(userP);

axios.get('http://localhost:8081/DisplayUsuario', {
  params: {
    user: userP 
  }
})
.then(response => {
  profPhoto.src = response.data[0].photo;
  profPhoto.alt = response.data[0].nombre;
  nameUser.textContent = response.data[0].nombre;
  usu.textContent = response.data[0].user;
  followers.textContent = response.data[0].followers;
  following.textContent = response.data[0].following;
  descrip.textContent = response.data[0].descripcion;
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});

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
        user: userP
      };

      axios
        .post("http://localhost:8081/createPost", postData)
        .then((response) => {
          confirm(response.data.message);
          form.reset(); // Restablecer el formulario después de enviarlo con éxito
          location.reload();// Restablecer el formulario después de enviarlo con éxito
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

const formUpdate = document.querySelector('#EditPhoto');
const biography = document.querySelector('#editDescription');
const NewPhotoUser = document.querySelector('#imageUpload');
const saveChangesButton = document.querySelector('#SaveChanges');

const spanActive = document.querySelector('#spanAct');
const editAvatar =  document.querySelector('#EditPhoto');
const des = document.querySelector('.content p');


saveChangesButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  alert('enviar');
  const veriImage = NewPhotoUser.files;
  if (veriImage.length > 0) {
    alert('hay imagen');
    const imageFile = veriImage[0];
    const formData = new FormData();
    alert(imageFile);
    formData.append("photo", imageFile);
    axios
      .post("http://localhost:8081/upload/profiles", formData)
      .then((response) => {
        const imageUrl = response.data.url;
        axios
          .post("http://localhost:8081/updateUserPhoto", { imageUrl, userP})
          .then((response) => {
            //confirm(response.data.message);
          })
          .catch((error) => {
            console.error(error);
            confirm("Ocurrió un error al guardar la imagen");
          });
      })
      .catch((error) => {
        console.error(error);
        confirm("Ocurrió un error al cargar la imagen");
      });
  }

  const description = biography.value;
  axios.post('http://localhost:8081/updateDescription', { description, userP })
    .then((response) => {
      console.log(response.data.message);
      location.reload();
      // Realizar acciones adicionales si es necesario
    })
    .catch((error) => {
      console.error(error);
      // Manejar el error de alguna manera
    });
    form.reset();
    saveChangesButton.style.display='none';
    spanActive.className = 'spanActive';
    editAvatar.className = 'avatar-editHide';
    des.style.display = 'block';
    biography.style.display = 'none';
    editBtn.style.display = 'inline';
});
