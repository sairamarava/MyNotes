import rateLimit from "../config/upstash.js";

const rateLimiter = async (req,res,next)=>{
    try{
        const {success}=await rateLimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later."});
        }
     next();
    }
    catch(err){
        console.error("Rate limiter error:", err);
        res.status(500).json({message: "Internal server error"});
        next(err);
    }
}

export default rateLimiter;