$.fn.onAllFocusOut = function(cb) {
    var $this = this,
        timeout;

    $(this.selector).on('focusout', function(e) {
        timeout = window.setTimeout(cb($this), 50);
    })
    $(this.selector).on('focusin', function(e) {
        window.clearTimeout(timeout);
    })

    return this;
};
