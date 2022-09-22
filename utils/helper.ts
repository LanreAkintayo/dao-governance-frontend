import { BigNumber } from "ethers";
import { ethers }  from "ethers";

export const toWei =  (value: number):string => {
  return ethers.utils.parseEther(value.toString()).toString()
};

export const fromWei = (amount: BigNumber): string => {
  return ethers.utils.formatEther(amount)
};


export const now =  () => {
  return new Date().getTime();
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


