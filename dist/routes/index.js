"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _usersRouter = require('./usersRouter'); var _usersRouter2 = _interopRequireDefault(_usersRouter);
var _authRoutes = require('./authRoutes'); var _authRoutes2 = _interopRequireDefault(_authRoutes);
var _filialsRoutes = require('./filialsRoutes'); var _filialsRoutes2 = _interopRequireDefault(_filialsRoutes);
var _platformsRoutes = require('./platformsRoutes'); var _platformsRoutes2 = _interopRequireDefault(_platformsRoutes);
var _queuesRoutes = require('./queuesRoutes'); var _queuesRoutes2 = _interopRequireDefault(_queuesRoutes);
const bodyParser = require('body-parser');

const routes = _express2.default.call(void 0, );

routes.use(bodyParser.urlencoded({extended:true}))

routes.use('/api/users', _usersRouter2.default);

routes.use('/api/auth', _authRoutes2.default);

routes.use('/api/filials', _filialsRoutes2.default);

routes.use('/api/platforms', _platformsRoutes2.default);

routes.use('/api/queues', _queuesRoutes2.default)

exports. default = routes;
