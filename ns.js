/*
 * ns.js - JavaScript Namespacing
 * http://github.com/yushchenko/ns
 *
 * Copyright 2010, Valery Yushchenko (http://www.yushchenko.name)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */

(function(global, undefined){

    global.ns = function ns(namespace) {

        var parts = namespace.split('.'),
            i, len = parts.length, 
            target = global;

        // namespace lookup or creation 
        for (i = 0; i < len; i += 1) {
            if (target[parts[i]] === undefined) {
                target[parts[i]] = {};
            }
            target = target[parts[i]];
        }

        function extend(fn) {
            fn.apply(target);
        }

        function add(fn) {
            target[fn.name] = fn;
        }

        return {
            extend: extend,
            add: add
        };
    };

})( (function(){ return this; })() );