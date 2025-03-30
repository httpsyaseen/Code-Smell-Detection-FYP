import React, { useEffect } from "react";
import JSZip from "jszip";
import { Button } from "./ui/button";

interface TestProps {
  zipFile: File | null;
  report: {
    path: string;
    startLine: number;
    endLine: number;
    smellType: string;
  }[];
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

interface ExtractedFile {
  fileName: string;
  filePath: string;
  content: string;
}

export default function Test({ report, zipFile, setSection }: TestProps) {
  const extractedFiles: ExtractedFile[] = [];

  async function extractedFile(file: File | null) {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    console.log(zipContent);

    for (const { path: filePath } of report) {
      const normalizedPath = filePath;
      console.log(normalizedPath);
      const matchedFile = Object.keys(zipContent.files).find((zipPath) =>
        zipPath.endsWith(normalizedPath)
      );

      if (!matchedFile) {
        console.warn(`File not found in ZIP: ${normalizedPath}`);
        return null;
      }

      // Get the file from ZIP
      const file = zipContent.file(matchedFile);
      if (file) {
        const content = await file.async("text"); // Read as text
        console.log(`Extracted: ${matchedFile}`, content);
      }
      console.log(file);
      if (file) {
        const content = await file.async("text");
        extractedFiles.push({
          fileName: normalizedPath.split("/").pop() || "unknown",
          filePath: normalizedPath,
          content,
        });
      }
    }
  }

  console.log(extractedFiles);

  useEffect(() => {
    extractedFile(zipFile);
  }, []);
  return (
    <>
      <Button
        onClick={() => setSection("report")}
        className="my-4 flex gap-1 hover:pointer"
        variant="outline"
      >
        Back
      </Button>
      <div>
        {extractedFiles.map((file) => (
          <div key={file.filePath}>
            <h1>{file.fileName}</h1>
            <pre>{file.content}</pre>
          </div>
        ))}
      </div>
    </>
  );
}
