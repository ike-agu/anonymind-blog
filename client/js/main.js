window.onload = initLoad;

function initLoad() {
  fetch("http://localhost:3000/posts/")
    .then((res) => res.json())
    .then((data) => {
      try {
        let templateData = data.posts.sort((a, b) => b.id - a.id);
        console.log(data);
        let template = Handlebars.compile(
          document.querySelector("#template--all").innerHTML
        );

        let filled = template(templateData);
        document.querySelector(".post-container").innerHTML = filled;
      } catch (error) {
        alert(error);
      }
    });
}
