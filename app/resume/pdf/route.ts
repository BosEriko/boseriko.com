import { CACHE_TTL_SECONDS } from "@/config/cache";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const maxDuration = 60;

const PDF_FILENAME = "Bos-Eriko-Reyes-Resume.pdf";

const launchBrowser = async () => {
  const localExecutablePath = process.env.CHROME_EXECUTABLE_PATH;

  if (localExecutablePath) {
    return puppeteer.launch({ executablePath: localExecutablePath, headless: true });
  }

  return puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });
};

export async function GET(request: Request) {
  const resumeUrl = new URL("/resume", request.url);
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1800 });
    await page.goto(resumeUrl.toString(), { waitUntil: "networkidle0" });
    await page.waitForSelector('[data-paginated="true"]');
    await page.emulateMediaType("print");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${PDF_FILENAME}"`,
        "Cache-Control": `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=${CACHE_TTL_SECONDS}`,
      },
    });
  } finally {
    await browser.close();
  }
}
