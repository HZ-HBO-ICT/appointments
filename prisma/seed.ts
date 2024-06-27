import { PrismaClient } from '@prisma/client';
// reference a type from the generated Prisma Client
// import type { Client } from '@prisma/client';
const prisma: PrismaClient = new PrismaClient();
import { TimeSlot, Appointment, TheDate } from './types.ts';

// if you use the model you have to fill in all the fields also the generated ones
const timeSlots: TimeSlot[] = [
  {
    starttime: '09.00',
    duration: 15,
  },
  {
    starttime: '09.15',
    duration: 15,
  },
  {
    starttime: '09.30',
    duration: 15,
  },
  {
    starttime: '09.45',
    duration: 15,
  },
  {
    starttime: '10.00',
    duration: 15,
  },
  {
    starttime: '10.15',
    duration: 15,
  },
  {
    starttime: '10.30',
    duration: 15,
  },
  {
    starttime: '10.45',
    duration: 15,
  },
  {
    starttime: '11.00',
    duration: 15,
  },
  {
    starttime: '11.15',
    duration: 15,
  },
  {
    starttime: '11.30',
    duration: 15,
  },
  {
    starttime: '11.45',
    duration: 15,
  },
  {
    starttime: '12.00',
    duration: 15,
  },
  {
    starttime: '12.15',
    duration: 15,
  },
  {
    starttime: '12.30',
    duration: 15,
  },
  {
    starttime: '12.45',
    duration: 15,
  },
];
// this feels a bit stupid, maybe rewrite it 😁
const theDates: TheDate[] = [];

for (let month: number = 1; month < 13; month++) {
  if (month === 2) {
    for (let day: number = 1; day < 29; day++) {
      theDates.push({ day, month, year: 2024 });
    }
    continue;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    for (let day: number = 1; day < 31; day++) {
      theDates.push({ day, month, year: 2024 });
    }
    continue;
  }
  for (let day: number = 1; day < 32; day++) {
    theDates.push({ day, month, year: 2024 });
  }
}

/**
 * Create a new appointment
 *
 * We want to create an appointment based on the flow of the application
 * Step 1 - select a date
 * Step 2 - select a time slot
 * Step 3 - fill in the name and breed of the pet
 */
const appointments: Appointment[] = [
  {
    state: 'pending',
    name: 'Mickey',
    breed: 'Mouse',
    timeslotId: 1,
    theDateId: 246,
  },
  {
    state: 'pending',
    name: 'Pluto',
    breed: 'Dog',
    timeslotId: 2,
    theDateId: 246,
  },
  {
    state: 'pending',
    name: 'Goofy',
    breed: 'Dog',
    timeslotId: 3,
    theDateId: 248,
  },
  {
    state: 'pending',
    name: 'Donald',
    breed: 'Duck',
    timeslotId: 4,
    theDateId: 248,
  },
  {
    state: 'pending',
    name: 'Daisy',
    breed: 'Duck',
    timeslotId: 1,
    theDateId: 250,
  }
];

// first look if the exist in the database and then add them
const load = async (): Promise<void> => {
  try {
    await prisma.timeslot.createMany({
      data: timeSlots,
    });
    loadDates();
    console.log('Added category data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const loadDates = async (): Promise<void> => {
  try {
    await prisma.theDate.createMany({
      data: theDates,
    });
    loadAppointments();
    console.log('Added date data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const loadAppointments = async (): Promise<void> => {
  try {
    await prisma.appointment.createMany({
      data: appointments,
    });
    console.log('Added appointment data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
  // try {
  //   await prisma.appointment.create({
  //     data: {
  //       state: 'pending',
  //       name: 'Mickey',
  //       breed: 'Mouse',
  //       timeslotId: 1,
  //       theDateId: 246,
  //     },
  //   });
  //   console.log('Added appointment data');
  // } catch (e) {
  //   console.error(e);
  //   process.exit(1);
  // } finally {
  //   await prisma.$disconnect();
  // }
};

load();
