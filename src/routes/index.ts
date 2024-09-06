import Express, { Router } from 'express';
import { getAllApointments, getApointmentById } from '../controllers/appointmentsController.ts';
import { getAllTimeSlots, getTimeSlotById } from '../controllers/timeslotsController.ts';
import { getAllDates, getDateById } from '../controllers/datesController.ts';
const router: Router = Express.Router();
import Cors from 'cors';

const currentApiVersion: string = 'v1';
const apiSlug: string = '/api/' + currentApiVersion;
// router.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.json('hi');
//   next();
// });
router.get(`${apiSlug}/appointments`, Cors(), getAllApointments);
router.get(`${apiSlug}/appointments/:id`, Cors(), getApointmentById);

router.get(`${apiSlug}/timeslots`, Cors(), getAllTimeSlots);
router.get(`${apiSlug}/timeslots/:id`, Cors(), getTimeSlotById);

router.get(`${apiSlug}/dates`, Cors(), getAllDates);
router.get(`${apiSlug}/dates/:id`, Cors(), getDateById);


export default router;
