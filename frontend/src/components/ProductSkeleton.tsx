export default function ProductSkeleton() {
  return (
    <article className="product-card product-skeleton" aria-hidden="true">
      <div className="product-image-container skeleton-block" />
      <div className="product-info">
        <div className="skeleton-line skeleton-small" />
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-short" />
      </div>
    </article>
  );
}
