const axios = require("axios");
let baseUrl = "https://petstore.swagger.io/v2/pet/";
const postUrl = "https://petstore.swagger.io/v2/pet";

describe("DEL /pet", () => {
  beforeAll(async() => {
   const payload = {
         id: 99276,
         category: {
           id: 0,
           name: "string",
         },
         name: "rabbit",
         photoUrls: ["string"],
         tags: [
           {
             id: 0,
             name: "string",
           },
         ],
         status: "available",
       };
   
       await axios.post(postUrl, payload);
  });

  it("should delete an existing pet with valid ID", async () => {
    const paramId = 99276;

    try {
      const res = await axios.delete(baseUrl + paramId);
      expect(res.status).toBe(200);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(200);
      } else {
        throw error;
      }
    }
  });

  it("should return 404 when deleting a non-existing pet ID", async () => {
    const paramId = 0;

    try {
      const res = await axios.delete(baseUrl + paramId);
      expect(res.status).toBe(404);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(404);
      } else {
        throw error;
      }
    }
  });

  it("should return 405 when deleting without a pet ID in the path", async () => {
    try {
      const res = await axios.delete(baseUrl);
      expect(res.status).toBe(405);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(405);
      } else {
        throw error;
      }
    }
  });
});
