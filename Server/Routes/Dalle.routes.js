import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
dotenv.config();

const Router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi(config);

Router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hii from dale Route" });
});

Router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ image: image });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went Gone while genarating image from Openai",
    });
  }
});

export default Router;
