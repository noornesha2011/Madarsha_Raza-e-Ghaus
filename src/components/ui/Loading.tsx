type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
};

export default function Loading({ label = "Loading…", fullScreen = false }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[#163832] ${fullScreen ? "min-h-screen bg-[#FAF6EC]" : "py-10"}`} role="status" aria-live="polite">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#2F6B5F] border-t-transparent" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
