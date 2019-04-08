const route = require('koa-route');
const send = require('koa-send');

module.exports = (app)=>{
    app.use(route.get('/', async (ctx)=>{
        await send(ctx, 'ui/index.html', {root: "./"})
    }))
}