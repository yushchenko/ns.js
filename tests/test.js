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

test("namespace creation", function() {

    ns('xxx.yyy.zzz');

	ok(xxx.yyy.zzz, 'should create new namespace');

    global.xxx.yyy.zzz.test = true;
    ns('xxx.yyy.zzz');

    ok(xxx.yyy.zzz.test === true, 'should preserve existing namespace');
});

test('ns object interface', function() {

    var n = ns('xxx');

    ok(typeof n.extend === 'function', 'should have `extend` method');
    ok(typeof n.add === 'function', 'should have `add` method');
});

test('ns().extend - adding several functions to namespace', function() {

    ns('xxx.yyy.zzz').extend(function() {

        this.aMethod = function aMethod() {
            return 'result';
        };
    });

    ok(typeof xxx.yyy.zzz.aMethod === 'function', 'should add method to ns');
    ok(xxx.yyy.zzz.aMethod() === 'result', 'the method should return proper result');
});

test('ns().add - adding one function (constructor) to namespace', function() {

    ns('test.utils').add(function MyConstructor(arg1, arg2) {

        var pub = MyConstructor.prototype, //TODO: avoid ctor name duplication
            secret = 'secret'; // private data

        function a1() { // private method
            return arg1;
        }

        pub.getSecret = function getSecret() { // public instance method
            return secret;
        };

        pub.getArgs = function getArgs() { // public instance method
            return a1() + arg2;
        };
    });

    ok(typeof test.utils.MyConstructor === 'function', 'should add function to namespace using its name');

    var obj = new test.utils.MyConstructor();
    ok(typeof obj.getSecret === 'function', 'created object should have method `getSecret`');
    ok(obj.getSecret() === 'secret', 'the method should return secret');

    var obj2 = new test.utils.MyConstructor(1, 2);
    ok(obj2.getArgs() === 3, 'method should have access to constructor\'s arguments');
});

test('ns().add().add() - chaning', function() {

    ns('test.utils').add(function ClassOne(){

    })
    .add(function ClassTwo() {

    });

    ok(typeof test.utils.ClassOne === 'function', 'ClassOne should be added');
    ok(typeof test.utils.ClassTwo === 'function', 'ClassTwo should be added');
});

// test('', function() {

//     ok(true);
// });

