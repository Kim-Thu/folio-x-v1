import { getSystemStatesSettings } from './cms';

const systemStates = await getSystemStatesSettings();

export const notFoundContent = systemStates.notFound;
export const emptyContent = systemStates.empty;
export const comingSoonContent = systemStates.comingSoon;
export const maintenanceContent = systemStates.maintenance;
