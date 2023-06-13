# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
- Firstly, the `TRIVIAL_PARTITION_KEY` is an unnecessary variable as its value `0` could be assigned to candidate initially.
- Secondly, the previous algorithm checks for if the candidate is true too frequently. Indirectly or directly.

## The new solution
The variable `candidate` is initialized to `0`. Therefore, there's no need for `TRIVIAL_PARTITION_KEY`.
We can combine the two condition statements (line 8-9 of the old code) into one.
We can create a function `createHash` to create hashes in order to reduce repetition.

We can also use a ternary operator to check if the event has a partition key or not, if its does, we can assign it to be `event.partitionKey` else, we can assign it to `createHash(JSON.stringify(event))`.

Then we can move on further to check if the candidate produced is not a string. if it isn't, we can stringify it.

Then we can now check the length of the string, if it's more the `MAX_PARTITION_KEY_LENGTH`. We can create a hash from the candidate.

All these should run only if there's an input `event`. Else it should just return the candidate which is `"0"`.
