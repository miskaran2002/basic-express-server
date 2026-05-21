import type { Request, Response } from "express"
import { authService } from "./auth.service";

const loginUser = async(req:Request, res:Response) => {

    try{


        const result = await authService.loginUserIntoDB(req.body);

        const { refreshToken} = result;
         res.cookie("refreshToken", refreshToken, {
            secure: false, // Set to true in production (requires HTTPS)
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: "lax", // Adjust based on your needs (e.g., "lax" or "none")
         });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            data: result
        })



    }catch(error: any){

        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        })
    }



}
export const authController = {
    loginUser
}