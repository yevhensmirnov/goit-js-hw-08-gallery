import imagesArray from './gallery-items.js';

const galleryRef = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector("button[data-action='close-lightbox']");
const overlay = document.querySelector('.lightbox__overlay');

const imagesSrc = [];
imagesArray.forEach(el => {
    imagesSrc.push(el.original);
});

function createGallery() {
    const itemRef = imagesArray.map(image => {

        let item = document.createElement('li');
        item.className = "gallery__item";

        let linkEl = document.createElement('a');
        linkEl.className = "gallery__link";

        let imgEl = document.createElement('img');
        imgEl.className = "gallery__image";
        imgEl.setAttribute('src', `${image.preview}`);
        imgEl.setAttribute('alt', `${image.description}`);
        imgEl.setAttribute('data-source', `${image.original}`);
        linkEl.append(imgEl);
        item.append(linkEl);
        return item;
    });
    galleryRef.append(...itemRef);
}
createGallery(imagesArray);

galleryRef.addEventListener('click', onClickImgOpen);
closeModalBtn.addEventListener('click', onClickCloseModal);
overlay.addEventListener('click', onClickOverlayClose);
window.addEventListener('keydown', onClickEscClose);

function onClickImgOpen(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const imgEl = event.target;
    modalImg.src = imgEl.dataset.source;
    modalImg.alt = imgEl.alt;
    modalEl.classList.add('is-open');

}

function onClickCloseModal() {
    modalEl.classList.remove('is-open');
    modalImg.src = "";
    modalImg.alt = "";
}

function onClickOverlayClose(e) {
    if (e.target === e.currentTarget) {
        onClickCloseModal();
    }
    modalImg.src = "";
    modalImg.alt = "";
}

function onClickEscClose(e) {
    if (e.key === 'Escape') {
        onClickCloseModal();
    }
}

document.addEventListener('keydown', (e) => {

    let newIndex = imagesSrc.indexOf(modalImg.src);
    if (e.key === 'ArrowLeft') {
        newIndex -= 1;
        if (newIndex === -1) {
            newIndex = imagesSrc.length - 1;
        }
    } else if (e.key === 'ArrowRight') {
        newIndex += 1;
        if (newIndex === imagesSrc.length) {
            newIndex = 0;
        }
    }
    modalImg.src = imagesSrc[newIndex];
});



