export async function readPdfFile(file: File): Promise<ArrayBuffer> {
  if (!file) {
    throw new Error("Please upload a PDF file.");
  }

  const isPdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    throw new Error("Please upload a valid PDF file.");
  }

  if (file.size === 0) {
    throw new Error("Uploaded PDF file is empty.");
  }

  const arrayBuffer = await file.arrayBuffer();

  if (!arrayBuffer || arrayBuffer.byteLength < 10) {
    throw new Error("PDF file could not be read properly.");
  }

  const header = new TextDecoder()
    .decode(arrayBuffer.slice(0, 8))
    .trim();

  if (!header.startsWith("%PDF-")) {
    throw new Error("Invalid PDF file. The file does not start with a valid PDF header.");
  }

  return arrayBuffer;
}
