# Picklist
PickList is a plugin for jQuery

![demo](https://gitee.com/uploads/images/2018/0402/155616_56d2cd77_329660.jpeg "1.jpg")

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
var data = {
    available: [
        {id: 1,label: 11},
        {id: 2,label: 22},
        {id: 3,label: 33},
        {id: 4,label: 44},
        {id: 5,label: 55},
        {id: 6,label: 66},
        {id: 7,label: 77},
        {id: 8,label: 88},
        {id: 9,label: 99},
        {id: 10,label: 01},
    ],
    selected:[
        {id: 11,label: 12},
        {id: 12,label: 13},
        {id: 13,label: 14},
    ]
};
var pick = $('#pick').picklist({
    data: data,
    // label:false
});
```

To get data just call the getSelected:
```js
$('#demo').on('click', function () {
    console.log(a.pickList('getSelected'));
});
```
Events:
```js
a.on('picklist.remove', function (event, v) {
    console.log(v)
});

a.on('picklist.add', function (event, v) {
    console.log(v)
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