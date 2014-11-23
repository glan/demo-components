'use strict';

// Shorthand querySelectorAll with NodeList to Array conversion
function $(selector, root) {
    return [].slice.call((root || document).querySelectorAll(selector));
}

// Find DOM elments by class helper
function findWithClass(mode, element, className) {
    do {
        element = element[mode];
    } while (element && !(element.classList && element.classList.contains(className)));
    return element;
}

// Constructor
function Dropdown(element) {
    this.element = element;
    this._currentFocus = null;
    this.onClose = this.onClose.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this._addEvents();
}

var proto = Dropdown.prototype;

// Static helper method
Dropdown.closeAll = function closeAll() {
    $('.dropdown-item.active').forEach(function (element) {
        element.classList.remove('active');
    });
};

// Setup event listeners
proto._addEvents = function addEvents() {
    // add focus event listener to anchor elements within our dropdown menu.
    this.element.addEventListener('focus', this.onFocus, true);
    // Add mouseenter event listener
    this.element.addEventListener('mouseover', this.onMouseOver);
    // Add keyboard event listener
    this.element.addEventListener('keydown', this.onKeyDown);
    // Add background click event listener to active menus
    document.addEventListener('click', this.onClose);
};

// Remove event listeners
proto._removeEvents = function removeEvents() {
    this.element.removeEventListener('focus', this.onFocus, true);
    this.element.removeEventListener('mouseeover', this.onMouseOver);
    this.element.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('click', this.onClose);
};

// Navigation controls

// Move focus up one item
proto.navUp = function navUp() {
    var element = findWithClass('parentNode', this._currentFocus, 'dropdown-item');
    element = findWithClass('previousSibling', element, 'dropdown-item');
    // try to move to the prev sibling otherwise try moving up one level.
    if (element) {
        element = element.querySelector('a');
        element = element.focus();
    } else {
        this.navLeft();
    }
};

// Move focus down one item
proto.navDown = function navDown() {
    var element = findWithClass('parentNode', this._currentFocus, 'dropdown-item');
    element = findWithClass('nextSibling', element, 'dropdown-item');
    // try to move to the next sibling otherwise try moving down one level.
    if (element) {
        element = element.querySelector('a');
        element = element.focus();
    } else {
        this.navRight();
    }
};

// Move focus up one level
proto.navLeft = function navLeft() {
    var element = findWithClass('parentNode', this._currentFocus.parentNode,
        'dropdown-item');
    if (element) {
        element = element.querySelector('a');
        element = element.focus();
    }
};

// Move focus down one level
proto.navRight = function navRight() {
    var element = findWithClass('nextSibling', this._currentFocus, 'dropdown-menu');
    if (element) {
        element = element.querySelector('a');
        element = element.focus();
    }
};

// Focus event handler
proto.onFocus = function onFocus(event) {
    var element = event.target,
        parent = element.parentNode;

    this._currentFocus = element;
    // close all menus by removing class active from all dropdown-item elements
    Dropdown.closeAll();
    // add active to parent elements
    while (parent.classList) {
        if (parent.classList.contains('dropdown-item')) {
            parent.classList.add('active');
        }
        parent = parent.parentNode;
    }
};

// Mouse over event handler
proto.onMouseOver = function onMouseOver(event) {
    var element = event.target;
    if (element.tagName === 'A') {
        event.stopPropagation();
        element.focus();
    }
};

// Mouse over event handler
proto.onKeyDown = function onKeyDown(event) {
    switch (event.keyCode) {
    case 37: // Left
        this.navLeft();
        break;
    case 38: // Up
        this.navUp();
        break;
    case 39: // Right
        this.navRight();
        break;
    case 40: // Down
        this.navDown();
        break;
    }
    event.preventDefault();
};

// Close event handler
proto.onClose = function onClose(event) {
    var parent = event.target.parentNode;
    // valid menu item was clicked don't close
    if (parent.classList && parent.classList.contains('dropdown-item')) {
        return;
    }
    // otherwise close all menus
    $('.dropdown-item.active', this.element).forEach(function (element) {
        element.classList.remove('active');
    });
};

// Remove dropdown menu
proto.remove = function remove() {
    this._removeEvents();
    this.element.parentNode.removeChild(this.element);
};


module.exports = Dropdown;
