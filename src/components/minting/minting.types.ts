export interface MintingProps {
  token: string;
  file: Blob | string;
  nftName: string;
  nftDescription: string;
  mintToAddress: string;
  contractName : string;
}