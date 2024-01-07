import { Request, Response } from "express";
const router = require("express").Router();
import prisma from "../prisma";
import dayjs from "dayjs";

router.get(`/task`, async (request: Request, response: Response) => {
  try {
    const result = await prisma.task.findMany();
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.get(`/task/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.task.findFirst({ where: { id } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.post(`/task`, async (request: Request, response: Response) => {
  try {
    const { scheduleId, name, type, start_time, duration } = request.body;
    const result = await prisma.task.create({
      data: { scheduleId, name, type, start_time: dayjs(start_time).toDate(), duration },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.put(`/task/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, type, start_time, duration } = request.body;
    const result = await prisma.task.update({
      where: { id },
      data: { name, type, start_time: dayjs(start_time).toDate(), duration },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.delete(`/task/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.task.delete({
      where: { id },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

export default router;
