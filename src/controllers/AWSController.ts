import AWS from 'aws-sdk';

console.log(process.env.YOUR_REGION);

AWS.config.update({
  accessKeyId: process.env.YOUR_ACCESS_KEY_ID,
  secretAccessKey: process.env.YOUR_SECRET_ACCESS_KEY,
})

const S3_BUCKET = process.env.YOUR_BUCKET_NAME;
const REGION = process.env.YOUR_REGION;
const URL_EXPIRATION_TIME = 120;

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

export function generatePreSignedPutUrl(fileName , fileType) {
  myBucket.getSignedUrl('putObject', {
      Key: fileName,
      ContentType: fileType,
      Expires: URL_EXPIRATION_TIME
  } , (err , url) => 
       url // API Response Here
  );
}