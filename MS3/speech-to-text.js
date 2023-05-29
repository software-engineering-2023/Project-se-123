const fs = require('fs');
const { SpeechClient } = require('@google-cloud/speech');

// Creates a client
const speechClient = new SpeechClient({
  keyFilename: 'path/to/your/keyfile.json',
});

// Configuration for speech recognition
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 44100,
  languageCode: 'en-US',
};

// Create a streaming speech recognition request
const request = {
  config,
  interimResults: false, // Set to true to get interim results
};

// Stream the audio file to the Google Cloud Speech API
const recognizeStream = speechClient
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    const transcription = data.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log('Transcription:', transcription);
  });

// Read the audio file and start streaming it to the Speech API
const audioFile = 'path/to/your/audio.wav';
const audioStream = fs.createReadStream(audioFile);
audioStream.pipe(recognizeStream);

audioStream.on('end', () => {
  console.log('Audio streaming complete.');
});
