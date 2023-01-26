#!/usr/bin/env node

import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";
import notifier from "node-notifier";
import cliProgress from "cli-progress";
import colors from "ansi-colors";

const argv = yargs(hideBin(process.argv))
  .options({
    time: {
      type: "number",
      demandOption: true,
      alias: "t",
      description: "Minutes your tea needs",
    },
  })
  .parseSync();

const timeInSecs = argv.time * 60;

// create new progress bar
const b1 = new cliProgress.SingleBar({
  format: formatter,
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  hideCursor: true,
});
b1.start(timeInSecs, 0, {
  speed: "N/A",
});

let running = true;
while (running) {
  await delay(1000);
  b1.increment();
  running = b1.getProgress() < 1;
}

// stop the bar
b1.stop();

notifier.notify({
  title: "Tee ist fertig",
  message: `Ziehzeit war min`,
  wait: false,
  timeout: false,
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatter(options: cliProgress.Options, params: cliProgress.Params, payload: any) {
  const bar = new cliProgress.Bar(options);

  return `TEAmer | ${bar} | {percentage}% | ${Math.round(params.value / 60)}/${Math.round(params.total / 60)} Minutes`
}