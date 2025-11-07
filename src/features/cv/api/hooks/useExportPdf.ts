import { useMutation } from '@apollo/client/react';
import { ExportPdfInput } from 'cv-graphql';

import { EXPORT_PDF } from '../graphql/pdf.graphql';

type ExportPdfArgs = {
  pdf: ExportPdfInput;
};

type ExportPdfResult = {
  exportPdf: string;
};

export function useExportPdf() {
  return useMutation<ExportPdfResult, ExportPdfArgs>(EXPORT_PDF);
}
