import { Role } from "@prisma/client";
import { NotFoundError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import {
  CreateUserInput,
  editCurrentUserInput,
  editUserInput,
  getUsersInput,
} from "../schema/user.schema";
import { createUser, editUser, getUserById, getUsers } from "../services/user.service";

export async function createUserController(req: Request<Record<string, never>,
    Record<string, never>, CreateUserInput>, res: Response) {
    const { body } = req;
    try {
        const { email, firstName, lastName, password } = body;
        const user = await createUser({ email, firstName, lastName, password });
        return res.status(201).send(user);
    } catch (e: any) {
        if (e.code && e.code === "P2002") {
            return res.status(409).send(`Account with the email ${body.email} already exists`);
        }
        return res.status(500).send(e);
    }
}


export async function getUsersController(req: Request<Record<string, never>,
  Record<string, never>, getUsersInput>, res: Response) {
  try {
      const { body: { page } } = req;
      const users = await getUsers(page);
      return res.send(users);
  } catch (error) {
      res.status(500).send(error);
  }
}

export async function getCurrentUserController(req: Request, res: Response) {
  const user = res.locals.user;
  delete user.iat;
  delete user.exp;
  return res.send(res.locals.user);
}

export async function editCurrentUserController(
  req: Request<Record<string, never>, Record<string, never>, editCurrentUserInput>,
  res: Response
) {
  try {
    const { firstName, lastName, password } = req.body;

    await editUser(res.locals.user.id, {
      USR_FIRST_NAME: firstName,
      USR_LAST_NAME: lastName,
      USR_PASSWORD: password,
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export async function editUserController(
  req: Request<Record<string, unknown>, Record<string, never>, editUserInput>,
  res: Response
) {
  try {
    const { firstName, lastName, password, role } = req.body;

    await editUser(parseInt(req.params.userId as string), {
      USR_FIRST_NAME: firstName,
      USR_LAST_NAME: lastName,
      USR_PASSWORD: password,
      USR_ROLE: role as Role | undefined,
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error);
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const user = await getUserById(parseInt(req.params.userId));
    return res.status(200).send(user);
  } catch (error) {
    if(error instanceof NotFoundError)
            return res.status(404).send(error.message);
    return res.sendStatus(500).send(error);
  }
}
