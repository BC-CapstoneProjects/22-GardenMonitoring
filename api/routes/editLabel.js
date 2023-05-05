import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const router = express.Router();

router.delete('/plant/:plantId/:label?', async (req, res) => {
    const { plantId, label } = req.params;

    try {
        const filePath = path.join(process.cwd(), 'public', 'scans', `Plant_${plantId}.json`);
        const data = await readFile(filePath, 'utf8');
        const parsedData = JSON.parse(data);

        // Check for non-empty parse of the file
        if (parsedData.length > 0) {
            // and check if the client sent a new replacement label 
            if (label) {
                // label was provided, therefore we can replace the first 'disease' entry in the data file
                parsedData[0].disease = label;
            }

            // write updated data back to file
            await writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf8');
            res.status(200).json(parsedData);
        }
        else {
            res.status(400).json( { error: `No data entries found for the specified plant id: ${plantId}`, request: plantId } )
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json( { error: 'Internal server error.' } )
    }
});

export { router as editLabel };