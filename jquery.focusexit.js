/**
* @function jquery.focusexit.js
* @version 0.1.1
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Triggers 'focusExit' event when keyboard focus has completely left the element.
* @fires {object} focusExit
* @fires {string} focusExit.lostFocus - the descendant element that lost focus
* @fires {string} focusExit.gainedFocus - the non-descendant element that gained focus
*/
(function ($, window, document, undefined) {

    var pluginName = 'jquery-focus-exit';

    $.fn.focusExit = function focusExit() {

        return this.each(function onEach() {

            // check plugin does not already exist
            if (!$.data(this, pluginName)) {

                jQuery.data(this, pluginName, 'true');

                var $this = $(this),
                    relatedTargetShim,
                    timeout;

                var onElementFocusIn = function() {
                    window.clearTimeout(timeout);
                };

                var onDocumentFocusIn = function(e) {
                    relatedTargetShim = e.target;
                };

                // KeyboardEvent.relatedTarget is not supported in Firefox.
                // So we manually listen to see where focus goes to in the doc.
                $this.on('focusin', function() {
                    $(document).on('focusin', onDocumentFocusIn);
                });

                $this.on('focusout', function onFocusOut(e) {
                    timeout = window.setTimeout(function onTimeout() {
                        $(document).off('focusin', onDocumentFocusIn);
                        $this.off('focusin', onElementFocusIn);
                        $this.trigger('focusExit', {
                            "lostFocus": e.target,
                            "gainedFocus": e.relatedTarget || relatedTargetShim
                        });
                    }, 100);

                    $this.one('focusin', onElementFocusIn);
                });
            }
        });
    };
}(jQuery, window, document));
