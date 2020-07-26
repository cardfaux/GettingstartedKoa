// Installed Modules
const Koa = require("koa");
const koaRouter = require("koa-router");
const json = require("koa-json");
const render = require("koa-ejs");
const path = require("path");

// Other File Imports
const colors = require("./colors");

// Instances of modules
const app = new Koa();
const router = new koaRouter();

// EJS
render(app, {
  root: path.join(__dirname, "views"),
  layout: "template",
  viewExt: "ejs",
  cache: false,
  debug: true,
});

// Constants
const PORT = process.env.PORT || 3000;

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
app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
router.get("/", async (ctx) => {
    await ctx.render("index");
});
router.get("/about", async (ctx) => {
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
router.get("/api/users", async (ctx) => {
  return (
    ctx.body = [
      {
        "username": "billy123",
        "name": "Billy",
        "age": 23,
      },
      {
        "username": "james123",
        "name": "James",
        "age": 35,
      },
    ]
  );
});

// Start The Server
app.listen(PORT, () => {
  console.log(colors.fg.Cyan, `Server Is Running On Port ${PORT}`);
});
