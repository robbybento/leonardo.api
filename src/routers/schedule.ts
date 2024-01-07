import { Request, Response } from "express";
const router = require("express").Router();
import prisma from "../prisma";
import dayjs from "dayjs";

router.get(`/schedule`, async (request: Request, response: Response) => {
  try {
    const result = await prisma.schedule.findMany();
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.get(`/schedule/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.schedule.findFirst({ where: { id } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.post(`/schedule`, async (request: Request, response: Response) => {
  try {
    const { accountId, start_time, end_time } = request.body;
    const result = await prisma.schedule.create({
      data: {
        accountId,
        start_time: dayjs(start_time).toDate(),
        end_time: dayjs(end_time).toDate(),
      },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.put(`/schedule/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { accountId, start_time, end_time } = request.body;
    const result = await prisma.schedule.update({
      where: { id },
      data: {
        accountId,
        start_time: dayjs(start_time).toDate(),
        end_time: dayjs(end_time).toDate(),
      },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.delete(`/schedule/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.schedule.delete({
      where: { id },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

export default router;
