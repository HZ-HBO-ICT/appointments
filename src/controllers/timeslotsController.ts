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
  data: TimeSlot[]
}

/**
 * Function to get all people
 * @param req {Request} - The Request object
 * @param res {Response} - The Response object
 * @returns {Promise<void>}
 */
export async function getAllTimeSlots(req: Request, res: Response): Promise<void> {
  const timeslots: TimeSlot[] = await prisma.timeslot.findMany();
  const timeslotResponse: TimeSlotResponse = {
    meta: {
      count: timeslots.length,
      title: 'All appointments',
      url: req.url
    },
    data: timeslots
  };
  res.status(200).send(timeslotResponse);
}
