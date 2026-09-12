import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/users/userReducer";
import { MembershipShimmer } from "../simmerUi/ShimmerUi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Membership = () => {
  const dispatch = useDispatch();
  const { user, authLoading } = useSelector((state) => state.user);
  if (authLoading || !user) return <MembershipShimmer />;

  const membershipType = user?.membershipType?.toLowerCase() || "normal";
  const canBuySilver = membershipType === "normal";
  const canBuyGold = membershipType === "normal" || membershipType === "silver";

  const handleBuyMembership = async (plan) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: plan },
        { withCredentials: true },
      );
      const { orderId, currency, amount, firstName, lastName } =
        order.data.createdOrder;
      const options = {
        key: order.data.keyId,
        amount,
        currency,
        name: "CodeBuddy",
        description: "",
        order_id: orderId,
        Profill: {
          name: `${firstName} ${lastName}`,
          email: "example@email.com",
          contact: "+91 99999 99999",
        },
        handler: async function () {
          dispatch(getProfile());
        },
        theme: { color: "#137254" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open(rzp);
    } catch (err) {
      console.error(err);
    }
  };

  const silverFeatures = [
    "Maximum 50 connection requests per day",
    "Advanced profile filters",
    "Email support",
    "Upgrade anytime",
  ];
  const goldFeatures = [
    "Unlimited connection requests",
    "Priority in search results",
    "See who liked you",
    "24/7 priority support",
  ];

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 py-8 text-(--connections-ink) sm:px-6 md:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-4xl bg-(--connections-ink) px-6 py-10 text-white shadow-[0_24px_70px_rgba(23,32,51,0.18)] sm:px-10 md:px-14 md:py-14">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-34 border-[#f1a08f]/20" />
          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full border-24 border-[#f3c7a4]/10" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-8 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-(--connections-coral) text-xl font-black">
                  C
                </span>
                <span className="text-xl font-black tracking-tight">
                  CodeBuddy Plus
                </span>
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f1a08f]">
                A better way to belong
              </p>
              <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
                Put your network in the fast lane.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                More reach, better discovery, and the space to build meaningful
                developer relationships without limits.
              </p>
            </div>
            <div className="hidden rotate-3 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                Member signal
              </p>
              <p className="mt-3 text-4xl font-black text-[#f1a08f]">∞</p>
              <p className="mt-1 text-sm font-bold">More possibilities</p>
            </div>
          </div>
        </section>

        <div className="relative z-10 -mt-6 grid gap-4 px-2 sm:grid-cols-3 md:px-8">
          {[
            [
              "⚡",
              "Move faster",
              "More daily opportunities to meet the right people.",
            ],
            [
              "✦",
              "Stand out",
              "Put your profile in front of more curious minds.",
            ],
            [
              "♢",
              "Stay supported",
              "Get priority help when your next idea needs momentum.",
            ],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#d9dfe5] bg-white p-4 shadow-[0_12px_28px_rgba(23,32,51,0.08)]"
            >
              <p className="text-2xl">{icon}</p>
              <p className="mt-2 text-sm font-extrabold">{title}</p>
              <p className="mt-1 text-xs leading-5 text-(--connections-muted)">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {canBuySilver && (
            <PlanCard
              name="Silver"
              eyebrow="Essential reach"
              price="₹999"
              icon="◆"
              features={silverFeatures}
              onClick={() => handleBuyMembership("silver")}
            />
          )}
          {canBuyGold && (
            <PlanCard
              name="Gold"
              eyebrow="Full access"
              price="₹1,999"
              icon="✦"
              features={goldFeatures}
              featured
              onClick={() => handleBuyMembership("gold")}
            />
          )}
          {!canBuyGold && (
            <section className="rounded-3xl border border-[#d7a43a] bg-[#fff8e6] p-6 shadow-sm lg:col-span-2 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a631d]">
                Current membership
              </p>
              <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <h2 className="text-3xl font-black text-[#4a3410]">
                    Gold is active.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#765c2a]">
                    You have unlocked every premium feature, including unlimited
                    connections and priority support.
                  </p>
                </div>
                <span className="rounded-xl bg-[#d7a43a] px-5 py-3 text-sm font-black text-[#4a3410]">
                  Active member
                </span>
              </div>
            </section>
          )}
        </div>

        <section className="mt-12 overflow-hidden rounded-3xl border border-[#d9dfe5] bg-white shadow-sm">
          <div className="border-b border-[#d9dfe5] px-5 py-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-(--connections-coral)">
              Compare access
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Choose the room your network needs.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-[#f8fafb] text-xs uppercase tracking-wider text-(--connections-muted)">
                <tr>
                  <th className="px-5 py-4 sm:px-8">Feature</th>
                  <th className="px-5 py-4">Silver</th>
                  <th className="px-5 py-4">Gold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e8eb] text-(--connections-muted)">
                <tr>
                  <td className="px-5 py-4 font-bold text-(--connections-ink) sm:px-8">
                    Daily requests
                  </td>
                  <td className="px-5 py-4">50</td>
                  <td className="px-5 py-4 font-bold text-[#9b721c]">
                    Unlimited
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-(--connections-ink) sm:px-8">
                    Profile filters
                  </td>
                  <td className="px-5 py-4">Advanced</td>
                  <td className="px-5 py-4 font-bold text-[#9b721c]">
                    Priority
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-(--connections-ink) sm:px-8">
                    Support
                  </td>
                  <td className="px-5 py-4">Email</td>
                  <td className="px-5 py-4 font-bold text-[#9b721c]">
                    24/7 priority
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-bold text-(--connections-ink) sm:px-8">
                    Search ranking
                  </td>
                  <td className="px-5 py-4">Standard</td>
                  <td className="px-5 py-4 font-bold text-[#9b721c]">
                    Top results
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <p className="mt-8 text-center text-sm text-(--connections-muted)">
          ✓ 30-day money-back guarantee&nbsp;&nbsp;•&nbsp;&nbsp;Cancel
          anytime&nbsp;&nbsp;•&nbsp;&nbsp;No questions asked
        </p>
      </div>
    </div>
  );
};

