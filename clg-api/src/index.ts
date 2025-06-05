import { serve } from "@hono/node-server";
import { PrismaClient } from "../../clg-prisma/generated/prisma/client.js";

import { Hono } from "hono";

const app = new Hono();
const prisma = new PrismaClient();


app.get("/", (c) => {
  return c.text("Hello Hono!");
});





app.get("/students", async (c)=> {

  try {
     const students = await prisma.student.findMany(); // ✅ fix typo and model name
    return c.json(students);
  }

  catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch students" }, 500);
  }
});







app.post("/students", async (c) => {
  try {
    const body = await c.req.json();

    // Validate department
    const department = await prisma.department.findUnique({
      where: { id: body.departmentId },
    });

    if (!department) {
      return c.json({ error: "Department not found" }, 400);
    }

    const student = await prisma.student.create({
      data: {
        name: body.name,
        email: body.email,
        rollNumber: body.rollNumber,
        dob: new Date(body.dob),
        departmentId: body.departmentId,
        address: body.address,
        profileId: body.profileId, // Optional
      },
    });

    return c.json(student, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: "Error creating student" }, 500);
  }
});


app.post("/departments", async (c) => {
  const body = await c.req.json();
  const dept = await prisma.department.create({ data: body });
  return c.json(dept);
});


serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
