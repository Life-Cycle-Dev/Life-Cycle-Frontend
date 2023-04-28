export function formatDate(date: Date, prefix: string = "-") {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (prefix === "-") return `${year}-${month}-${day}`;
  else if (prefix === "/") return `${month}/${day}/${year}`;
}

export function getThaiDate(date: Date) {
  const thaiDate = new Date(date.valueOf() + 7 * 60 * 60 * 1000);
  return thaiDate;
}

export function getDateString(date: Date) {
  const monthList = [
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
  const month = monthList[date.getMonth()];
  const day = String(date.getDate());
  return `${day}${month}`;
}

export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
