const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a non zero value when an event with paritionkey is given", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "why" });
    console.log("trivialKey", trivialKey)
    expect(trivialKey).not.toBe("0");
  });

  it("Returns a hash value when an event is given", () => {
    const trivialKey = deterministicPartitionKey({ meta: "explain" });
    console.log("trivialKey", trivialKey)
    expect(trivialKey).not.toBe("0");
  });
});
