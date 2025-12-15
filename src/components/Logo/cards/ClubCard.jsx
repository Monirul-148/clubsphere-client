const ClubCard = ({ club }) => {
  const {
    clubName,
    bannerImage,
    category,
    description,
    membershipFee,
  } = club;

  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={bannerImage}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="text-xl font-semibold mt-3">
        {clubName}
      </h3>

      <p className="text-sm text-gray-500">{category}</p>

      <p className="mt-2 text-sm">
        {description?.slice(0, 80)}...
      </p>

      <p className="mt-2 font-medium">
        Fee: {membershipFee === 0 ? "Free" : `$${membershipFee}`}
      </p>

      <button className="btn btn-primary w-full mt-3">
        View Details
      </button>
    </div>
  );
};

export default ClubCard;
