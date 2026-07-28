const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: () => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    time: () => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  };
};

const toInputDate = (iso: string) => {
  return new Date(iso).toISOString().slice(0, 10);
};
export { formatDate, toInputDate };
