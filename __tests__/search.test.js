const neatCsv = require("neat-csv");
const path = require("path");
const { promises: fs } = require("fs");
const app = require("../server");
const request = require("supertest");

describe("Search Controller", () => {
  let parsedItems;
  let parsedUsers;
  const searchTerm = "camera";

  beforeAll(async () => {
    const loadedItemsFromCSV = await fs.readFile(
      path.join(__dirname, "..", "database/items.csv")
    );
    const loadedUsersFromCSV = await fs.readFile(
      path.join(__dirname, "..", "database/users.csv")
    );

    parsedItems = await neatCsv(loadedItemsFromCSV);
    parsedUsers = await neatCsv(loadedUsersFromCSV);
  });

  it("should load csv files and parse them into an array of objects", () => {
    expect(parsedItems).toEqual(expect.any(Array));
    expect(parsedUsers).toEqual(expect.any(Array));
  });

  it("call api using GET method with searchTerm - Ex: /search?searchTerm=camera", async () => {
    const response = await request(app)
      .get("/search")
      .query("searchTerm", searchTerm);

    expect(response.status).toBe(200);
  });

  it("call api using GET method with searchTerm not found - Ex: /search?searchTerm=skate", async () => {
    const response = await request(app)
      .get("/search")
      .query({ searchTerm: "skate" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it("call api using GET method with searchTerm returing an array with 20 objects", async () => {
    const response = await request(app)
      .get("/search")
      .query({ searchTerm });

    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(20);
  });
});
