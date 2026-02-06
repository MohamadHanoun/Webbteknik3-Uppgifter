document.addEventListener("DOMContentLoaded", function () {
  
  const parts = window.location.pathname.split("/").filter(function (p) {
    return p !== "";
  });

  const currentFolder = parts.length >= 2 ? parts[parts.length - 2] : "";
  const inAssignmentFolder = currentFolder.indexOf("assignment") === 0;

  // prefix assignment1/ assignment2/
  const prefix = inAssignmentFolder ? "../" : "";

  //navigation 
  const nav = document.getElementById("global-nav");
  if (nav) {
    const ul = document.createElement("ul");

    // Start
    const liStart = document.createElement("li");
    const aStart = document.createElement("a");
    aStart.href = prefix + "index.html";
    aStart.textContent = "Start";
    liStart.appendChild(aStart);
    ul.appendChild(liStart);

    // datastruktur links
    for (let i = 0; i < assignments.length; i++) {
      const item = assignments[i];

      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = prefix + item.link;
      a.textContent = item.title;

      if (window.location.pathname.indexOf("/" + item.link) !== -1) {
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }

      li.appendChild(a);
      ul.appendChild(li);
    }

    const path = window.location.pathname;
    const isHome = !inAssignmentFolder && (path.endsWith("/") || path.endsWith("/index.html"));
    if (isHome) {
      aStart.classList.add("is-active");
      aStart.setAttribute("aria-current", "page");
    }

    nav.innerHTML = "";
    nav.appendChild(ul);
  }
});
