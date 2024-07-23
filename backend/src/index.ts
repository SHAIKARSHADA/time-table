import express, { Express, Request, Response } from 'express'
import bodyParser from "body-parser"
import { PrismaClient,Prisma } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'


const app: Express = express()
const port = 3000;


app.use(bodyParser.json())

app.post("/timetable",async (req: Request, res: Response) => {

  const prisma = new PrismaClient().$extends(withAccelerate())

  const body = req.body;

  const populateData = await prisma.timetable.createMany({
    data:body,
  })
  
  res.send("done");

})

app.post("/periods",async (req: Request, res: Response) => {

  const prisma = new PrismaClient().$extends(withAccelerate())

  const body = req.body;

  const populateData = await prisma.periods.createMany({
    data:body,
  })
  
  res.send("done");

})


app.listen(port);