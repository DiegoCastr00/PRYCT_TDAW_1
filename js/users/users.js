//New tabs function 
var tabButtons=document.querySelectorAll(".tabContainer .buttonContainer button");
var tabPanels=document.querySelectorAll(".tabContainer  .tabPanel");

function showPanel(panelIndex) {
    tabButtons.forEach(function(node){
        node.style.backgroundColor="";
        node.style.color="";
    });
    tabButtons[panelIndex].style.backgroundColor='white';
    tabButtons[panelIndex].style.color='rgb(46, 46, 46';
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    tabPanels[panelIndex].style.display="block";
    //tabPanels[panelIndex].style.backgroundColor='';
}
showPanel(0,'#f44336');

/*First version*/
function myFunction(element) {
  if (element.innerHTML == 'Follow +') {
    element.innerHTML = 'Followed ✓';
    element.style.fontsize = '2vh';
  }
  else
    element.innerHTML = 'Follow +';
}
/*Second version*/
const seccionimg = document.querySelector(".row");
const listaimg = document.createElement("ul");
listaimg.className = "listaI";
  for (let j = 1; j < 31; j++) {
    const pimg = document.createElement("li");
    pimg.className = "imglist";
    const img = document.createElement("img");
    
    img.className = "imgFavs";
    const randomNum = Math.floor(Math.random() * 25) + 1;
    img.src = "/img/img" + randomNum + ".jpg";
    img.alt = "photo " + j;
    pimg.appendChild(img);
    listaimg.appendChild(pimg);
  }
seccionimg.appendChild(listaimg);

// for (let i = 1; i < 5; i++) {
//   const column = document.createElement("div");
//   column.className = "column";
//   for (let j = 1; j < 6; j++) {
//     const img = document.createElement("img");
//     img.alt = "photo " + j;
//     img.className = "grilla";
//     const randomNum = Math.floor(Math.random() * 25) + 1;
//     img.src = "/img/img" + randomNum + ".jpg";
//     column.appendChild(img);
//   }
//   seccionimg.appendChild(column);
// }

const portada = document.querySelector("header");
portada.style.background = 'url("/img/img' + (Math.floor(Math.random() * 25) + 1) + '.jpg") no-repeat 50% 20% / cover'; // Modifica la propiedad CSS


const area = document.querySelector(".sectionC");

axios.get('/json/comments.json')
  .then(function (response) {
    createForm();
    send();
    const datos = response.data;
    const div = document.createElement("div");
    for (var i in datos) {
      const test = document.createElement("div");
      test.className = "testimonial-box";
      const top = document.createElement("div");
      top.className = "box-top";
      const profile = document.createElement("div");
      profile.className = "profile";
      const photo = document.createElement("div");
      photo.className = "profile-img";
      const img = document.createElement("img");
      const randomNum = Math.floor(Math.random() * 25) + 1;
      img.src = "/img/img" + randomNum + ".jpg";
      const name = document.createElement("div");
      name.className = "name-user";
      const namep = document.createElement("strong");
      namep.textContent = datos[i].nombre;
      const user = document.createElement("span");
      user.textContent = datos[i].usuario;
      const review = document.createElement("div");
      const text = document.createElement("div");
      text.className = "client-comment";
      const content = document.createElement("p");
      content.textContent = datos[i].comentario;
      review.className = "reviews";
      for (i = 0; i < (Math.floor(Math.random() * 5) + 1); i++) {
        const star = document.createElement("i");
        star.className = "fas fa-star";
        review.appendChild(star);
      }
      text.appendChild(content);
      name.appendChild(namep);
      name.appendChild(user);
      photo.appendChild(img);
      profile.appendChild(photo);
      profile.appendChild(name);
      top.appendChild(profile);
      top.appendChild(review)
      test.appendChild(top);
      test.appendChild(text);
      div.appendChild(test);
    }
    area.appendChild(div);
  })
  .catch(function (error) {
    console.log(error);
  });


function createForm() {
  const test = document.createElement("div");
  test.className = "testimonial-box";
  const top = document.createElement("div");
  top.className = "box-top";
  const rate = document.createElement("div");
  rate.className = "rate";
  for (let i = 5; i >= 1; i--) {
    const input = document.createElement("input");
    input.type = "radio";
    input.id = "star" + i;
    input.name = "rate";
    input.value = i;
    const label = document.createElement("label");
    label.htmlFor = "star" + i;
    label.title = "text";
    label.textContent = i + " stars";
    rate.appendChild(input);
    rate.appendChild(label);
  }
  const content = document.createElement("p");
  content.textContent = "Haz un comentario";
  content.style.color = "white";
  content.style.marginTop = "1rem";
  content.style.width = "20%";
  const name = document.createElement("div");
  name.className = "name-user";
  const text = document.createElement("div");
  text.className = "textarea";
  const textA = document.createElement("textarea");
  textA.style.width = "100%"
  textA.placeholder = " Describe tu experiencia";
  const btnS = document.createElement("div");
  btnS.className = "btn";
  const btnA = document.createElement("button");
  btnA.type = "submit";
  btnA.textContent = "Post";
  btnS.appendChild(btnA);
  text.appendChild(textA);
  top.appendChild(content);
  top.appendChild(rate);
  test.appendChild(top);
  test.appendChild(text);
  test.appendChild(btnS);
  area.append(test);
}

