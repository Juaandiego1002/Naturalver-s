// Payload CMS configuration
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

import { Products } from './src/collections/Products';
import { Orders } from './src/collections/Orders';
import { Users } from './src/collections/Users';
import { Pages } from './src/collections/Pages';
import { Categories } from './src/collections/Categories';
import { Media } from './src/collections/Media';

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
    outfile: 'src/types/payload.ts',
    depth: 2,
  },
});

export default config;