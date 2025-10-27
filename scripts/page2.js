const userExists = localStorage.getItem("userExists");

if (userExists === "true") {
      window.location.href = "page11.html";
} 


function goNext() {
  window.location.href = "page3.html";
}

document.getElementById("goNext").addEventListener("click", () => {
  goNext();
})