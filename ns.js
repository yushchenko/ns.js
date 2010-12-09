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

        var iface = {
            extend: function ns_extend(fn) {
                fn.apply(target);
                return iface;
            }
        };

        return iface;
    };

})( (function(){ return this; })() );