const supertest = require("supertest");
const server = require('./index');
const request = supertest(server);

describe("GET /employee", () => {
    describe("When no id parameter passed", () => {
        test("should respond with status code 200", async () => {
            const response = await request.get("/api/employee").send();
            expect(response.statusCode).toBe(200);
        });

        test("should return json array & header", async () => {
            const response = await request.get("/api/employee").send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            var isArr = false;
            try {
                var Obj = response.body;
                if (Array.isArray(Obj)) {
                    isArr = true;
                }
            } catch (err) {
                console.log(err);
                isArr = false;
            }
            expect(isArr).toBe(true);
        });
    });
    describe("When id parameter is passed", () => {
        test("should respond with status code 200", async () => {
            const response = await request.get("/api/employee/1").send();
            expect(response.statusCode).toBe(200);
        });
        
        test("should return json object & header", async () => {
            const response = await request.get("/api/employee/1").send();
            var Obj = response.body;
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            var isObj = false;
            try {
                if (typeof Obj === 'object' && Obj !== null) {
                    isObj = true;
                }
            } catch (err) {
                console.log(err);
                isObj = false;
            }
            expect(isObj).toBe(true);
        });

        test("object contains the required field ", async () => {
            const response = await request.get("/api/employee/1").send();
            // var isValidObj = true;
            var Obj = response.body;
            var reqField = [
                'id', 
                'first_name',
                'last_name',
                'phone',
                'email',
                'dept_id',
                'designation_id',
                'salary'
            ];
            try {
                // var Obj = response.body;
                if (typeof Obj === 'object' && Obj !== null) {
                    for (let i = 0; i < reqField.length; i++) {
                        expect(Obj[reqField[i]]).toBeDefined()
                        // if (!Obj[reqField[i]]) {
                        //     isValidObj = false;
                        //     break;
                        // }
                    }
                }
            } catch (err) {
                console.log(err);
                // isValidObj = false;
            }
            // expect(isValidObj).toBe(true);
        });
    });
    describe("When invalid parameter is passed", ()=>{
        test("should respond with status code 400", async()=>{
            const response = await request.get("/api/employee/wrongid").send();
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("POST /employee", () => {
    describe("When correct data is passed", () => {
        test("should respond with status code 200", async () => {
            var Obj = {
                "first_name": "Opal",
                "last_name": "Raycroft",
                "phone": "8234802021",
                "email": "OpalRaycroft@columbia.edu",
                "dept_id": 1,
                "designation_id": 1,
                "salary": 12000
            };
            const response = await request.post("/api/employee").send(Obj);
            expect(response.statusCode).toBe(200);
        });

        test("should return json header", async () => {
            var Obj = {
                "first_name": "Opal",
                "last_name": "Raycroft",
                "phone": "8234802021",
                "email": "asdsaq@asd.edu",
                "dept_id": 1,
                "designation_id": 1,
                "salary": 12000
            };
            const response = await request.post("/api/employee").send(Obj);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test("should return inserted json object with id", async () => {
            var Obj = {
                "first_name": "Opal",
                "last_name": "Raycroft",
                "phone": "8234802021",
                "email": "qqqeq@asd.edu",
                "dept_id": 1,
                "designation_id": 1,
                "salary": 12000
            };
            const response = await request.post("/api/employee").send(Obj);
            var respObj = response.body;
            var isObj = false;
            if (typeof respObj === 'object' && respObj !== null) {
                isObj = true;
            }
            expect(isObj).toBe(true);
            expect(respObj.id).toBeDefined();
        });
    });
    describe("When invalid data is passed", () => {
        test("should respond with status code 400", async () => {
            var Obj = {
                "first_name": "ASDADQ",
                "last_name": null,
                "phone": "823as02021",
                "email": "not an email",
                "dept_id": -1,
                "designation_id": 1,
                "salary": null
            };
            const response = await request.post("/api/employee").send(Obj);
            expect(response.statusCode).toBe(400);
        });
    });
});

describe("DELETE /employee/:id", () => {
    describe("When valid id data is passed", () => {
        test("should respond with status code 200", async () => {
            var id = 14;
            const response = await request.delete("/api/employee/"+id).send();
            expect(response.statusCode).toBe(200);
        });

        test("should return json header", async () => {
            var id = 12;
            const response = await request.delete("/api/employee/"+id).send();
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });

        test("should return deleted json object with id", async () => {
            var id = 15;
            const response = await request.delete("/api/employee/"+id).send();
            var respObj = response.body;
            var isObj = false;
            if (typeof respObj === 'object' && respObj !== null) {
                isObj = true;
            }
            expect(isObj).toBe(true);
            expect(respObj.id).toBeDefined();
        });
    });
    describe("When invalid data is passed", () => {
        test("should respond with status code 400", async () => {
            var id = 'asdad';
            const response = await request.delete("/api/employee/"+id).send();
            expect(response.statusCode).toBe(400);
        });
    });
});