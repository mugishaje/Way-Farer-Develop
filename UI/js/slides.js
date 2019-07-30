let slideIndex = 1;
showSlides(slideIndex);
automatedShowSlides();



// function plusSlides(n) {
//     showSlides(slideIndex += n);
//     console.log(slideIndex);
// }

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("wall");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000);
}

document.getElementById("prev").addEventListener("click", function plusSides() { showSlides(slideIndex += 1) });
document.getElementById("next").addEventListener("click", function plusSlides() { showSlides(slideIndex += -1); });

function automatedShowSlides() {
    var i;
    var slides = document.getElementsByClassName("wall");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(automatedShowSlides, 5000); // Change image every 2 seconds
}