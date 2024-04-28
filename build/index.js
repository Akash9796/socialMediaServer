import { initServer } from "./app/index.js";
let indexApp;
async function init() {
    const app = await initServer();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`);
    });
    indexApp = app;
}
init();
export default indexApp;
