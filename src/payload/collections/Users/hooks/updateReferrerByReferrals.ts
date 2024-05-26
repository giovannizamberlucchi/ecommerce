import { FieldHook } from 'payload/types';
import { User } from '../../../payload-types';

export const updateReferrerByReferrals: FieldHook<User> = async ({
  value,
  previousValue,
  originalDoc,
  req: { payload },
}) => {
  let referrer;
  const deleteArray: string[] =
    Array.isArray(previousValue) && Array.isArray(value)
      ? previousValue.filter((x) => !value.includes(x))
      : Array.isArray(previousValue) && !Array.isArray(value)
        ? value
        : [];
  const createArray: string[] =
    Array.isArray(value) && Array.isArray(previousValue) ? value.filter((x) => !previousValue.includes(x)) : [];

  if (deleteArray.length) {
    deleteArray.forEach(async (userId: User['id']) => {
      referrer = await payload.findByID({ collection: 'users', id: userId, depth: 0 });
      if (referrer) {
        const resultDelete = await payload.update({
          collection: 'users',
          id: userId,
          data: {
            referrer: null,
          },
        });
      }
    });
  }

  if (createArray.length) {
    createArray.forEach(async (userId: User['id']) => {
      referrer = await payload.findByID({ collection: 'users', id: userId, depth: 0 });
      if (referrer) {
        const resultCreate = await payload.update({
          collection: 'users',
          id: userId,
          data: {
            referrer: originalDoc.id,
          },
        });
      }
    });
  }

  return value;
};
