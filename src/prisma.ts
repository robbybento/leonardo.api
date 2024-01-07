import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";

export const AccountCreateInput = z.object({
  name: z.string(),
}) satisfies z.Schema<Prisma.AccountUncheckedCreateInput>;

export const AgentCreateInput = z.object({
  name: z.string(),
}) satisfies z.Schema<Prisma.AgentUncheckedCreateInput>;

export const ScheduleCreateInput = z
  .object({
    accountId: z.string().uuid(),
    start_time: z.date(),
    end_time: z.date(),
  }) satisfies z.Schema<Prisma.ScheduleUncheckedCreateInput>;

export const TaskCreateInput = z.object({
  scheduleId: z.string().uuid(),
  name: z.string(),
  type: z.union([z.literal("work"), z.literal("break")]),
  start_time: z.date(),
  duration: z.number(),
}) satisfies z.Schema<Prisma.TaskUncheckedCreateInput>;

const prisma = new PrismaClient().$extends({
  query: {
    account: {
      create({ args, query }) {
        args.data = AccountCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = AccountCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = AccountCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = AccountCreateInput.parse(args.create);
        args.update = AccountCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
    agent: {
      create({ args, query }) {
        args.data = AgentCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = AgentCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = AgentCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = AgentCreateInput.parse(args.create);
        args.update = AgentCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
    schedule: {
      create({ args, query }) {
        args.data = ScheduleCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = ScheduleCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = ScheduleCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = ScheduleCreateInput.parse(args.create);
        args.update = ScheduleCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
    task: {
      create({ args, query }) {
        args.data = TaskCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = TaskCreateInput.partial().parse(args.data);
        return query(args);
      },
      updateMany({ args, query }) {
        args.data = TaskCreateInput.partial().parse(args.data);
        return query(args);
      },
      upsert({ args, query }) {
        args.create = TaskCreateInput.parse(args.create);
        args.update = TaskCreateInput.partial().parse(args.update);
        return query(args);
      },
    },
  },
});

export default prisma;