const PlanCard = ({
  name,
  eyebrow,
  price,
  icon,
  features,
  featured,
  onClick,
}) => (
  <section
    className={`relative flex flex-col overflow-hidden rounded-3xl p-6 transition-transform hover:-translate-y-1 md:p-8 ${featured ? "border-2 border-[#d7a43a] bg-[#172033] text-white shadow-[0_20px_50px_rgba(23,32,51,0.2)]" : "border border-[#cfd5dc] bg-white text-(--connections-ink) shadow-[0_16px_35px_rgba(23,32,51,0.07)]"}`}
  >
    {featured && (
      <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#d7a43a] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#4a3410]">
        Best value
      </div>
    )}
    <div className="flex items-start justify-between gap-4">
      <div>
        <p
          className={`text-xs font-bold uppercase tracking-[0.2em] ${featured ? "text-[#f3c979]" : "text-(--connections-blue)"}`}
        >
          {eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-black">{name}</h2>
      </div>
      <span
        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${featured ? "bg-[#d7a43a] text-[#4a3410]" : "bg-[#e6eef7]"}`}
      >
        {icon}
      </span>
    </div>
    <div
      className={`mt-8 border-b pb-6 ${featured ? "border-white/15" : "border-[#e5e8eb]"}`}
    >
      <span className="text-5xl font-black">{price}</span>
      <span
        className={`ml-2 text-sm ${featured ? "text-slate-300" : "text-(--connections-muted)"}`}
      >
        / month
      </span>
      {featured && (
        <p className="mt-2 text-sm font-bold text-[#f3c979]">
          Save 20% with annual plan
        </p>
      )}
    </div>
    <ul
      className={`mt-6 space-y-4 text-sm ${featured ? "text-slate-300" : "text-(--connections-muted)"}`}
    >
      {features.map((feature) => (
        <li key={feature} className="flex gap-3">
          <span className={featured ? "text-[#f3c979]" : "text-[#39704c]"}>
            ✓
          </span>
          {feature}
        </li>
      ))}
    </ul>
    <button
      onClick={onClick}
      className={`mt-8 h-13 w-full rounded-xl text-sm font-extrabold transition ${featured ? "border-0 bg-[#d7a43a] text-[#4a3410] shadow-[0_10px_24px_rgba(215,164,58,0.22)] hover:bg-[#f3c979]" : "border-2 border-(--connections-ink) bg-white text-(--connections-ink) hover:bg-(--connections-ink) hover:text-white"}`}
    >
      {featured ? "Unlock Gold access" : "Choose Silver"}
    </button>
  </section>
);
