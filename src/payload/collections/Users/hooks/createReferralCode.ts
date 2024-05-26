import { FieldHook } from 'payload/types';
import { v4 } from 'uuid';

export const createReferralCode: FieldHook = async ({ operation, value }) => {
  if (operation === 'create' && !value) value = v4().split('-')[0];

  return value;
};
