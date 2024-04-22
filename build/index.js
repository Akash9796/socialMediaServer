import { initServer } from "./app/index.js";
async function init() {
    const app = await initServer();
    app.listen("4000", () => {
        console.log(`Server is running on 4000`);
    });
}
init();
