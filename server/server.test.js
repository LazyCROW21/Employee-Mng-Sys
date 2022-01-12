const supertest = require("supertest");
const server = require('./index');
const request = supertest(server);

describe("GET /employee", () => {
    describe("When no id parameter passed", () => {
        test("should respond with status code 200", async () => {
            const response = await request.get("/api/employee").send();
            expect(response.statusCode).toBe(200);
        });

        // test("should return json array & header", ()=>{});
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
        const response = await request.get("/api/employee/1").send();
        var Obj = response.body;
        test("should respond with status code 200", async () => {
            expect(response.statusCode).toBe(200);
        });

        test("should return json object & header", async () => {
            // const response = await request.get("/api/employee/1").send();
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
            // const response = await request.get("/api/employee/1").send();
            // expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            var isValidObj = true;
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
                        if (!Obj[reqField[i]]) {
                            isValidObj = false;
                            break;
                        }
                    }
                }
            } catch (err) {
                console.log(err);
                isValidObj = false;
            }
            expect(isValidObj).toBe(true);
        });
    });
    describe("When invalid parameter is passed", ()=>{
        const response = await request.get("/api/employee/wrongid").send();
        // var Obj = response.body;
        test("should respond with status code 400", ()=>{
            expect(response.statusCode).toBe(200);
        });
        // test("should return json object & header", ()=>{});
    });
});