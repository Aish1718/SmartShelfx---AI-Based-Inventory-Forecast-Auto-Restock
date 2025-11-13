// CSV Export
export const exportToCSV = (data, filename = "export.csv") => {
  if (!data) return;

  const rows = Array.isArray(data) ? data : [data];

  const csvContent = [
    Object.keys(rows[0]).join(","),
    ...rows.map((row) =>
      Object.values(row)
        .map((v) => `"${v}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
};

// PDF Export using html2canvas + jsPDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportToPDF = async (data, filename = "report.pdf") => {
  const element = document.createElement("div");
  element.style.padding = "20px";
  element.style.background = "white";
  element.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  document.body.appendChild(element);

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
  pdf.save(filename);

  document.body.removeChild(element);
};
