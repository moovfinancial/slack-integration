import * as app from "./application";
import * as configuration from "./configuration";

(async () => {
  try {
    const config = await configuration.load();
    await app.start(config);
  } catch (err: any) {
    if (err) {
      console.error(err.message || err);
    }
    process.exit(1);
  }
})();
