/*
 * ns.js - JavaScript Namespacing
 * http://github.com/yushchenko/ns
 *
 * Copyright 2010, Valery Yushchenko (http://www.yushchenko.name)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */

module('ns.js');

var global = (function() { return this; })();

test("ns() namespace creation", function() {

    ns('ns.test');

	ok(ns.test, 'should create new namespace');

    global.ns.test.value = true;
    ns('ns.test');

    ok(ns.test.value === true, 'should preserve existing namespace');
});

test('ns() interface', function() {

    var n = ns('xxx');

    ok(typeof n.extend === 'function', 'should have `extend` method');
    ok(typeof n.add === 'function', 'should have `add` method');
});

test('ns().extend - adding several functions to namespace', function() {

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

test('ns().extend - adding constructor to namespace', function() {

    ns('ns.test').extend(function () {

        var ctor,
            secret = 'secret',  // private data
            arg1, arg2, // constructor arguments
            pub; // refrence to public property

        this.MyClass = ctor = function () {
            arg1 = arguments[0]; // saving ctor args to private fields
            arg2 = arguments[1];
            this.pub = 'pub'; // public data, accessible only in public methods using this
        };

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

test('ns().add().add() - chaning', function() {

    ns('ns.test').add(function first(){

    })
    .add(function second() {

    });

    ok(typeof ns.test.first === 'function', 'first function should be added by name');
    ok(typeof ns.test.second === 'function', 'second function should be added by name');
});

// test('', function() {

//     ok(true);
// });

