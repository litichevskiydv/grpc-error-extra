import { status, Metadata } from "@grpc/grpc-js";

interface GrpcErrorOptions {
  /**
   * gRPC response status code
   */
  statusCode?: status;

  /**
   * gRPC response metadata
   */
  metadata?: Metadata | { [key: string]: string };

  /**
   * Error details
   */
  details?: Array<any>;

  /**
   * Inner error
   */
  innerError?: Error;
}

export class GrpcError extends Error {
  /**
   * @param message Error message
   * @param options Error options
   */
  constructor(message: string, options?: GrpcErrorOptions);

  /**
   * gRPC response status code
   */
  code: status;

  /**
   * gRPC response metadata
   */
  metadata: Metadata;
}
