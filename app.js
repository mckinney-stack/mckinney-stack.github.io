document.addEventListener("click", orangeOnClick);

function orangeOnClick(event) {
  let target = event.target;

  if (
    target.classList.contains("CV-download-text-bottom") ||
    target.classList.contains("CV-download-text-top")
  ) {
    target.style.transition = "all 0.1s ease";
    target.style.color = "#dc722a";
    target.style.borderColor = "#dc722a";
    target.style.position = "relative";
    target.style.top = "2px";
    target.style.left = "2px";

    setTimeout(function () {
      target.style.color = "teal";
      target.style.borderColor = "teal";
      target.style.position = "";
      target.style.top = "0px";
      target.style.left = "0px";
    }, 200);

    setTimeout(function () {
      target.style.color = "rgb(146, 146, 146)";
      target.style.borderBottom = "3px solid transparent";
      target.style.borderRight = "3px solid transparent";
    }, 900);
  }
}

// Scroll Progress Bar
window.onscroll = function () {
  progressBarFunction();
};

function progressBarFunction() {
  var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;

  document.getElementById("myBar").style.width = scrolled + "%";
}

// CHANGE MENU TITLES VISUALLY ON CLICK

const navTitles = document.querySelectorAll("nav-titles");
const smallScreenNavTitles = document.querySelectorAll(
  "small-screen-nav-titles"
);

// PAGE TRANSITIONS

window.onload = () => {
  const transition_el = document.querySelector(".transition");
  const anchors = document.querySelectorAll("a");

  setTimeout(() => {
    transition_el.classList.remove("is-active");
  }, 350);

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];

    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      let target = e.target.href;

      transition_el.classList.add("is-active");

      setTimeout(() => {
        window.location.href = target;
      }, 350);
    });
  }
};

// Add properties to contact section on window resize

const contactForm = document.getElementById("contact-form");
const contactText = document.getElementById("contact-text");

window.addEventListener("resize", contactResizeFunc);
window.addEventListener("DOMContentLoaded", contactResizeFunc);

function contactResizeFunc(e) {
  let width = window.innerWidth;

  if (width < 1100) {
    contactForm.classList.add("small-screen-form-props");
    contactForm.classList.remove("right");
    contactText.style.display = "none";
  } else if (width > 1100) {
    contactForm.classList.remove("small-screen-form-props");
    contactForm.classList.add("right");
    contactText.style.display = "inline-block";
  }
}

// Add hover events to portfolio image cards

// HeadUp
const headupInfo = document.getElementById("headup-info");
const headupVisitSite = document.getElementById("headup-visit-site");
const headupViewCode = document.getElementById("headup-view-code");
const headupCard = document.getElementById("headup-card");
const headupCardHeading = document.getElementById("headup-heading");

headupCard.addEventListener("mouseover", (e) => {
  headupInfo.style.opacity = "1";
  headupInfo.style.left = "0px";
  headupVisitSite.style.bottom = "18px";
  headupVisitSite.style.opacity = "1";
  headupViewCode.style.top = "-18px";
  headupViewCode.style.opacity = "1";
  headupCard.classList.add("z-depth-3");
  headupCard.style.bottom = "3px";
  headupCard.style.right = "3px";
  headupCardHeading.style.color = "black";
});

headupCard.addEventListener("mouseleave", (e) => {
  headupInfo.style.opacity = "0";
  headupInfo.style.left = "600px";
  headupVisitSite.style.bottom = "600px";
  headupVisitSite.style.opacity = "0";
  headupViewCode.style.top = "700px";
  headupCard.classList.remove("z-depth-3");
  headupCard.style.bottom = "0px";
  headupCard.style.right = "0px";
  headupCardHeading.style.color = "white";
});

// Chester Wedding DJS
const cwdInfo = document.getElementById("cwd-info");
const cwdVisitSite = document.getElementById("cwd-visit-site");
const cwdViewCode = document.getElementById("cwd-view-code");
const cwdCard = document.getElementById("cwd-card");
const cwdCardHeading = document.getElementById("cwd-heading");

cwdCard.addEventListener("mouseover", (e) => {
  cwdInfo.style.opacity = "1";
  cwdInfo.style.top = "-10px";
  cwdVisitSite.style.left = "0px";
  cwdVisitSite.style.opacity = "1";
  cwdViewCode.style.top = "3px";
  cwdCard.classList.add("z-depth-3");
  cwdCard.style.bottom = "3px";
  cwdCard.style.right = "3px";
});

