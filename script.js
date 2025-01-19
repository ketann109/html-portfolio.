// script.js

// DOM Elements
const passwordInput = document.getElementById("password-input");
const strengthBar = document.getElementById("progress-bar");
const feedbackText = document.getElementById("strength-feedback");
const copyButton = document.getElementById("copy-password");
const visibilityToggle = document.getElementById("toggle-visibility");
const themeToggle = document.getElementById("theme-toggle");

const tips = {
  length: document.getElementById("length-tip"),
  uppercase: document.getElementById("uppercase-tip"),
  lowercase: document.getElementById("lowercase-tip"),
  number: document.getElementById("number-tip"),
  symbol: document.getElementById("symbol-tip"),
};

// Helper Functions
const updateTips = (password) => {
  tips.length.classList.toggle("met", password.length >= 8);
  tips.uppercase.classList.toggle("met", /[A-Z]/.test(password));
  tips.lowercase.classList.toggle("met", /[a-z]/.test(password));
  tips.number.classList.toggle("met", /\d/.test(password));
  tips.symbol.classList.toggle("met", /[\W_]/.test(password));
};

const evaluatePassword = (password) => {
  let strength = 0;

  // Criteria Check
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[\W_]/.test(password)) strength++;

  return strength;
};

const updateStrengthBar = (strength) => {
  const levels = [
    { text: "Very Weak", color: "#e53935", width: "20%" },
    { text: "Weak", color: "#ff7043", width: "40%" },
    { text: "Fair", color: "#ffca28", width: "60%" },
    { text: "Strong", color: "#66bb6a", width: "80%" },
    { text: "Very Strong", color: "#43a047", width: "100%" },
  ];

  const level = levels[strength - 1] || { text: "", color: "#ddd", width: "0%" };

  feedbackText.textContent = level.text;
  strengthBar.style.width = level.width;
  strengthBar.style.backgroundColor = level.color;
};

// Event Listeners
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  // Update tips dynamically
  updateTips(password);

  // Update password strength bar and feedback
  const strength = evaluatePassword(password);
  updateStrengthBar(strength);
});

copyButton.addEventListener("click", () => {
  const password = passwordInput.value;
  if (!password) {
    alert("Please enter a password to copy!");
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    alert("Password copied to clipboard!");
  });
});

visibilityToggle.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Change icon
  visibilityToggle.textContent = type === "password" ? "👁️" : "🙈";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Apply theme settings on page load (optional enhancement)
