/*---------------CARROUSEL PRODUCTS HOME-----------------*/
document.addEventListener('DOMContentLoaded', function () {
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function showNextImage() {
    carouselItems[currentIndex].classList.remove('active');
    carouselItems[currentIndex].classList.add('hidden');

    currentIndex = (currentIndex + 1) % carouselItems.length;

    carouselItems[currentIndex].classList.remove('hidden');
    carouselItems[currentIndex].classList.add('active');
  }

  // Mostrar la siguiente imagen cada 5 segundos
  setInterval(showNextImage, 5000);
});
