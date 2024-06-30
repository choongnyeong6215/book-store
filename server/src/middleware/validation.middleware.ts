import { Request, Response, NextFunction } from "express"
import {validationResult} from "express-validator"
import { StatusCodes } from "http-status-codes";

export const validationErrorChecker = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: errors.array()
        })
    }

    return next();
}