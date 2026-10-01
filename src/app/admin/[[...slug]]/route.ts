import { REST_GET, REST_POST, REST_PUT, REST_PATCH, REST_DELETE, REST_OPTIONS, GRAPHQL_POST, GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes';
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Products } from '@/collections/Products';
import { Orders } from '@/collections/Orders';
import { Users } from '@/collections/Users';
import { Pages } from '@/collections/Pages';
import { Categories } from '@/collections/Categories';
import { Media } from '@/collections/Media';

const config = buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/naturalvers',
  }),
  collections: [Products, Orders, Users, Pages, Categories, Media],
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' - NATURALVER\'S Admin',
    },
  },
  editor: lexicalEditor(),
  typescript: {
    outputFile: 'src/types/payload.ts',
  },
});

const configPromise = Promise.resolve(config);

const getHandler = REST_GET(configPromise);
const postHandler = REST_POST(configPromise);
const putHandler = REST_PUT(configPromise);
const patchHandler = REST_PATCH(configPromise);
const deleteHandler = REST_DELETE(configPromise);
const optionsHandler = REST_OPTIONS(configPromise);
const graphqlPostHandler = GRAPHQL_POST(configPromise);
const graphqlPlaygroundHandler = GRAPHQL_PLAYGROUND_GET(configPromise);

export async function GET(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore - Payload expects required slug, Next.js provides optional
  return getHandler(request, { params });
}

export async function POST(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore
  return postHandler(request, { params });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore
  return putHandler(request, { params });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore
  return patchHandler(request, { params });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore
  return deleteHandler(request, { params });
}

export async function OPTIONS(request: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  // @ts-ignore
  return optionsHandler(request, { params });
}