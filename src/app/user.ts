import { Food } from "./food";

export interface User {
    name: string,
    email: string,
    password: string,
    food: Food[]
}