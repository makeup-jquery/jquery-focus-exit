(function ( $ ) {

    $.fn.onFocusLeave = function(cb) {

        return this.each(function() {

            var $this = $(this),
                timeout;

            $this.on('focusout', function(e) {
                var lastTarget = e.target;
                timeout = window.setTimeout(function(){cb($this, $(lastTarget));}, 30);
            });

            $this.on('focusin', function(e) {
                window.clearTimeout(timeout);
            });
        });
    };

}( jQuery ));
