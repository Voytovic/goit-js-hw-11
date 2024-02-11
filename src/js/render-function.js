import SimpleLightbox from 'simplelightbox';

let lightBox;

export const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input-search'),
  button: document.querySelector('.button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

export function photosTemplate(photos) {
  return photos
    .map(data => {
      return `
      <li class="gal-item"><a href="${data.largeImageURL}">
            <img class="gal-image" src="${data.webformatURL}" alt="${data.tags}"></a>
            <div class="par-sect">
            <p> <span class="par-informatiom">Likes</span> <br/> ${data.likes}</p>
            <p><span class="par-informatiom">Views</span> <br/> ${data.views}</p>
            <p><span class="par-informatiom">Comments</span> <br/> ${data.comments}</p>
            <p><span class="par-informatiom">Downloads</span> <br/> ${data.downloads}</p>
            </div>
            </li>
      `;
    })
    .join('');
}

export function renderPhotos(photos) {
  const galleryMarkup = photosTemplate(photos);
  refs.gallery.innerHTML = galleryMarkup;

  if (typeof lightBox !== 'undefined') {
    lightBox.refresh();
  } else {
    lightBox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}