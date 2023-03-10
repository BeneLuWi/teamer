#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
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
const bar = new cliProgress.SingleBar({
    format: `TEAmer ${colors.green("{bar}")} {percentage}% | ETA: {eta_formatted}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
});
bar.start(timeInSecs, 0, {
    speed: "N/A",
});
let running = true;
while (running) {
    await delay(1000);
    bar.increment();
    running = bar.getProgress() < 1;
}
// stop the bar
bar.stop();
notifier.notify({
    title: "Tee ist fertig",
    message: `Ziehzeit war ${argv.time} min`,
    wait: false,
    timeout: false,
});
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
