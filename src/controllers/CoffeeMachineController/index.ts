import { RequestHandler } from 'express';
import Machine from '../../models/CoffeeMachine';
import requestMiddleware from '../../middleware/request-middleware';

export const getAllCoffeeMachines: RequestHandler = requestMiddleware(async (req, res) => {
  const filters = {
    product_type: req.query.product_type || { $exists: true },
    water_line_compatible: req.query.water_line_compatible || { $exists: true }
  };
  try {
    // @ts-ignore
    const coffeeMachines = await Machine.find(filters);
    res.json({ coffeeMachines });
  } catch (err) {
    res.status(500).send({ err });
  }
});
