const request = require("supertest")
const app = require('../server-test')
const {Task} = require("../../models/Task")
const database = require("../../database/accesmethod");

describe("Bread controller test suite", ()=>{
    describe("Api Methods", ()=>{
        it("should be functional", ()=>{
            return request(app).get('/').expect(200).then((response)=>{
                expect(response.body).not.toBeNull();
            });
        })
        it("should get all existing element from Mongo", async ()=>{
            let actualres = database.browseTasks().length;
            const response = await request(app).get('/api/tasks')
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBeDefined();
            expect(Array.isArray(response.body.message)).toBe(true);
        })
        it("should return 201, create task and augment the number of task", ()=>{
           return request(app).post('/api/tasks/new')
            .send({
               title: "task testing",
               template: "v_text",
               items: ["Test", "Jest"],
               text: "Started designing first stage CI CT pipeline"
            }).expect(201);
        })
    })
})

// return request(app).post('/api/tasks/new').send({
//     title: "task testing",
//     template: "v_text",
//     items: ["Test", "Jest"],
//     text: "Started designing first stage CI CT pipeline",
// });
// .expect(201);
// expect(true).toBe(true);
// expect(response.status).toBe(201);
// expect(response.body).toHaveProperty("message");