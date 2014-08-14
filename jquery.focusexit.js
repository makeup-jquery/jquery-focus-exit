(function ( $ ) {

    $.fn.focusexit = function onFocusExit(callback, options) {

        options = options || {};

        return this.each(function onEach() {

            var $this = $(this),
                timeout;

            // event.relatedTarget is only supported in IE9+
            // http://msdn.microsoft.com/en-us/library/ie/ff974881(v=vs.85).aspx
            $this.on('focusout', function onFocusOut(e) {
                timeout = window.setTimeout(function onTimeout() {
                    callback.call($this, {"lostfocus": e.target, "gainedfocus": e.relatedTarget});

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

}( jQuery ));
