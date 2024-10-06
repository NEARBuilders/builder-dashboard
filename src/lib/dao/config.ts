import { Wallet } from '../near';

export const DAO_ID = 'build.sputnik-dao.near';

export async function getConfig(wallet: Wallet): Promise<any> {
  try {
    const config = await wallet.viewMethod({
      contractId: DAO_ID,
      method: 'get_config'
    });

    const { metadata } = config;
    if (metadata) {
      config.metadata = JSON.parse(atob(metadata));
    }

    return config;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
