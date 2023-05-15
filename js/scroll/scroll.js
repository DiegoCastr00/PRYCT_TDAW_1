fetch('json/scroll.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("container");
    data.sort(() => Math.random() - 0.5);
    data.forEach(image => {
    // Creamos una seccion que englobara toda una pantalla y se asignamos un nombre
      const imgContainer = document.createElement('section');
      imgContainer.className = 'container__img';

      //le agregamos un estilo donde se le agrega la imagen como fondo de pantalla
      imgContainer.style.backgroundImage = `url(${image.url})`;

      // se crea un div donde tendra el autor 
      const autor = document.createElement('div');
      autor.className = 'container__autor';

      // Agregamos un span con el nombre del autor
      const autorname = document.createElement('span');
      autorname.textContent = image.autor;
      // le damos jerarquia al span 
      autor.appendChild(autorname);
      
      const container__description = document.createElement('div');
      container__description.className = 'container__description';
      const descripcion = document.createElement('p');
      descripcion.textContent = image.descripcion;
      container__description.appendChild(descripcion);


      const navbarOptions = document.createElement('div');
      navbarOptions.className = 'container__navbar';


      const photo_user = document.createElement('div');
      photo_user.className = 'container__navbar-photouser';
      navbarOptions.appendChild(photo_user);

      const user = document.createElement('a');
      var hre = image.profile.url;
      user.href = hre;
      const user_profile = document.createElement('img');
      user_profile.setAttribute("src", image.profile.image );
      photo_user.appendChild(user);
      user.appendChild(user_profile);

      const likes = document.createElement('div');
      likes.className = 'container__navbar-likes';
      navbarOptions.appendChild(likes);

      const ico_heart = document.createElement('span');
      ico_heart.className = 'bx bxs-heart';
      likes.appendChild(ico_heart);
      const no_like = document.createElement('p');
      no_like.textContent = image.likes;
      let likeCount = parseInt(image.likes);
  
      likes.addEventListener('click', () => {
        if (likes.classList.contains('liked')) {
          likeCount -= 1;
        } else {
          likeCount += 1;
        }
        no_like.textContent = likeCount;
        likes.classList.toggle('liked');
      });


      ico_heart.addEventListener("click", function() {
        ico_heart.classList.toggle("active");
      });

      likes.appendChild(no_like);
      const share = document.createElement('div');
      share.className = 'container__navbar-share';
      navbarOptions.appendChild(share);
      const ico_share = document.createElement('span');
      ico_share.className = 'bx bx-share';
      share.appendChild(ico_share);
      const no_share = document.createElement('p');
      no_share.textContent = image.share;
      share.appendChild(no_share);

      const comments = document.createElement('div');
      comments.className = 'container__navbar-chat';
      navbarOptions.appendChild(comments);
      const ico_chat = document.createElement('span');
      ico_chat.className = 'bx bx-chat';
      comments.appendChild(ico_chat);
      const no_comment = document.createElement('p');
      no_comment.textContent = image.comments;
      comments.appendChild(no_comment);

      // le damos jerarquia al documento 
      imgContainer.appendChild(container__description);
      imgContainer.appendChild(navbarOptions);  
      imgContainer.appendChild(autor);
      container.appendChild(imgContainer);
    });
  })
  .catch(error => console.error(error));


  