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
  // path: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log("req.query", req.query);
  // console.log("req.body", req.body);
  // console.log("req.headers", req.headers);
  // console.log("req.uid", req.uid);

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

    // const buffer = await page.screenshot({
    //   path: "./screenshot.png",
    // });
    const buffer = await page.screenshot();

    // const {data, error} = await supabase.storage
    // .from("screenshot-bucket")
    // .upload('public/1.png', decode(buffer), {
    //   contentType: 'image/png'
    // });

    // save buffer screenshot to supabase storage
    const { data, error } = await supabase.storage
      .from("screenshot-bucket")
      .upload(`public/${userId}/${uniqueImageId}.jpg`, buffer)
            // .upload('public/1.jpg', buffer);


    // insert data to supabase table images
    // await supabase.from("images").insert({
    //   created_at: new Date(),
    //   href: uniqueImageId,
    //   user_id: userId,
    //   // user_email: ""
    // });



    // console.log(data);

    await page.close();
    await browser.close();

  }

  // const avatarFile = event.target.files[0]
  // const { data, error } = await supabase.storage
  // .from('avatars')
  // .upload('public/avatar1.png', avatarFile)

  res.redirect("/dashboard");
  res.status(200).json({ name: "Successful" });

}