function send() {
  const bntSubmit = document.querySelector(".btn button");

  bntSubmit.addEventListener("click", function () {
    const textA = document.querySelector(".textarea textarea");
    const proName = document.querySelector(".left__col h2");
    const proUser = document.querySelector(".left__col p:nth-child(3)");
    const photoU = document.querySelector(".img__container img");
    const botonesDeRadio = document.querySelectorAll('input[type=radio][name=rate]');
    const div = document.createElement("div");
    const test = document.createElement("div");
    test.className = "testimonial-box";
    const top = document.createElement("div");
    top.className = "box-top";
    const profile = document.createElement("div");
    profile.className = "profile";
    const photo = document.createElement("div");
    photo.className = "profile-img";
    const img = document.createElement("img");
    img.src = photoU.src;
    const name = document.createElement("div");
    name.className = "name-user";
    const namep = document.createElement("strong");
    namep.textContent = proName.textContent;
    const user = document.createElement("span");
    user.textContent = proUser.textContent;
    const review = document.createElement("div");
    const text = document.createElement("div");
    text.className = "client-comment";
    const content = document.createElement("p");
    content.textContent = textA.value;
    review.className = "reviews";
    botonesDeRadio.forEach((botonDeRadio) => {
      if (botonDeRadio.checked) {
        for (i = 0; i < botonDeRadio.value ; i++) {
          const star = document.createElement("i");
          star.className = "fas fa-star";
          review.appendChild(star);
        }
      }
    });
    text.appendChild(content);
    name.appendChild(namep);
    name.appendChild(user);
    photo.appendChild(img);
    profile.appendChild(photo);
    profile.appendChild(name);
    top.appendChild(profile);
    top.appendChild(review)
    test.appendChild(top);
    test.appendChild(text);
    div.appendChild(test);
    area.appendChild(div);

    botonesDeRadio.forEach((botonDeRadio) => {
      botonDeRadio.checked = false;
    });
    textA.value = "";
    alert("Se ha publicado su comentario correctamente");
  });

}


// Edit profile photo
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          document.querySelector('.img__container img').src =  e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
  }
}

document.getElementById('imageUpload').addEventListener('change', function() {
  readURL(this);
});


///
/*if user == principal {
}
query selector ('.header__wrapper .cols__container .left__col .img__container span')
background = none
border = none*/


//Drag and drop
const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  dropArea.classList.remove('highlight');
  const fileList = event.dataTransfer.files;
  handleFiles(fileList);
});

const fileElem = document.getElementById('fileElem');
fileElem.addEventListener('change', (event) => {
  const fileList = event.target.files;
  handleFiles(fileList);
});

function handleFiles(fileList) {
  const gallery = document.getElementById('imagenp');
  gallery.innerHTML = '';
  const file = fileList[0];
  if (!file.type.startsWith('image/')){ return }
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  gallery.appendChild(img);
  const instructions = document.querySelector('#drop-area p');
  instructions.style.display = 'none';
}


//Show edit areas
const editBtn = document.querySelector('#EditUser');
editBtn.addEventListener('click', function(e) {
    const spanActive = document.querySelector('#spanAct');
    const editAvatar =  document.querySelector('#EditPhoto');
    const description = document.querySelector('.content p');
    const editDescription = document.querySelector('#editDescription');
    const saveChanges = document.querySelector('#SaveChanges');
    if(spanActive.className == 'spanActive'){
        spanActive.className = 'spanActiveHide';
        editAvatar.className = 'avatar-edit';
        description.style.display = 'none';
        editDescription.value = (description.innerHTML
          .replace(/\s+/g, ' ')
          .replace(/<br>/g, '\n')).trim();
        editDescription.style.display = 'block';
        editBtn.style.display = 'none';
        saveChanges.syle.display = 'block';
    }
    else{
      spanActive.className = 'spanActive';
      editAvatar.className = 'avatar-editHide';
      description.style.display = 'block';
      editDescription.style.display = 'none';
      editBtn.style.display = 'block';
      saveChanges.syle.display = 'none';
    }
})