import { Food } from "./food";

export interface User {
    name: string,
    email: string,
    password: string,
    dailyCalorieGoal: number,
    dailyCarbGoal: number,
    dailyFatGoal: number,
    dailyProteinGoal: number,
    food: Food[]
}