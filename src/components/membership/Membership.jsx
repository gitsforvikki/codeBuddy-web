import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Membership = () => {
  const handleBuyMembership = async (membershipType) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType },
        { withCredentials: true },
      );
      const { orderId, currency, amount, firstName, lastName } =
        order.data.createdOrder;
      const key = order.data.keyId;
      const options = {
        key,
        amount,
        currency,
        name: "CodeBuddy",
        description: "",
        order_id: orderId,
        Profill: {
          name: firstName + " " + lastName,
          email: "example@email.com",
          contact: "+91 99999 99999",
        },
        theme: {
          color: "#137254",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open(rzp);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-8 md:py-12 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            👑 Choose Your Premium Plan
          </h1>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Unlock unlimited networking opportunities and connect with more
            developers
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Silver Plan */}
          <div className="card bg-base-300 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="card-body gap-4 p-4 md:p-8">
              {/* Header */}
              <div>
                <h2 className="card-title text-3xl md:text-4xl mb-2">
                  💎 Silver Plan
                </h2>
                <div className="badge badge-lg badge-outline">
                  Popular Choice
                </div>
              </div>

              {/* Price */}
              <div className="py-4">
                <div className="text-4xl font-bold">
                  ₹999
                  <span className="text-lg text-base-content/60">/month</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    Maximum 50 connection requests per day
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    Advanced profile filters
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Upgrade anytime</span>
                </li>
              </ul>

              {/* Button */}
              <div className="card-actions justify-center mt-6">
                <button
                  onClick={() => handleBuyMembership("silver")}
                  className="btn btn-primary btn-lg w-full"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          {/* Gold Plan (Featured) */}
          <div className="card bg-base-300 shadow-2xl hover:shadow-2xl transition-all hover:-translate-y-2 ring-2 ring-secondary">
            <div className="card-body gap-4 p-4 md:p-8">
              {/* Header */}
              <div>
                <h2 className="card-title text-3xl md:text-4xl mb-2">
                  👑 Gold Plan
                </h2>
                <div className="badge badge-lg badge-secondary">Best Value</div>
              </div>

              {/* Price */}
              <div className="py-4">
                <div className="text-4xl font-bold">
                  ₹1,999
                  <span className="text-lg text-base-content/60">/month</span>
                </div>
                <p className="text-sm text-success mt-2">
                  Save 20% with annual plan
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base font-semibold">
                    Unlimited connection requests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base font-semibold">
                    Priority in search results
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base font-semibold">
                    See who liked you
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-success shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base font-semibold">
                    24/7 Priority support
                  </span>
                </li>
              </ul>

              {/* Button */}
              <div className="card-actions justify-center mt-6">
                <button
                  onClick={() => handleBuyMembership("gold")}
                  className="btn btn-secondary btn-lg w-full"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Get Gold Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="max-w-2xl mx-auto">
          <div className="divider">Compare Plans</div>
          <div className="card bg-base-300 shadow-md">
            <div className="card-body p-4 md:p-6">
              <div className="overflow-x-auto">
                <table className="table w-full text-sm md:text-base">
                  <tbody>
                    <tr>
                      <td className="font-semibold">Daily Requests</td>
                      <td>50</td>
                      <td className="font-bold">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Profile Filters</td>
                      <td>Basic</td>
                      <td className="font-bold">Advanced</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Support</td>
                      <td>Email</td>
                      <td className="font-bold">24/7 Priority</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Search Ranking</td>
                      <td>Standard</td>
                      <td className="font-bold">Top Results</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-sm md:text-base text-base-content/70">
            ✅ 30-day money-back guarantee • Cancel anytime • No questions asked
          </p>
        </div>
      </div>
    </div>
  );
};
