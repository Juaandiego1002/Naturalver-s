import config from '../../../../payload.config';
import { REST_GET, REST_POST, REST_PUT, REST_PATCH, REST_DELETE, REST_OPTIONS, GRAPHQL_POST, GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes';

const configPromise = Promise.resolve(config);

export const GET = REST_GET(configPromise);
export const POST = REST_POST(configPromise);
export const PUT = REST_PUT(configPromise);
export const PATCH = REST_PATCH(configPromise);
export const DELETE = REST_DELETE(configPromise);
export const OPTIONS = REST_OPTIONS(configPromise);