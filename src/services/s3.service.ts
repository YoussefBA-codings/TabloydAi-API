const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME, AWS_BUCKET_REGION  } = process.env;
import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import * as AWS from "aws-sdk";
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  
  private accessKeyId;
  private secretAccessKey;
  private bucketName;
  private region;
  private s3; 

  constructor() {
    this.accessKeyId = process.env.AWS_ACCESS_KEY
    this.secretAccessKey = process.env.AWS_SECRET_KEY
    this.bucketName = process.env.AWS_BUCKET_NAME
    this.region = process.env.AWS_BUCKET_REGION

    this.s3 = new AWS.S3({
      region: this.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey
    })
  }

  public uploadFile(path, file) {
    const fileStream = Readable.from(file.buffer)
    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileStream,
      Key: path
    }
    return this.s3.upload(uploadParams).promise()
  }

  public getUserFileNames(username): Promise<string[]> {
    return new Promise(
      (resolve, reject) => {
        let bucket = this.s3.listObjectsV2({
          Bucket: this.bucketName,
          MaxKeys: 20,
          Delimiter: '/',
          Prefix: `${username}/`
        }, (err, data) => {
          if (err) {
            reject(err)
          }
          
          const fileNames = data.Contents.map(a => a.Key);
          resolve(fileNames)
        })
      }
    )
    
    
  }

  public async getFile(fileKey) {
    const downloadParams = {
      Key: fileKey,
      Bucket: this.bucketName
    }

    const readStream = await this.s3.getObject(downloadParams).createReadStream();
    // readStream.pipe();
    return readStream;
  }

  public deleteFile(fileKey) {
    const params = {
      Key: fileKey,
      Bucket: this.bucketName
    }

    return this.s3.deleteObject(params).promise()
  }

  
}
