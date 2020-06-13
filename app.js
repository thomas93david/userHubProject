const BASE_URL = `https://jsonplace-univclone.herokuapp.com/users`;

function fetchUsers() {
  return fetch(BASE_URL)
    .then(function (res) {
      return res.json(); // call json on the response, and return the result//
    })
    .catch(function (error) {
      console.error("Uh-Oh..."); // use console.error to log out any error//
    });
}

function renderUser(user) {
  const renderUsers = $(`<div class="user-card">
  <header>
    <h2> ${user.name} </h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b> ${user.phone} ${user.email} </p>
    <p><b>Works for:</b> Romaguera-Crona</p>
    <p><b>Company creed:</b> "${user.company.catchPhrase} which will ${user.company.bs} !"</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY ${user.username} </button>
    <button class="load-albums">ALBUMS BY ${user.username} </button>
  </footer>
</div>`);
  renderUsers.data("users", user);
  return renderUsers;
}

function renderUserList(userList) {
  $("#user-list").empty();
  userList.forEach(function (user) {
    $("#user-list").append(renderUser(user));
  });
}

function bootstrap() {
  fetchUsers().then(renderUserList);
}

$("#user-list").on("click", ".user-card .load-posts", function () {
  const user = $(this).closest(".user-card").data("users");
  // console.log(user);
  //   fetchUserPosts(user.id).then(renderPostList);
});

$("#user-list").on("click", ".user-card .load-albums", function () {
  const user = $(this).closest(".user-card").data("users");
  // console.log(user);
  //   fetchUserAlbumList(user.id).then(renderAlbumList);
});

/* get an album list, or an array of albums */
function fetchUserAlbumList(userId) {
  fetch(`${BASE_URL}/users/${userId}/albums`)
    .then(function (response) {
      console.log(response);
      return JSON.parse(response); // convert from JSON to an object, and return
    })
    .catch(function (error) {
      console.error(error);
      //console.error out the error
    });
}

// function fetchUserAlbumList(userId) {
//   fetch(`${BASE_URL}/users/${userId}/albums`)
//     .then(function(response) {
//       console.log(response);
//       return json.parse(response);
//     })
//     .catch(function(error) {
//       console.error(error);
//     });
// }

fetchUserAlbumList(1);

// /* render a single album */
// function renderAlbum(album) {

// }

// /* render a single photo */
// function renderPhoto(photo) {

// }

// /* render an array of albums */
// function renderAlbumList(albumList) {

// }

bootstrap();

// fetchUsers().then(function (data) {
//   renderUserList(data);
// });
