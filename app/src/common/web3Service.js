// LIBRARIES
import axios from 'axios';

const endpoint = `${API_ENDPOINT}web3/`;

// Retrieve Transaction Data from Blockchain after hitting node backend
const retrieveTransactionData = function(transArray){
  console.log('asdasd',transArray);
  transArray = transArray.map((item) =>{
    return {"hash" : item.hash.trim(), "timestamp" : item.timestamp};
  });
  console.log('TAA',transArray);
  return new Promise((resolve, reject) =>{
      return axios.post(`${endpoint}retrieve-transaction-data`, { transArray })
      .then((data) => {
          console.log('THE TRANS DATA:', data);
          resolve(data.data);
      })
      .catch((error)=>{
          console.log('trans error', error);
          reject(error);
      });
  });
}

// Read Balance of account off blockchain after hitting node backend
const readBalance = function(publicEthKey){
  //console.log('PEK',publicEthKey, publicEthKey.trim().length);
  return new Promise((resolve, reject) =>{
      return axios.post(`${endpoint}read-balance`, { publicEthKey: publicEthKey.trim() })
      .then((data) => {
          console.log('Balance from account', data);
          resolve(data.data);
      })
      .catch((error)=>{
          console.log('balance error', error);
          reject(error);
      });
  });
}

export { retrieveTransactionData, readBalance }