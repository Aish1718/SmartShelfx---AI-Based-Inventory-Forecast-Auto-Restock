// // CSV Export
// export const exportToCSV = (data, filename = "export.csv") => {
//   if (!data) return;

//   const rows = Array.isArray(data) ? data : [data];

//   const csvContent = [
//     Object.keys(rows[0]).join(","),
//     ...rows.map((row) =>
//       Object.values(row)
//         .map((v) => `"${v}"`)
//         .join(",")
//     ),
//   ].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const url = window.URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
// };

// // PDF Export using html2canvas + jsPDF
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// export const exportToPDF = async (data, filename = "report.pdf") => {
//   const element = document.createElement("div");
//   element.style.padding = "20px";
//   element.style.background = "white";
//   element.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   document.body.appendChild(element);

//   const canvas = await html2canvas(element);
//   const imgData = canvas.toDataURL("image/png");

//   const pdf = new jsPDF("p", "mm", "a4");
//   pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
//   pdf.save(filename);

//   document.body.removeChild(element);
// };




// frontend/src/utils/exportUtils.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export analytics data to CSV
 */
export const exportToCSV = (data, filename = 'analytics-report.csv') => {
  try {
    const { stats, topProducts, monthlyStock, trend } = data;

    // Create CSV content
    let csvContent = 'SmartShelfX Analytics Report\n\n';
    csvContent += `Generated on: ${new Date().toLocaleString()}\n\n`;

    // Dashboard Stats
    csvContent += 'DASHBOARD STATISTICS\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Products,${stats.totalProducts}\n`;
    csvContent += `Total Value,$${stats.totalValue?.toLocaleString() || 0}\n`;
    csvContent += `Low Stock Items,${stats.lowStockCount}\n`;
    csvContent += `Active Orders,${stats.pendingOrders}\n\n`;

    // Top Products
    if (topProducts && topProducts.labels) {
      csvContent += 'TOP PRODUCTS\n';
      csvContent += 'Product,Movement\n';
      topProducts.labels.forEach((label, index) => {
        const value = topProducts.datasets[0]?.data[index] || 0;
        csvContent += `${label},${value}\n`;
      });
      csvContent += '\n';
    }

    // Monthly Stock Movement
    if (monthlyStock && monthlyStock.labels) {
      csvContent += 'MONTHLY STOCK MOVEMENT\n';
      csvContent += 'Month,Stock In,Stock Out\n';
      monthlyStock.labels.forEach((label, index) => {
        const stockIn = monthlyStock.stockIn[index] || 0;
        const stockOut = monthlyStock.stockOut[index] || 0;
        csvContent += `${label},${stockIn},${stockOut}\n`;
      });
      csvContent += '\n';
    }

    // Inventory Trend
    if (trend && trend.datasets) {
      csvContent += 'INVENTORY TREND\n';
      csvContent += 'Period,Value\n';
      const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      labels.forEach((label, index) => {
        const value = trend.datasets[0]?.data[index] || 0;
        csvContent += `${label},$${value.toFixed(2)}\n`;
      });
    }

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ CSV exported successfully');
    return true;
  } catch (error) {
    console.error('❌ CSV export failed:', error);
    throw error;
  }
};

/**
 * Export analytics data to PDF
 */
