import { PIL_TYPE, RegisterIpAndAttachPilTermsResponse, AddressZero} from '@story-protocol/core-sdk'
import { privateKeyToAccount } from 'viem/accounts'
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { http, Address, Account} from 'viem'

const privateKey: Address = `0x${process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY}`
const account: Account = privateKeyToAccount(privateKey)

const config: StoryConfig = {
  account: account,
  transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
  chainId: 'odyssey',
}

const client = StoryClient.newClient(config)

async function createCollection() {
  const newCollection = await client.nftClient.createNFTCollection({
    name: 'Test NFT',
    symbol: 'TEST',
    isPublicMinting: true,
    mintOpen: true,
    mintFeeRecipient: AddressZero,
    contractURI: '',
    txOptions: { waitForTransaction: true },
  })

  console.log(
    `New SPG NFT collection created at transaction hash ${newCollection.txHash}`,
    `SPG NFT contract address: ${newCollection.spgNftContract}`
  )
}

// Call the function
createCollection().catch(console.error)