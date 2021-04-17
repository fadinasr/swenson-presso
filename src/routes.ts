import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import * as CoffeeMachineController from './controllers/CoffeeMachineController';
import * as CoffeePodController from './controllers/CoffeePodController';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

const router = Router();

// Coffee Machine Routes
router.get('/coffee-machines', CoffeeMachineController.getAllCoffeeMachines);

// Coffee Machine Routes
router.get('/coffee-pods', CoffeePodController.getAllCoffeePods);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
