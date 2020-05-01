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
