import { v4 as uuid_v4 } from 'uuid';

export const create_uuid_v4 = () => uuid_v4().toUpperCase().replace(/-/g, "");