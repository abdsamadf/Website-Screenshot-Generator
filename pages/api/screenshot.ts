// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/SupabaseClient";
import { v4 as uuidv4 } from "uuid";
// import { uuid } from 'uuidv4';
import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const userId = req.body.uid;
  const url = req.body.url;
  const uniqueImageId = uuidv4();

  console.log("url", url);

  takeScreenshot()
    .then(() => {
      console.log("Screenshot taken");
    })
    .catch((err) => {
      console.log("Error occured!");
      console.dir(err);
    });

  async function takeScreenshot() {
    const executablePath = await chromium.executablePath;

    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: executablePath ?? '',
      headless: chromium.headless,
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto(url, { waitUntil: "networkidle" });

    const buffer = await page.screenshot();

    // save buffer screenshot to supabase storage
    const { data, error } = await supabase.storage
      .from("screenshot-bucket")
      .upload(`public/${userId}/${uniqueImageId}.jpg`, buffer);

    await page.close();
    await browser.close();
  }

  // delay for 1 second for save screenshot to supabase storage
  await new Promise((resolve) => setTimeout(resolve, 8000));

  res.redirect("/");
  // res.status(200).json({ name: "Successful" });
}
