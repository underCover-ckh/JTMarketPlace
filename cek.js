function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
  
    const icon = document.getElementById("mode-icon");
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }
  
  function productClick(element, url) {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
      window.location.href = url;
    }, 150);
    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 150);
  }
  
   document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProduct();
    }
  });