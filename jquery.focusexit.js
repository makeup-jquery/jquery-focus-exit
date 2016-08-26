/**
* @file jQuery collection plugin that triggers 'focusExit' event when keyboard focus moves to a non-descendant of widget
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.3.0
* @requires jquery
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
    $.fn.focusExit = function focusExit() {
        return this.each(function onEachCollectionItem() {
            // our root element
            var $widget = $(this);
            // used to keep track of focussed element
            var currentFocusElement;
            // cache the document node
            var $document = $(document);
            // cache the window node
            var $window = $(window);

            function onWidgetFocusIn(e) {
                // listen once for focus moving to anywhere in document
                $document.one('focusin', onDocumentFocusIn);
                // listen once for focus leaving the window (clearing any existing listener first)
                $window.off('blur', onWindowBlur).one('blur', onWindowBlur);
            }

            function onWindowBlur(e) {
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
                $widget.trigger('focusExit', {lostFocus: currentFocusElement, gainedFocus: newFocusElement});
                // listen once for focus moving back in to widget again
                $widget.one('focusin', onWidgetFocusIn);
                // clear the currently focussed element
                currentFocusElement = null;
            }

            // check plugin is not already installed
            if ($.data(this, pluginName) === undefined) {
                // mark plugin as installed
                jQuery.data(this, pluginName, {installed: 'true'});
                // listen once for focus moving in to widget
                $widget.one('focusin', onWidgetFocusIn);
            } else { // log warning if plugin is already installed
                console.log('warning: {pluginName} is already installed on this element'.replace('{pluginName}', pluginName));
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
