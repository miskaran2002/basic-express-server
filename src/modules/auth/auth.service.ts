import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUserIntoDB=async(payload:
    {
email:string,
password:string
})=>{

    const {email,password}=payload;
    // 1.check if user exists with the provided email
    // 2.if user exists then compare the provided password with the stored password
    // 3.if password matches then generate a JWT token and return it to the client

    const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, 
    [email]
    );

   
    if(userData.rows.length === 0){
        throw new Error("Invalid Credentials");
    }
    const user = userData.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password);

   

    if(!matchPassword){
        throw new Error("Invalid Credentials");
    }

    // generate JWT token

    

  const jwtpayload = {
    id: user.id,
     name: user.name,
     is_active: user.is_active,
     role: user.role,
    email: user.email,
   
  };
  const accessToken =jwt.sign(jwtpayload,config.secret as string,{
    expiresIn: "1d"
  });
 

   const refreshToken =jwt.sign(jwtpayload,config.refresh_secret as string,{
    expiresIn: "1d"
  });




  return {accessToken, refreshToken};
}



 

       


export const authService = {
    loginUserIntoDB
};