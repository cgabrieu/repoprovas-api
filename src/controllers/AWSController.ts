import '../setup';
import AWS from 'aws-sdk';
import { Request, Response } from 'express';
import httpStatus from '../enums/httpStatus';

AWS.config.update({
  accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
});

const S3_BUCKET = process.env.YOUR_BUCKET_NAME;
const REGION = process.env.YOUR_REGION;
const URL_EXPIRATION_TIME = 120;

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export function getPreSignedPutUrl(req: Request, res: Response) {
  const { fileName, fileType } = req.body;

  myBucket.getSignedUrl(
    'putObject',
    {
      Key: fileName,
      ContentType: fileType,
      Expires: URL_EXPIRATION_TIME,
    },
    (err, url) => {
      res.status(httpStatus.OK).send(url);
    }
  );
}
