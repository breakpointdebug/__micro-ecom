export const nullOrValue = (value: any) =>  value === null ? null : value;

export const removeNullProperty = <T>(arg: T): T => {
  for(const prop in arg) {
    if (arg[prop] === null) {
      delete arg[prop];
    }
  }
  return arg;
}