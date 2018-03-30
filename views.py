def root(handler):
    """Check logged in user."""
    if handler.current_user:
        handler.redirect('/home/')
    else:
        handler.redirect('/login/')
