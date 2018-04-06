'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @author anxu <anxu1212@hotmail.com>
 * version: 0.1.0
 */
(function ($, window) {
    'use strict';
    /**
     * 获取select 中选择的数据
     * @param {Select DOM} ele 
     */

    var getSelect = function getSelect(ele) {
        var selected = [];
        ele.find('option:selected').each(function () {
            selected.push($(this).data('item'));
        });
        return selected;
    };

    var PickList = function PickList(ele, opt) {

        this.$element = $(ele);
        this.options = opt;
        this.available = opt.data.available ? opt.data.available : [];
        this.selected = opt.data.selected ? opt.data.selected : [];

        this.init();
        return this;
    };

    /**
     * 
     */
    PickList.DEFAULTS = {
        data: {
            available: [],
            selected: []
        },
        buttons: [{ action: 'add' }, { action: 'addAll' }, { action: 'remove', label: 'Remove', className: 'btn btn-sm btn-block btn-info' }, { action: 'removeAll' }],
        buttonClass: 'btn btn-sm btn-block btn-primary',
        label: {
            content: ['Available:', 'Selected:']
        },
        select: {
            size: 15
        }

        /**
         * init
         */
    };PickList.prototype.init = function () {
        this.initHtml();
        this.initData();
        this.initActions();
    };

    PickList.prototype.initHtml = function () {
        var buttonGroup = this.initButtons();
        var available = this.initSelect();
        var selected = this.initSelect();

        if (this.options.label !== false) {
            available.prepend($('<p>').text(this.options.label.content[0]));
            selected.prepend($('<p>').text(this.options.label.content[1]));
        }
        this.$element.addClass('picklist');
        this.$element.append(available.addClass('available'));
        this.$element.append(buttonGroup);
        this.$element.append(selected.addClass('selected'));
    };

    PickList.prototype.initButtons = function () {
        var buttonGroup = $('<div>').addClass('button-group'),
            that = this;
        $.each(this.options.buttons, function (i, v) {
            var button = $('<button>').attr('type', 'button');
            button.addClass(typeof v.className == 'undefined' ? that.options.buttonClass : v.className);
            button.addClass(v.action);
            button.append(typeof v.label == 'undefined' ? v.action : v.label);
            button.appendTo(buttonGroup);
        });
        return buttonGroup;
    };

    PickList.prototype.initSelect = function () {
        var container = $('<div>').addClass('select');

        $('<select>').prop('multiple', true).attr('size', this.options.select.size).appendTo(container);
        return container;
    };

    PickList.prototype.initData = function () {
        var selected = this.$element.find('.select.selected select');
        var available = this.$element.find('.select.available select');
        selected.empty();
        available.empty();

        $.each(this.available, function (i, v) {
            $('<option>').val(v.id).text(v.label).data('item', v).appendTo(available);
        });

        $.each(this.selected, function (i, v) {
            $('<option>').val(v.id).text(v.label).data('item', v).appendTo(selected);
        });
    };

    PickList.prototype.initActions = function () {
        var el = this.$element;
        var that = this;

        this.$element.find(".button-group .add").on('click', function () {
            var selectValue = getSelect(el.find(".select.available select"));

            $.merge(that.selected, selectValue);

            that.available = that.available.filter(function (v) {
                for (var i = 0, len = selectValue.length; i < len; i++) {
                    if (selectValue[i].id != v.id) {
                        continue;
                    }
                    return false;
                }
                return true;
            });

            that.reload();
            that.trigger('add', selectValue);
        });

        this.$element.find(".button-group .remove").on('click', function () {
            var selectValue = getSelect(el.find(".select.selected select"));

            $.merge(that.available, selectValue);

            that.selected = that.selected.filter(function (v) {
                for (var i = 0, len = selectValue.length; i < len; i++) {
                    if (selectValue[i].id != v.id) {
                        continue;
                    }
                    return false;
                }
                return true;
            });
            that.reload();
            that.trigger('remove', selectValue);
        });

        this.$element.find(".button-group .addAll").on('click', function () {
            var selectValue = that.available;
            $.merge(that.selected, selectValue);
            that.available = [];
            that.reload();
            that.trigger('add', selectValue);
        });

        this.$element.find(".button-group .removeAll").on('click', function () {
            var selectValue = that.selected;
            $.merge(that.available, selectValue);
            that.selected = [];
            that.reload();
            that.trigger('remove', selectValue);
        });
    };

    PickList.prototype.reload = function () {
        this.initData();
    };
    /**
     * 触发事件
     * @param {string} name 
     */
    PickList.prototype.trigger = function (name) {
        var args = Array.prototype.slice.call(arguments, 1);
        name = 'picklist.' + name;

        this.$element.trigger($.Event(name), args);
    };

    PickList.prototype.getSelected = function () {
        var objResult = [];
        this.$element.find(".select.selected select option").each(function () {
            objResult.push($(this).data('item'));
        });
        return objResult;
    };

    var allowedMethods = ['getSelected'];
    // Plugin definition.
    $.fn.pickList = function (option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
            var $this = $(this),
                obj = $this.data('picklist');

            if (obj && typeof option === 'string') {
                if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }
                value = obj[option].apply(obj, args);
            }

            if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
                var options = $.extend({}, PickList.DEFAULTS, option);
                $this.data('picklist', new PickList(this, options));
            }
        });

        return typeof value === 'undefined' ? this : value;
    };
})(jQuery, window);