var Helpers = {
  createElement: function(tag = "div", className = "", appendToElement) {
    var element = document.createElement(tag);
    element.className = className;
    appendToElement.appendChild(element);
    return element;
  }
}

var Scene = function(builderfunc) {
  this.initialize();
  builderfunc(this);
}

Scene.prototype.heading = function(string, params = {}) {
  var heading = Helpers.createElement("div", "heading", this.mainElement);
  heading.textContent = string;
}

Scene.prototype.initialize = function() {
  this.mainElement = Helpers.createElement("section", "scene", document.querySelector("body"))
}

Scene.prototype.addClass = function(klass) {
  this.mainElement.classList.add(klass);
}

Scene.prototype.removeClass = function(klass) {
  this.mainElement.classList.remove(klass);
}

var Deck = function(builderfunc) {
  this.initialize();
  builderfunc(this);
  this.showCurrent();

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 32) { // space
      this.showNext();
    }
  });
}

Deck.prototype.initialize = function() {
  this.scenes = [];
  this.currentScene = 0;
}

Deck.prototype.scene = function(callback) {
  this.scenes.push(new Scene(callback));
}

Deck.prototype.showCurrent = function() {
  this.scenes.forEach((scene) => { scene.addClass("hidden") });
  this.scenes[this.currentScene].removeClass("hidden");
}

Deck.prototype.showNext = function() {
  if (this.currentScene >= this.scenes.length - 1) {
    console.log("Scenes over");
  } else {
    this.currentScene += 1;
    this.showCurrent();
  }
}

Deck.prototype.showPrevious = function() {
  if (this.currentScene <= 0) {
    console.log("Scenes over");
  } else {
    this.currentScene -= 1;
    this.showCurrent();
  }
}

window.onload = function() {
  new Deck((d) => {
    d.scene((s) => {
      s.heading("test");
    });

    d.scene((s) => {
      s.heading("scene 2");
    });
  });
}
