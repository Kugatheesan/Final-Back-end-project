import { query } from "../database"

export const userNameExists = async (username: string) => {
    const { rows } = await query ("SELECT email FROM public.users u where u.username = $1", [username]);
    return rows.length >0;
}

export const userEmailExists = async (email:string) => {
    const { rows } = await query ("SELECT email From public.users u where u.email = $1", [email])
   return rows.length >0
}
