import mongoose from "mongoose"
import { MONGO_URI } from "../src/utils/config"
import app from "../src"
import supertest from "supertest"

export const api = supertest(app)

beforeAll(async ()=> {
    await mongoose.connect(MONGO_URI)
})

afterAll(async ()=> {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})