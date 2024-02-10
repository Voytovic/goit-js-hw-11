
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputRef = document.querySelector('#searchInput');
const btnRef = document.querySelector('button[type="submit"]');
const formRef = document.querySelector('.js-form');
const galleryRef = document.querySelector('.gallery');
const loaderRef = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

btnRef.addEventListener('click', onButtonSubmit);

function onButtonSubmit(e) {
  e.preventDefault();
  const value = inputRef.value.trim();
  if (!value) return;
  loaderRef.classList.add('is-shown');
  formRef.reset();
  getPhotos(value)
    .then(photos => {
      if (!photos.hits.length) {
        iziToast.error({
          title: 'Sorry',
          message:
            'There are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      } else {
        loaderRef.classList.remove('is-shown');
        renderPhotos(photos.hits);
      }
    })
    .catch(error => {
      console.error('Помилка:', error);
    });
}

function getPhotos(data) {
  const url = `https://pixabay.com/api/?key=42305362-292fb567d2617ee346426e642&q=${data}&image_type=photo?orientation=horizontal?safesearch=true`;

  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Помилка: ${res.status}`);
    }
  });
}

function photoTemplate(photo) {
  return `
  <li class="gallery-item">
    <a href="${photo.largeImageURL}">
    <img src="${photo.webformatURL}" alt="${photo.tags}">
    <div class="card-body">
      <p class="card-text">Likes: ${photo.likes}</p>
      <p class="card-text">Views: ${photo.views}</p>
      <p class="card-text">Comments: ${photo.comments}</p>
      <p class="card-text">Downloads: ${photo.downloads}</p>
    </div>
    </a>
  </li>`;
}

function renderPhotos(photos) {
  galleryRef.innerHTML = '';
  const markup = photos.map(photo => photoTemplate(photo)).join('');
  galleryRef.innerHTML = markup;
  lightbox.refresh();
}