cwdCard.addEventListener("mouseleave", (e) => {
  cwdInfo.style.opacity = "0";
  cwdInfo.style.top = "400px";
  cwdVisitSite.style.left = "300px";
  cwdVisitSite.style.opacity = "0";
  cwdViewCode.style.top = "700px";
  cwdCard.classList.remove("z-depth-3");
  cwdCard.style.bottom = "0px";
  cwdCard.style.right = "0px";
  cwdCardHeading.style.color = "white";
});

// LOAN CALCULATOR
const lcInfo = document.getElementById("lc-info");
const lcVisitSite = document.getElementById("lc-visit-site");
const lcViewCode = document.getElementById("lc-view-code");
const lcCard = document.querySelector(".loan-calculator-card");
const lcHeading = document.getElementById("lc-heading");

lcCard.addEventListener("mouseover", (e) => {
  lcInfo.style.opacity = "1";
  lcInfo.style.top = "-10px";
  lcVisitSite.style.left = "0px";
  lcViewCode.style.top = "3px";
  lcCard.classList.add("z-depth-3");
  lcCard.style.bottom = "3px";
  lcCard.style.right = "3px";
});

lcCard.addEventListener("mouseleave", (e) => {
  lcInfo.style.opacity = "0";
  lcInfo.style.top = "400px";
  lcVisitSite.style.left = "400px";
  lcViewCode.style.top = "600px";
  lcCard.classList.remove("z-depth-3");
  lcCard.style.bottom = "0px";
  lcCard.style.right = "0px";
  lcHeading.style.color = "white";
});

// WEATHER WATCH
const wwInfo = document.getElementById("ww-info");
const wwVisitSite = document.getElementById("ww-visit-site");
const wwViewCode = document.getElementById("ww-view-code");
const wwCard = document.getElementById("ww-card");
const wwHeading = document.getElementById("ww-heading");

wwCard.addEventListener("mouseover", (e) => {
  wwInfo.style.left = "0px";
  wwInfo.style.opacity = "1";
  wwCard.classList.add("z-depth-3");
  wwCard.style.bottom = "3px";
  wwCard.style.right = "3px";
  wwViewCode.style.top = "-16px";
  wwViewCode.style.opacity = "1";
  wwVisitSite.style.opacity = "1";
  wwVisitSite.style.bottom = "16px";
});

wwCard.addEventListener("mouseleave", (e) => {
  wwInfo.style.left = "500px";
  wwInfo.style.opacity = "0";
  wwCard.classList.add("z-depth-2");
  wwCard.style.bottom = "0px";
  wwCard.style.right = "0px";
  wwHeading.style.color = "white";
  wwViewCode.style.top = "260px";
  wwViewCode.style.opacity = "0";
  wwVisitSite.style.opacity = "0";
  wwVisitSite.style.bottom = "400px";
});

// Resize menu icons to right of screen on resize (small):
window.addEventListener("resize", (e) => {
  if (window.innerWidth <= 630) {
    dhViewCode.style.width = "13%";
    dhVisitSite.style.width = "13%";
    lcVisitSite.style.width = "14%";
    lcViewCode.style.width = "14%";
    wwViewCode.style.width = "13%";
    wwVisitSite.style.width = "13%";
  } else if (window.innerWidth > 630) {
    dhViewCode.style.width = "17%";
    dhVisitSite.style.width = "17%";
    lcVisitSite.style.width = "17%";
    lcViewCode.style.width = "17%";
    wwViewCode.style.width = "17%";
    wwVisitSite.style.width = "17%";
  }
});

window.addEventListener("DOMContentLoaded", (e) => {
  if (window.innerWidth <= 630) {
    dhViewCode.style.width = "13%";
    dhVisitSite.style.width = "13%";
    lcVisitSite.style.width = "14%";
    lcViewCode.style.width = "14%";
    wwViewCode.style.width = "13%";
    wwVisitSite.style.width = "13%";
  } else if (window.innerWidth > 630) {
    dhViewCode.style.width = "17%";
    dhVisitSite.style.width = "17%";
    lcVisitSite.style.width = "17%";
    lcViewCode.style.width = "17%";
    wwViewCode.style.width = "17%";
    wwVisitSite.style.width = "17%";
  }
});

// Accordion Scripts
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
});
