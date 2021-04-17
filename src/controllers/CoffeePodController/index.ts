import { RequestHandler } from 'express';
import Pod from '../../models/CoffeePods';
import requestMiddleware from '../../middleware/request-middleware';

export const getAllCoffeePods: RequestHandler = requestMiddleware(async (req, res) => {
  const filters = {
    product_type: req.query.product_type || { $exists: true },
    coffee_flavor: req.query.coffee_flavor || { $exists: true },
    pack_size: req.query.pack_size || { $exists: true }
  };
  try {
    // @ts-ignore
    const coffeePods = await Pod.find(filters);
    res.status(200).json({ coffeePods });
  } catch (err) {
    res.status(500).send({ err });
  }
});

// export const getCoffeePodByID: RequestHandler = requestMiddleware(async (req, res) => {
//   const coffeePod = await Pod.findById(req.params.id);
//   res.json({ coffeePod });
// });
