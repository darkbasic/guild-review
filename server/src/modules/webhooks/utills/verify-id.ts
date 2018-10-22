import { ObjectID } from 'mongodb';

export function verifyId(id: string | ObjectID): ObjectID {
  if (typeof id === 'string') {
    return new ObjectID(id);
  }

  return id;
}
