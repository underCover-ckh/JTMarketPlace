let usName = localStorage.getItem('username');
let usPass = localStorage.getItem('password');

console.log("Nama yang tersimpan", usName);

document.getElementById('outputName').textContent = usName;