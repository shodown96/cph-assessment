const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {

  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event) {
    candidate = event.partitionKey ? event.partitionKey :
      createHash(JSON.stringify(event));

    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = createHash(candidate);
    }
  }
  return candidate;
};


function createHash(value) {
  return crypto.createHash("sha3-512").update(value).digest("hex");
}
