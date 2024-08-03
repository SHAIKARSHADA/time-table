import express, { Express, Request, Response } from 'express'
import bodyParser from "body-parser"
import { PrismaClient,Prisma } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from "zod"
import cors from 'cors' 


const app: Express = express()

app.use("/*",cors())
const port = 3000;


app.use(bodyParser.json())

// only used to populate data in the database
// app.post("/timetable",async (req: Request, res: Response) => {
//   // const prisma = new PrismaClient().$extends(withAccelerate())

//   const body = req.body;

//   const populateData = await prisma.timetable.createMany({
//     data:body,
//   })
  
//   res.send("done");

// })


// only used to populate data in the database
// app.post("/periods",async (req: Request, res: Response) => {

//   // const prisma = new PrismaClient().$extends(withAccelerate())

//   const body = req.body;

//   const populateData = await prisma.periods.createMany({
//     data:body,
//   })
  
//   res.send("done");

// })

app.get("/api/v1/allTimetable",async (req: Request, res: Response) => {

  const prisma = new PrismaClient().$extends(withAccelerate());

  try {
    const allPeriods = await prisma.periods.findMany({
      where: {
        NOT: {
          dayOrder: "0",
          session1: "0",
          session2: "0",
          session3: "0",
          session4: "0",
        },
      },
      select: {
        id: false,
        dayOrder: true,
        session1: true,
        session2: true,
        session3: true,
        session4: true,
      }
    })

    const periods = allPeriods.map(period => ({
      dayOrder: period.dayOrder,
      periods: {
        session1: period.session1,
        session2: period.session2,
        session5: "Break",
        session3: period.session3,
        session4: period.session4,
      },
    }))
    
    res.send(periods);
  } catch(e) {
    console.log(e);
    res.status(400).send("Error while fetching data from database")
  }
})

app.post("/api/v1/timetable",async (req: Request, res: Response) => {
  
  const prisma = new PrismaClient().$extends(withAccelerate());
   
    const body = req.body;

   try {
    const dataInputFromUser = z.object({
      date: z.string().date() 
    })
    
    const { success } = dataInputFromUser.safeParse(body);

    if(!success) {
      return res.status(400).send("not an valid date");
    }

    const findPeriod = await prisma.timetable.findFirst({
      where: {
        date: body.date,
      },
      select: {
        isHoliday: true,
        date: true,
        dayOrder: true,
        periods: {
          select: {
            session1: true,
            session2: true,
            session3: true,
            session4: true
          }
        }
      }
    });

  res.send(findPeriod);
   } catch(e) {
    res.status(400).json({
      message: "Error while fetching data from database"
    })
   }

})


export default app;

app.listen(port);