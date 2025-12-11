interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SkeletonLoader = ({ className = "", ...props }: SkeletonLoaderProps) => {
  return (
    <div
      {...props}
      className={`h-full w-full bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 skeleton ${className}`}
    ></div>
  );
};

export default SkeletonLoader;
