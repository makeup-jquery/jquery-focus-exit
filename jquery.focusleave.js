(function ( $ ) {

    $.fn.onFocusLeave = function(cb) {

        return this.each(function() {

            var $this = $(this),
                timeout;

            $(this).on('focusout', function(e) {
                timeout = window.setTimeout(function(){cb($this);}, 50);
            });

            $(this).on('focusin', function(e) {
                window.clearTimeout(timeout);
            });
        });
    };

}( jQuery ));
