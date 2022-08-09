// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/SupabaseClient";
import { v4 as uuidv4 } from 'uuid';
// import { uuid } from 'uuidv4';
const puppeteer = require("puppeteer");
// import puppeteer from 'puppeteer';

type Data = {
  name: string;
  createdAt: Date;
  url: string;
  userId: string;
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const buffer = await page.screenshot();

    // save buffer screenshot to supabase storage
    const { data, error } = await supabase.storage
      .from("screenshot-bucket")
      .upload(`public/${userId}/${uniqueImageId}.jpg`, buffer)

    await page.close();
    await browser.close();

  }

  // delay for 1 second
  await new Promise((resolve) => setTimeout(resolve, 5000));


  res.redirect("/dashboard");
  res.status(200).json({ name: "Successful" });

}
