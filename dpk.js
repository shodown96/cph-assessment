const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {

  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  if (event && event.partitionKey) {
    candidate = typeof candidate !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey
  } else if(event) {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }


  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};