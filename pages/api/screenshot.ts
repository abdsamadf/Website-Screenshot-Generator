// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/SupabaseClient";
import { v4 as uuidv4 } from "uuid";
// import { uuid } from 'uuidv4';
// const puppeteer = require("puppeteer");
// /* Importing the puppeteer library. */
const puppeteer = require('puppeteer-core')
// import puppeteer from "puppeteer-core";
// import * as puppeteer from 'puppeteer';
// import chromium from "chrome-aws-lambda";
// import playwright from "playwright-core";
// import puppeteer from 'puppeteer';

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
    /*     const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    }); */
/*
    const browser = await playwright.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
 */
  //   const browser = await chromium.puppeteer.launch({
  //     // executablePath: await chromium.executablePath,
  // });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const buffer = await page.screenshot();

    // save buffer screenshot to supabase storage
    const { data, error } = await supabase.storage
      .from("screenshot-bucket")
      .upload(`public/${userId}/${uniqueImageId}.jpg`, buffer);

    await page.close();
    await browser.close();
  }

  // delay for 1 second for save screenshot to supabase storage
  await new Promise((resolve) => setTimeout(resolve, 6000));

  res.redirect("/");
  // res.status(200).json({ name: "Successful" });
}
