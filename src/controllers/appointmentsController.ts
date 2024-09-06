import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Appointment } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface AppointmentResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: Appointment[]
}

/**
 * Function to get all appointments
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getAllApointments(req: Request, res: Response): Promise<void> {
  /**
   * working with query parameters is a bit tricky.
   * You need to check if the query parameter exists and then convert it to a number
   * However, you do not have control over the exact type of the query parameter
   */

  /**
   * Step 1 - are the query parameters present?
   * Step 2 - if they are present, convert them to numbers
   * Step 3 - use the numbers to filter the appointments
   */

  let month: number = 0;
  let day: number = 0;
  let appointments: Appointment[];
  console.log(req.query);

  if (req.query.month && !req.query.day) {
    const tempMonth: string = req.query.month.toString();
    if (isNaN(Number(tempMonth))) {
      res.status(400).send('Invalid query parameters');
      return;
    }
    if (Number(tempMonth) < 1 || Number(tempMonth) > 12) {
      res.status(400).send('Invalid month');
      return;
    }
    month = Number(tempMonth);
    appointments = await getApppointmentsByMonth(month);
    console.log(`I found: ${month}`);
  } else if (req.query.month && req.query.day) {
    const tempMonth: string = req.query.month.toString();
    const tempDay: string = req.query.day.toString();

    if (isNaN(Number(tempMonth)) || isNaN(Number(tempDay))) {
      res.status(400).send('Invalid query parameters');
      return;
    }
    if (Number(tempMonth) < 1 || Number(tempMonth) > 12) {
      res.status(400).send('Invalid month');
      return;
    }
    if (Number(tempDay) < 1 || Number(tempDay) > 31) {
      res.status(400).send('Invalid day');
      return;
    }
    month = Number(tempMonth);
    day = Number(tempDay);
    appointments = await getApppointmentsByDay(month, day);
    console.log(`I found: ${month} and ${day}`);
  } else {
    appointments = await prisma.appointment.findMany();
  }

  //reponse
  const appointmentResponse: AppointmentResponse = {
    meta: {
      count: appointments.length,
      title: 'All appointments',
      url: req.url
    },
    data: appointments
  };
  res.status(200).send(appointmentResponse);
}


async function getApppointmentsByDay(month: number, day: number): Promise<Appointment[]> {
  const appointments: Appointment[] = await prisma.appointment.findMany(
    {
      where: {
        theDate: {
          month: month,
          day: day
        }
      }
    }
  );
  return appointments;
}

async function getApppointmentsByMonth(month: number): Promise<Appointment[]> {
  const appointments: Appointment[] = await prisma.appointment.findMany(
    {
      where: {
        theDate: {
          month: month
        }
      }
    }
  );
  return appointments;
}

