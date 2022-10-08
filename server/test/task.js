let FormData = require("form-data");
let fs = require("fs");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
// Assertion style
chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("Tasks API", () => {
  it("Test: add new user", () => {
    const user = {
      first_name: "default",
      last_name: "user",
      status: "Married",
      nationality: "Sinhalese",
      nic: "2000002323",
      dob: "2006-10-06T00:00:00.000+00:00",
      email: "physickness@gmail.com",
      address: "No.01, lane 02, vavuniya",
      contact_number: "0776767563",
      role: "wallet_owner",
      isAccepted: "0",
    };

    chai
      .request(api)
      .post("/user/addUser")
      .attach("nic_photo_id", "./test/files/testfile.pdf")
      .attach("bc_photo_id", "./test/files/testfile.pdf")
      .field("first_name", user.first_name)
      .field("last_name", user.last_name)
      .field("status", user.status)
      .field("nationality", user.nationality)
      .field("nic", user.nic)
      .field("dob", user.dob)
      .field("email", user.email)
      .field("address", user.address)
      .field("contact_number", user.contact_number)
      .field("role", user.role)
      .field("isAccepted", user.isAccepted)

      .then((err, response) => {
        response.should.have.status(201);
      });
  });

  it("Test: add new verifier", () => {
    const user = {
      name: "default_verifier",
      email: "jathavan.19@cse.mrt.ac.lk",
      address: "No.01, lane 02, vavuniya",
      contact_number: "0776767563",
      role: "bank",
      isAccepted: "0",
      account: true,
      loan: true,
      card: true,
      password: "XXXXX",
    };

    chai
      .request(api)
      .post("/user/addUser")
      .attach("cc_photo_id", "./test/files/testfile.pdf")
      .field("name", user.name)
      .field("address", user.address)
      .field("account", user.account)
      .field("loan", user.loan)
      .field("card", user.card)
      .field("email", user.email)
      .field("contact_number", user.contact_number)
      .field("role", user.role)
      .field("isAccepted", user.isAccepted)
      .field("password", user.password)

      .then((err, response) => {
        response.should.have.status(201);
      });
  });

  it("Test: get all users", (done) => {
    chai
      .request(api)
      .get("/user/getUsers")
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("Test: get user by email", (done) => {
    chai
      .request(api)
      .get("/user/getUsers", {
        params: {
          email: "admin@gmail.com",
        },
      })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("Test: get pending wallet users", (done) => {
    chai
      .request(api)
      .get("/user/getPendingWalletUsers")
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it("Test: get pending banks", (done) => {
    chai
      .request(api)
      .get("/user/getPendingBanks")
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
