import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';
import { likeDislikePost } from "./like-dislike-post.js";

export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);

  const appHtml = posts.map((post, index) => `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                  <li class="post">
                    <div class="post-header" data-user-id=${post.user.id}>
                        <img src=${post.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${post.user.name}</p>
                    </div>
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
                      ${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад
                    </p>
                  </li>
                </ul>
              </div>    
                `).join("");

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeEl of document.querySelectorAll(".like-button")) {
    isLike({
      id: likeEl.dataset.postId,
      index: likeEl.dataset.index,
      element: document.querySelectorAll(".post-likes")[likeEl.dataset.index]
    })
  }
}

export function isLike({ id, index, element }) {
  document.querySelectorAll(".like-button")[index].addEventListener("click", () => {
    likeDislikePost({ index, id, element })
  })
}
