import { useEffect, useState } from "react";
import { FeedCard } from "../cards/FeedCard";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../utils/userSlice/userReducer";
import toast from "react-hot-toast";

// Dummy user data for visual demonstration
const DUMMY_USER = {
  firstName: "John",
  lastName: "Doe",
  photoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  age: 26,
  about:
    "Full-stack developer passionate about building amazing web experiences. Coffee lover ☕",
  gender: "Male",
};

export const EditProfile = ({ user, error, loading, success }) => {
  const dispatch = useDispatch();
  const userData = user || DUMMY_USER;

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [age, setAge] = useState(userData.age);
  const [about, setAbout] = useState(userData.about);
  const [gender, setGender] = useState(userData.gender);
  const [open, setOpen] = useState(false);

  function handleSelect(value) {
    setGender(value);
    setOpen(false);
  }
  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const handleUpdateProfile = () => {
    dispatch(updateProfile({ about, photoUrl, age, gender }));
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 min-h-screen">
      {/* Header */}
      <div className="mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          👤 Edit Your Profile
        </h1>
        <p className="text-base-content/70 text-sm md:text-base">
          Update your profile information and preview how it looks
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Form Section */}
        <div className="flex justify-center">
          <div className="card bg-base-200 w-full shadow-lg">
            <div className="card-body gap-4 p-4 md:p-6">
              <h2 className="card-title text-2xl">Profile Details</h2>

              <div className="flex flex-col gap-4">
                {/* First Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={firstName}
                    disabled
                  />
                  <label className="text-xs text-base-content/60">
                    Cannot be changed
                  </label>
                </fieldset>

                {/* Last Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">
                    Last Name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={lastName}
                    disabled
                  />
                  <label className="text-xs text-base-content/60">
                    Cannot be changed
                  </label>
                </fieldset>

                {/* Age */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">Age</legend>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="18"
                    max="120"
                  />
                </fieldset>

                {/* Photo URL */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">
                    Profile Picture URL
                  </legend>
                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="text-xs text-base-content/60">
                    Enter a valid image URL
                  </label>
                </fieldset>

                {/* Gender */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">
                    Gender
                  </legend>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">👨 Male</option>
                    <option value="Female">👩 Female</option>
                    <option value="Others">🧑 Others</option>
                  </select>
                </fieldset>

                {/* About */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend font-semibold">
                    About You
                  </legend>
                  <textarea
                    className="textarea textarea-bordered w-full resize-none"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="4"
                    maxLength="200"
                    placeholder="Tell us about yourself, your interests, skills, or what you're looking for..."
                  />
                  <label className="text-xs text-base-content/60 mt-1">
                    {about.length}/200 characters
                  </label>
                </fieldset>
              </div>

              {/* Alert Messages */}
              {error && (
                <div className="alert alert-error">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1020.92 17.53"
                    ></path>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success">
                  <svg
                    className="stroke-current shrink-0 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Profile updated successfully!</span>
                </div>
              )}

              {/* Save Button */}
              <div className="card-actions justify-center mt-4 gap-2">
                <button
                  className="btn btn-primary btn-block"
                  onClick={handleUpdateProfile}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center items-start sticky top-24 lg:top-auto">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-center lg:text-left">
              Profile Preview
            </h3>
            <FeedCard
              user={{ firstName, lastName, age, about, gender, photoUrl }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
