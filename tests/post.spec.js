const axios = require("axios");
const baseUrl = "https://petstore.swagger.io/v2/pet";

describe("POST /pet", () => {
  test("Create pet with valid data", async () => {
    const payload = {
      id: 19283736,
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

    const response = await axios.post(baseUrl, payload);
    // console.log(response.status);
    // console.log(response.data);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

  test("should return 400 when name is an empty string", async () => {
    const payload = {
      id: 19283736,
      category: {
        id: 0,
        name: "string",
      },
      name: "",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    try {
      const res = await axios.post(baseUrl, payload);
      expect(res.status).toBe(400);
    } catch (error) {
      // console.log(error)
      if (error.response) {
        expect(error.response.status).toBe(400);
      } else {
        throw error;
      }
    }
  });

  test("'should return 400 when all fields are empty'", async () => {
    // all field empty values
    const payload = {
      id: 0,
      category: {
        id: 0,
        name: "",
      },
      name: "",
      photoUrls: [""],
      tags: [
        {
          id: 0,
          name: "",
        },
      ],
      status: "",
    };

    try {
      const res = await axios.post(baseUrl, payload);
      expect(res.status).toBe(400);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
      } else {
        throw error;
      }
    }
  });

  test("should return 400 when status field is missing", async () => {
    const payload = {
      id: 19283736,
      category: {
        id: 0,
        name: "string",
      },
      name: "",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      // status is missing
    };
    try {
      const res = await axios.post(baseUrl, payload);
      expect(res.status).toBe(400);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
      } else {
        throw error;
      }
    }
  });

  test(`should return 400 when pet ID is a string ("abc")`, async () => {
    const payload = {
      id: "abc",
      category: {
        id: 0,
        name: "string",
      },
      name: "",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    try {
      const res = await axios.post(baseUrl, payload);
      expect(res.status).toBe(400);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
      }else{
        throw error
      }
    }
  });
});
