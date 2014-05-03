$.fn.onAllFocusOut = function(cb) {
    var $this = this,
        timeout;

    $('.tooltip-interactive').on('focusout', function(e) {
        timeout = window.setTimeout(cb($this), 50);
    })
    $('.tooltip-interactive').on('focusin', function(e) {
        window.clearTimeout(timeout);
    })

    return this;
};
