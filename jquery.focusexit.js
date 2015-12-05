/**
* @function jquery.focusexit.js
* @version 0.0.3
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Triggers event when keyboard focus has completely left the element.
* @required event.relatedTarget - http://msdn.microsoft.com/en-us/library/ie/ff974881(v=vs.85).aspx
* @fires {object} focusexit
* @fires {string} focusexit.lostFocus
* @fires {string} focusexit.gainedFocus
*/
(function ($, window, document, undefined) {

    $.fn.focusExit = function focusExit() {

        return this.each(function onEach() {

            var $this = $(this),
                timeout;

            function onFocusIn() {
                window.clearTimeout(timeout);
            }

            $this.on('focusout', function onFocusOut(e) {
                timeout = window.setTimeout(function onTimeout() {
                    $this.off('focusin', onFocusIn).trigger('focusexit', {"lostFocus": e.target, "gainedFocus": e.relatedTarget});
                }, 100);

                $this.one('focusin', onFocusIn);
            });
        });

    };

}(jQuery, window, document));
