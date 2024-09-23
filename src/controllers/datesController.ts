import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TheDate } from '../../prisma/types.ts';
const prisma: PrismaClient = new PrismaClient();

/**
 * Interface for the response object
 */
interface DatesResponse {
  meta: {
    count: number
    title: string
    url: string
  },
  data: string[]
}

/**
 * Get all dates.
 * @param req The request object.
 * @param res The response object.
 * @returns A promise that resolves to void.
 */
export async function getAllDates(req: Request, res: Response): Promise<void> {
  const dates: TheDate[] = await prisma.theDate.findMany();
  const dateIds: string[] = dates.map((date: TheDate) => `/dates/${date.id}`);
  const dateResponse: DatesResponse = {
    meta: {
      count: dates.length,
      title: 'All dates',
      url: req.url
    },
    data: dateIds
  };
  res.status(200).send(dateResponse);
}

/**
 * Get a date by ID.
 * @param req The request object.
 * @param res The response object.
 * @returns A promise that resolves to void.
 */
export async function getDateById(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  } else {
    const date: TheDate | null = await prisma.theDate.findUnique({
      where: {
        id: id
      }
    });
    if (date) {
      res.status(200).send(date);
    } else {
      res.status(404).send('Date not found');
    }
  }
};
