import express from 'express';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../public/libs/s3Client.js";

// Downloads a compressed Archive file from S3

const router = express.Router();

router.get("/:bucketName/:zipFileName", async (req, res) => {
    const { bucketName, zipFileName } = req.params;

    // command to get object from s3
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: zipFileName,
    });

    try {
        // create and send back the presigned url in the response
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600}); // url expires in 1 hour
        res.redirect(url);
    }
    catch (error) {
        console.error('Error generating pre-signed URL', error);
        res.status(500).json({ error: error.message });
    }
});

export { router as getArchive };