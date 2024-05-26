import { FieldHook } from 'payload/types';
import { User } from '../../../payload-types';

export const updateReferralsByReferrer: FieldHook<User> = async ({
  value,
  previousValue,
  originalDoc,
  req: { payload },
}) => {
  try {
    if (!previousValue && value) {
      const referrer = await payload.findByID({ collection: 'users', id: value, depth: 0 });

      if (referrer) {
        await payload.update({
          collection: 'users',
          id: value,
          data: {
            referrals: Array.isArray(referrer.referrals) ? [...referrer.referrals, originalDoc.id] : [originalDoc.id],
          },
        });
      }
    }

    if (previousValue && !value) {
      const previousReferrer = await payload.findByID({ collection: 'users', id: previousValue, depth: 0 });

      if (previousReferrer) {
        console.log('previousReferrer', previousReferrer);
        await payload.update({
          collection: 'users',
          id: previousValue,
          data: {
            referrals: previousReferrer.referrals.filter((referral) => referral !== originalDoc.id),
          },
        });
      }
    }

    if (previousValue && value) {
      const previousReferrer = await payload.findByID({ collection: 'users', id: previousValue, depth: 0 });
      const referrer = await payload.findByID({ collection: 'users', id: value, depth: 0 });

      if (referrer && previousReferrer) {
        const promises = [
          payload.update({
            collection: 'users',
            id: previousValue,
            data: {
              referrals: previousReferrer.referrals.filter((referral) => referral !== originalDoc.id),
            },
          }),
          payload.update({
            collection: 'users',
            id: value,
            data: {
              referrals: Array.isArray(referrer.referrals) ? [...referrer.referrals, originalDoc.id] : [originalDoc.id],
            },
          }),
        ];

        await Promise.all(promises);
      }
    }
  } catch (error) {
    console.error('Error updating referrals', error);
  }

  return value;
};
