
function fuzzySearch(pattern, text) {
  pattern = pattern.toLowerCase().trim();
  text = text.toLowerCase().trim();
  
  if (!pattern) return true;
  
  let patternIndex = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === pattern[patternIndex]) {
      patternIndex++;
      if (patternIndex === pattern.length) return true;
    }
  }
  return false;
}

function searchBarang() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();
  const products = document.querySelectorAll(".product");
  
  let hasMatch = false;
  
  products.forEach(product => {
    const productName = product.querySelector("p").textContent;
    const isMatch = fuzzySearch(keyword, productName);
    
    if (isMatch) {
      product.style.display = "flex";
      product.style.opacity = "1";
      product.style.height = "auto";
      product.style.margin = "";
      product.style.padding = "";
      product.style.border = "";
      hasMatch = true;
    } else {
      product.style.display = "none";
      product.style.opacity = "0";
      product.style.height = "0";
      product.style.margin = "0";
      product.style.padding = "0";
      product.style.border = "none";
    }
  });

  if (!hasMatch && keyword) {
    const productsContainer = document.querySelector(".products");
    const noResults = document.createElement("div");
    noResults.className = "no-results";
    noResults.textContent = "Produk tidak ditemukan";
    noResults.style.gridColumn = "1 / -1";
    noResults.style.textAlign = "center";
    noResults.style.padding = "2rem";
    
    const existingNoResults = document.querySelector(".no-results");
    if (existingNoResults) {
      existingNoResults.remove();
    }
    
    productsContainer.appendChild(noResults);
  } else {
    const existingNoResults = document.querySelector(".no-results");
    if (existingNoResults) {
      existingNoResults.remove();
    }
  }
}

let searchTimeout;
document.getElementById("searchInput").addEventListener("input", function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(searchBarang, 300);
});

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
  
  if (sidebar.classList.contains("active")) {
    createOverlay();
    document.body.style.overflow = 'hidden'; // Mencegah scroll
  } else {
    removeOverlay();
    document.body.style.overflow = ''; // Mengembalikan scroll
  }
}

//Fitur Search Barang
function searchBarang() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();
  const products = document.querySelectorAll(".product");
  
  let hasMatch = false;
  const activeFilter = document.querySelector('#sidebar li.active')?.dataset.filter || 'all';
  
  products.forEach(product => {
    const productName = product.querySelector("p").textContent;
    const isMatch = fuzzySearch(keyword, productName);
    const categoryMatch = activeFilter === 'all' || product.dataset.category === activeFilter;
    
    if (isMatch && categoryMatch) {
      product.style.display = "flex";
      product.style.opacity = "1";
      product.style.height = "auto";
      hasMatch = true;
    } else {
      product.style.display = "none";
      product.style.opacity = "0";
      product.style.height = "0";
    }
  });

  // ... (kode no results tetap sama)
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
    window.open(url, '_blank');
    element.style.transform = "scale(1)";
  }, 150);
}

//Menu Side-Bar
function filterProducts(category) {
  const products = document.querySelectorAll(".product");
  
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = "flex";
      product.style.opacity = "1";
      product.style.height = "auto";
    } else {
      product.style.display = "none";
      product.style.opacity = "0";
      product.style.height = "0";
    }
  });

  const existingNoResults = document.querySelector(".no-results");
  if (existingNoResults) {
    existingNoResults.remove();
  }
}

document.querySelectorAll('#sidebar li[data-filter]').forEach(item => {
  item.addEventListener('click', function() {
    const category = this.dataset.filter;
    filterProducts(category);
    toggleSidebar(); // Tutup sidebar setelah memilih
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#sidebar li[data-filter="all"]').classList.add('active');
});
