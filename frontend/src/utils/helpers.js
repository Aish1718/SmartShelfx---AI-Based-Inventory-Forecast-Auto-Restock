// Format number (1,000 -> 1k)
export const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return num.toString();
};

// Format date YYYY-MM-DD
export const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

// Calculate percentage change
export const percentChange = (oldVal, newVal) => {
  if (oldVal === 0) return 100;
  return (((newVal - oldVal) / oldVal) * 100).toFixed(2);
};

// Group array by key
export const groupBy = (array, key) =>
  array.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
