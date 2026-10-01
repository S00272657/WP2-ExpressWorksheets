import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { validate } from '../middleware/validate.middleware';
import { createCarZSchema } from '../models/cars';
import { updateCarZSchema } from '../models/cars';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', carController.getCarById);
router.post('/', validate(createCarZSchema),carController.createCar);
router.put('/:id', validate(updateCarZSchema), carController.updateCar);
router.delete('/:id', carController.deleteCar);

export default router;
