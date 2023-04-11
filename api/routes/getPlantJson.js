import express from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const router = express.Router();

router.get('/plant/:plantId', async (req, res, next) => {
  const plantId = req.params.plantId;

  try {
    const filePath = path.join(process.cwd(), 'public', 'scans', `Plant_${plantId}.json`);
    const data = await readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(`Error reading Plant_${plantId}.json:`, error);
    res.status(500).send('Error reading plant data');
  }
});

export { router as getPlantJson };
