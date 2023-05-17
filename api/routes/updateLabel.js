import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const router = express.Router();

router.put('/plant/:plantId/:index/:label', async (req, res) => {
  const { plantId, index, label } = req.params;

  try {
    const filePath = path.join(process.cwd(), 'public', 'scans', `Plant_${plantId}.json`);
    const data = await readFile(filePath, 'utf8');
    const parsedData = JSON.parse(data);

    if (parsedData.length > 0) {
      const idx = parseInt(index, 10);
      if (isNaN(idx) || idx < 0 || idx >= parsedData.length) {
        return res.status(400).json({ error: `Invalid index provided: ${index}`, request: index });
      }

      parsedData[idx].disease = label;

      await writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf8');
      res.status(200).json(parsedData);
    } else {
      res.status(400).json({ error: `No data entries found for the specified plant id: ${plantId}`, request: plantId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export { router as updateLabel };
