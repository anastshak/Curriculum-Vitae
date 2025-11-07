export default function downloadPdf(name: string, base64: string) {
  const src = `data:application/pdf;base64,${base64}`;
  const link = document.createElement('a');

  link.href = src;
  link.download = name + '.pdf';
  link.click();
}
