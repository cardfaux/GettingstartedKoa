// Installed Modules
const Koa = require("koa");
const koaRouter = require("koa-router");

// Other File Imports
const colors = require("./colors");

// Instances of modules
const app = new Koa();
const router = new koaRouter();

// Constants
const PORT = process.env.PORT || 3000;

//Middlewares
// app.use(async (ctx) => {
//   ctx.body = "Hello James";
// });

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(
    colors.fg.Magenta,
    colors.Reverse,
    `${ctx.method} ${ctx.url} - ${rt}`,
    colors.Reset,
  );
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

//Middlewares
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
router.get("/about", async (ctx) => {
  console.log(ctx);
  return (
    ctx.body = "<h1>About Page</h1>"
  );
});
router.get("/contact", async (ctx) => {
  return (
    ctx.body = "<h1>Contact Page</h1>"
  );
});
router.get("/gallery", async (ctx) => {
  return (
    ctx.body = "<h1>Gallery Page</h1>"
  );
});

// Start The Server
app.listen(PORT, () => {
  console.log(colors.fg.Cyan, `Server Is Running On Port ${PORT}`);
});
