function replaceAll(find, replace, str) {
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});
var HEADERS;
jQuery.get('scripts/urdujs/keywords.js.txt', function(data) {
    data = replaceAll("'lang sweet.js';", "", data)
    data = replaceAll("export syntax", "syntax", data)
    HEADERS = data
});

var isMac = (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Mac OS X') != -1)
if (isMac)
    $("#btn-run").attr("value", "Run (⌘ + Enter)")
else
    $("#btn-run").attr("value", "Run (Ctrl + Enter)")

require(["./sweet", "./syntax"], function(sweet, syn) {
    var storage_code = 'editor_code';
    var storage_mode = 'editor_mode';

    var starting_code = $("#editor").text();
    var compileWithSourcemap = $("body").attr("data-sourcemap") === "true";
    CodeMirror.commands.compileCode = function(cm) {
        updateExpand();
    }.bind(this);
    var editor = CodeMirror.fromTextArea($('#editor')[0], {
        lineNumbers: true,
        //smartIndent: true,
        matchBrackets: true,
        indentWithTabs: true,
        tabSize: 4,
        autofocus: true,
        theme: 'base16-light',
        extraKeys: {
            "Backspace": "delSpaceToPrevTabStop",
            "Cmd-Left":"goLineLeftSmart",
            "Home":"goLineLeftSmart",
            "Cmd-Enter":"compileCode","Ctrl-Enter":"compileCode"

        }
    });

    var currentStep = 1;

    if (window.location.hash) {
        editor.setValue(decodeURI(window.location.hash.slice(1)));
    } else {
        editor.setValue(localStorage[storage_code] ? localStorage[storage_code] : starting_code);
    }
    if(localStorage[storage_mode]) {
        editor.setOption("keyMap", localStorage[storage_mode]);
    }

    var output = CodeMirror.fromTextArea($('#output')[0], {
        lineNumbers: true,
        theme: 'base16-light',
        readOnly: true
    });

    $('#btn-vim').click(function() {
        editor.setOption('keyMap', 'vim');
        editor.focus();
        localStorage[storage_mode] = "vim";
    });
    $('#btn-emacs').click(function() {
        editor.setOption('keyMap', 'emacs');
        editor.focus();
        localStorage[storage_mode] = "emacs";
    });

    $('#btn-step').click(function() {
        var unparsedString = syn.prettyPrint(
            sweet.expand(editor.getValue(), 
                         undefined, 
                         currentStep++),
            $("#ck-hygiene").prop("checked"));
        $("#lab-step").text(currentStep);
        output.setValue(unparsedString); 
    });

    //populate dropdown with examples
    for (var i in CODES){
        $("#drop-examples").append($(`<option value=${i}>${i}</option>`))
    }
    
    // set value to first code
    editor.setValue(CODES[$("#drop-examples").val()])


    $("#drop-examples").change((e)=>{
        editor.setValue( CODES[$(e.target).val()] )
    })

    /*
    var updateTimeout;
    editor.on("change", function(e) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updateExpand, 200);
    });
    */

    $("#btn-run").on('click', ()=>{
        updateExpand()
    })

    $("#btn-reset").on('click', ()=>{
        delete localStorage.editor_code;
        window.location.hash = "";
        window.location.reload()
    })

    // override console.log ie. likho
    window.console.LOG = window.console.log;
    window.console.log = function(){
        var args = Array.prototype.slice.call(arguments);
        var str = args.join(" ")
        output.setValue(output.getValue() + "\n" + str)
    }
    

    function updateExpand() {
        
        var code = editor.getValue();
        var expanded, compiled, res;
        window.location = "#" + encodeURI(code);
        localStorage[storage_code] = code;
        try {
            //append headers for urduscript
            code = HEADERS + "\n" + code;
            if (compileWithSourcemap) {
                res = sweet.compile(code, {
                    sourceMap: true,
                    filename: "test.js",
                    readableNames: true
                });
            } else {
                res = sweet.compile(code, {
                    sourceMap: false,
                    readableNames: true
                });
            }
            compiled = res.code;
            if ($("#chk-transpile")[0].checked){
                console.log("Only Transpile")
                output.setValue(compiled);
            }
            else{
                output.setValue("// Output")
                eval(compiled)
                /*
                console.log("Compiling")
                output.setValue("// Compiling...");
                var json = {
                    language: 4,
                    code: compiled,
                    stdin:""
                };
                console.log(json);
                $.post("https://compile-public-low.remoteinterview.io/compile", json, function(data, error, xhr) {
                    console.log(data);
                    if (!data.err){
                        output.setValue(data.output + "\r\n" + data.errors)
                    }
                    

                });
                */
            }
            

            $('#errors').text('');
            $('#errors').hide();
        } catch (e) {
            $('#errors').text(e);
            $('#errors').show();
        }
    }
    $('#errors').hide();
    //updateExpand();
});
