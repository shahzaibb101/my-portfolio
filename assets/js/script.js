"use strict";

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var parent = document.querySelector(".splitview"),
    topPanel = parent.querySelector(".top"),
    handle = parent.querySelector(".handle"),
    skewHack = 0,
    delta = 0;

  // If the parent has .skewed class, set the skewHack var.
  if (parent.className.indexOf("skewed") != -1) {
    skewHack = 1000;
  }

  // Function to update the position and width of elements
  function updateView(event) {
    // Get the delta between the mouse/touch position and center point.
    delta = (event.clientX - window.innerWidth / 2) * -2;

    // Move the handle.
    handle.style.left = event.clientX + delta + "px";

    // Adjust the top panel width.
    topPanel.style.width = event.clientX + skewHack + delta + "px";
  }

  function throttle(func, delay) {
    let timeoutId;
    return function (...args) {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          func(...args);
          timeoutId = null;
        }, delay);
      }
    };
  }

  // Then use the throttled version of the event listener
  parent.addEventListener(
    "mousemove",
    throttle(function (event) {
      updateView(event);
    }, -10)
  ); // Adjust the delay (in milliseconds) as needed

  // // Mousemove event listener
  // parent.addEventListener("mousemove", function (event) {
  //   updateView(event);
  // });

  // Touchmove event listener
  parent.addEventListener("touchmove", function (event) {
    // Prevent scrolling while swiping
    event.preventDefault();
    // Use the first touch point for calculating the position
    var touch = event.touches[0];
    updateView(touch);
  });

  // Mouseout event listener to reset view when the mouse leaves the splitview area
  document.addEventListener("mouseout", function (event) {
    if (!parent.contains(event.relatedTarget)) {
      resetView();
    }
  });

  // Touchend event listener to reset view when touch interaction ends outside the splitview area
  document.addEventListener("touchend", function (event) {
    var touchTarget = event.target;
    if (!parent.contains(touchTarget)) {
      resetView();
    }
  });

  // Function to reset the position and width to default
  function resetView() {
    // Move the handle to the center.
    handle.style.left = "50%";

    // Reset the top panel width to default (considering the skewHack value).
    topPanel.style.width = "calc(50vw + " + skewHack + "px)";
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   var parent = document.querySelector(".splitview"),
//     topPanel = parent.querySelector(".top"),
//     bottomPanel = parent.querySelector(".bottom"),
//     handle = parent.querySelector(".handle"),
//     skewHack = 0;

//   // If the parent has .skewed class, set the skewHack var.
//   if (parent.className.indexOf("skewed") != -1) {
//     skewHack = 1000;
//   }

//   // Function to update the position, width, and opacity of elements
//   function updateView(event) {
//     // Get the mouse/touch position relative to the parent element
//     var mouseX = event.clientX - parent.getBoundingClientRect().left;

//     // Move the handle.
//     handle.style.left = mouseX - handle.offsetWidth / 2 + "px";

//     // Adjust the top panel width.
//     topPanel.style.width = mouseX - handle.offsetWidth / -2 + -skewHack + "px";

//     // Calculate opacity for the bottom panel (values between 1 and 0)
//     var maxDistance = topPanel.offsetWidth;
//     var opacityBottom = (maxDistance - mouseX) / maxDistance;
//     bottomPanel.style.opacity = opacityBottom;
//   }

//   function throttle(func, delay) {
//     let timeoutId;
//     return function (...args) {
//       if (!timeoutId) {
//         timeoutId = setTimeout(() => {
//           func(...args);
//           timeoutId = null;
//         }, delay);
//       }
//     };
//   }

//   // Mousemove event listener
//   parent.addEventListener(
//     "mousemove",
//     throttle(function (event) {
//       updateView(event);
//     }, 50) // Adjust the delay (in milliseconds) as needed
//   );

//   // Touchmove event listener
//   parent.addEventListener("touchmove", function (event) {
//     // Prevent scrolling while swiping
//     event.preventDefault();
//     // Use the first touch point for calculating the position
//     var touch = event.touches[0];
//     updateView(touch);
//   });

//   // Mouseout event listener to reset view when the mouse leaves the splitview area
//   document.addEventListener("mouseout", function (event) {
//     if (!parent.contains(event.relatedTarget)) {
//       resetView();
//     }
//   });

//   // Touchend event listener to reset view when touch interaction ends outside the splitview area
//   document.addEventListener("touchend", function (event) {
//     var touchTarget = event.target;
//     if (!parent.contains(touchTarget)) {
//       resetView();
//     }
//   });
function scrollToContact() {
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth" });
}

window.onload = function () {
  const downloadButton = document.getElementById("downloadButton");

  function downloadCV() {
    window.open("./assets/cv/cv-shahzaib.pdf", "_blank");
  }

  // Listen for the 'click' event on desktop browsers
  downloadButton.addEventListener("click", downloadCV);

  // Listen for the 'touchstart' event on touch mobile devices
  downloadButton.addEventListener("touchstart", downloadCV);
};

//   // Function to reset the position, width, and opacity to default
//   function resetView() {
//     // Move the handle to the center.
//     handle.style.left = "50%";

//     // Reset the top panel width to default (considering the skewHack value).
//     topPanel.style.width = "calc(50vw + " + skewHack + "px)";

//     // Reset the opacity of the bottom panel
//     bottomPanel.style.opacity = 1;
//   }
// });

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {
  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);
});

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {
    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i]);
    }
    elemToggleFunc(skillsBox);
  });
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {
  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }
});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}

