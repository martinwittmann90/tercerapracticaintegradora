export const isUser = (req, res, next) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return next();
  }
  if (req.session?.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'Error de autenticacion.' });
};

export const isAdmin = (req, res, next) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return next();
  }
  if (req.session?.role === 'admin') {
    return next();
  }
  return res.status(403).render('error', { error: 'Error de autorización.' });
};

export const isLogged = (req, res, next) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return next();
  }
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/products');
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/products');
  }
  return next();
};

export const isNotAdmin = (req, res, next) => {
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return next();
  }

  if (req.session?.role !== 'admin') {
    return next();
  }
  return res.status(403).render('error', { error: 'Error de autorización.' });
};

export const isCartOwner = (req, res, next) => {
   if ((process.env.NODE_ENV === 'DEVELOPMENT') && (!req.isAuthenticated()) ){
    return next();
  } 
  if (req.user?.cartID === req.params.cid) {
    return next();
  }
  return res.status(403).render('error', { error: 'Authorization error, does not have Cart' });
};
