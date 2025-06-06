import {config} from 'dotenv';

config()

export const PORT  = process.env.PORT || 3000
export const HOST  = process.env.HOST || "localhost"
export const DB_USER = process.env.DB_USER || "root"
export const DB_PASSWORD = process.env.DB_PASSWORD || ""
export const DB_HOST = process.env.DB_URL || "localhost"
export const DB_DATABASE = process.env.DB_DATABASE || "taller"
export const DB_PORT = process.env.DB_PORT || 3306