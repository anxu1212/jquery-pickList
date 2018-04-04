/**
 * @author anxu <anxu1212@hotmail.com>
 * version: 0.1.0
 */
(function ($, window) {
    'use strict';

    var PickList = function (ele, opt) {
        this.$element = $(ele);
        this.options = opt;

        // if (Array.isArray(opt.data)) {
        //     this.available = opt.data;
        //     this.selected = [];
        // } else {
        //     this.available = opt.data.available;
        //     this.selected = opt.data.selected;
        // }
        // data: [],
        // data:{
        //     selected:[],
        //     available:[]
        // },
        // opt.data = undefined;
        // this.options = $.extend({}, this.defaults, opt);

        this.init();
        return this;
    };

    /**
     * 
     */
    PickList.DEFAULTS = {
        data: [],
        buttons: [{
                action: 'add'
            },
            {
                action: 'addAll',
                label: 'addAll'
            },
            {
                action: 'remove',
                label: 'Remove',
                className: 'btn btn-sm btn-block btn-info'
            },
            {
                action: 'removeAll'
            }
        ],
        buttonClass: 'btn btn-sm btn-block btn-primary',
        label: {
            content: ['Available:', 'Selected:']
        },
        select: {
            size: 15
        }
    }
    PickList.EVENTS = {
        add: 'add.picklist',
        remove: 'remove.picklist'
    }

    PickList.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);

        this.$element.trigger($.Event(name), args);
    };
    /**
     * init
     */
    PickList.prototype.init = function () {
        this.initHtml();
        this.initActions();
        this.initData();
    }


    PickList.prototype.initData = function () {
        var available = '';
        var selected = '';
        $.each(this.options.data.available, function (i, v) {
            available += '<option value="' + v.id + '">' + v.label + '</option>' + "\n";
        });

        $.each(this.options.data.selected, function (i, v) {
            selected += '<option value="' + v.id + '">' + v.label + '</option>' + "\n";
        });
        this.$element.find('.select.selected select').html(selected);
        this.$element.find('.select.available select').html(available);
    }

    PickList.prototype.initActions = function () {
        var picklist = this.$element;
        var data = this.options.data;
        var that = this;

        this.$element.find(".button-group .add").on('click', function () {
            // let p = picklist.find(".select.available option:selected");

            var selectedId = picklist.find(".select.available select").val();
            var selected =[];            
            $.each(data.available, function(i, v) {
                if ($.inArray(v.id.toString(), selectedId) !== -1){
                    // console.log(v.id, 's', available.splice(i, 1));
                    selected.push(available[i])
                }
            });
            console.log(selected);
            
            // p.clone().appendTo(picklist.find(".select.selected select"));
            // p.remove();
            // that.trigger(PickList.EVENTS.add, that);

        });

        this.$element.find(".button-group .remove").on('click', function () {
            let p = picklist.find(".select.selected option:selected");
            p.clone().appendTo(picklist.find(".select.available select"));
            p.remove();
            that.trigger(PickList.EVENTS.remove, that);
        });

        this.$element.find(".button-group .addAll").on('click', function () {
            let p = picklist.find(".select.available option");
            p.clone().appendTo(picklist.find(".select.selected select"));
            p.remove();
            that.trigger(PickList.EVENTS.add, that);
        });

        this.$element.find(".button-group .removeAll").on('click', function () {
            let p = picklist.find(".select.selected option");
            p.clone().appendTo(picklist.find(".select.available select"));
            p.remove();
            that.trigger(PickList.EVENTS.remove, that);
        });
    }


    PickList.prototype.initButtons = function () {
        let container = $('<div></div>').addClass('button-group'),
            that = this;
        $.each(this.options.buttons, function (index, value) {
            let button = $('<button type="button"></button>');
            button.addClass(typeof value.className == 'undefined' ? that.options.buttonClass : value.className);
            button.addClass(value.action);
            button.append(typeof value.label == 'undefined' ? value.action : value.label);
            container.append(button);
        });
        return container;
    }

    PickList.prototype.initSelect = function () {
        let container = $('<div></div>').addClass('select');

        let select = $('<select multiple></select>').attr('size', typeof this.options.select.size != 'undefined' ? this.options.select.size : 15);
        container.append(select);
        return container;
    }

    PickList.prototype.initHtml = function () {
        let buttonGroup = this.initButtons();
        let optional = this.initSelect();
        let selected = this.initSelect();

        if (this.options.label !== false) {
            optional.prepend($('<p></p>').text(this.options.label.content[0]));
            selected.prepend($('<p></p>').text(this.options.label.content[1]));
        }
        this.$element.addClass('picklist');
        this.$element.append(optional.addClass('available'))
        this.$element.append(buttonGroup);
        this.$element.append(selected.addClass('selected'))
    }

    PickList.prototype.reload = function () {
        this.initData();
    }


    PickList.prototype.selected = function () {
        var objResult = [];
        this.$element.find(".select.selected select option").each(function () {
            objResult.push({
                id: $(this).val(),
                text: this.text
            });
        });
        return objResult;
    };


    // Plugin definition.
    $.fn.pickList = function (option) {
        var value, args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
            var $this = $(this),
                obj = $this.data('picklist');

            if (obj && typeof option === 'string') {
                value = obj[option].apply(obj, args);
            }

            if (typeof option === 'object') {
                let options = $.extend({}, PickList.DEFAULTS, option);
                $this.data('picklist', (new PickList(this, options)));
            }
        })

        return typeof value === 'undefined' ? this : value;
    };


})(jQuery, window);