export const FeedCard = ({ user }) => {
  const { firstName, lastName, age, about, gender, photoUrl } = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName}</h2>
        <h2 className="card-title">
          {age && <span className="text-white">{age}Yrs</span>}
          {gender && <span>| {gender}</span>}
        </h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Ingored</button>
          <button className="btn btn-secondary">Intersted</button>
        </div>
      </div>
    </div>
  );
};
