import { MintingProps } from "./minting.types";

export async function useMintNft({
  token,
  file,
  nftName,
  nftDescription,
  mintToAddress,
  contractName 
}: MintingProps) {
  try {


    // Gaurding
    if (!(file && mintToAddress && nftDescription && nftName)) {
      alert('Please fill all the details');
      return;
    }

    //Uploading file
    const form = new FormData();
    form.append('file', file);

    

    const optionsObject = {

      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
        Authorization: token
      }
    };
   console.log("uploading starts................................................");
   const ipfs_response = await fetch('https://api.nftport.xyz/v0/files', optionsObject)
   .then(response => response.json())
   .then(response => {
     console.log(response.ipfs_url);
     return response.ipfs_url
     // Creating the metadata and minting afterwards
    })
    console.log("Metadating starts................................................");
    
    
    const metadatingResposne = await metadating(ipfs_response , nftName, nftDescription,token);  
    
    console.log("finding contract................................................");
    const findContractAddressResponse = await findContractAddress( token , contractName )
    
    console.log("MInting starts................................................");
      const mintingResponse = await cutomiseMinting(mintToAddress , metadatingResposne , findContractAddressResponse.address, token);

      return mintingResponse;
      
      // .then( response => {
      //  const metadatingResposne = metadating(response.ipfs_url, nftName, nftDescription,token);
      //   return metadatingResposne
      // })
      // .then(response => {
        
      //   const findContractAddressResponse = Promise.resolve(findContractAddress( token , contractName ))
         
      //   findContractAddressResponse.then(data => {

      //     const mintingResponse = cutomiseMinting(mintToAddress , response.metadata_uri , data.address, token);
      //     return mintingResponse
      //   })

      // })

 
  } catch (err) {
    console.log(err);
  }
}

async function metadating(
  ipfs_url: string,
  nftName: string,
  nftDescription : string,
 
  token : string
) {
  try {
    
    //defining Body
    const bodyContent =  `{"name":"${nftName}","description":"${nftDescription}","file_url":"${ipfs_url}"}`
    // getting th option
    const optionObject  = option( token , bodyContent )

    return await fetch('https://api.nftport.xyz/v0/metadata', optionObject)
      .then(response => response.json())
      .then(response => {
         return response.metadata_uri
        //minting the nft to the address with the metadata uri that is uploaded to the ipfs
        // cutomiseMinting(mintToAddress , response.metadata_uri , token);
        
      });

  } catch (err) {
    console.log(err);
  }
}





async function cutomiseMinting(mintToAddress : string, metadata: string , contractAddress: string , token : string) {
  


  const bodyContent = `{"chain":"polygon","contract_address":"${contractAddress}","metadata_uri":"${metadata}","mint_to_address":"${mintToAddress}"}`
  
  const optionObject  = option( token , bodyContent )

  await fetch('https://api.nftport.xyz/v0/mints/customizable', optionObject)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      alert(
        'Your NFT is getting MINTED , It will take some time to show up in al the places , Thanks for your patience '
      );
    });
}

async function findContractAddress( token : string , contractName : string){

   try{
   
   
    const option = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token
      }
    }

     return await fetch(
      "https://api.nftport.xyz/v0/me/contracts",
      option
    )
      .then((response) => response.json())
      .then((response) => {
        const data =  response.contracts?.find(
          (contract: { name: string }) =>
            contract.name.toLowerCase() === contractName.toLowerCase()
        );
        console.log(data);
        return data
      })
      .catch((err) => console.error(err));

   }catch(err){
    console.log(err);
   }


}


const option = ( token : string ,  body : FormData | string , contentType = "application/json" , method = 'POST') => {
  return {
    method: method,
    headers: {
      'Content-Type': contentType,
      Authorization: `${token}`,
    },

    body: body,
  };
};

