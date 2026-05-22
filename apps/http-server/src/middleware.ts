import jwt, { decode } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

function middlewar(req : any, res :any , next : any){
    const token = req.header["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET)

    if(decoded){
        // @ts-ignore 
        req.userId = decode.userId
    }else{
        res.json({
        message : "Unauthorized"       
    })
    }
}

export { middlewar }