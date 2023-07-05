// Code modified from https://www.w3schools.com/howto/howto_js_slideshow.asp
let slideIndex = [1, 1];

setTimeout(function() {
  showSlides(1, 1);
}, 20);

setTimeout(function() {
  showSlides(1, 2);
}, 20);

function plusSlides(n, slideshowIndex) {
  showSlides((slideIndex[slideshowIndex - 1] += n), slideshowIndex);
}

function currentSlide(n, slideshowIndex) {
  showSlides((slideIndex[slideshowIndex - 1] = n), slideshowIndex);
}

function showSlides(n, slideshowIndex) {
  let i;
  let slides = document.getElementById(`slideshow${slideshowIndex}`).getElementsByClassName(`mySlides`);
  let dots = document.getElementById(`slideshow${slideshowIndex}`).getElementsByClassName(`dot`);

  if (n > slides.length) {
    slideIndex[slideshowIndex - 1] = 1;
  }

  if (n < 1) {
    slideIndex[slideshowIndex - 1] = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex[slideshowIndex - 1] - 1].style.display = "block";
  dots[slideIndex[slideshowIndex - 1] - 1].className += " active";
}