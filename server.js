// Installed Modules
const Koa = require("koa");
const koaRouter = require("koa-router");

// Instances of modules
const app = new Koa();
const router = new koaRouter();

// Constants
const PORT = 3000;

//Middlewares
// app.use(async (ctx) => {
//   ctx.body = "Hello James";
// });

//Middlewares
app.use(router.routes());
app.use(router.allowedMethods());

// Routes
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

// Start The Server
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `Server Is Running On Port ${PORT}`);
});
