# FocusExit

Triggers a custom event only when keyboard focus has
completely left the given element, including all of it's children.

This type of behaviour is especially
desirable for knowing when to close and hide non-modal overlays.

The native 'focusout' event fires when any child of a given element loses
keyboard focus, even if another child immediately gains focus. This type of
behaviour is not desirable for non-modal overlays.
