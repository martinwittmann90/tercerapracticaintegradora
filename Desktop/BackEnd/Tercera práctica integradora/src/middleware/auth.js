export const isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'user') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not user' });
};

export const isPremium = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'premium') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not premium' });
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, not admin' });
};

export const isLogged = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export const isNotAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied, user is admin' });
};

export const isAdminOrPremium = (req, res, next) => {
  if (req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'premium')) {
    return next();
  }
  return res.status(403).json({ message: 'Permission denied' });
};

export const isCartOwner = (req, res, next) => {
  if (req.session.user && req.session.user.cartID) {
    return next();
  }
  return res.status(403).json({ message: 'Cart ID missing' });
};

export const redirectIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/products');
  }
  return next();
};
