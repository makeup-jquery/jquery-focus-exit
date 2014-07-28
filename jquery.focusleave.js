(function ( $ ) {

    $.fn.onFocusLeave = function onFocusLeave(callback) {

        return this.each(function onEach() {

            var $this = $(this),
                timeout;

            // event.relatedTarget is only supported in IE9+
            // http://msdn.microsoft.com/en-us/library/ie/ff974881(v=vs.85).aspx
            $this.on('focusout', function onFocusOut(e) {
                timeout = window.setTimeout(function onTimeout() {
                    callback.call($this, {"lostfocus": e.target, "gainedfocus": e.relatedTarget});
                }, 10);
            });

            $this.on('focusin', function onFocusIn(e) {
                window.clearTimeout(timeout);
            });
        });
    };

}( jQuery ));
