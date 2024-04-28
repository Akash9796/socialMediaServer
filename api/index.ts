import { initServer } from "../src/app/index.js";

async function init() {
  const app = await initServer();
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
  return app;
}

const apiApp = init();

export default apiApp;
