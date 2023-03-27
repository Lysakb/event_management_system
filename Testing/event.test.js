const supertest = require("supertest");
const { connect } = require("./database");
const app = require("../src/index");
const api = supertest(app);

describe("POST /event/add", () => {
  let conn;

  beforeAll(async () => {
    conn = await connect();
  });

  afterEach(async () => {
    await conn.cleanup();
  });

  afterAll(async () => {
    await conn.disconnect();
  });

  it("should create a new event post ", async () => {
    const newEvent = {
      name: "Software 3",
      date: "2023-05-24T00:00:00.000Z",
      location: "Lagos",
      description: "The software",
      attendee: [],
    };

    const response = await api.post("/event/add").send(newEvent);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Software 3");
    expect(response.body.date).toBe("2023-05-24T00:00:00.000Z");
    expect(response.body.location).toBe("Lagos");
    expect(response.body.description).toBe("The software");
    expect(response.body.attendee).toBe([]);
  });
});

//     beforeAll(async () => {
//         conn = await connect();
//     })

//     afterEach(async()=>{
//         await conn.cleanup();
//     })

//     afterAll(async () =>{
//         await conn.disconnect()
//     })

//   it('should return 200 status code and the event data if the event exists', async () => {
//     // create a mock event
//     const mockEvent = new eventModel({
//         name: "Software 3",
//         date: "2023-05-24T00:00:00.000Z",
//         location: "Lagos",
//         description: "The software",
//         attendee: [],
//     });
//     await mockEvent.save();

//     // make a request to get the event by id
//     const response = await request(app).get(`/event/${mockEvent._id}`);

//     // assert that the response status code is 200
//     expect(response.status).toBe(200);

//     // assert that the response body is the event data
//     expect(response.body._id).toBe(String(mockEvent._id));
//     expect(response.body.name).toBe(mockEvent.name);
//     expect(response.body.location).toBe(mockEvent.location);
//     expect(response.body.description).toBe(mockEvent.description);
//     expect(response.body.date).toBe(mockEvent.date);
//     expect(response.body.attendee).toEqual(expect.any(Array));
//   });

//   it('should return 404 status code if the event does not exist', async () => {
//     // make a request to get an event that does not exist
//     const response = await supertest(app).get(`/event/${new eventModel()._id}`);

//     // assert that the response status code is 404
//     expect(response.status).toBe(404);

//     // assert that the response body is the error message
//     expect(response.body.message).toBe('No events found!');
//   });
// });
jest.setTimeout(30000);

// describe("event", ()=>{
//     describe("get event route",()=>{
//        describe("given event does not exist", ()=>{
//         it("should return a 404", async()=>{
//             const eventId = expect.any(Number);

//             await supertest(app).get(`/event/${eventId}`).expect(404);
//         }, )
//        })
//     })
// })

// describe("Integration tests to get books", ()=>{
//     it("GET/event - get all events", async ()=>{

//         const {body, statusCode} = await request(app).get("/event")

//         expect(body).toEqual(
//            expect.arrayContaining([
//             expect.objectContaining({
//                 id: expect.any(Number),
//                 name: expect.any(String),
//                 date: expect.any(Date),
//                 location: expect.any(String),
//                 description: expect.any(String),
//                 status: expect.any(String)

//             })
//            ])
//         )

//         expect(statusCode).toBe(200);
//     })
// })
