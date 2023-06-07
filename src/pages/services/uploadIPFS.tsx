import axios from "axios";
import { useState } from "react";

const auth = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGU0NjdjNi1kZDQ5LTQ2OGEtYThiYS0wNmU4NGU1MjZkZWQiLCJlbWFpbCI6Im5pdGlyb2QuNTU1NUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDNkN2ZhYmQwNWNlYTM0YzVkODAiLCJzY29wZWRLZXlTZWNyZXQiOiI2MTljOGQ3ZmJjZTI1MmNiOGNhYWNiM2E0ODQ2YjUzNzIyMGYxMTViM2NmYjVlODUxYjE1NzdhZjk5MTQ3MGY3IiwiaWF0IjoxNjgzNTMwMTc1fQ.y2GGodX06OlbjiAESKOfoxZBonJKtFC30uN-b1XnuV0`;
const gateway = "pink-fond-pheasant-668.mypinata.cloud/";

export const jsonLottery = async (number: string, installment: string) => {
  try {
    const resJSON = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
      data: {
        number: number,
        installment: installment,
        attributes: [
          {
            display_type: "date",
            trait_type: "created date",
            value: new Date().getTime(),
          },
        ],
      },
      headers: {
        Authorization: auth,
      },
    });
    const tokenURI = `ipfs/${resJSON.data.IpfsHash}`;
    console.log("Token URI", "https://" + gateway + tokenURI);
    let uri = "https://" + gateway + tokenURI;
    return uri;
  } catch (error) {
    console.log("JSON to IPFS: ");
    console.log(error);
  }
};

// export const saveWillToIPFS = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   const form = e.target as HTMLFormElement;
//   const number = (form[0] as HTMLInputElement).value;
//   const installment = (form[1] as HTMLInputElement).value;
//   if (number) {
//     try {
//       const formData = new FormData();
//       formData.append("file", files[0]);
//       const resFile = await axios({
//         method: "post",
//         url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         data: formData,
//         headers: {
//           Authorization: auth,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log(resFile.data.IpfsHash);
//       const ImgHash = "https://" + gateway + `ipfs/${resFile.data.IpfsHash}`;
//       return await jsonWillToken(number, installment);
//     } catch (error) {
//       console.log("File to IPFS: ", error);
//       console.log(error);
//     }
//     form.reset();
//   }
// };
