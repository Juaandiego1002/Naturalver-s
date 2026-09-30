import { CollectionConfig } from '@payloadcms/payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'slug',
      relationTo: 'title',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: 'Título SEO',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Descripción SEO',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen social',
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      localized: true,
      blocks: [],
    },
  ],
};