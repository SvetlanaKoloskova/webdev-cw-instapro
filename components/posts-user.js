import { formatDistanceToNow } from "date-fns";
import { renderHeaderComponent } from "./header-component.js";

export function renderPostsUser({ appEl, postsUser }) {
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header">
            <img src="${postsUser[0].user.imageUrl}" class="posts-user-header__user-image">
            <p class="posts-user-header__user-name">${postsUser[0].user.name}</p>
        </div>
        <ul id="post" class="posts"></ul>
    </div>
    `
    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    document.getElementById("post").innerHTML = postsUser.map((post, index) => `
      <li class="post">
      <div class="post-image-container">
        <img class="post-image" src=${post.imageUrl}>
      </div>
      <div class="post-likes">
        <button data-post-id=${post.id} data-index="${index}" class="like-button">
          <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}"> 
        </button>
        <div>
        ${post.likes.length === 0 ?
            `<p class="post-likes-text"> Нравится: <strong>${post.likes.length}</strong> </p>` :
            `<p class="post-likes-text"> Нравится: <strong>${post.likes[post.likes.length - 1].name}</strong>
        ${post.likes.length === 1 ? "" :
                `и <strong>еще ${post.likes.length - 1}</strong>`}
              </p>`}
        </div>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${formatDistanceToNow(new Date(post.createdAt))} назад
      </p>
    </li>
  </ul>
</div>    
  `).join("");
}