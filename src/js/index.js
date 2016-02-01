(function($) {

    var callTree = function(data, config, container) {
        if (typeof container === 'string') {
            container = $(container);
        } else if (container === undefined) {
            container = $('body');
        }
        this.data = data;
        this.config = config;
        this.container = container;
        this.init();
    }

    callTree.prototype.init = function() {
        var tree = $('<div class="call-tree"></div>');
        this.renderHead(tree);
        this.render(this.data, this.head);
        this.container.html(tree);
        this.bindEvent();
    }

    callTree.prototype.bindEvent = function() {
        var self = this;
        this.container.on('click', '.parent .unexpand', function(e) {
            var target = $(e.target);
            var parent = target.closest('.parent');
            var data = parent.data('children');
            target.removeClass('unexpand').addClass('expand');
            var children = self.container.find('[data-pid=' + parent.data('id') + ']');
            if (children.length > 0) {
                children.show();
            } else {
                self.render(data, parent);
            }
        });

        this.container.on('click', '.parent .expand', function(e) {
            var hideChild = function(dom) {
                var children = self.getChildren(dom).hide();
                if (children.data('children')) {
                    children.find('.icon').removeClass('expand').addClass('unexpand');
                }
                if (children.length > 0) {
                    for (var i = 0, len = children.length; i < len; i++) {
                        hideChild(children.eq(i));
                    }
                }

            }
            var target = $(e.target);
            var parent = target.closest('.parent');
            target.removeClass('expand').addClass('unexpand');
            hideChild(parent);
        });

        this.container.on('click', '.row', function(e) {
            var row = $(e.target).closest('.row');
            self.container.find('.row').removeClass('selected');
            row.addClass('selected');
        });

        this.container.on('dblclick', '.row', function(e) {
            $(e.target).closest('.row').find('.icon').trigger('click');
        });
    }

    callTree.prototype.renderHead = function(tree) {
        var self = this;
        this.head = $('<div class="call-tree-header"></div>');
        this.config.forEach(function(item) {
            self.head.append('<div>' + item.head + '</div>');
        });
        tree.append(this.head);
    }

    callTree.prototype.render = function(data, parent) {
        var self = this;
        if (data instanceof Array) {
            data.forEach(function(item, index) {
                self.renderRow(item, parent, index);
            });
        } else {
            this.renderRow(data, parent, 0);
        }
    }

    callTree.prototype.renderRow = function(obj, parent, id) {
        var self = this;
        var pid = parent.data('id') || 0;
        var id = '' + pid + id;
        var div = $('<div class="row" data-id="' + id + '" data-pid="' + (parent.data('id') || 0) + '"></div>');
        if (obj.children) {
            div.addClass('parent')
                .data('children', obj.children)
        }
        this.config.forEach(function(item, index) {
            var paddingLeft = parseInt(parent.find('.icon').css('paddingLeft'), 10) + 20 + 'px';
            var column = $('<div class="column"></div>');
            var value = obj[item.key];
            var render = item.render;
            if (index === 0) {
                var span = $('<span class="icon" style="padding-left: ' + paddingLeft + '"></span>');
                if (obj.children) {
                    span.addClass('unexpand');
                }
                column.append(span);
            }
            if (typeof render === 'string') {
                column.append(self.columnRenders[render](value));
            } else if (typeof render === 'function') {
                column.append(render(value));
            } else {
                column.append(obj[item.key]);
            }
            div.append(column);
        });
        parent.after(div);
    }

    callTree.prototype.columnRenders = {
        progress: function(precent) {
            var max = 1;
            var dom = '<progress max="$max" value="' + precent + '"></progress>'
            if (precent > 1) {
                max = 100;
            }
            dom = dom.replace('$max', max);
            return $(dom);
        },
        ms: function(time) {
            var d = new Date(time);
            return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + d.getMilliseconds();
        }
    }

    callTree.prototype.getChildren = function(parent) {
        var pid = parent.data('id');
        return this.container.find('[data-pid="' + pid + '"]');
    }

    window.callTree = callTree;

})(jQuery);
