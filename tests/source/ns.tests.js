/*
 * ns.js - JavaScript Namespacing
 * http://github.com/yushchenko/ns.js
 *
 * Copyright 2010, Valery Yushchenko (http://www.yushchenko.name)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 */

describe('ns.js', function() {

    var global = (function() { return this; })();

    it('shoud create namespace preserving existing one', function() {

        ns('ns.test');
        expect(ns.test).toBeDefined();

        ns.test.value = true;
        ns('ns.test');

        expect(ns.test.value).toEqual(true);
    });

    it('should provide appropriate chain interface', function() {

        var n = ns('ns.test2');

        expect(typeof n.extend).toEqual('function');
    });

    it('should add functions to namespace', function() {

        ns('ns.test3').extend(function() {
    
            this.first = function first() {
                return 'result';
            };
    
            this.second = function second() {
                return 1;
            };
        });
        
        expect(typeof ns.test3.first).toEqual('function');
        expect(typeof ns.test3.second).toEqual('function');

        expect(ns.test3.first()).toEqual('result');
        expect(ns.test3.second()).toEqual(1);
    });

    it('should add object constructor to namespace', function() {

        ns('ns.test4').extend(function () {
    
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

        expect(typeof ns.test4.MyClass).toEqual('function');
        
        var obj = new ns.test4.MyClass();

        expect(typeof obj.getSecret).toEqual('function');
        expect(obj.getSecret()).toEqual('secret');
        expect(obj.pub).toEqual('pub');

        var obj2 = new ns.test4.MyClass(1, 2);

        expect(obj2.getArgs()).toEqual(3);
    });

    it('should return reference to namespace', function() {

        ns('ns.test5').extend(function() {
            this.constant = 'constant';
        });
    
        var ref = ns('ns.test5').use();

        expect(ref).toBe(ns.test5);
        expect(ref.constant).toEqual('constant');
    });

    it('should work in article example', function() {

        ns('ns.test6').extend(function () {
    
            var ctor = this.MyClass = function() {
                },
                secret = 'secret';  // private data
    
            ctor.prototype.getSecret = function getSecret() { // public method
                return secret;
            };
        });

        var obj = new ns.test6.MyClass();

        expect(obj instanceof ns.test6.MyClass).toBeTruthy();
        expect(obj.getSecret()).toEqual('secret');
    });

});