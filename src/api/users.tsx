import instance from './instance';
import { IUser } from '../types/user';

const SignUpUsser = (user: IUser) => {
    return instance.post('/signup', user)
}
const SignInUsers = (user: IUser) => {
    return instance.post('/signin', user)
}

export { SignUpUsser, SignInUsers }
