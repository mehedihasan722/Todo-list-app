import { type NextRequest, NextResponse } from "next/server";
import { TodoFormSchema } from "@/lib/validation";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed", status: 405 },
      {
        status: 405,
      }
    );
  }
  const values = await request.json();
  console.log("🚀 ~ POST ~ values:", values);

  const validate = TodoFormSchema.safeParse(values);
  // console.log(validate.error?.message);
  if (!validate.success) {
    return NextResponse.json(
      { error: "Invalid Fields!", status: 400 },
      { status: 400 }
    );
  }

  const { task, status, userId } = validate.data;

  try {
    const res = await db.todo.create({
      data: {
        task,
        status,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { data: res, message: "New ToDo Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Todo Create Unsuccessful",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const res = await db.todo.findMany({});
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error in fetching data" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const res = await request.json();
  const { id } = res;
  try {
    const res = await db.todo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { data: res, message: "Item Delete Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in deleting data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, response: NextResponse) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      { error: "Method not allowed", status: 405 },
      {
        status: 405,
      }
    );
  }
  const values = await request.json();
  const validate = TodoFormSchema.safeParse(values);
  if (!validate.success) {
    return NextResponse.json(
      { error: "Invalid Fields!", status: 400 },
      { status: 400 }
    );
  }
  const { id, task, status } = validate.data;
  try {
    const res = await db.todo.update({
      where: { id },
      data: {
        task,
        status,
      },
    });
    return NextResponse.json(
      { data: res, message: " ToDo Updated Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Todo Updated  Unsuccessful",
        status: 500,
      },
      {
        status: 500,
      }
    );
  }
}
