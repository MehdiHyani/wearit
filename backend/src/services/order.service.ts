import { OrderStatus } from "@prisma/client";
import { createOrderInput } from "../schema/order.schema";
import { itemsPerPage } from "../utils/constants";
import prisma from "../utils/db";

export function getOrders(page = 1) {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });
}

export function confirmOrder(orderId: number) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.confirmed,
    },
  });
}

export function completeOrder(orderId: number) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.completed,
    },
  });
}

export function cancelOrder(orderId: number) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status: OrderStatus.canceled,
    },
  });
}

export function getOrderById(orderId: number) {
  return prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
    },
    select: {
      lines: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          id: true,
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
              quantityOnHand: {
                gte: line.quantity,
              },
            },
            {
              productId: {
                equals: line.productId,
              },
            },
            {
              storeId: {
                equals: data.storeId,
              },
            },
            {
                product: {
                    price: {
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
        userId,
        storeId: data.storeId,
        total: data.lines.reduce(
          (total, currentLine) => total + currentLine.price,
          0
        ),
        lines: {
          createMany: {
            data: data.lines.map((line, index) => ({
              lineNumber: index + 1,
              price: line.price,
              productId: line.productId,
              quantity: line.quantity,
            })),
          },
        },
      },
    }),
    ...data.lines.map(line => {
      return prisma.availability.update({
        where: {
          // eslint-disable-next-line camelcase
          storeId_productId: {
            productId: line.productId,
            storeId: data.storeId,
          },
        },
        data: {
          quantityOnHand: {
            decrement: line.quantity,
          },
        },
      });
    }),
  ]);
}
