const form  = document.querySelector('.form')

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let title = e.target[0].value;
  let name = e.target[1].value;
  let content = e.target[2].value;
  let postObject = {title, name, content};

  fetch('http://localhost:3000/posts',
  {method:'POST', body:JSON.stringify(postObject), headers: {
      "Content-Type": "application/json",
    }})
    .then(res => console.log(res))
    .catch(error => console.log(error))

})
