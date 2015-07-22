/**
* @function jquery.focusexit.js
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Triggers event when keyboard focus has completely left the given
* element. This type of behaviour is especially desirable for non-modal overlays.
* @fires focusout - fires when any child of a given element loses
* keyboard focus, even if another child immediately gains focus.
*/
(function ($, window, document, undefined) {

    $.fn.focusexit = function focusExit(options) {

        options = options || {};

        return this.each(function onEach() {

            var $this = $(this),
                timeout;

            // event.relatedTarget is only supported in IE9+
            // http://msdn.microsoft.com/en-us/library/ie/ff974881(v=vs.85).aspx
            $this.on('focusout', function onFocusOut(e) {
                timeout = window.setTimeout(function onTimeout() {
                    $this.trigger('focusexit', {"lostfocus": e.target, "gainedfocus": e.relatedTarget});

                    if (options.doOnce === true) {
                        $this.off('focusin');
                    }

                }, 10);

                $this.one('focusin', function onFocusIn(e) {
                    window.clearTimeout(timeout);
                });
            });

        });
    };

}(jQuery, window, document));
