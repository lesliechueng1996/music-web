import * as qiniu from 'qiniu';

const accessKey = process.env.QINIU_ACCESS_KEY ?? '';
const secretKey = process.env.QINIU_SECRET_KEY ?? '';

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const bucketManager = new qiniu.rs.BucketManager(mac, new qiniu.conf.Config());

export const createUploadToken = (bucket: string, key?: string, expireSeconds: number = 3600) => {
  const scope = key ? `${bucket}:${key}` : bucket;
  const options = {
    scope,
    expires: expireSeconds,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
};

export const deleteFile = async (bucket: string, key: string) => {
  return new Promise<void>((resolve, reject) => {
    bucketManager.delete(bucket, key, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
