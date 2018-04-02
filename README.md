# Picklist
PickList is a plugin for jQuery

# Installation
Include script after the jQuery library:
```html
<!-- include css -->
<link href="../css/picklist.css" rel="stylesheet">
...
<!-- inclue js -->
<script src="pickList.js"></script>
```

# Usage

```html
<div id="pick"></div>  <!-- HTML -->
```
```js
 var data = [
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 },
    { id: 1, label: 11 }
];
var pick = $('#pick').picklist({
    data: data,
    // label:false
});
```

To get data just call the selected:
```js
var pick = $('#pick').picklist({
    data: data,
    // label:false
});

$('#demo').on('click', function () {
    console.log(pick.selected());
});
```

# options
```js
{
    
    data:[],//The data to be loaded.

    //set the button.
    buttons: [{
        action: 'add', //required   [add|addAll|remove|removeAll]
    },
    {
        action: 'addAll',
        label: 'addAll' //The name of the button.
    },
    {
        action: 'remove',
        label: 'Remove',
        className: 'btn btn-sm btn-block btn-info' //button style class
    },
    {
        action: 'removeAll'
    }
    ],

    buttonClass: 'btn btn-sm btn-block btn-primary',//Button global style
    
    label: {
        content: ['optional:', 'selected:'] 
    },
    
    select: {
        size: 15
    }
}
```