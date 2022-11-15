import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { CreateUserInput, editCurrentUserInput, editUserInput } from "../schema/user.schema";
import { createUser, editUser } from "../services/user.service";

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

export async function editCurrentUserController(req: Request<{}, {}, editCurrentUserInput>, res: Response) {
    try {
        const { firstName, lastName, password } = req.body;



        await editUser(res.locals.user.id,
            { 
                firstName: firstName ? firstName: undefined,
                lastName: lastName ? lastName: undefined,
                password: password ? password: undefined,
            }
        )
    } catch (error) {
        return res.sendStatus(500).send(error);
    }
}

export async function editUserController(req: Request<{}, {}, editUserInput>, res: Response) {
    try {
        const { firstName, lastName, password, role } = req.body;



        await editUser(res.locals.user.id,
            { 
                firstName: firstName ? firstName: undefined,
                lastName: lastName ? lastName: undefined,
                password: password ? password: undefined,
                role: role ? role as Role: undefined,
            }
        )
    } catch (error) {
        return res.sendStatus(500).send(error);
    }
}