import { ApplicationConstants } from './application-constants';

export class ValidationConstants {
  static readonly REQUIRED_MESSAGE = `Required`;
  static readonly INCORRECT_DATE_FORMAT_MESSAGE = `Incorrect date format. ${ApplicationConstants.DATE_FORMAT_SHORT}`;
  static readonly INCORRECT_MONTH_FORMAT_MESSAGE = `Incorrect month format. ${ApplicationConstants.MONTH_FORMAT_LONG}`;
  static readonly START_DATE_AFTER_END_DATE_MESSAGE = `Start date must be the same or before end date.`;
  static readonly START_AND_END_DATE_REQUIRED_MESSAGE = `Start and End date required.`;
  static readonly INCORRECT_EMAIL = `Invalid email format.`;
  static readonly INVALID_INTEGER = `Must be a whole number`;
  static readonly incorrectSelectedFileType = (fileType: string): string =>
    `You have selected a filetype not allowed. Please select a ${fileType} file.`;
  static readonly maxDateRangeMessage = (range: number): string => `Max range is ${range} days.`;
  static readonly exceedsCharLimitMessage = (limit: number): string => `Exceeds character limit (${limit})`;
  static readonly exceedsCharLimitMessageShort = (limit: number): string => `Exceeds limit (${limit})`;
  static readonly exceedsMaxLimitMessage = (limit: number): string => `Max limit is ${limit}`;
  static readonly exceedsMinLimitMessage = (limit: number): string => `Min limit is ${limit}`;
  static readonly DUPLICATE_INPUT_MESSAGE = (formLabel: string): string => `${formLabel} already exists`;
}
