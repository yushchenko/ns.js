/*
 * ns.js - JavaScript Namespacing
 * http://github.com/yushchenko/ns.js
 *
 * Copyright 2010, Valery Yushchenko (http://www.yushchenko.name)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */

module('ns.js');

var global = (function() { return this; })();

test("namespace creation", function() {

    ns('ns.test');

	ok(ns.test, 'should create new namespace');

    global.ns.test.value = true;
    ns('ns.test');

    ok(ns.test.value === true, 'should preserve existing namespace');
});

test('interface', function() {

    var n = ns('xxx');

    ok(typeof n.extend === 'function', 'should have `extend` method');
});

test('extend - adding several functions to namespace', function() {

    ns('ns.test').extend(function() {

        this.first = function first() {
            return 'result';
        };

        this.second = function second() {
            return 1;
        };
    });

    ok(typeof ns.test.first === 'function'
       && typeof ns.test.second === 'function', 'should add functions to namespace');
    ok(ns.test.first() === 'result'
       && ns.test.second() === 1, 'the functions should return proper result');
});

test('extend - adding object constructor to namespace', function() {

    ns('ns.test').extend(function () {

        var ctor = this.MyClass = function (a1, a2) {
                arg1 = a1; // saving ctor args to private fields
                arg2 = a2; // public data, accessible only in public methods using this
                this.pub = 'pub';
            },
            secret = 'secret',  // private data
            arg1, arg2; // constructor arguments

        function getArg1() { // private method
            return arg1;
        }

        ctor.prototype.getSecret = function getSecret() { // public instance method
            return secret;
        };

        ctor.prototype.getArgs = function getArgs() { 
            return getArg1() + arg2;
        };
    });

    ok(typeof ns.test.MyClass === 'function', 'should add ctor to namespace');

    var obj = new ns.test.MyClass();
    ok(typeof obj.getSecret === 'function', 'created object should have method `getSecret`');
    ok(obj.getSecret() === 'secret', 'the method should return secret');
    ok(obj.pub === 'pub', 'public object should have public property');

    var obj2 = new ns.test.MyClass(1, 2);
    ok(obj2.getArgs() === 3, 'method should have access to constructor\'s arguments');
});

test('use - getting reference to namespace', function() {
    ns('ns.test').extend(function() {
        this.constant = 'constant';
    });

    var ref = ns('ns.test').use();

    ok(ref === ns.test, 'should refer given namespace');
    ok(ref.constant === 'constant', 'should refer given namespace');
});

test('article example', function() {

    ns('ns.test').extend(function () {

        var ctor = this.MyClass = function() {
            },
            secret = 'secret';  // private data

        ctor.prototype.getSecret = function getSecret() { // public method
            return secret;
        };
    });

    var obj = new ns.test.MyClass();
    
    ok(obj instanceof ns.test.MyClass, 'should be instance of MyClass');
    ok(typeof obj.getSecret === 'function', 'should have getSecret method');
    ok(obj.getSecret() === 'secret', 'should return secret');
});

