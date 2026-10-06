const jsonServer = require('json-server');
const bcserver = jsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults();

const PORT = 3000;
bcserver.use(middleware);
bcserver.use(router);
bcserver.listen(PORT, () => {
  console.log(`BC Server is running on port ${PORT} successfully`);
});
