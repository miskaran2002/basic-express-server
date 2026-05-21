import type {
    NextFunction,
    Request,
    Response
} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {


        try {
            // console.log("This is Protected Route");
            // console.log(req.headers.authorization);


            // check if the token exists
            // verify the token
            // find the user from the database using the email from the token
            // check if the user is active or not



            const token = req.headers.authorization;

            console.log(token);
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized Access!!"

                });
            }

            const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload;


            const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [decoded.email]);


            const user = userData.rows[0];
            //    console.log(user);

            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!!"

                });
            }

            if (!user.is_active) {
                return res.status(403).json({
                    success: false,
                    message: "forbidden!!"

                });

            }

            req.user = decoded;

            next();




        } catch (error) {
            next(error);


        }

    }
}

export default auth;