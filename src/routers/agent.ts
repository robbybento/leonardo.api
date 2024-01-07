import { Request, Response } from "express";
const router = require("express").Router();
import prisma from "../prisma";

router.get(`/agent`, async (request: Request, response: Response) => {
  try {
    const result = await prisma.agent.findMany();
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.get(`/agent/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.agent.findFirst({ where: { id } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

router.post(`/agent`, async (request: Request, response: Response) => {
  try {
    const { name } = request.body;
    const result = await prisma.agent.create({ data: { name } });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response
      .status(500)
      .json({ error: "There was a problem", issues: error?.issues });
  }
});

router.put(`/agent/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;
    const result = await prisma.agent.update({
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

router.delete(`/agent/:id`, async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const result = await prisma.agent.delete({
      where: { id },
    });
    response.json(result);
  } catch (error: any) {
    console.log(error);
    response.status(500).json({ error: "There was a problem" });
  }
});

export default router;
