import { useEffect, useState } from "react";
import { FeedCard } from "../cards/FeedCard";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../../utils/userSlice/userReducer";

export const EditProfile = ({ user, error, loading, success }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [open, setOpen] = useState(false);

  function handleSelect(value) {
    setGender(value);
    setOpen(false);
  }
  useEffect(() => {
    if (success) {
      alert("Profile updated successfully");
    }
    if (error) {
      alert(error);
    }
  }, [success, error]);

  const handleUpdateProfile = () => {
    dispatch(updateProfile({ about, photoUrl, age, gender }));
  };
  return (
    <>
      <div className="flex justify-center items-center gap-x-4">
        <div className="flex justify-center mt-6 lg:mt-16">
          <div className="card bg-base-200 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profle</h2>
              <div className="flex flex-col gap-y-3 mt-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    disabled
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    disabled
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile Picture</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <details className="dropdown" open={open}>
                  <summary
                    className="btn m-1"
                    onClick={(e) => {
                      e.preventDefault(); // prevent native toggle
                      setOpen((prev) => !prev);
                    }}
                  >
                    {gender || "Gender"}
                  </summary>

                  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect("Male")}
                      >
                        Male
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect("Female")}
                      >
                        Female
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleSelect("Others")}
                      >
                        Others
                      </button>
                    </li>
                  </ul>
                </details>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="card-actions justify-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <FeedCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
    </>
  );
};
