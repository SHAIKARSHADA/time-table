"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const zod_1 = require("zod");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 3000;
app.use(body_parser_1.default.json());
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
app.get("/api/v1/allTimetable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        const allPeriods = yield prisma.periods.findMany({
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
        });
        res.send(allPeriods);
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Error while fetching data from database");
    }
}));
app.post("/api/v1/timetable", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
    const body = req.body;
    try {
        const dataInputFromUser = zod_1.z.object({
            date: zod_1.z.string().date()
        });
        const { success } = dataInputFromUser.safeParse(body);
        if (!success) {
            return res.status(400).send("not an valid date");
        }
        const findPeriod = yield prisma.timetable.findFirst({
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
    }
    catch (e) {
        res.status(400).json({
            message: "Error while fetching data from database"
        });
    }
}));
exports.default = app;
app.listen(port);
