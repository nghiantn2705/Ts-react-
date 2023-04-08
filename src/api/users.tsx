
import instance from "./instance";

const SignUpUsser = (users) =>{
    return instance.post("/signup",users)
}
const SignInUsers = (users) =>{
    return instance.post("/signin",users)
}

export  {SignUpUsser,SignInUsers}