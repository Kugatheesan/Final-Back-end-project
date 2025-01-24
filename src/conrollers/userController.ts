import { Request,Response } from "express";
import { userEmailExists, userNameExists} from "../repository/userRepository";

//Function to create a new user
export async function createUser(req:Request, res: Response) {
    const { username,email,password } = req.body;

    //check user name exists
    const isuserNameExists = await userNameExists(username);

    //if user name exists return 400
    if(isuserNameExists) {
        res.status(400).send(" name already exists");
        return;
    }

    //check  email exists
    const isuserEmailExists = await userEmailExists(email);

    //if  email exists return 400
    if(isuserEmailExists) {
        res.status(400).send("email already exists")
        return;
    }
    
}