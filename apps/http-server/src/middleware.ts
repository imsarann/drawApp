import jwt, { decode } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

function middleware(req : any, res :any , next : any){
    
    const token = req.headers["authorization"];
    if(!token){
        return res.json({
            message : "Unauthorized Log in again"       
        })
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    if(decoded){
        // @ts-ignore 
        req.userId = decoded.userId
        next();
    }else{
        return res.json({
        message : "Unauthorized Log in again"       
    })
    }
}

export { middleware }