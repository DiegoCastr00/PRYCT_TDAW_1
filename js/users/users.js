function myFunction(element) {
  if (element.innerHTML == 'Follow +') {
    element.innerHTML = 'Followed ✓';
    element.style.fontsize = '2vh';
  }
  else
    element.innerHTML = 'Follow +';
}

const seccionimg = document.querySelector(".row");
for (let i = 1; i < 5; i++) {
  const column = document.createElement("div");
  column.className = "column";
  for (let j = 1; j < 5; j++) {
    const img = document.createElement("img");
    img.alt = "photo " + j;
    img.className = "grilla";
    const randomNum = Math.floor(Math.random() * 25) + 1;
    img.src = "/img/img" + randomNum + ".jpg";
    column.appendChild(img);
  }
  seccionimg.appendChild(column);
}

const portada = document.querySelector(".header__wrapper header");
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
