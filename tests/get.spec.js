const axios = require("axios");
let baseUrl = "https://petstore.swagger.io/v2/pet/findByStatus";

describe("GET /pet", () => {
  it('should return pets with status "available"', async () => {
    const param = `?status="available"`;
    const res = await axios.get(baseUrl + param);
    expect(res.status).toBe(200);
  });

  it('should return pets with status "pending"', async () => {
    const param = `?status="pending"`;
    const res = await axios.get(baseUrl + param);
    expect(res.status).toBe(200);
  });

  it('should return pets with status "sold"', async () => {
    const param = `?status=sold"`;
    const res = await axios.get(baseUrl + param);
    expect(res.status).toBe(200);
  });

  it("should return pets with multiple statuses: available, pending, and sold", async () => {
    const param = `?status=available&status=pending&status=sold"`;

    try {
      const res = await axios.get(baseUrl + param);
      expect(res.status).toBe(200);
    } catch (error) {
      if (error.response) {
        // ❌ Kalau backend salah response, test akan tetap fail
        expect(error.response.status).toBe(200);
      } else {
        throw error;
      }
    }
  });

  it("should return 400 when status is an empty string", async () => {
    const param = `?status="`;
    try {
      const res = await axios.get(baseUrl + param);
      expect(res.status).toBe(400);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
      } else {
        throw error;
      }
    }
  });

  it("should return 400 when the request is sent without the status query parameter", async () => {
    // const param = null;
    try {
      const res = await axios.get(baseUrl);
      expect(res.status).toBe(400);
    } catch (error) {
      if (error.response) {
        expect(error.response.status).toBe(400);
      } else {
        throw error;
      }
    }
  });
});
