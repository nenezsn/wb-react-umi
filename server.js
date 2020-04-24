const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(require('koa-static')('./dist'));

router.get('user','/getinfo/:id', (ctx, next) => {
  ctx.body = ctx.params.id
}).post('/submit', (ctx, next) => {
  console.log('cr',ctx.query)
  ctx.body = ctx.request.body
}).get('/kog', (ctx, next) => {
  console.log(router.url('user',{id:3}))
  // console.log('ctx',ctx.path,ctx.method,router.url('user',{id:3}))
  ctx.body = 'hello world'
})

router.redirect('/dtc',router.url('user',{id:3}))

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000,()=>{
  console.log('server is running locahost:3000')
})
