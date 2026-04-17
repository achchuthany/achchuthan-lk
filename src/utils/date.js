const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isPresent(value) {
  return String(value).trim().toLowerCase() === "present";
}

export function formatDisplayDate(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  const normalizedValue = String(value).trim();

  if (isPresent(normalizedValue)) {
    return "Present";
  }

  if (/^\d{4}$/.test(normalizedValue)) {
    return normalizedValue;
  }

  const isoDateMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!isoDateMatch) {
    return normalizedValue;
  }

  const [, year, month, day] = isoDateMatch;
  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex > 11) {
    return normalizedValue;
  }

  return `${Number(day)} ${MONTH_NAMES[monthIndex]} ${year}`;
}

export function formatDateRange(from, to) {
  const formattedFrom = formatDisplayDate(from);
  const formattedTo = formatDisplayDate(to);

  if (!formattedFrom) {
    return formattedTo;
  }

  if (!formattedTo) {
    return formattedFrom;
  }

  return `${formattedFrom} – ${formattedTo}`;
}