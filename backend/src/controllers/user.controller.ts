import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../services/user.service";

export async function createUserController(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const { body } = req;
    try {
        const { passwordConfirmation, ...newUser } = body;
        const user = await createUser(newUser);
        return res.status(201).send(user);
    } catch (e: any) {
        if (e.code && e.code === "P2002") {
            return res.status(409).send(`Account with the email ${body.email} already exists`);
        }
        return res.status(500).send(e);
    }
}

export async function getCurrentUserController(req: Request, res: Response) {
    return res.send(res.locals.user);
}