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
for (let i = 0; i < 3; i++) {
    const column = document.createElement("div");
    column.className ="column";
    for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.alt ="photo "+ toString(i);
        img.className = "grilla";
        const randomNum = Math.floor(Math.random() * 25) + 1;
        console.log(randomNum);
        img.src = "/img/img" + randomNum + ".jpg";
        column.appendChild(img);
    }
    seccionimg.appendChild(column);
}


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
        img.src = datos[i].imagen;
        const name = document.createElement("div");
        name.className ="name-user";

        photo.appendChild(img);
        profile.appendChild(photo);
        profile.appendChild(name);
        top.appendChild(profile);
        test.appendChild(top);
        div.appendChild(test);
    }
    area.appendChild(div);
  })
  .catch(function (error) {
    console.log(error);
  });


  /*const test = document.createElement("div");
        test.className = "testimonial-box";

        const top = document.createElement("div");
        top.className = "box-top";
        
        const profile = document.createElement("div");
        profile.className = "profile";

        const photo = document.createElement("div");
        photo.className = "profile-img";

        const img = document.createElement("img");
        img.src = toString(datos[i].imagen);

        const name = document.createElement("div");
        name.className ="name-user";
        const namep = document.createElement("strong");
        namep.textContent = toString(datos[i].nombre);
        const user = document.createElement("span");
        user.textContent = toString(datos[i].usuario);
        const review = document.createElement("div");
        review.className = "reviews";
        for(i = 0; i < 4 ; i++){
            const star = document.createElement(i);
            star.className ="fas fa-star";
            review.appendChild(star);
        }
        const text = document.createElement("div");
        text.className =  "client-comment";
        const content = document.createElement("p");
        content.textContent= toString(datos[i].comentario);

        photo.appendChild(img);

        name.appendChild(namep);
        name.appendChild(user);

        profile.appendChild(photo);
        profile.appendChild(name);

        top.appendChild(profile);
        top.appendChild(review);

        test.appendChild(top);
        test.appendChild(text);
        
        area.appendChild(test);
        
        /*<div class="testimonial-box">
                    <!--top------------------------->
                    <div class="box-top">
                        <!--profile----->
                        <div class="profile">
                            <!--img---->
                            <div class="profile-img">
                                <img src="images/c-4.jpg" />
                            </div>
                            <!--name-and-username-->
                            <div class="name-user">
                                <strong>Oliva</strong>
                                <span>@Olivaadward</span>
                            </div>
                        </div>
                        <!--reviews------>
                        <div class="reviews">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i><!--Empty star-->
                        </div>
                    </div>
                    <!--Comments---------------------------------------->
                    <div class="client-comment">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
                    </div>
                </div>*/