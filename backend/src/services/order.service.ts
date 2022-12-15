import { OrderStatus } from "@prisma/client";
import { createOrderInput } from "../schema/order.schema";
import { itemsPerPage } from "../utils/constants";
import prisma from "../utils/db";

export function getOrders(page = 1) {
  return prisma.order.findMany({
    orderBy: {
      ORD_CREATED: "desc",
    },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });
}

export async function confirmOrder(orderId: number) {
  const order = await prisma.order.findUniqueOrThrow({
    where: {
      ORD_ID: orderId
    }
  });

  if(order.ORD_STATUS !== OrderStatus.pending)
    throw new Error("You cannot cancel this order");

  return await prisma.order.update({
    where: { ORD_ID: orderId },
    data: {
      ORD_STATUS: OrderStatus.confirmed,
    },
  });
}

export async function completeOrder(orderId: number) {
  const order = await prisma.order.findUniqueOrThrow({
    where: {
      ORD_ID: orderId
    }
  });

  if(order.ORD_STATUS !== OrderStatus.confirmed)
    throw new Error("You cannot complete this order");

  return await prisma.order.update({
    where: { ORD_ID: orderId },
    data: {
      ORD_STATUS: OrderStatus.completed,
    },
  });
}

export async function cancelOrder(orderId: number) {

  const order = await prisma.order.findUniqueOrThrow({
    where: {
      ORD_ID: orderId
    }
  });

  if(order.ORD_STATUS !== OrderStatus.pending)
    throw new Error("You cannot cancel this order");

  return await prisma.order.update({
    where: {
      ORD_ID: orderId
    },
    data: {
      ORD_STATUS: OrderStatus.canceled,
    },
  });
}

export function getOrderById(orderId: number) {
  return prisma.order.findUniqueOrThrow({
    where: {
      ORD_ID: orderId,
    },
    select: {
      ORD_LINES: true,
      USER: {
        select: {
          USR_FIRST_NAME: true,
          USR_LAST_NAME: true,
          USR_ID: true,
        }
      },
    },
  });
}

export async function createOrder(userId: number, data: createOrderInput) {
  let isOrderValid = true;

  // Ensure products are available in that certain Store
  // and that their prices match
  await Promise.all(
    data.lines.map(async line => {
      const availability = await prisma.availability.findFirst({
        where: {
          AND: [
            {
              AV_QUANTITY: {
                gte: line.quantity,
              },
            },
            {
              PRO_ID: {
                equals: line.productId,
              },
            },
            {
              STR_ID: {
                equals: data.storeId,
              },
            },
            {
                PRODUCT: {
                    PRO_PRICE: {
                        equals: line.price
                    }
                }
            }
          ],
        }
      });
      if (!availability) isOrderValid = false;
    })
  );

  if (!isOrderValid)
    throw new Error("At least one of the information is not valid");

  // Create transaction with the following steps:
  // 1- Decrement the availabilities
  // 2- Create an order
  return await prisma.$transaction([
    prisma.order.create({
      data: {
        USR_ID :userId,
        STR_ID: data.storeId,
        ORD_TOTAL: data.lines.reduce(
          (total, currentLine) => total + currentLine.price,
          0
        ),
        ORD_LINES: {
          createMany: {
            data: data.lines.map((line, index) => ({
              LINE_NUMBER: index + 1,
              PRO_PRICE: line.price,
              PRO_ID: line.productId,
              PRO_QUANTITY: line.quantity,
            })),
          },
        },
      },
    }),
    ...data.lines.map(line => {
      return prisma.availability.update({
        where: {
          STR_ID_PRO_ID: {
            PRO_ID: line.productId,
            STR_ID: data.storeId,
          },
        },
        data: {
          AV_QUANTITY: {
            decrement: line.quantity,
          },
        },
      });
    }),
  ]);
}
