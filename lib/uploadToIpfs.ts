//"use server";
//const pinataSDK = require('@pinata/sdk')
//const fs = require('fs')
//const path = require('path')

//const pinata = new pinataSDK({ pinataJWTKey: process.env.NEXT_PUBLIC_PINATA_JWT })

//export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
//    const { IpfsHash } = await pinata.pinJSONToIPFS(jsonMetadata)
//    return IpfsHash
//}

export async function uploadJSONToIPFS(jsonMetadata: any): Promise<string> {
    try {
      const response = await fetch("/api/uploadToIpfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonMetadata),
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload JSON to IPFS");
      }
  
      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.error("Error in uploadJSONToIPFS:", error);
      throw error;
    }
  }

{
    /*
    // could use this to upload music (audio files) to IPFS
    export async function uploadFileToIPFS(filePath: string): Promise<string> {
        // Create a readable stream for the file
        const readableStreamForFile = fs.createReadStream(path.join(__dirname, filePath))
        const options = {
            pinataMetadata: {
                name: 'Meme',
            },
        }

        // Upload the file to Pinata
        const { IpfsHash } = await pinata.pinFileToIPFS(readableStreamForFile, options)

        return IpfsHash
    }
    */
}
