    const img = document.getElementById("image-url");
    const text = document.getElementById("image-description");
    const btn = document.getElementById("submit");
    const display = document.getElementById("posts-container");
    const apiImages = "https://68219a91259dad2655afc3cc.mockapi.io/api/users/image";

    const username = localStorage.getItem("username_key");
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const imageUrl = img.value.trim();
      const postText = text.value.trim();
 try {
  const response = await fetch(apiImages, {
     method: "POST",
       headers: { "Content-Type": "application/json" },
body: JSON.stringify({
    imageUrl,
    text: postText,
    username,
    comment: [],
}),
});

await response.json();
    img.value = "";
    text.value = "";
getPosts();
} catch (err) {
 console.error(err);
      }
});

async function getPosts() {
try {
const res = await fetch(apiImages);
const posts = await res.json();
displayPosts(posts.reverse());
} catch (err) {
        console.error( err);
    }
    }
function displayPosts(posts) {
  display.innerHTML = "";
  posts.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.style.width = "18rem";

    const user = document.createElement("p");
    user.className = "card-text text-muted m-2";
    user.innerText = `Posted by: ${item.username}`;

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.className = "card-img-top rounded-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column justify-content-between";
    cardBody.style.minHeight = "100px"; 

    const title = document.createElement("p");
    title.className = "card-text";
    title.innerText = item.text;

    const commentIcon = document.createElement("i");
    commentIcon.className = "fa-regular fa-comment";
    commentIcon.style.cursor = "pointer";
    commentIcon.addEventListener("click", () => {
  window.location.href = `postComment.html?id=${item.id}`;
});

    const cardTop = document.createElement("div");
    cardTop.appendChild(title);
    cardTop.appendChild(commentIcon);

    const cardBottom = document.createElement("div");

    if (item.username === username) {
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-danger mt-2";
      deleteBtn.innerText = "Delete Post";
      deleteBtn.onclick = () => deletePost(item.id);
      cardBottom.appendChild(deleteBtn);
    }

    cardBody.appendChild(cardTop);
    cardBody.appendChild(cardBottom);

    card.appendChild(user);
    card.appendChild(img);
    card.appendChild(cardBody);
    display.appendChild(card);
  });
}


 async function deletePost(postId) {
      const confirmDelete = confirm("Are you sure you want to delete this post?");
      if (confirmDelete) {
        try {
          const response = await fetch(`${apiImages}/${postId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            alert("Post Deleted");
            getPosts(); 
          } 
        } catch (err) {
          console.error( err);
        }
      }
    }
 function logout() {
  alert("are you sure want to log out?")
      localStorage.removeItem("username_key");
      alert("Loged out successfully!");
      window.location.href = "login.html";
    }

    getPosts();