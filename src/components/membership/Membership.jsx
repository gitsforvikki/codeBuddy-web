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
    <div className="max-w-7xl mx-auto my-16 md:my-20 lg:mt-24 lg:mb-32">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid  grow place-items-center py-12">
          <div>
            <h2 className="text-4xl">silver plan</h2>
            <ul>
              <li>Maximum 50 connection sent per day</li>
              <li>you can upgrade furder</li>
            </ul>
            <button
              onClick={() => handleBuyMembership("silver")}
              className="bg-pink-400 text-white px-3 py-2 rounded-2xl shadow-white mt-2"
            >
              Buy Silver plan
            </button>
          </div>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid grow place-items-center py-12">
          <div>
            <h2 className="text-4xl">Gold plan</h2>
            <ul>
              <li>Maximum 100 connection sent per day</li>
              <li>Unlimited connection request</li>
            </ul>
            <button
              onClick={() => handleBuyMembership("gold")}
              className="bg-violet-700 text-white px-3 py-2 rounded-2xl shadow-white mt-2"
            >
              Buy Gold plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
