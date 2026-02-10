export const FeedCard = ({ user, onInterested, onIgnored }) => {
  const { Id, firstName, lastName, age, about, gender, photoUrl } = user;

  return (
    <div className="card bg-base-300 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image Section */}
      <figure className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </figure>

      {/* Card Content */}
      <div className="card-body gap-3 p-4 md:p-6">
        {/* Name and Basic Info */}
        <div>
          <h2 className="card-title text-2xl md:text-3xl">
            {firstName} {lastName && lastName}
          </h2>

          <div className="flex flex-wrap gap-2 mt-2">
            {age && (
              <div className="badge badge-lg badge-primary gap-2">
                <span>🎂</span>
                <span>{age} yrs</span>
              </div>
            )}
            {gender && (
              <div className="badge badge-lg badge-secondary gap-2">
                <span>
                  {gender === "Male" ? "👨" : gender === "Female" ? "👩" : "🧑"}
                </span>
                <span>{gender}</span>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        {about && (
          <div className="mt-2">
            <p className="text-sm md:text-base text-base-content/80 line-clamp-3">
              "{about}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-between gap-2 mt-6 pt-4 border-t border-base-200">
          <button
            className="btn btn-outline btn-error btn-md md:btn-lg flex-1 gap-2 hover:scale-105 transition-transform"
            onClick={onIgnored}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="hidden sm:inline">Skip</span>
          </button>

          <button
            className="btn btn-primary btn-md md:btn-lg flex-1 gap-2 hover:scale-105 transition-transform"
            onClick={onInterested}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="hidden sm:inline">Like</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="text-xs md:text-sm text-base-content/60 text-center mt-3">
          👉 Like or skip to see the next profile
        </div>
      </div>
    </div>
  );
};
