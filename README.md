## ns.js Micro Library

JavaScript Namespace Sugar ;)

## Usage

    // creates new or extend existing namespace
    ns('ns.test').extend(function() { 

        function privateMember() {
            return 'result';
        };

        // this used as reference to the namespace
        this.publicMember = function () { 
            return privateMember();
        };
    });


    // getting short reference to namespace    
    var t = ns('ns.test').use(); 
    t.publicMember();

## More

You can find more details about ns.js library [here][article].



[article]: http://www.yushchenko.name/blog/javascript-namespacing-pattern "blog article about ns.js"
