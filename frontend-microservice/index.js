import lightshipPackage from 'lightship';
const { createLightship } = lightshipPackage;
import app from './config/express.js';
import config from './config/env/index.js';
import { logger } from "./server/utils/logs.js";

const lightshipConfiguration = {
  "detectKubernetes": false,
  "port": 9000
};

const lightship = await createLightship(lightshipConfiguration);

const server = app.listen(config.port, () => {
  logger.info(`API Server started and listening on port ${config.port} (${config.env})`);
  // Lightship default state is "SERVER_IS_NOT_READY". Therefore, you must signal
  // that the server is now ready to accept connections.
  lightship.signalReady();
})
.on('error', () => {
  lightship.shutdown();
});



lightship.registerShutdownHandler(() => {
  server.close();
});

export default app;