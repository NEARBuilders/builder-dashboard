import { Wallet } from '@/lib/near';
import { DAO_ID } from './config';

export type Member = {
  id: string;
  roles: string[];
};

const processPolicy = (policy) => {
  const obj = {
    policy,
    users: {},
    roles: {},
    everyone: {}
  };
  policy.roles.forEach((role) => {
    if (role.kind === 'Everyone') {
      obj.everyone = role;
    }
    if (role.kind.Group) {
      if (!obj.roles[role.name]) {
        obj.roles[role.name] = role;
      }
      role.kind.Group.forEach((user) => {
        if (!obj.users[user]) {
          obj.users[user] = [];
        }

        obj.users[user].push(role.name);
      });
    }
  });

  return obj;
};

export async function getMembers(wallet: Wallet): Promise<Member[]> {
  try {
    const policy = await wallet.viewMethod({
      contractId: DAO_ID,
      method: 'get_policy'
    });
    const daoDetails = processPolicy(policy);

    const members = Object.keys(daoDetails?.users ?? {}).map((userId) => ({
      id: userId,
      roles: daoDetails.users[userId]
    }));

    return members;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
