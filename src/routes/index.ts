import Express, { Router } from 'express';
import { getAllApointments, getApppointmentsByMonth, getApppointmentsByDay} from '../controllers/appointmentsController.ts';
import { getAllTimeSlots } from '../controllers/timeslotsController.ts';
const router: Router = Express.Router();
import Cors from 'cors';


// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.json('hi');
//   next();
// });
router.get('/appointments', getAllApointments);

// another way to implement is to use a query parameter to get the appointments by date
router.get('/appointments/:month', Cors(), getApppointmentsByMonth);
router.get('/appointments/:month/:day', Cors(), getApppointmentsByDay);

router.get('/timeslots', Cors(), getAllTimeSlots);


export default router;
