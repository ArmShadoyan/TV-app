const { exec } = require("child_process");
const fs = require("fs")

exec("rm -rf ./lib", () => {
    console.log("Deleted");
})

exec("npx babel js --out-dir lib", (output) => {
    console.log("SUCCESS");
});