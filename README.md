# grpc-error-extra

[![npm version](https://badge.fury.io/js/grpc-error-extra.svg)](https://www.npmjs.com/package/grpc-error-extra)
[![npm downloads](https://img.shields.io/npm/dt/grpc-error-extra.svg)](https://www.npmjs.com/package/grpc-error-extra)
[![dependencies](https://img.shields.io/david/litichevskiydv/grpc-error-extra.svg)](https://www.npmjs.com/package/grpc-error-extra)
[![dev dependencies](https://img.shields.io/david/dev/litichevskiydv/grpc-error-extra.svg)](https://www.npmjs.com/package/grpc-error-extra)
[![Build Status](https://github.com/litichevskiydv/grpc-error-extra/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/litichevskiydv/grpc-error-extra/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/litichevskiydv/grpc-error-extra/badge.svg?branch=master)](https://coveralls.io/github/litichevskiydv/grpc-error-extra?branch=master)

Utility error class suitable for gRPC error responses and can carry custom details

# Install

`npm i grpc-error-extra`

# Usage

## Sending details to client

```javascript
const { status } = require("@grpc/grpc-js");
const { GrpcError } = require("grpc-error-extra");

/*...*/

throw new GrpcError("Validation failed", {
  statusCode: status.INVALID_ARGUMENT,
  details: [
    {
      field: "name",
      description: "Name must be unique",
    },
  ],
});
```

## Wrapping inner error

```javascript
const { GrpcError } = require("grpc-error-extra");

/*...*/

try {
  /*...*/
} catch (error) {
  const grpcError = new GrpcError("Unhandled exception has occurred", { innerError: error });

  if (callback) callback(grpcError);
  else call.emit("error", grpcError);
}
```
