document.addEventListener("DOMContentLoaded", function () {
  var current = null;

  for (var i = 0; i < assignments.length; i++) {
    if (assignments[i].id === "assignment1") {
      current = assignments[i];
      document.getElementById("assignment-title").textContent = current.title;
      document.getElementById("assignment-desc").textContent = current.description;
    }
  }

  var backLink = document.getElementById("back-to-landing");
  if (backLink && current) {
    var parts = current.link.split("/");
    var back = "";

    for (var j = 0; j < parts.length - 1; j++) {
      back += "../";
    }

    back += "index.html";
    backLink.href = back;
  }
});
