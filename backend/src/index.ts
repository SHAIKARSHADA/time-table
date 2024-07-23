import express, { Express, Request, Response } from 'express'
import bodyParser from "body-parser"
import { PrismaClient,Prisma } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import {z} from "zod"

const app: Express = express()
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

app.post("/api/v1/timetable",async (req: Request, res: Response) => {
  
  const prisma = new PrismaClient().$extends(withAccelerate());
   
    const body = req.body;

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



})


app.listen(port);