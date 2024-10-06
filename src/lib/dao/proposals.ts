import { Wallet } from '../near';
import { DAO_ID } from './config';

export type Proposal = {
  id: number;
  proposer: string;
  description: string;
  kind: AddMemberToRole | FunctionCall;
  status: 'Approved' | 'Rejected' | 'Pending' | 'InProgress' | 'Failed';
  vote_counts: {
    council: [number, number, number] | Record<string, never>;
  };
  votes: {
    [key: string]: 'Approve' | 'Reject' | 'Abstain' | string;
  };
  submission_time: string;
};

type AddMemberToRole = {
  AddMemberToRole: {
    member_id: string;
    role: string;
  };
};

type FunctionCall = {
  FunctionCall: {
    receiver_id: string;
    actions: {
      method_name: string;
      args: string; // Base64 encoded arguments
      deposit: string;
      gas: string;
    }[];
  };
};

export async function getProposals(
  offset: number,
  limit: number,
  wallet: Wallet
): Promise<Proposal[]> {
  try {
    const proposals = await wallet.viewMethod({
      contractId: DAO_ID,
      method: 'get_proposals',
      args: {
        from_index: offset,
        limit
      }
    });
    return proposals;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
