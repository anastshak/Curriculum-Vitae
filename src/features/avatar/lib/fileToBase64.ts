type Result = {
  base64: string;
  type: string;
  size: number;
};

export const fileToBase64 = (file: File): Promise<Result> => {
  const { type, size } = file;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      if (typeof base64 === 'string') {
        resolve({
          base64: base64,
          type,
          size,
        });
      }
      reject('base64 string error');
    };

    reader.readAsDataURL(file);
    reader.onerror = reject;
  });
};
