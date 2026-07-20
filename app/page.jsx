import { readFileSync } from "node:fs";
import path from "node:path";
import SleepOSRuntime from "./sleep-os-runtime";

const source = readFileSync(path.join(process.cwd(), "index.html"), "utf8");
const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

if (!bodyMatch) {
  throw new Error("Unable to find the SleepOS page markup in index.html");
}

const pageMarkup = bodyMatch[1].replace(
  /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  "",
);

export default function HomePage() {
  return (
    <>
      <SleepOSRuntime />
      <div
        className="sleep-os-page"
        dangerouslySetInnerHTML={{ __html: pageMarkup }}
      />
    </>
  );
}
