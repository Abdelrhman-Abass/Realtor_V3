document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slide img');
    let currentIndex = 0;
    const interval = 3000; // 3 seconds

    function showNextSlide() {
        currentIndex++;
        if (currentIndex >= slideImages.length) {
            currentIndex = 0;
        }
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(showNextSlide, interval);
});
