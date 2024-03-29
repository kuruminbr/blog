module.exports = function ( app, middleware ){
  app.locals._layoutFile = '/layouts/default';
  app.locals.cache       = true;
  app.locals.compress    = true;
  app.engine( 'html', require( 'express-thunder' ));
  app.set( 'view engine', 'html' );
  app.set( 'views', VIEW_DIR );
  app.use( middleware.body_parser());
  app.use( middleware.multipart());
  app.use( middleware.cookie_parser( CONF.session.secret ));
  app.use( middleware.logger );
  app.use( middleware.session());
  app.use( middleware.flash());
  app.use( middleware.csrf());
  app.use( middleware.method_override());
  app.use( middleware.dynamic_helpers );
  app.routes();
  app.use( middleware.err404 );
  app.use( middleware.err500 );
  app.use( middleware.error_handler({
    dumpExceptions : true,
    showStack      : true
  }));
};
