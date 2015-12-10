/**
* @function jquery.focusexit.js
* @version 0.0.5
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Triggers 'focusexit' event when keyboard focus has completely left the element.
* @fires {object} focusexit
* @fires {string} focusexit.lostFocus - the descendant element that lost focus
* @fires {string} focusexit.gainedFocus - the non-descendant element that gained focus
*/
(function ($, window, document, undefined) {

    $.fn.focusExit = function focusExit() {

        return this.each(function onEach() {

            var $this = $(this),
                relatedTargetShim,
                timeout;

            function onElementFocusIn() {
                window.clearTimeout(timeout);
            }

            function onDocumentFocusIn(e) {
                relatedTargetShim = e.target;
            }

            // KeyboardEvent.relatedTarget is not supported in Firefox.
            // So we manually listen to see where focus goes to in the doc.
            $this.on('focusin', function() {
                $(document).on('focusin', onDocumentFocusIn);
            });

            $this.on('focusout', function onFocusOut(e) {
                timeout = window.setTimeout(function onTimeout() {
                    $(document).off('focusin', onDocumentFocusIn);
                    $this.off('focusin', onElementFocusIn);
                    $this.trigger('focusexit', {
                        "lostFocus": e.target,
                        "gainedFocus": e.relatedTarget || relatedTargetShim
                    });
                }, 100);

                $this.one('focusin', onElementFocusIn);
            });
        });

    };

}(jQuery, window, document));
