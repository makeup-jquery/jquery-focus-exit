/**
* @file jQuery collection plugin that triggers 'focusExit' event when keyboard focus has completely left the element boundary
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.2.0
* @requires jquery
*/
(function($, window, document, undefined) {
    var pluginName = 'jquery-focus-exit';

    /**
    * jQuery collection plugin that triggers 'focusExit' event when keyboard focus has completely left the element boundary
    *
    * @method "jQuery.focusExit"
    * @fires focusExit - when focus exits the element boundary
    * @return {Object} chainable jQuery class
    */
    $.fn.focusExit = function focusExit() {
        return this.each(function onEach() {
            // check plugin does not already exist
            if (!$.data(this, pluginName)) {
                jQuery.data(this, pluginName, 'true');

                var $this = $(this);
                var relatedTargetShim;
                var timeout;

                var onElementFocusIn = function() {
                    window.clearTimeout(timeout);
                };

                var onDocumentFocusIn = function(e) {
                    relatedTargetShim = e.target;
                };

                // KeyboardEvent.relatedTarget is not supported in Firefox.
                // So we manually listen to see where focus goes to in the doc.
                $this.on('focusin', function() {
                    $(document).on('focusin', onDocumentFocusIn);
                });

                $this.on('focusout', function onFocusOut(e) {
                    timeout = window.setTimeout(function onTimeout() {
                        $(document).off('focusin', onDocumentFocusIn);
                        $this.off('focusin', onElementFocusIn);
                        $this.trigger('focusExit', {
                            lostFocus: e.target,
                            gainedFocus: e.relatedTarget || relatedTargetShim
                        });
                    }, 100);

                    $this.one('focusin', onElementFocusIn);
                });
            }
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* focusExit event
*
* @event focusExit
* @type {object}
* @property {object} event - event object
*/