export const exportToPDF = async (data, filename = 'analytics-report.pdf') => {
  try {
    const { stats, topProducts, monthlyStock, trend } = data;

    // Create PDF document
    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text('SmartShelfX Analytics Report', 20, yPosition);

    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, yPosition);

    yPosition += 15;

    // Dashboard Statistics
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Dashboard Statistics', 20, yPosition);
    yPosition += 8;

    doc.autoTable({
      startY: yPosition,
      head: [['Metric', 'Value']],
      body: [
        ['Total Products', stats.totalProducts.toString()],
        ['Total Value', `$${stats.totalValue?.toLocaleString() || 0}`],
        ['Low Stock Items', stats.lowStockCount.toString()],
        ['Active Orders', stats.pendingOrders.toString()],
      ],
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20 },
    });

    yPosition = doc.lastAutoTable.finalY + 15;

    // Top Products
    if (topProducts && topProducts.labels && topProducts.labels.length > 0) {
      doc.setFontSize(14);
      doc.text('Top Products', 20, yPosition);
      yPosition += 8;

      const topProductsData = topProducts.labels.map((label, index) => [
        label,
        (topProducts.datasets[0]?.data[index] || 0).toString(),
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Product', 'Movement']],
        body: topProductsData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20 },
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    }

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Monthly Stock Movement
    if (monthlyStock && monthlyStock.labels && monthlyStock.labels.length > 0) {
      doc.setFontSize(14);
      doc.text('Monthly Stock Movement', 20, yPosition);
      yPosition += 8;

      const monthlyData = monthlyStock.labels.map((label, index) => [
        label,
        (monthlyStock.stockIn[index] || 0).toString(),
        (monthlyStock.stockOut[index] || 0).toString(),
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Month', 'Stock In', 'Stock Out']],
        body: monthlyData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20 },
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    }

    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Inventory Trend
    if (trend && trend.datasets && trend.datasets[0]) {
      doc.setFontSize(14);
      doc.text('Inventory Trend', 20, yPosition);
      yPosition += 8;

      const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      const trendData = labels.map((label, index) => [
        label,
        `$${(trend.datasets[0].data[index] || 0).toFixed(2)}`,
      ]);

      doc.autoTable({
        startY: yPosition,
        head: [['Period', 'Inventory Value']],
        body: trendData,
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 20 },
      });
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    doc.save(filename);

    console.log('✅ PDF exported successfully');
    return true;
  } catch (error) {
    console.error('❌ PDF export failed:', error);
    throw error;
  }
};

/**
 * Export data to Excel (XLSX)
 */
export const exportToExcel = async (data, filename = 'analytics-report.xlsx') => {
  try {
    // This requires xlsx library: npm install xlsx
    const XLSX = await import('xlsx');

    const { stats, topProducts, monthlyStock, trend } = data;

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Dashboard Stats Sheet
    const statsData = [
      ['SmartShelfX Analytics Report'],
      [`Generated: ${new Date().toLocaleString()}`],
      [],
      ['Dashboard Statistics'],
      ['Metric', 'Value'],
      ['Total Products', stats.totalProducts],
      ['Total Value', `$${stats.totalValue?.toLocaleString() || 0}`],
      ['Low Stock Items', stats.lowStockCount],
      ['Active Orders', stats.pendingOrders],
    ];
    const statsSheet = XLSX.utils.aoa_to_sheet(statsData);
    XLSX.utils.book_append_sheet(wb, statsSheet, 'Dashboard');

    // Top Products Sheet
    if (topProducts && topProducts.labels) {
      const topProductsData = [
        ['Top Products'],
        ['Product', 'Movement'],
        ...topProducts.labels.map((label, index) => [
          label,
          topProducts.datasets[0]?.data[index] || 0,
        ]),
      ];
      const topSheet = XLSX.utils.aoa_to_sheet(topProductsData);
      XLSX.utils.book_append_sheet(wb, topSheet, 'Top Products');
    }

    // Monthly Stock Sheet
    if (monthlyStock && monthlyStock.labels) {
      const monthlyData = [
        ['Monthly Stock Movement'],
        ['Month', 'Stock In', 'Stock Out'],
        ...monthlyStock.labels.map((label, index) => [
          label,
          monthlyStock.stockIn[index] || 0,
          monthlyStock.stockOut[index] || 0,
        ]),
      ];
      const monthlySheet = XLSX.utils.aoa_to_sheet(monthlyData);
      XLSX.utils.book_append_sheet(wb, monthlySheet, 'Monthly Stock');
    }

    // Write file
    XLSX.writeFile(wb, filename);

    console.log('✅ Excel exported successfully');
    return true;
  } catch (error) {
    console.error('❌ Excel export failed:', error);
    throw error;
  }
};