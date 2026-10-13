import { useState, type ReactNode } from "react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  fallback: ReactNode;
};

// Key by path so replacement assets get a fresh attempt, without retrying failures.
export const VehicleCollectionAsset = (props: Props) => (
  <AssetAttempt key={props.src || "empty"} {...props} />
);

const AssetAttempt = ({ src, alt, className, fallback }: Props) => {
  const [failed, setFailed] = useState(false);
  if (!src?.trim() || failed) return <>{fallback}</>;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
};
