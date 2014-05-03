$.fn.onAllFocusOut = function(selector, cb) {
    var $this = this,
        timeout;

    $(selector).on('focusout', function(e) {
        timeout = window.setTimeout(cb($this), 50);
    })
    $(selector).on('focusin', function(e) {
        window.clearTimeout(timeout);
    })

    return this;
};
