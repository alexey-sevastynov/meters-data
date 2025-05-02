import fs from "fs";
import path from "path";

function findAndReplace(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);

        if (stat.isDirectory()) {
            findAndReplace(filepath);
        } else if (
            file.endsWith(".jsx") ||
            file.endsWith(".tsx") ||
            file.endsWith(".js") ||
            file.endsWith(".ts")
        ) {
            let content = fs.readFileSync(filepath, "utf8");

            content = content.replace(/\.{2}\/\.{2}\/\.{2}\//g, "@/");
            content = content.replace(/@\.\.\//g, "@/");

            fs.writeFileSync(filepath, content, "utf8");
        }
    });
}

findAndReplace("./src");
