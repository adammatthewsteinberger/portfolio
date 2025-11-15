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
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';

  return (
    <a
      href="https://www.amazon.com/dp/B0G2FWTJ3Q"
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-custom btn ${sizeClass} fw-bold demo-btn ${className}`}
    >
      {showIcon && <i className="fab fa-amazon me-2"></i>}
      Order on Amazon
    </a>
  );
}
