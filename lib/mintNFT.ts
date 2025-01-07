import { http, createWalletClient, createPublicClient, Address, Account} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { odyssey } from '@story-protocol/core-sdk'
import { defaultNftContractAbi } from './defaultNftContractAbi'

const privateKey = `0x${process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY}` as `0x${string}`
const account: Account = privateKeyToAccount(privateKey)

const baseConfig = {
    chain: odyssey,
    transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
} as const

export const publicClient = createPublicClient(baseConfig)
export const walletClient = createWalletClient({
    ...baseConfig,
    account,
})

export async function mintNFT(to: Address, uri: string): Promise<number | undefined> {
   //if (!process.env.NEXT_PUBLIC_SPG_NFT_CONTRACT_ADDRESS) {
   //     throw new Error('NFT contract address not configured');
   // }

    try {
        const { request } = await publicClient.simulateContract({
            address: '0x041B4F29183317Fd352AE57e331154b73F8a1D73',
            functionName: 'mintNFT',
            args: [to, uri],
            abi: defaultNftContractAbi,
            account,
            chain: odyssey,
        })

        const hash = await walletClient.writeContract(request)
        
        const receipt = await publicClient.waitForTransactionReceipt({
            hash,
        })

        // Look for Transfer event in the logs
        const transferLog = receipt.logs.find(log => log.topics.length === 4)
        if (transferLog?.topics[3]) {
            return parseInt(transferLog.topics[3], 16)
        }

        return undefined
    } catch (error) {
        console.error('Error in mintNFT:', error)
        throw error
    }
}