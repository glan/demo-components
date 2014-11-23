(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var Dropdown = require('./Dropdown'),
    dropdown1 = new Dropdown(document.querySelector('.menu1'));

},{"./Dropdown":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ndC9EZXZlbG9wbWVudC9aaWxsb3cvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2d0L0RldmVsb3BtZW50L1ppbGxvdy9zcmMvanMvRHJvcGRvd24uanMiLCIvVXNlcnMvZ3QvRGV2ZWxvcG1lbnQvWmlsbG93L3NyYy9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy8gU2hvcnRoYW5kIHF1ZXJ5U2VsZWN0b3JBbGwgd2l0aCBOb2RlTGlzdCB0byBBcnJheSBjb252ZXJzaW9uXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCByb290KSB7XG4gICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoKHJvb3QgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbn1cblxuLy8gRmluZCBET00gZWxtZW50cyBieSBjbGFzcyBoZWxwZXJcbmZ1bmN0aW9uIGZpbmRXaXRoQ2xhc3MobW9kZSwgZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgZG8ge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudFttb2RlXTtcbiAgICB9IHdoaWxlIChlbGVtZW50ICYmICEoZWxlbWVudC5jbGFzc0xpc3QgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkpO1xuICAgIHJldHVybiBlbGVtZW50O1xufVxuXG4vLyBDb25zdHJ1Y3RvclxuZnVuY3Rpb24gRHJvcGRvd24oZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fY3VycmVudEZvY3VzID0gbnVsbDtcbiAgICB0aGlzLm9uQ2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRm9jdXMgPSB0aGlzLm9uRm9jdXMuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uS2V5RG93biA9IHRoaXMub25LZXlEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5fYWRkRXZlbnRzKCk7XG59XG5cbnZhciBwcm90byA9IERyb3Bkb3duLnByb3RvdHlwZTtcblxuLy8gU3RhdGljIGhlbHBlciBtZXRob2RcbkRyb3Bkb3duLmNsb3NlQWxsID0gZnVuY3Rpb24gY2xvc2VBbGwoKSB7XG4gICAgJCgnLmRyb3Bkb3duLWl0ZW0uYWN0aXZlJykuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xufTtcblxuLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzXG5wcm90by5fYWRkRXZlbnRzID0gZnVuY3Rpb24gYWRkRXZlbnRzKCkge1xuICAgIC8vIGFkZCBmb2N1cyBldmVudCBsaXN0ZW5lciB0byBhbmNob3IgZWxlbWVudHMgd2l0aGluIG91ciBkcm9wZG93biBtZW51LlxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMub25Gb2N1cywgdHJ1ZSk7XG4gICAgLy8gQWRkIG1vdXNlZW50ZXIgZXZlbnQgbGlzdGVuZXJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlT3Zlcik7XG4gICAgLy8gQWRkIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgLy8gQWRkIGJhY2tncm91bmQgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gYWN0aXZlIG1lbnVzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xvc2UpO1xufTtcblxuLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xucHJvdG8uX3JlbW92ZUV2ZW50cyA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50cygpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm9uRm9jdXMsIHRydWUpO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVvdmVyJywgdGhpcy5vbk1vdXNlT3Zlcik7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xvc2UpO1xufTtcblxuLy8gTmF2aWdhdGlvbiBjb250cm9sc1xuXG4vLyBNb3ZlIGZvY3VzIHVwIG9uZSBpdGVtXG5wcm90by5uYXZVcCA9IGZ1bmN0aW9uIG5hdlVwKCkge1xuICAgIHZhciBlbGVtZW50ID0gZmluZFdpdGhDbGFzcygncGFyZW50Tm9kZScsIHRoaXMuX2N1cnJlbnRGb2N1cywgJ2Ryb3Bkb3duLWl0ZW0nKTtcbiAgICBlbGVtZW50ID0gZmluZFdpdGhDbGFzcygncHJldmlvdXNTaWJsaW5nJywgZWxlbWVudCwgJ2Ryb3Bkb3duLWl0ZW0nKTtcbiAgICAvLyB0cnkgdG8gbW92ZSB0byB0aGUgcHJldiBzaWJsaW5nIG90aGVyd2lzZSB0cnkgbW92aW5nIHVwIG9uZSBsZXZlbC5cbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdhJyk7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uYXZMZWZ0KCk7XG4gICAgfVxufTtcblxuLy8gTW92ZSBmb2N1cyBkb3duIG9uZSBpdGVtXG5wcm90by5uYXZEb3duID0gZnVuY3Rpb24gbmF2RG93bigpIHtcbiAgICB2YXIgZWxlbWVudCA9IGZpbmRXaXRoQ2xhc3MoJ3BhcmVudE5vZGUnLCB0aGlzLl9jdXJyZW50Rm9jdXMsICdkcm9wZG93bi1pdGVtJyk7XG4gICAgZWxlbWVudCA9IGZpbmRXaXRoQ2xhc3MoJ25leHRTaWJsaW5nJywgZWxlbWVudCwgJ2Ryb3Bkb3duLWl0ZW0nKTtcbiAgICAvLyB0cnkgdG8gbW92ZSB0byB0aGUgbmV4dCBzaWJsaW5nIG90aGVyd2lzZSB0cnkgbW92aW5nIGRvd24gb25lIGxldmVsLlxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5hdlJpZ2h0KCk7XG4gICAgfVxufTtcblxuLy8gTW92ZSBmb2N1cyB1cCBvbmUgbGV2ZWxcbnByb3RvLm5hdkxlZnQgPSBmdW5jdGlvbiBuYXZMZWZ0KCkge1xuICAgIHZhciBlbGVtZW50ID0gZmluZFdpdGhDbGFzcygncGFyZW50Tm9kZScsIHRoaXMuX2N1cnJlbnRGb2N1cy5wYXJlbnROb2RlLFxuICAgICAgICAnZHJvcGRvd24taXRlbScpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2EnKTtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59O1xuXG4vLyBNb3ZlIGZvY3VzIGRvd24gb25lIGxldmVsXG5wcm90by5uYXZSaWdodCA9IGZ1bmN0aW9uIG5hdlJpZ2h0KCkge1xuICAgIHZhciBlbGVtZW50ID0gZmluZFdpdGhDbGFzcygnbmV4dFNpYmxpbmcnLCB0aGlzLl9jdXJyZW50Rm9jdXMsICdkcm9wZG93bi1tZW51Jyk7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYScpO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn07XG5cbi8vIEZvY3VzIGV2ZW50IGhhbmRsZXJcbnByb3RvLm9uRm9jdXMgPSBmdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG4gICAgdmFyIGVsZW1lbnQgPSBldmVudC50YXJnZXQsXG4gICAgICAgIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIHRoaXMuX2N1cnJlbnRGb2N1cyA9IGVsZW1lbnQ7XG4gICAgLy8gY2xvc2UgYWxsIG1lbnVzIGJ5IHJlbW92aW5nIGNsYXNzIGFjdGl2ZSBmcm9tIGFsbCBkcm9wZG93bi1pdGVtIGVsZW1lbnRzXG4gICAgRHJvcGRvd24uY2xvc2VBbGwoKTtcbiAgICAvLyBhZGQgYWN0aXZlIHRvIHBhcmVudCBlbGVtZW50c1xuICAgIHdoaWxlIChwYXJlbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1pdGVtJykpIHtcbiAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG59O1xuXG4vLyBNb3VzZSBvdmVyIGV2ZW50IGhhbmRsZXJcbnByb3RvLm9uTW91c2VPdmVyID0gZnVuY3Rpb24gb25Nb3VzZU92ZXIoZXZlbnQpIHtcbiAgICB2YXIgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBpZiAoZWxlbWVudC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG59O1xuXG4vLyBNb3VzZSBvdmVyIGV2ZW50IGhhbmRsZXJcbnByb3RvLm9uS2V5RG93biA9IGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgIGNhc2UgMzc6IC8vIExlZnRcbiAgICAgICAgdGhpcy5uYXZMZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzg6IC8vIFVwXG4gICAgICAgIHRoaXMubmF2VXAoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOTogLy8gUmlnaHRcbiAgICAgICAgdGhpcy5uYXZSaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIDQwOiAvLyBEb3duXG4gICAgICAgIHRoaXMubmF2RG93bigpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn07XG5cbi8vIENsb3NlIGV2ZW50IGhhbmRsZXJcbnByb3RvLm9uQ2xvc2UgPSBmdW5jdGlvbiBvbkNsb3NlKGV2ZW50KSB7XG4gICAgdmFyIHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgIC8vIHZhbGlkIG1lbnUgaXRlbSB3YXMgY2xpY2tlZCBkb24ndCBjbG9zZVxuICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0ICYmIHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLWl0ZW0nKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSBjbG9zZSBhbGwgbWVudXNcbiAgICAkKCcuZHJvcGRvd24taXRlbS5hY3RpdmUnLCB0aGlzLmVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcbn07XG5cbi8vIFJlbW92ZSBkcm9wZG93biBtZW51XG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgdGhpcy5fcmVtb3ZlRXZlbnRzKCk7XG4gICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50KTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wZG93bjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERyb3Bkb3duID0gcmVxdWlyZSgnLi9Ecm9wZG93bicpLFxuICAgIGRyb3Bkb3duMSA9IG5ldyBEcm9wZG93bihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudTEnKSk7XG4iXX0=
