document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll("nav a");

  // Function to scroll to the target section
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  // Add click event listeners to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Get the target section id from the href attribute
      const targetId = link.getAttribute("href").substring(1);

      // Scroll to the target section
      scrollToSection(targetId);
    });
  });
});
