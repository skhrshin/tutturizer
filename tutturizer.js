var FindUnhappyPeople;

let script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://cdnjs.cloudflare.com/ajax/libs/xregexp/3.2.0/xregexp-all.min.js";

function tutturize() {
  function tutturize_text(text) {
    return XRegExp.replace(text, FindUnhappyPeople, "$1トゥットゥルー$4");
  }
  function tutturize_element(element) {
    if (element.getAttribute("data-tutturized")) {
      return false;
    }
    for (let child = element.firstChild; child; child = child.nextSibling) {
      switch (child.nodeType) {
      case 1:
        tutturize_element(child);
        break;
      case 3:
        child.nodeValue = tutturize_text(child.nodeValue);
        break;
      }
    }
    return true;
  }
  function mark_as_tutturized(element) {
    element.setAttribute("data-tutturized", "true");
  }

  let btn = document.getElementsByClassName("compose-form__publish-button-wrapper")[0].getElementsByTagName("button")[0];
  tutturize_element(btn);

  let elements = document.querySelectorAll(".status__content, .notification__message");
  for (let index = 0; index < elements.length; ++index) {
    let element = elements[index];
    if (tutturize_element(element)) {
      mark_as_tutturized(element);
    }
  }
}

script.addEventListener("load", function () {
  FindUnhappyPeople = new XRegExp("^((.*)([^\\p{Katakana}]+))?トゥート(([^\\p{Katakana}]+)(.*))?$");
  tutturize();
  window.setInterval(tutturize, 1000);
}, false);

document.head.appendChild(script);
