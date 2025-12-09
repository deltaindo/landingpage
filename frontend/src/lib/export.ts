import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportOptions {
  filename: string;
  columns: Array<{
    key: string;
    label: string;
  }>;
}

/**
 * Export data to CSV format
 */
export const exportToCSV = (data: any[], options: ExportOptions) => {
  const { filename, columns } = options;

  // Create CSV headers
  const headers = columns.map((col) => col.label).join(',');

  // Create CSV rows
  const rows = data.map((item) =>
    columns.map((col) => {
      const value = item[col.key];
      // Handle strings with commas and quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value ?? '';
    }).join(',')
  );

  // Combine headers and rows
  const csv = [headers, ...rows].join('\n');

  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export table to PDF
 */
export const exportTableToPDF = async (tableElement: HTMLTableElement, filename: string) => {
  try {
    const canvas = await html2canvas(tableElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgWidth = 297; // A4 width in mm (landscape)
    const pageHeight = 210; // A4 height in mm
    let heightLeft = canvas.height * imgWidth / canvas.width;
    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, (heightLeft));
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgWidth;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, heightLeft);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};

/**
 * Export data to JSON
 */
export const exportToJSON = (data: any[], filename: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export multiple sheets to Excel-like format
 */
export const exportToMultiSheetCSV = (
  sheetsData: Array<{
    name: string;
    data: any[];
    columns: Array<{ key: string; label: string }>;
  }>,
  filename: string
) => {
  const sheets = sheetsData.map((sheet) => {
    const headers = sheet.columns.map((col) => col.label).join(',');
    const rows = sheet.data.map((item) =>
      sheet.columns
        .map((col) => {
          const value = item[col.key];
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? '';
        })
        .join(',')
    );

    return `${sheet.name}\n${headers}\n${rows.join('\n')}\n\n`;
  });

  const csv = sheets.join('');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
