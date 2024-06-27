import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Appointment} from '../../prisma/types.ts';
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
  const appointments: Appointment[] = await prisma.appointment.findMany();
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


/**
 * Function to get all appointments by day of the month
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getApppointmentsByDay(req: Request, res: Response): Promise<void> {
  const month: number = Number(req.params.month);
  const day: number = Number(req.params.day);
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
  const appointmentResponse: AppointmentResponse = {
    meta: {
      count: appointments.length,
      title: 'All appointments by day',
      url: req.url
    },
    data: appointments
  };
  res.status(200).send(appointmentResponse);
}


/**
 * Function to get all appointments per month
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getApppointmentsByMonth(req: Request, res: Response): Promise<void> {
  const month: number = Number(req.params.month);
  const appointments: Appointment[] = await prisma.appointment.findMany(
    {
      where: {
        theDate: {
          month: month
        }
      }
    }
  );
  const appointmentReponse: AppointmentResponse = {
    meta: {
      count: appointments.length,
      title: 'All appointments by month',
      url: req.url
    },
    data: appointments
  };
  res.status(200).send(appointmentReponse);
}

