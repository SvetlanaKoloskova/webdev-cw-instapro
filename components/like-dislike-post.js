import { likePost, dislakePost, getPosts } from "../api.js";
import { posts, getToken, user, newPosts } from "../index.js";
import { isLike } from "./posts-page-component.js"

export function likeDislikePost({ id, index, element }) {
    if (!user) {
        alert("Для того, чтобы поставить лайк, авторизируйтесь")
        return;
    }

    document.querySelectorAll(".like-button")[index].classList.add("-loading-like");
    document.querySelectorAll(".like-button")[index].disabled = true;

    if (!posts[index].isLiked) {
        likePost({ id, token: getToken() })
            .then(() => {
                return getPosts({ token: getToken() })
            })
            .then((newPost) => {
                element.innerHTML = `
                    <button data-index="${index}" data-post-id="${newPost[index].id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                    </button>
                    ${newPost[index].likes.length === 0
                        ? ` <p class="post-likes-text">
                              Нравится: <strong>${newPost[index].likes.length}</strong>
                            </p>`
                        : ` <p class="post-likes-text">
                              Нравится: <strong>${newPost[index].likes[newPost[index].likes.length - 1].name}</strong>
                            ${newPost[index].likes.length === 1
                            ? ""
                            : `и <strong>еще ${newPost[index].likes.length - 1}</strong>`}
                            </p>`}
                    `
                return newPost;
            })
            .then((newPost) => {
                isLike({ id, index, element });
                return newPosts(newPost);
            })
    }

    if (posts[index].isLiked) {
        dislakePost({ id, token: getToken() })
            .then(() => {
                return getPosts({ token: getToken() })
            })
            .then((newPost) => {
                element.innerHTML = `
                    <button data-index="${index}" data-post-id="${newPost[index].id}" class="like-button">
                        <img src="./assets/images/like-not-active.svg">
                    </button>
                    ${newPost[index].likes.length === 0
                        ? ` <p class="post-likes-text">
                              Нравится: <strong>${newPost[index].likes.length}</strong>
                            </p>`
                        : ` <p class="post-likes-text">
                              Нравится: <strong>${newPosts[index].likes[newPost[index].likes.length - 1].name}</strong>
                            ${newPost[index].likes.length === 1
                            ? ""
                            : `и <strong>еще ${newPost[index].likes.length - 1}</strong>`}
                            </p>`}
                    `
                return newPost;
            })
            .then((newPost) => {
                isLike({ id, index, element });
                return newPosts(newPost);
            })
    }
}