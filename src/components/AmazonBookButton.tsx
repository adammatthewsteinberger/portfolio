interface AmazonBookButtonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export default function AmazonBookButton({
  size = 'lg',
  className = '',
  showIcon = true
}: AmazonBookButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <a
      href="https://www.amazon.com/dp/B0G2FWTJ3Q"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-bold bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline ${sizeClasses[size]} ${className}`}
      style={{ color: '#000000' }}
    >
      {showIcon && <i className="fab fa-amazon"></i>}
      Order on Amazon
    </a>
  );
}
