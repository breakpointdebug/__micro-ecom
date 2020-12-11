import { v4 as uuid_v4 } from 'uuid';

export const create_uuid_v4 = (): string => format_uuid_v4(uuid_v4());

export const format_uuid_v4 = (raw: string): string => raw.toUpperCase().replace(/-/g, "");