describe("jquery.focusexit.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

    var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL - 500;

    var eventHandlers = {
        onFocusExit : function(e) {}
    };

    var dom = '<div id="testElement" tabindex="0"><button></button><button></button></div>'
            + '<div id="testElementSibling" tabindex="0"><button></button><button></button></div>';

    var $testElement,
        $testElementSibling;

    beforeEach(function() {
        $('body').empty().append($(dom));
        $testElement = $('#testElement');
        $testElementSibling = $('#testElementSibling');
    });

    it("should trigger focusexit when focus moves from element root to sibling", function(done) {
        // async assert
        $testElement.on('focusexit', done);

        // excecute
        $testElement.focusExit();
        $testElement.focus();
        $testElementSibling.focus();
    });

    it("should trigger when focus moves from element descendant to element sibling", function(done) {
        // async assert
        $testElement.on('focusexit', done);

        // excecute
        $testElement.focusExit();
        $testElement.find('button').first().focus();
        $testElementSibling.find('button').first().focus();
    });

    it("should NOT trigger when focus moves from element root to element descendant", function(done) {
        // spy
        spyOn(eventHandlers, 'onFocusExit');

        // execute
        $testElement.focusExit();
        $testElement.on('focusexit', eventHandlers.onFocusExit);
        $testElement.focus();
        $testElement.find('button').first().focus();

        // async assert
        setTimeout(function() {
            expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

    it("should NOT trigger when focus moves from element descendant to element descendant", function(done) {
        // spy
        spyOn(eventHandlers, 'onFocusExit');

        // execute
        $testElement.focusExit();
        $testElement.find('button').first().focus();
        $testElement.find('button').last().focus();

        // async assert
        setTimeout(function() {
            expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

    it("should NOT trigger when focus moves from element descendant to element root", function(done) {
        // spy
        spyOn(eventHandlers, 'onFocusExit');

        // execute
        $testElement.focusExit();
        $testElement.find('button').first().focus();
        $testElement.focus();

        // async assert
        setTimeout(function() {
            expect(eventHandlers.onFocusExit).not.toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

});
