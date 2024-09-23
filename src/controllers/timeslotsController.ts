import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TimeSlot } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface TimeSlotResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: string[]
}

/**
 * Function to get all people
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getAllTimeSlots(req: Request, res: Response): Promise<void> {
  const timeslots: TimeSlot[] = await prisma.timeslot.findMany();
  const timeSlotIds: string[] = timeslots.map((timeslot: TimeSlot) => `/timeslots/${timeslot.id}`);
  const timeslotResponse: TimeSlotResponse = {
    meta: {
      count: timeslots.length,
      title: 'All timeslots',
      url: req.url
    },
    data: timeSlotIds
  };
  res.status(200).send(timeslotResponse);
}

/**
 * Function to get a time slot by ID
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getTimeSlotById(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  } else {
    const timeslot: TimeSlot | null = await prisma.timeslot.findUnique({
      where: {
        id: id
      }
    });
    if (timeslot) {
      res.status(200).send(timeslot);
    } else {
      res.status(404).send('Timeslot not found');
    }
  }
}
