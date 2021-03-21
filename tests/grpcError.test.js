const { status, Metadata } = require("@grpc/grpc-js");

const { GrpcError } = require("../src");

describe("Should check the formation of the status code", () => {
  const testCases = [
    {
      toString: () => "Status code was passed",
      options: { statusCode: status.INVALID_ARGUMENT },
      expected: { code: status.INVALID_ARGUMENT },
    },
    {
      toString: () => "Status code was not passed",
      expected: { code: status.INTERNAL },
    },
  ];

  test.each(testCases)("%s", (testCase) => {
    // When
    const actual = new GrpcError("Something went wrong", testCase.options);

    // Then
    expect(actual).toMatchObject(testCase.expected);
  });
});

describe("Should check the formation of the metadata", () => {
  const metadataFromObject = new Metadata();
  metadataFromObject.add("key", "value");

  const metadataWithDetails = new Metadata();
  metadataWithDetails.add("details-bin", Buffer.from('"one"'));
  metadataWithDetails.add("details-bin", Buffer.from('"two"'));

  const metadataWithDetailsAndOtherKey = metadataWithDetails.clone();
  metadataWithDetailsAndOtherKey.add("key", "value");

  const validationError = new Error("Value must be positive");
  const metadataWithError = new Metadata();
  metadataWithError.add(
    "details-bin",
    Buffer.from(
      JSON.stringify({
        detail: validationError.message,
        stackEntries: validationError.stack.split("\n").map((line) => line.trim()),
      })
    )
  );

  const testCases = [
    {
      toString: () => "Metadata was passed as an object",
      options: { metadata: { key: "value" } },
      expected: { metadata: metadataFromObject },
    },
    {
      toString: () => "Details array was passed",
      options: { details: ["one", "two"] },
      expected: { metadata: metadataWithDetails },
    },
    {
      toString: () => "Metadata and details were passed",
      options: { metadata: metadataFromObject, details: ["one", "two"] },
      expected: { metadata: metadataWithDetailsAndOtherKey },
    },
    {
      toString: () => "Inner error was passed",
      options: { innerError: validationError },
      expected: { metadata: metadataWithError },
    },
    {
      toString: () => "Inner error and details were passed",
      options: { details: ["one", "two"], innerError: validationError },
      expected: { metadata: metadataWithError },
    },
  ];

  test.each(testCases)("%s", (testCase) => {
    // When
    const actual = new GrpcError("Something went wrong", testCase.options);

    // Then
    expect(actual).toMatchObject(testCase.expected);
  });
});
