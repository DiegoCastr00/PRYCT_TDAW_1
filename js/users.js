function myFunction(element) {
    if (element.innerHTML == 'Follow +')
    {
        element.innerHTML = 'Followed ✓';
        element.style.fontsize = '2vh';
    }
    else 
        element.innerHTML = 'Follow +'; 
  }

const seccionimg = document.querySelector(".row");
for (let i = 1; i < 5; i++) {
    const column = document.createElement("div");
    column.className ="column";
    for (let j = 1; j <5; j++) {
        const img = document.createElement("img");
        img.alt ="photo "+ j;
        img.className = "grilla";
        const randomNum = Math.floor(Math.random() * 25) + 1;
        img.src = "/img/img" + randomNum + ".jpg";
        column.appendChild(img);
    }
    seccionimg.appendChild(column);
}

const portada = document.querySelector(".header__wrapper header");
portada.style.background = 'url("/img/img'+(Math.floor(Math.random() * 25) + 1)+'.jpg") no-repeat 50% 20% / cover'; // Modifica la propiedad CSS


const area = document.querySelector(".sectionC");

axios.get('/json/comments.json')
  .then(function (response) {
    const datos = response.data;
    const div = document.createElement("div");
    for (var i in datos) { 
        console.log("pq");
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
        name.className ="name-user";
        const namep = document.createElement("strong");
        namep.textContent = datos[i].nombre;
        const user = document.createElement("span");
        user.textContent =datos[i].usuario;
        const review = document.createElement("div");
        const text = document.createElement("div");
        text.className =  "client-comment";
        const content = document.createElement("p");
        content.textContent = datos[i].comentario;
        review.className = "reviews";
        for(i = 0; i < (Math.floor(Math.random() * 5) + 1) ; i++){
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