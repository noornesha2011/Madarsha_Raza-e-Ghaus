export type DonorId = number | string;

export const formatDonorId = (id: DonorId) => String(id).toUpperCase();
