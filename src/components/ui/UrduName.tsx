type UrduNameProps = {
  className?: string;
};

export default function UrduName({ className = "" }: UrduNameProps) {
  return (
    <span lang="ur" dir="rtl" className={`font-[Noto_Naskh_Arabic,serif] ${className}`}>
      مدرسہ رضائے غوث
    </span>
  );
}
