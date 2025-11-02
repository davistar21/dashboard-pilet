interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-300 rounded animate-pulse ${className}`}
      style={{ width, height }}
    />
  );
};
