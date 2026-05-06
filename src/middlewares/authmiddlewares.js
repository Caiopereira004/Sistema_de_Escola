import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const verificarToken = (req,res)=>{
    const authReader = req.headers.authorization;

    if(!authReader){
        return res.status(401).json({msg:"Token não identificado!"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.usuario = decoded;
        next();

    } catch(error){
        return res.status(401).json("")
    }
}