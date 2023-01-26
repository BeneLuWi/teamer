#!/usr/bin/env node

import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .options({
    t: {type: "number"},
  })
  .argv


await delay(1000);
console.log(argv.t);


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
