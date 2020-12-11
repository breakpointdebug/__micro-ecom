export const nullOrValue = (value: any): any =>  value === null ? null : value;

export const removeNullProperty = <T>(arg: T): void => {
  for(const prop in arg) {
    if (arg[prop] === null) {
      delete arg[prop];
    }
  }
}