var Helpers = {
  createElement: function(tag = "div", className = "", appendToElement) {
    var element = document.createElement(tag);
    element.className = className;
    appendToElement.appendChild(element);
    return element;
  }
}

var Scene = function(options, builderfunc) {
  this.initialize(options);
  builderfunc(this);
}

Scene.prototype.heading = function(string, params = {}) {
  var heading = Helpers.createElement("div", "heading", this.mainElement);
  heading.textContent = string;
}

Scene.prototype.initialize = function(options) {
  this.options = options || {};
  this.parentElement = options.deckElement || document.querySelector("body");
  this.mainElement = Helpers.createElement("section", "scene", this.parentElement);
}

Scene.prototype.addClass = function(className) {
  this.mainElement.classList.add(className);
}

Scene.prototype.removeClass = function(className) {
  this.mainElement.classList.remove(className);
}

var Deck = function(options, builderfunc) {
  this.initialize(options);
  builderfunc(this);
  this.showCurrent();

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 32) { // space
      this.showNext();
    }
  });
}

Deck.prototype.initialize = function(options) {
  this.options = options || {};
  this.scenes = [];
  this.currentScene = 0;
  let className = options.className || "deck";
  this.mainElement = Helpers.createElement("main", className, document.querySelector("body"));
}

Deck.prototype.scene = function(callback) {
  let sceneOptions = { deckElement: this.mainElement }
  this.scenes.push(new Scene(sceneOptions, callback));
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
  new Deck({ className: "first-deck" }, (d) => {
    d.scene((s) => {
      s.heading("test");
    });

    d.scene((s) => {
      s.heading("scene 2");
    });
  });
}
