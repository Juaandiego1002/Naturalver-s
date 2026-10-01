import { CollectionConfig } from 'payload';

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
    },
    {
      name: 'slug',
      // @ts-ignore - slug field type not in Payload 3 FieldType union (type definition issue)
      type: 'slug',
      relationTo: 'title',
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
        label: 'Título SEO',
      },
{
        name: 'description',
        type: 'textarea',
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
      blocks: [],
    },
  ],
};