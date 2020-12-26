export const trimAndLowerCase = (value: string): string => value.trim().replace(/\s+/g, '').toLowerCase();

export const emptyOrValue = (value: any): any =>  value === null || undefined ? null : value;

export const removeNullOrUndefinedProperty = <T>(arg: T): void => {
  for(const prop in arg) {
    if (arg[prop] === null || undefined) {
      delete arg[prop];
    }
  }
}