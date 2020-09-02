

export const changeMessagesStatus = (arr, arr2) => {
    const mArr = [...arr]
    const l1 = mArr.length;
    const l2 = arr2.length;
    for(let i = 0; i < l1; i++){
        for(let j = 0; j < l2; j++){
            if(arr2[j].clientMsgId === mArr[i].clientMsgId){
              mArr[i].messageStatus = "seen";
              mArr[i].seenAt = arr2[j].seenAt;
            }
        }
    }
    return mArr
  }
  