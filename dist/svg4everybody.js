!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.loadsvgexternal = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    function loadreadystatechange1(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    item.onloadcallback();
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function loadsvgexternal(src, onloadcallback) {
        var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#"), xhr = requests[url];
        xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
        xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
        xhr._embeds.push({
            id: id,
            onloadcallback: function() {
                onloadcallback(src);
            }
        }), // prepare the xhr ready state change event
        loadreadystatechange1(xhr);
    }
    var requests = {};
    return loadsvgexternal;
});