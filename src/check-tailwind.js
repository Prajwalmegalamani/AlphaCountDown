const resolve = require("resolve");

// Check if Tailwind CSS is installed
function isTailwindInstalled() {
  try {
    resolve.sync("tailwindcss", { basedir: process.cwd() });
    return true;
  } catch (error) {
    return false;
  }
}
console.log("here");
if (isTailwindInstalled()) {
  const tailwind = require("tailwindcss");
  console.log("Tailwind CSS is installed, classname props will work");

  // Use Tailwind CSS configuration or styles as needed
} else {
  console.log("Tailwind CSS is not installed, classname props won't work.");
  // Handle accordingly
}
