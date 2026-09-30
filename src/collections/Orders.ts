import { CollectionConfig } from '@payloadcms/payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    description: 'Pedidos de NATURALVER\'S',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
        },
        {
          name: 'quantity',
          type: 'number',
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      min: 0,
    },
    {
      name: 'shipping',
      type: 'number',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      min: 0,
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'department',
          type: 'text',
        },
        {
          name: 'zip',
          type: 'text',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Confirmado', value: 'confirmed' },
        { label: 'En preparación', value: 'preparing' },
        { label: 'En envío', value: 'shipping' },
        { label: 'Entregado', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Contrarecibo', value: 'contrarecibo' },
        { label: 'Tarjeta', value: 'card' },
        { label: 'Transferencia', value: 'transfer' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notas del pedido',
    },
  ],
};