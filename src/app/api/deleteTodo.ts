// src/app/api/deleteTodo.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // 削除処理をここに実装
    // 成功時
    res.status(200).json({ success: true });
    // エラー時
    // res.status(500).json({ success: false });
  } else {
    // 405 Method Not Allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end();
  }
}
