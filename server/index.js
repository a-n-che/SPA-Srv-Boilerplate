const bodyParser = require('koa-bodyparser'); // распарсивает POST запросы
const compress = require('koa-compress'); // сжимает ответы
const favicon = require('koa-favicon'); // иконка приложения
const helmet = require("koa-helmet"); // добавляет заголовки безопатсности
const serve = require('koa-static'); // отдача статичного контента
const logger = require('./mw/logger');// протоколирование запросов
const Err404 = require('./mw/Err404');// обработка ошибки 404
const Koa = require('koa'); // KOA 
const path = require('path');

const app = new Koa();

// Err 404
app.use(Err404)
// Logger
app.use(logger());
// FavIcon
let s = path.join(path.resolve('.'), 'ui/public/favicon.ico');
app.use(favicon(s));
// Hamlet
app.use(helmet());
// Compress ??где его надо размещать???
app.use(compress());
// Body Parser
app.use(bodyParser());
// Auth
require('./auth')(app); // блок авторизации
// Serve static files
s = path.join(path.resolve('.'), 'ui/public');
app.use(serve(s));
// Serve static ui modules/framworks
s = path.join(path.resolve('.'), 'ui/node_modules');
app.use(serve(s));

require('./routes/spa')(app); // определяем маршрут для головного SPA файла
require('./routes')(app, 'api', 'server/api'); // определяем api-функции для пути api из подкаталога api

module.exports = app