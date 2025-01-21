import { formatDistanceToNow, format } from "date-fns";

export class GlobalUtility {
  getKeyByValue = (enumObj: any, value: string) => {
    return Object.keys(enumObj).find((key) => enumObj[key] === value);
  };

  formatFloat = (float: number) => {
    if (float % 1 !== 0 && float.toString().split(".")[1].length > 2)
      return parseFloat(float.toFixed(2));
    return float;
  };

  formatNumber = (number: number) => {
    if (number >= 1000000000) return (number / 1000000000).toFixed(1) + "B";
    else if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
    else if (number >= 1000) return (number / 1000).toFixed(1) + "K";
    else return number.toLocaleString();
  };

  formatNumberWithComma = (number: number) => {
    return number.toLocaleString();
  };

  formatLocaleDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  formatDateDistance = (date: any) => {
    const now: any = new Date();
    const updatedAtDate: any = new Date(date);
    const diffInMs = now - updatedAtDate;
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

    if (diffInMs < oneWeekInMs) {
      return formatDistanceToNow(updatedAtDate, { addSuffix: true });
    }

    return format(updatedAtDate, "do MMMM yyyy");
  };
}

export default GlobalUtility;
export const globalUtility = new GlobalUtility();
