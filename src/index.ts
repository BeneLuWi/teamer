#!/usr/bin/env node

import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";
import notifier from "node-notifier"


const argv = yargs(hideBin(process.argv))
  .options({
    t: {type: "number"},
  })
  .argv


await delay(argv.t * 1000);
notifier.notify({
  title: "Tee ist fertig",
  message: `Ziehzeit war ${argv.t} min`,
  timeout: 30,
  wait: false
})


function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
