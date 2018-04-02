'use strict';

/**
 * @author anxu <anxu1212@hotmail.com>
 * version: 0.1.0
 */
(function ($, window) {
    'use strict';

    var picklist = function picklist(ele, opt) {
        this.$element = ele;
        this.defaults = {
            data: [],
            buttons: [{
                action: 'add'
            }, {
                action: 'addAll',
                label: 'addAll'
            }, {
                action: 'remove',
                label: 'Remove',
                className: 'btn btn-sm btn-block btn-info'
            }, {
                action: 'removeAll'
            }],
            buttonClass: 'btn btn-sm btn-block btn-primary',
            label: {
                content: ['Optional:', 'Selected:']
            },
            select: {
                size: 15
            }
        };
        this.options = $.extend({}, this.defaults, opt);

        this.init();
        return this;
    };

    /**
     * init
     */
    picklist.prototype.init = function () {
        this.initHtml();
        this.initActions();
        this.initData();
    };
    picklist.prototype.initData = function () {
        var data = this.options.data;
        var options = '';
        $.each(data, function (i, v) {
            options += '<option value="' + v.id + '">' + v.label + '</option>' + "\n";
        });
        this.$element.find('.select.optional select').append(options);
    };
    picklist.prototype.initActions = function () {
        var picklist = this.$element;

        this.$element.find(".button-group .add").on('click', function () {
            console.log('add');
            var p = picklist.find(".select.optional option:selected");
            p.clone().appendTo(picklist.find(".select.selected select"));
            p.remove();
        });

        this.$element.find(".button-group .remove").on('click', function () {
            var p = picklist.find(".select.selected option:selected");
            p.clone().appendTo(picklist.find(".select.optional select"));
            p.remove();
        });

        this.$element.find(".button-group .addAll").on('click', function () {
            var p = picklist.find(".select.optional option");
            p.clone().appendTo(picklist.find(".select.selected select"));
            p.remove();
        });

        this.$element.find(".button-group .removeAll").on('click', function () {
            var p = picklist.find(".select.selected option");
            p.clone().appendTo(picklist.find(".select.optional select"));
            p.remove();
        });
    };
    picklist.prototype.initButtons = function () {
        var container = $('<div></div>').addClass('button-group'),
            that = this;
        $.each(this.options.buttons, function (index, value) {
            var button = $('<button type="button"></button>');
            button.addClass(typeof value.className == 'undefined' ? that.options.buttonClass : value.className);
            button.addClass(value.action);
            button.append(typeof value.label == 'undefined' ? value.action : value.label);
            container.append(button);
        });
        return container;
    };

    picklist.prototype.initSelect = function () {
        var container = $('<div></div>').addClass('select');

        var select = $('<select multiple></select>').attr('size', typeof this.options.select.size != 'undefined' ? this.options.select.size : 15);
        container.append(select);
        return container;
    };
    picklist.prototype.initHtml = function () {
        var buttonGroup = this.initButtons();
        var optional = this.initSelect();
        var selected = this.initSelect();

        if (this.options.label !== false) {
            optional.prepend($('<p></p>').text(this.options.label.content[0]));
            selected.prepend($('<p></p>').text(this.options.label.content[1]));
        }
        this.$element.addClass('picklist');
        this.$element.append(optional.addClass('optional'));
        this.$element.append(buttonGroup);
        this.$element.append(selected.addClass('selected'));
    };
    picklist.prototype.selected = function () {
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
    $.fn.picklist = function (options) {
        return new picklist(this, options);
    };
})(jQuery, window);