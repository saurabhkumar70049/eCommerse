import multer from 'multer';
import multerS3 from 'multer-s3';
import {S3Client} from '@aws-sdk/client-s3';
import 'dotenv/config';
import {v4 as uuid} from 'uuid';


const s3 = new S3Client();

const s3Storage = multerS3({
    s3:s3,
    bucket:process.env.AWS_BUCKET_NAME,
    acl:'public-read',
    metadata: (req, file, cb)=>{
        cb(null, {fieldname: file.fieldname});
    },
    key: (req, file, cb)=>{
        cb(null, `${uuid()}-${file.originalname}`);
    }
});


const fileFilter = (req, file, cb)=>{
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true);
    }
    else {
        cb("Error: File type not allowed!");
    }
}


const uploadImage = multer({
    storage: s3Storage,
    fileFilter,
    limits : {
        fieldSize: 1024*1024*5,
        files: 5
    }
})

export default uploadImage;