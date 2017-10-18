/**
* @file jQuery collection plugin that triggers 'focusExit' event when keyboard focus moves to a non-descendant of widget
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 1.0.1
* @requires jquery
* @param {Object} [options]
* @param {string} [options.debug] - print debug output to console (default: false)
*/
(function($, window, document, undefined) {
    var pluginName = 'jquery-focus-exit';

    /**
    * jQuery collection plugin that triggers 'focusExit' event when keyboard focus moves to a non-descendant of widget
    *
    * @method "jQuery.focusExit"
    * @fires focusExit - when keyboard focus moves to a non-descendant of widget
    * @return {Object} chainable jQuery class
    */
    $.fn.focusExit = function focusExit(options) {
        options = $.extend({
            debug: false
        }, options);
        return this.each(function onEachCollectionItem() {
            // our root element
            var $widget = $(this);
            // used to keep track of focussed element
            var currentFocusElement;
            // cache the document node
            var $document = $(document);
            // cache the window node
            var $window = $(window);

            function onWidgetFocusIn() {
                // listen once for focus moving to anywhere in document
                $document.one('focusin', onDocumentFocusIn);
                // listen once for focus leaving the window (clearing any existing listener first)
                $window.off('blur', onWindowBlur).one('blur', onWindowBlur);
            }

            function onWindowBlur() {
                // focus has left the window
                doFocusExit(undefined);
            }

            function onDocumentFocusIn(e) {
                var newFocusElement = e.target;
                var targetIsDescendant = $widget.get(0).contains(newFocusElement);

                // if focus has moved to a descendant
                if (targetIsDescendant === true) {
                    // set the target as the currently focussed element
                    currentFocusElement = newFocusElement;
                    // recursively listen for document focus in again
                    $document.one('focusin', onDocumentFocusIn);
                } else { // else focus has not gone to a descendant
                    doFocusExit(newFocusElement);
                }
            }

            function doFocusExit(newFocusElement) {
                // notify observers
                $widget.trigger('focusExit', { lostFocus: currentFocusElement, gainedFocus: newFocusElement });
                // listen once for focus moving back in to widget again
                $widget.one('focusin', onWidgetFocusIn);
                // clear the currently focussed element
                currentFocusElement = null;
            }

            // check plugin is not already installed
            if ($.data(this, pluginName) === undefined) {
                // mark plugin as installed
                jQuery.data(this, pluginName, { installed: 'true' });
                // listen once for focus moving in to widget
                $widget.one('focusin', onWidgetFocusIn);
            } else if (options.debug === true) {
                console.log('debug: {pluginName} is already installed on {element}'
                    .replace('{pluginName}', pluginName)
                    .replace('{element}', this));
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
