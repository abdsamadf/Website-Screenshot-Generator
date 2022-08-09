// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../src/utils/SupabaseClient";
import { v4 as uuidv4 } from 'uuid';

type Data = {
  imagesData: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const userId = req.body.userId;

  // console.log("req.bod")
  console.log("userId dashboard", userId);

  async function getAllImages() {
    const { data, error } = await supabase.storage
        .from("screenshot-bucket")
        .list(`public/${userId}`);


    return data;
  }

  const imagesData = await getAllImages();

  res.status(200).json({ imagesData: imagesData });

}
