
import AnkrscanProvider from "@ankr.com/ankr.js";

const provider = new AnkrscanProvider(" ");

export  const useGetAllNfts = async ( address : string)=>{

  const { nfts } = await getNfts(address);

  return nfts

}

async function getNfts(address: string) {
  const { assets } = await provider.getNFTsByOwner({
    walletAddress: address,
    blockchain: ["eth", "polygon", "bsc"],
  });

  return {
    nfts: assets,
  };
}