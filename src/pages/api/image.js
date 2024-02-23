import { readdir } from "fs/promises";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req, saveLocally = false) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploadedimages");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  var imageURL;
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/uploadedimages"));
    const imagePath = await readFile(req, true);
    imageURL = imagePath?.files?.myImage[0]?.filepath.split("/public")[1];
    if (!imageURL) {
      imageURL = "/uploadedimages/" + imagePath.files.myImage[0].newFilename;
    }
    res.json({ imageURL });
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/uploadedimages"));
    const imagePath = await readFile(req, true);
    imageURL = imagePath?.files?.myImage[0]?.filepath.split("/public")[1];
    if (!imageURL) {
      imageURL = "/uploadedimages/" + imagePath.files.myImage[0].newFilename;
    }
    res.json({ imageURL });
  }
};

export default handler;
