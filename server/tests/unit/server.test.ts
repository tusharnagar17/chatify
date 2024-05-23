import { api } from "../setupTests"

describe("server.ts", ()=> {
  test("testing /ping endpoint", async ()=> {
    const response = await api.get('/ping')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({message: "Successfully pinged!"})
  })
})

