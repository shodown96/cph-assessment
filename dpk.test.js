const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return a non zero value when an event with paritionkey is given", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "why" });
    console.log("trivialKey", trivialKey)
    expect(trivialKey).not.toBe("0");
  });

  it("should return a hash value when an event is given", () => {
    const trivialKey = deterministicPartitionKey({ meta: "explain" });
    console.log("trivialKey", trivialKey)
    expect(trivialKey).not.toBe("0");
  });

  it("should return a hash if given a value", () => {
    const trivialKey = deterministicPartitionKey(1);
    const expected = crypto.createHash("sha3-512").update(JSON.stringify(1)).digest("hex");
    expect(trivialKey).toBe(expected);
  });

  it("should return partitionKey if it's less than MAX_PARTITION_KEY_LENGTH", () => {
    const stubEvent = {
      partitionKey: 1
    }
    const trivialKey = deterministicPartitionKey(stubEvent);
    const expected = "1";
    expect(trivialKey).toBe(expected);
  });

  it("should return a string value", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(typeof trivialKey).toBe("string")
  });

});
