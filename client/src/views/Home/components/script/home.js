const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0;

function showCurrentCard() {
    const cardWidth = cards[0].offsetWidth;
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function goToNextCard() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        showCurrentCard();
    }
}

function goToPrevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCurrentCard();
    }
}

nextButton.addEventListener('click', goToNextCard);
prevButton.addEventListener('click', goToPrevCard);

window.addEventListener('resize', showCurrentCard);

showCurrentCard();