// Function to animate the counter from 0 to the target value
// Function to animate the counter from 0 to the target value
// JavaScript
function animate(obj, initVal, lastVal, duration) {
  let startTime = null;

  const step = (currentTime) => {
    if (!startTime) {
      startTime = currentTime;
    }

    const progress = Math.min((currentTime - startTime) / duration, 1);
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal) + "+";

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      // Remove the event listeners once the animation is completed
      homeSection.removeEventListener("mouseenter", animateOnEnter);
      homeSection.removeEventListener("touchstart", animateOnEnter);
    }
  };

  window.requestAnimationFrame(step);
}

function animateOnEnter() {
  let text1 = document.getElementById("0101");
  let text2 = document.getElementById("0102");
  let text3 = document.getElementById("0103");

  animate(text1, 0, 5, 1500);
  animate(text2, 0, 30, 2000);
  animate(text3, 0, 50, 2000);
}

const homeSection = document.getElementById("home");

homeSection.addEventListener("mouseenter", animateOnEnter);
homeSection.addEventListener("touchstart", animateOnEnter);

const homeSection1 = document.getElementById("homee");

homeSection1.addEventListener("mouseenter", animateOnEnter);
homeSection1.addEventListener("touchstart", animateOnEnter);

document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with the "typewriter" class
  const typewriterElements = document.querySelectorAll(".typewriter");

  // Loop through each element and set its text to the "data-text" attribute
  typewriterElements.forEach(function (element) {
    const text = element.getAttribute("data-text");
    element.textContent = ""; // Clear existing text
    typewriteText(element, text);
  });
});

function typewriteText(element, text) {
  let charIndex = 0;
  const typingInterval = 1; // Adjust the typing speed here (in milliseconds)

  function type() {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingInterval);
    }
  }

  type();
}

const restartButton = document.querySelector(".reset");

restartButton.addEventListener(
  "click",
  () => {
    const textAnimation = document.querySelector(".text-stroke");

    setAnimationName(textAnimation, "none");
    requestAnimationFrame(() =>
      setTimeout(() => setAnimationName(textAnimation, ""), 0)
    );
  },
  false
);

const setAnimationName = (element, animationName) => {
  if (element) {
    element.style.animationName = animationName;
  }
};
