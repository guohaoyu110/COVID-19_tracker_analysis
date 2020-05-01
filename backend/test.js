const assert = require("assert");
const myServer = require("./index");

// Testing isEmail
describe("isEmail Test with false case", () => {
  it("should return false", () => {
    let res = myServer.isEmail('12345');
    assert.equal(res, false);
    });
});

describe("isEmail Test with true case", () => {
    it("should return true", () => {
      let res = myServer.isEmail('12345@qq.com');
      assert.equal(res, true);
    });
});

// Testing getBase
describe("getBase Test", () => {
    it("should get base data", () => {
      myServer.getBase();
      assert.notEqual(myServer.baseinfo, null);
    });
});

// Testing getStates
describe("getStates Test", () => {
    it("should get state data", () => {
      myServer.getStates();
      assert.notEqual(myServer.stateinfo, null);
    });
});

// Testing getCountries
describe("getCountries Test", () => {
    it("should get country data", () => {
      myServer.getCountries();
      assert.notEqual(myServer.countryinfo, null);
    });
});
