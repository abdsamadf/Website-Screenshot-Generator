// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/SupabaseClient";
import { v4 as uuidv4 } from 'uuid';

type Data = {
  // name: string;
//   createdAt: Date;
//   url: string;
  // userId: string;
  // path: string;
  imagesData: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log("req.query", req.query);
  // console.log("req.body", req.body);
  // console.log("req.headers", req.headers);
  // console.log("req.uid", req.uid);

  const userId = req.body.userId;

  // console.log("req.bod")
  console.log("userId dashboard", userId);

  // getUrl()
  //   .then(() => {
  //     console.log("Get url");
  //   }).catch((err) => {
  //     console.log("Error occured!");
  //     console.dir(err);
  //   }
  // );


  // async function getUrl() {
  //   console.log("getUrl");

  //   // get Public url from supabase storage
  //   const { data, error } = await supabase.storage
  //     .from("screenshot-bucket")
  //     .getPublicUrl(`public/${userId}`);

  //   console.log("getURL data", data);
  // }



  async function getAllImages() {
    const { data, error } = await supabase.storage
        .from("screenshot-bucket")
        .list(`public/${userId}`);

    // console.log("getAllImages data", data);

    return data;
  }

  const imagesData = await getAllImages();

  res.status(200).json({ imagesData: imagesData });

//   res.redirect("/dashboard");
}
