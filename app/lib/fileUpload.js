const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const config = require('config');
const moment = require('moment');

aws.config.update({
    secretAccessKey: '58tLnZYxeSAd+jZpVUy0s9JSxbTK2hQ45/MXhQLN',
    accessKeyId: 'AKIAREBXG45DTSWA434H',
    region: 'us-east-1'
});

const bucketName = 'Bucket 1';

const s3 = new aws.S3({
    apiVersion: '2022-22-28',
    params: {Bucket: bucketName}
});

// const options = {partSize: 1*1024*1024, queueSize: 1};

exports.uploadImage = async (image) => {

    return new Promise((resolve, reject) => {

        console.log('Path : ', image.path);
        let fileStream = fs.createReadStream(image.path);
        
        fileStream.on('error', function (err) {
            console.log('File Error', err);
        });

        const uploadParams = {
            Bucket: 'microdemand-dev',
            Key: `${image.filename}`,
            Body: fileStream,
            ACL: 'public-read',
            ContentType: image.headers['content-type'],
            ServerSideEncryption: "AES256",
            StorageClass: "STANDARD_IA"
        }

        s3.upload(uploadParams, async function (err, data) {
            if (err) {
                console.log("Error", err);
                return reject(err);
            }
            if (data) {
                console.log("Upload Success", data);
                return resolve(data);
            }
        });

    })
  
        
}
exports.uploadpdf = async (pdf) => {

    return new Promise((resolve, reject) => {

        // console.log('Path : ', pdf);
        let fileStream = fs.createReadStream(pdf.path);
        
        fileStream.on('error', function (err) {
            // console.log('File Error', err);
        });

        const uploadParams = {
            Bucket: 'microdemand-dev',
            Key: `${pdf.filename}`,
            Body: fileStream,
            ACL: 'public-read',
            ContentType: 'application/pdf',
            ServerSideEncryption: "AES256",
            StorageClass: "STANDARD_IA"
        }

        s3.upload(uploadParams, async function (err, data) {
            if (err) {
                console.log("Error", err);
                return reject(err);
            }
            if (data) {
                // console.log("Upload Success", data);
                return resolve(data);
            }
        });

    })
//   console.log("pdf",pdf)
        
}