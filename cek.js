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
  
  // Fungsi fuzzy search yang lebih baik
function fuzzySearch(pattern, text) {
  pattern = pattern.toLowerCase().replace(/\s+/g, '');
  text = text.toLowerCase().replace(/\s+/g, '');
  
  let patternIndex = 0;
  for (let i = 0; i < text.length && patternIndex < pattern.length; i++) {
    if (text[i] === pattern[patternIndex]) {
      patternIndex++;
    }
  }
  return patternIndex === pattern.length;
}

// Fungsi pencarian utama
function searchBarang() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();
  const products = document.querySelectorAll(".product");
  
  // Reset semua produk jika pencarian kosong
  if (!keyword) {
    products.forEach(product => {
      product.style.display = "flex";
      product.style.opacity = "1";
      product.style.height = "auto";
      product.style.margin = "";
      product.style.padding = "";
      product.style.border = "";
    });
    return;
  }

  let bestMatch = null;
  let bestScore = 0;

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
      
      // Hitung skor kecocokan
      let score = 0;
      let patternPos = 0;
      let prevMatchPos = -1;
      
      for (let i = 0; i < productName.length && patternPos < keyword.length; i++) {
        if (productName[i].toLowerCase() === keyword[patternPos].toLowerCase()) {
          // Beri nilai lebih tinggi untuk karakter berurutan
          if (prevMatchPos === i - 1) {
            score += 5; 
          } else {
            score += 2;
          }
          prevMatchPos = i;
          patternPos++;
        }
      }
      
      // Simpan produk dengan skor tertinggi
      if (score > bestScore) {
        bestScore = score;
        bestMatch = product;
      }
    } else {
      product.style.display = "none";
      product.style.opacity = "0";
      product.style.height = "0";
      product.style.margin = "0";
      product.style.padding = "0";
      product.style.border = "none";
    }
  });

  // Scroll ke produk terbaik jika ditemukan
  if (bestMatch) {
    bestMatch.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    
    // Highlight produk terbaik
    bestMatch.classList.add("best-match");
    setTimeout(() => {
      bestMatch.classList.remove("best-match");
    }, 1000);
  }
}

// Optimasi dengan debounce
let searchTimeout;
document.getElementById("searchInput").addEventListener("input", function() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(searchBarang, 300);
});

// Inisialisasi event listener untuk product click (jika diperlukan)
function productClick(element, url) {
  window.open(url, '_blank');
}