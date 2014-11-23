## Three Column Layout

Implemented using a flexbox layout as supported by:

- IE 11
- Safari 7+
- Chrome 31+
- Firefox 31+

### Example

> three-column.html

## Dropdown Menu

Dropdown menu that expands on hover. Also includes accessable keyboard navigation.

### Example

> dropdown.html

### Usage

#### Simple menu HTML

```html
<ul id="myMenu" class="dropdown-menu">
    <li class="dropdown-item more-down">
        <a href="#">Dropdown Menu</a>
        <ul class="dropdown-menu expand-down">
            <li class="dropdown-item">
                <a href="#">Item 1</a
            </li>
            <li class="dropdown-item">
                <a href="#">Item 2</a>
            </li>
            <li class="dropdown-item">
                <a href="#">Item 3</a>
            </li>
        </ul>
    </li>
</ul>
```

#### With nested sub menus

```html
<ul id="myMenu" class="dropdown-menu">
    <li class="dropdown-item more-down">
    <a href="#">Dropdown Menu</a>
    <ul class="dropdown-menu expand-down">
        <li class="dropdown-item more-right">
            <a href="#">Item 1</a>
            <ul class="dropdown-menu expand-right">
                <li class="dropdown-item">
                    <a href="#">Sub Item 1</a>
                </li>
                <li class="dropdown-item">
                    <a href="#">Sub Item 2</a>
                </li>
                <li class="dropdown-item">
                    <a href="#">Sub Item 3</a>
                </li>
            </ul>
        </li>
            <li class="dropdown-item">
                <a href="#">Item 2</a>
            </li>
        </ul>
    </li>
</ul>
```

#### JavaScript Initialization

```js
var Dropdown = require('./Dropdown'),
    dropdown = new Dropdown(document.getElementById('myMenu'));
```

### Building JS and CSS from Source

```bash
npm install
gulp
```

**Note:** to use `gulp` you'll need to first install it globally by running `npm install gulp -g`.
