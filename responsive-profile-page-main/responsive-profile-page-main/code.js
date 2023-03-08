function myFunction(element) {
    if (element.innerHTML == 'Follow +')
    {
        element.innerHTML = 'Followed ✓';
        element.style.fontsize = '2vh';
    }
    else 
        element.innerHTML = 'Follow +'; 
  }
