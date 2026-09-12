import { useEffect, useState } from "react";
import { FeedCard } from "../cards/FeedCard";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/users/userReducer";
import toast from "react-hot-toast";

export const EditProfile = ({ user, error, loading, success }) => {
  const dispatch = useDispatch();
  const userData = user;

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
    <div className="min-h-screen bg-[var(--connections-cream)] text-[var(--connections-ink)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
        <header className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--connections-coral)]">
            Your presence, refined
          </p>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Make your profile feel like you.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[var(--connections-muted)] md:text-lg">
            Keep your details current so the right people can discover what
            makes you worth knowing.
          </p>
        </header>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-12">
          <section className="overflow-hidden rounded-[2rem] border border-[var(--connections-line)] bg-white shadow-[0_24px_70px_rgba(23,32,51,0.08)]">
            <div className="border-b border-[var(--connections-line)] px-6 py-6 md:px-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--connections-muted)]">
                    Profile details
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    Tell your story
                  </h2>
                </div>
                <span className="hidden rounded-full bg-[#f5e7df] px-3 py-1.5 text-xs font-bold text-[var(--connections-coral)] sm:inline-flex">
                  01 / 01
                </span>
              </div>
            </div>

            <div className="space-y-7 px-6 py-7 md:px-9 md:py-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                    First name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-[#f7f8f8] text-[var(--connections-muted)]"
                    value={firstName}
                    disabled
                  />
                  <label className="text-xs text-[var(--connections-muted)]">
                    Cannot be changed
                  </label>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                    Last name
                  </legend>
                  <input
                    type="text"
                    className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-[#f7f8f8] text-[var(--connections-muted)]"
                    value={lastName}
                    disabled
                  />
                  <label className="text-xs text-[var(--connections-muted)]">
                    Cannot be changed
                  </label>
                </fieldset>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                    Age
                  </legend>
                  <input
                    type="number"
                    className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-white"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="18"
                    max="120"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                    Gender
                  </legend>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered h-12 w-full border-[var(--connections-line)] bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">👨 Male</option>
                    <option value="Female">👩 Female</option>
                    <option value="Others">🧑 Others</option>
                  </select>
                </fieldset>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                  Profile picture URL
                </legend>
                <input
                  type="url"
                  className="input input-bordered h-12 w-full border-[var(--connections-line)] bg-white"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <label className="text-xs text-[var(--connections-muted)]">
                  Use a clear, recent photo that feels like you.
                </label>
              </fieldset>

              <fieldset className="fieldset">
                <div className="flex items-end justify-between gap-4">
                  <legend className="fieldset-legend text-sm font-bold text-[var(--connections-ink)]">
                    About you
                  </legend>
                  <span className="text-xs font-medium text-[var(--connections-muted)]">
                    {about.length}/200
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered min-h-32 w-full resize-none border-[var(--connections-line)] bg-white leading-6"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="4"
                  maxLength="200"
                  placeholder="Share your interests, skills, or what you're looking for..."
                />
              </fieldset>

              {error && (
                <div className="alert alert-error rounded-2xl text-sm">
                  <svg
                    className="h-5 w-5 shrink-0 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4v2m0 4v2M7.08 6.47A9.002 9.002 0 1020.92 17.53"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success rounded-2xl text-sm">
                  <svg
                    className="h-5 w-5 shrink-0 stroke-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <button
                className="btn h-14 w-full rounded-2xl border-0 bg-[var(--connections-coral)] text-base font-bold text-white shadow-[0_12px_24px_rgba(184,68,50,0.22)] hover:bg-[#9f3829]"
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
                      className="h-5 w-5"
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
                    Save profile
                  </>
                )}
              </button>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--connections-muted)]">
                  Live preview
                </p>
                <h2 className="mt-2 text-2xl font-extrabold">
                  How people see you
                </h2>
              </div>
              <span className="h-3 w-3 rounded-full bg-[#5d9b72] shadow-[0_0_0_5px_rgba(93,155,114,0.14)]" />
            </div>
            <div className="rounded-[2rem] border border-[var(--connections-line)] bg-[#f1f3f1] p-3 shadow-[0_24px_70px_rgba(23,32,51,0.08)] md:p-5">
              <FeedCard
                user={{ firstName, lastName, age, about, gender, photoUrl }}
                showActions={false}
              />
            </div>
            <p className="mt-4 px-2 text-sm leading-6 text-[var(--connections-muted)]">
              A strong photo and a specific introduction make it easier for your
              connections to start a conversation.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};
