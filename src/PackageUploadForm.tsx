import React, { useState } from 'react';
import JSZip from 'jszip';

interface Props {
  onSubmit: (formData: FormData, token: string) => void;
}

function PackageUploadForm(props: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [showTokenPrompt, setShowTokenPrompt] = useState(true); // Add state variable

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    if (showTokenPrompt && !token) {
      setMessage('Please enter a token.');
      return;
    }

    if (file) {
      const formData = new FormData();

      // Unpack the zip file
      const zip = new JSZip();
      const content = await zip.loadAsync(file);

      // Check if package.json file exists
      let hasPackageJson = false;
      const zipFileName = file.name.split('.')[0];
      Object.keys(content.files).forEach((fileName) => {
        if (fileName.toLowerCase() === 'package.json' || fileName.toLowerCase() === `${zipFileName}/package.json`) {
          hasPackageJson = true;
        }
      });

      // If package.json file is not present, throw an error
      if (!hasPackageJson) {
        throw new Error('No package.json file found in the uploaded package.');
      }

      // Get the contents of required files from the zip
      const requiredFilesData: Record<string, string> = {};
      const requiredFiles = [`${zipFileName}/package.json`, `${zipFileName}/readme.md`, `${zipFileName}/license`];
      for (const fileName of Object.keys(content.files)) {
        if (requiredFiles.includes(fileName.toLowerCase())) {
            const fileData = await content.file(fileName)?.async('string');
            if (fileData) {
                requiredFilesData[fileName] = fileData;
            }
        }
      }
      
      // Extract the name and version from package.json data
      const packageJsonData = JSON.parse(requiredFilesData[`${zipFileName}/package.json`]);
      if (!packageJsonData.homepage || typeof packageJsonData.homepage !== 'string' || packageJsonData.homepage.trim() === '') {
        throw new Error('No homepage URL found in the package.json file.');
      }
      const packageName = packageJsonData.name;
      const packageVersion = packageJsonData.version;

      // Exclude .git directory files and add the rest to the zip
      for (const fileName of Object.keys(content.files)) {
        const isExcluded = [
        '.git',
        'CVS',
        '.svn',
        '.hg',
        '.lock-wscript',
        '.wafpickle-N',
        '.*.swp',
        '.DS_Store',
        '._*',
        'npm-debug.log',
        '.npmrc',
        'node_modules',
        'config.gypi',
        '*.orig',
        'package-lock.json'
        ].some((excluded) => fileName.toLowerCase().startsWith(`${zipFileName}/${excluded.toLowerCase()}`));

        if (!isExcluded) {
        const fileData = await content.file(fileName)?.async('uint8array');
            if (fileData) {
                zip.file(fileName, fileData);
            }
        }
      }

      // Encode the package contents as Base64-encoded text
      const packageContents = await zip.generateAsync({ type: 'base64' });

      console.log(packageContents);
      console.log(packageName);
      console.log(packageVersion);

      // Add the package contents to the form data
      formData.append('packageContents', packageContents);

      try {
        const response = await fetch('http://localhost:8080/authenticate', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Authorization': `${token}`
            },
            mode: 'cors',
            body: JSON.stringify({
            Content: packageContents,
            JSProgram: "if (process.argv.length === 7) {\nconsole.log('Success')\nprocess.exit(0)\n} else {\nconsole.log('Failed')\nprocess.exit(1)\n}\n"
            })
        });
        const data = await response.json();
        console.log(data);
        setMessage('Package received!');
        props.onSubmit(data.result, token);
        setShowTokenPrompt(false);
        setTimeout(() => setMessage(''), 4000); // clear message after 2 seconds
        } catch (error) {
        console.error(error);
        setMessage('Failed to receive Package.');
        setTimeout(() => setMessage(''), 4000); // clear message after 2 seconds
        }
    }
  };

  function handleTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] || null);
    setToken('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {showTokenPrompt && file && ( // Only show token prompt if showTokenPrompt is true
        <div>
          <label htmlFor="token">Token:</label>
          <input type="text" id="token" name="token" value={token} onChange={handleTokenChange} required />
        </div>
      )}
      <p id="fileInputDescription">Please select Packages to Upload</p>
      <label htmlFor="fileInput" aria-label="Select zip file">Select zip file:</label>
      <br />
      <input type="file" id="fileInput" onChange={handleFileChange} className="file-input" accept=".zip" aria-describedby="fileInputDescription" aria-required="true" required />
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default PackageUploadForm;
