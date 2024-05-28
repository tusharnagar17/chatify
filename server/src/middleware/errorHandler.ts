import { Request, Response, NextFunction } from "express"

const errorHandler = (error:unknown, _req: Request, res: Response, _next: NextFunction):void => {
    let errorMessage = ""
    if(error instanceof TypeError){
            errorMessage +=error.message
    }
    res.status(500).json({ status: false, message: "An error occurred", error: errorMessage });
}

export default errorHandler