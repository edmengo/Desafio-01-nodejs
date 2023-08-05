import { parse } from 'csv-parse'
import fs from 'node:fs'

const csvPath = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvPath).on('error', () => {
  console.log("Path not found!")
});

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2 
});

async function run() {
  const linesParse = stream.pipe(csvParse)
    .on('end', () => {
      console.log('File imported successfully!')
    })
  for await (const line of linesParse) {
    const [title, description] = line;
    
    console.log(line)

    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

    await wait(2000)
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

run()