const carousel = document.querySelector(".slider");
const firstImg = carousel.querySelectorAll("img")[0];
const arrows = document.querySelectorAll(".container i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const toggleArrows = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrows[0].style.visibility = carousel.scrollLeft == 0 ? "hidden" : "visible";
    arrows[1].style.visibility = carousel.scrollLeft == scrollWidth ? "hidden" : "visible";
}
arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 8;
        carousel.scrollLeft += arrow.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => toggleArrows(), 60);
    });
});
const autoSlide = () => {
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 8;
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    toggleArrows();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);