import { BigNumber } from "ethers";
import { ethers }  from "ethers";
import moment from "moment";

export const getContract = async (contractAddress:string, abi, provider) => {
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    provider
  );
  return contract
}
export const toWei =  (value: number | string):string => {
  return ethers.utils.parseEther(value.toString()).toString()
};

export const allValid = (data:{[key:string]: any}) => {
  if (Object.keys(data).length == 0){
    return false;
  }
  if ([null, undefined, {}].includes(data)) {
    return false;
  }

  return Object.values(data).every((item) => {
    if ([null, undefined, {}].includes(item)) {
      return false;
    } else {
      return true;
    }
  });
};

export const fromWei = (amount: BigNumber | number | string): string => {
  return ethers.utils.formatEther(amount.toString())
};

export const formatTime = (value: number): string => {
  return moment(value).format("MMMM Do YYYY, h:mm:ss a");
};

export const inDollarFormat = (value:number) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  return dollarUSLocale.format(value)
   
}
export const now =  () => {
  return new Date().getTime();
}

export const toDp = (value:number, dec:number) => {
  return value.toFixed(dec)
}

export const toSeconds = (time:number):number => {
  return Math.floor(time / 1000)
}

export const toMilliseconds = (time:number):number => {
  return Math.floor(time * 1000)
}

export const percent = (percentage:number, amount:string) => {
  return (percentage * Number(amount)) / 100;
};

export const sDuration = {
  seconds: function (val: number) {
    return val;
  },
  minutes: function (val: number) {
    return val * this.seconds(60);
  },
  hours: function (val: number) {
    return val * this.minutes(60);
  },
  days: function (val: number) {
    return val * this.hours(24);
  },
  weeks: function (val: number) {
    return val * this.days(7);
  },
  years: function (val: number) {
    return val * this.days(365);
  },
};


export const  range = (start?:number, stop?:number, step?:number) => {
  if (typeof stop == 'undefined') {
      // one param defined
      stop = start;
      start = 0;
  }

  if (typeof step == 'undefined') {
      step = 1;
  }

  if ((step > 0 && start! >= stop!) || (step < 0 && start! <= stop!)) {
      return [];
  }

  var result = [];
  for (var i = start!; step > 0 ? i < stop! : i > stop!; i += step) {
      result.push(i);
  }

  return result;
};

