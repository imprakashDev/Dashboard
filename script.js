// script.js

// DARK MODE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.innerHTML = "☀️";
  } else {
    themeToggle.innerHTML = "🌙";
  }
});

// COPY URL

function copyUrl(button) {

  const input =
    button.parentElement.querySelector(".url-input");

  navigator.clipboard.writeText(input.value);

  const originalHtml = button.innerHTML;

  button.innerHTML =
    '<i class="fa-solid fa-check"></i>';

  button.classList.add("copied");

  setTimeout(() => {

    button.innerHTML = originalHtml;

    button.classList.remove("copied");

  }, 1500);
}

// TYPEWRITER

document.addEventListener("DOMContentLoaded", function () {

  const typedTextSpan =
    document.querySelector(".typed-text");

  if (!typedTextSpan) return;

  const textArray = [
    "Hi, Prakash 👋",
    "Welcome to Dashboard",
    "Manage Everything Faster"
  ];

  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;

  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {

    if (charIndex < textArray[textArrayIndex].length) {

      typedTextSpan.textContent +=
        textArray[textArrayIndex].charAt(charIndex);

      charIndex++;

      setTimeout(type, typingDelay);

    } else {

      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {

    if (charIndex > 0) {

      typedTextSpan.textContent =
        textArray[textArrayIndex].substring(
          0,
          charIndex - 1
        );

      charIndex--;

      setTimeout(erase, erasingDelay);

    } else {

      textArrayIndex++;

      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0;
      }

      setTimeout(type, typingDelay + 300);
    }
  }

  type();
});