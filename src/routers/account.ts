import { Request, Response } from "express";
const router = require("express").Router();
import prisma from "../prisma";

router.get(`/account`, async (request: Request, response: Response) => {
  try {
    const result = await prisma.account.findMany();
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.get(`/account/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.account.findFirst({ where: { id } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.post(`/account`, async (request: Request, response: Response) => {
  try {
    const { name } = request.body;
    const result = await prisma.account.create({ data: { name } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.put(`/account/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const result = await prisma.account.update({
      where: { id },
      data: { name },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.delete(`/account/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.account.delete({
      where: { id },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

export default router;
