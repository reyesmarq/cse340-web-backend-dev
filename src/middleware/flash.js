const initializeFlash = (req, res, next) => {
  if (!req.session.flash) {
    req.session.flash = {
      success: [],
      error: [],
      warning: [],
      info: [],
    };
  }
  next();
};

const flash = (type, message) => (req, res, next) => {
  if (!req.session.flash) {
    req.session.flash = {
      success: [],
      error: [],
      warning: [],
      info: [],
    };
  }

  if (message === undefined) {
    if (type === undefined) {
      const messages = req.session.flash;
      req.session.flash = {
        success: [],
        error: [],
        warning: [],
        info: [],
      };
      return messages;
    }

    const messages = req.session.flash[type] || [];
    req.session.flash[type] = [];
    return messages;
  }

  if (req.session.flash[type]) {
    req.session.flash[type].push(message);
  }
  return req;
};

const flashMiddleware = (req, res, next) => {
  req.flash = function (type, message) {
    if (message === undefined) {
      if (type === undefined) {
        const messages = this.session.flash || {};
        this.session.flash = {
          success: [],
          error: [],
          warning: [],
          info: [],
        };
        return messages;
      }

      const messages = this.session.flash[type] || [];
      this.session.flash[type] = [];
      return messages;
    }

    if (!this.session.flash) {
      this.session.flash = {
        success: [],
        error: [],
        warning: [],
        info: [],
      };
    }

    if (this.session.flash[type]) {
      this.session.flash[type].push(message);
    }
  };

  res.locals.flash = () => {
    const messages = req.session.flash || {};
    req.session.flash = {
      success: [],
      error: [],
      warning: [],
      info: [],
    };
    return messages;
  };

  next();
};

export { initializeFlash, flashMiddleware };
