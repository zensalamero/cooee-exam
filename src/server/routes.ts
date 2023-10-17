import { Router, Request, Response } from 'express';
import { makes, models, badges } from './db/data';
import { dirname } from 'path';
import { writeFile, readFileSync, access, constants } from 'fs';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get Makes
router.get('/get_makes', (req: Request, res: Response) => {
  const data = { data: makes };
  res.json(data);
});

// Get Models
router.get('/get_models/:make_id', (req: Request, res: Response) => {
  const id = parseInt(req.params.make_id);
  const result = models.filter((entry) => entry.make_id === id);
  if (result) {
    res.json({ data: result });
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

// Get Badges
router.get('/get_badges/:model_id', (req: Request, res: Response) => {
  const id = parseInt(req.params.model_id);
  const result = badges.filter((entry) => entry.model_id === id);
  if (result) {
    res.json({ data: result });
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

router.post('/upload_file', (req, res) => {
  const { file, file_name, badge_id } = req.body;

  const badge = badges.find((entry) => entry.id === parseInt(badge_id));

  if (!file || !file_name) {
    return res.status(400).json({ message: 'No file provided' });
  }

  let filePath = `${__dirname}/uploads/${badge?.name}-log.txt`;
  filePath = filePath.replace(/\\/g, '/');

  // Write the file to the server
  writeFile(filePath, file, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    res.send({ message: 'Log successfully uploaded' });
  });
});

router.get('/file_check/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const badge = badges.find((entry) => entry.id === id);

  let filePath = `${__dirname}/uploads/${badge?.name}-log.txt`;
  filePath = filePath.replace(/\\/g, '/');

  const fileContent = readFileSync(filePath, 'utf8');

  access(filePath, constants.F_OK, (err) => {
    if (err) {
      res.json({ message: 'File does not exist.' });
    } else {
      res.json({
        fileName: `${badge?.name}-log.txt`,
        fileContent: fileContent,
      });
    }
  });
});

router.get('/get_log/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const badge = badges.find((entry) => entry.id === id);
  const model = models.find((entry) => entry.id === badge?.model_id);
  const make = makes.find((entry) => entry.id === model?.make_id);

  let filePath = `${__dirname}/uploads/${badge?.name}-log.txt`;
  filePath = filePath.replace(/\\/g, '/');

  const fileContent = readFileSync(filePath, 'utf8');

  if (fileContent && model && badge && make) {
    res.json({
      make: make?.name,
      model: model?.name,
      badge: badge?.name,
      content: fileContent,
    });
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

export default router;
