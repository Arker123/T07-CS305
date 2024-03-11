// import {spawn} from 'child_process'
const {spawnSync} = require('child_process');

const getTranscript = async (req, res) => {
  try {
    const {url} = req.body;

    if (!url) {
      return res.status(400).json({message: 'URL is required'});
    }

    const pythonProcess = spawnSync('python', [
      '../condense/transcript.py',
      '--url',
      url,
      '-t',
    ]);

    const dataToSend = await pythonProcess.stdout.toString();
    if (dataToSend) {
      res.status(200).json({
        transcript: dataToSend,
        message: 'Transcript generated successfully',
      });
    } else {
      res.status(400).send({message: 'Error in getting transcript'});
    }
  } catch (error) {
    res.status(400).send({message: error.message});
  }
};

module.exports = {getTranscript};
