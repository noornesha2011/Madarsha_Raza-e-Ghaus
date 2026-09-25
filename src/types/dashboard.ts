export interface DonorDashboardInfo {
  donor_id: number;
  name: string;
}

export interface CurrentMonthDonation {
  month: number;
  year: number;
  due_amount: number;
  monthly_amount: number;
  paid_amount: number;
  status: string;
}

export interface DonorSummary {
  total_donated: number;
  total_paid_month: number;
  pending_month: number;
}

export interface MadarshaSummary {
  monthly_collection: number;
  yearly_collection: number;
  monthly_expensess: number;
  yearly_expensess: number;
  balance: number;
}

export interface DonorDashboardResponse {
  donor: DonorDashboardInfo;
  current_month: CurrentMonthDonation;
  summary: DonorSummary;
  madarsha_history: MadarshaSummary;
}

export interface DonorProfileResponse {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  monthly_amount: number;
  created_at: string;
}
