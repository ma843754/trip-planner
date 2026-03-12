export default function Rating({ value, onChange }) {
  return (
    <div className="rating" role="group" aria-label="Rate this activity">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`rating-star ${star <= (value ?? 0) ? 'rating-star--filled' : ''}`}
          onClick={() => onChange(star)}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
