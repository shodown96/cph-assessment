const crypto = require("crypto");

function createHash(value) {
  return crypto.createHash("sha3-512").update(value).digest("hex");
}

exports.deterministicPartitionKey = (event) => {

  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event && event.partitionKey) {
    candidate = typeof candidate !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey
  } else if(event) {
    const data = JSON.stringify(event);
    candidate = createHash(data);
  }


  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};