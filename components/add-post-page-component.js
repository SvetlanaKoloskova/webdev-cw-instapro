import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { uploadNewPost } from "../api.js";
import { getToken } from "../index.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  appEl.innerHTML = `
  <div class="page-container">
    <div class="header-container"></div>
    <h3 class="form-title">Добавить пост</h3>
    <div class="form-inputs">
      <div class="upload-image-container">
      </div>
          Опишите фотографию:
          <textarea id="text-textarea" class="input textarea" rows="4"></textarea>
          <button class="button" id="add-button">Добавить</button>
    </div>
    </div>
  </div>  
`;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  renderUploadImageComponent({
    element: appEl.querySelector(".upload-image-container"),
    onImageUrlChange(newImageUrl) {
      imageUrl = newImageUrl;
    },
  });

  document.getElementById("add-button").addEventListener("click", () => {

    if (!imageUrl) {
      alert("Выберите фото");
      return;
    }

    if (!document.getElementById("text-textarea").value) {
      alert("Добавьте описание фотографии");
      return;
    }

    uploadNewPost({
      description: document.getElementById("text-textarea").value
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;"),
      imageUrl: imageUrl,
      token: getToken(),
    })
      .then(() => {
        return onAddPostClick();
      })
      .catch((error) => {
        console.warn(error);
      });
  });
};