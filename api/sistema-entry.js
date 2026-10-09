// Ponte de deploy: expõe a app Express do submódulo `sistema` (Hiperion Protocolos)
// sob o prefixo público "/sistema", sem alterar o código do submódulo.
const app = require('../sistema/server-turso.js');

module.exports = (req, res) => {
  if (req.url === '/sistema') {
    req.url = '/';
  } else if (req.url.startsWith('/sistema/')) {
    req.url = req.url.slice('/sistema'.length);
  }

  return app(req, res);
};
