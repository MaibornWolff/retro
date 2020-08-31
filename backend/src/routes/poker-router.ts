import fs from "fs";
import express from "express";
import { PokerState } from "src/models/PokerState";
import { getPath, stringify } from "../utils";

const UTF8 = "utf8";
const router = express.Router();

router.post("/", (req, res) => {
  const pokerState: PokerState = req.body;

  try {
    fs.writeFile(
      getPath(pokerState.pokerId),
      stringify(pokerState),
      UTF8,
      (error) => {
        if (error)
          res.status(400).send({ message: "Poker state creation went wrong" });
        res.status(200).send();
      }
    );
  } catch (error) {
    res.status(400).send({ message: "Poker state creation went wrong" });
  }
});

export default router;
