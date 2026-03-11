import React, { useState } from "react";
import {
  Trash2,
  Truck,
  MapPin,
  Camera,
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Star,
  Menu,
  X,
  CreditCard,
  DollarSign,
  AlertCircle,
  Package,
  History,
  Wallet,
  Settings,
  HelpCircle,
} from "lucide-react";

// --- Mock Data ---
const ITEM_TYPES = [
  { id: "furniture", label: "Furniture", priceFactor: 25 },
  { id: "appliances", label: "Appliances", priceFactor: 40 },
  { id: "electronics", label: "Electronics", priceFactor: 15 },
  { id: "construction", label: "Construction Waste", priceFactor: 60 },
  { id: "general", label: "General Junk", priceFactor: 20 },
];

const MOCK_OFFERS = [
  {
    id: 1,
    driver: "John Smith",
    rating: 4.8,
    vehicle: "Ford F-150",
    freightPrice: 45.0,
    arrival: "20-30 min",
  },
  {
    id: 2,
    driver: "Mike Johnson",
    rating: 4.9,
    vehicle: "Box Truck",
    freightPrice: 65.0,
    arrival: "15 min",
  },
  {
    id: 3,
    driver: "Sarah Williams",
    rating: 4.7,
    vehicle: "Ram 2500",
    freightPrice: 38.0,
    arrival: "45 min",
  },
  {
    id: 4,
    driver: "David Brown",
    rating: 4.6,
    vehicle: "Chevy Silverado",
    freightPrice: 42.0,
    arrival: "10 min",
  },
];

// --- Sub-components ---

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const base =
    "w-full py-4 px-6 rounded-xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border-2 border-green-600 text-green-600 hover:bg-green-50",
    ghost: "text-gray-500 hover:bg-gray-50",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className} ${disabled ? "opacity-50 grayscale" : ""}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 transition-shadow hover:shadow-md ${className}`}
  >
    {children}
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState("landing");
  const [step, setStep] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Wizard State
  const [formData, setFormData] = useState({
    itemType: "",
    volume: "medium",
    photos: [],
    address: "",
    disposalFee: 0,
  });

  const [selectedOffer, setSelectedOffer] = useState(null);

  // Logic
  const handleStartRequest = () => setView("wizard");

  const calculateDisposal = (type, vol) => {
    const base = ITEM_TYPES.find((i) => i.id === type)?.priceFactor || 0;
    const multipliers = { small: 1, medium: 2, large: 4 };
    return base * multipliers[vol];
  };

  const nextStep = () => {
    if (step === 2) {
      setFormData((prev) => ({
        ...prev,
        disposalFee: calculateDisposal(prev.itemType, prev.volume),
      }));
    }
    setStep(step + 1);
  };

  // Rendering Views

  const renderLanding = () => (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 md:px-12 py-6 flex justify-between items-center bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg text-white">
            <Trash2 size={24} />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            EcoDump
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-gray-600 font-medium hover:text-green-600"
          >
            How it works
          </a>
          <a
            href="#"
            className="text-gray-600 font-medium hover:text-green-600"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-gray-600 font-medium hover:text-green-600"
          >
            For Drivers
          </a>
          <Button onClick={handleStartRequest} className="w-auto py-2 px-6">
            Book Now
          </Button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-gray-600 md:hidden"
        >
          <Menu size={24} />
        </button>
      </header>

      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Junk Disposal <br className="hidden md:block" />{" "}
              <span className="text-green-600">Simplified.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-sm md:max-w-md mx-auto md:mx-0">
              Get instant disposal pricing. Pick the freight rate that fits your
              budget. Professional removal at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button onClick={handleStartRequest} className="sm:w-auto">
                Start Cleaning Now
              </Button>
              <Button variant="outline" className="sm:w-auto">
                View Rates
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative hidden md:block">
            <div className="w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl rotate-3 flex items-center justify-center">
              <Package size={120} className="text-gray-300" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
              <CheckCircle2 className="text-green-600" size={32} />
              <div>
                <p className="font-bold">Verified Service</p>
                <p className="text-sm text-gray-500">10k+ Cleanups Done</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center">
              Transparent & Efficient
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="flex flex-col items-center text-center p-8">
                <div className="bg-green-100 p-4 rounded-full text-green-700 mb-6">
                  <DollarSign size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Fair Pricing</h3>
                <p className="text-gray-600">
                  Fixed disposal fees + competitive bids from local drivers. You
                  always win.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-8">
                <div className="bg-blue-100 p-4 rounded-full text-blue-700 mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Verified Pros</h3>
                <p className="text-gray-600">
                  All drivers are background checked and insured for your peace
                  of mind.
                </p>
              </Card>
              <Card className="flex flex-col items-center text-center p-8">
                <div className="bg-orange-100 p-4 rounded-full text-orange-700 mb-6">
                  <Clock size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Same Day Service</h3>
                <p className="text-gray-600">
                  Requests are usually picked up within 2 hours of booking.
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 md:p-12 border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Trash2 size={24} className="text-green-600" />
            <span className="font-bold">EcoDump Inc.</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
          <p className="text-sm text-gray-400">© 2024 San Francisco, CA.</p>
        </div>
      </footer>
    </div>
  );

  const renderWizard = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col md:items-center md:justify-center md:p-8">
      <div className="w-full max-w-2xl bg-white md:rounded-3xl md:shadow-xl overflow-hidden flex flex-col min-h-[600px]">
        <div className="p-6 border-b flex items-center justify-between">
          <button
            onClick={() => setView("landing")}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-12 md:w-16 rounded-full transition-all duration-300 ${step >= i ? "bg-green-600" : "bg-gray-200"}`}
              />
            ))}
          </div>
          <div className="w-6" />
        </div>

        <div className="flex-1 p-6 md:p-12 overflow-y-auto">
          {step === 1 && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                What are we picking up?
              </h2>
              <p className="text-gray-500 mb-8">
                Select the category that best fits your junk.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ITEM_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() =>
                      setFormData({ ...formData, itemType: type.id })
                    }
                    className={`p-6 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${
                      formData.itemType === type.id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-100 hover:border-green-200"
                    }`}
                  >
                    <span className="font-bold text-lg">{type.label}</span>
                    {formData.itemType === type.id && (
                      <CheckCircle2 className="text-green-600" size={24} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Volume & Photos
              </h2>
              <p className="text-gray-500 mb-8">
                Tell us the size and show us what you have.
              </p>

              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                Load Size
              </label>
              <div className="flex gap-3 mb-10">
                {["small", "medium", "large"].map((v) => (
                  <button
                    key={v}
                    onClick={() => setFormData({ ...formData, volume: v })}
                    className={`flex-1 py-4 rounded-xl border-2 capitalize font-bold transition-all ${
                      formData.volume === v
                        ? "border-green-600 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-400 hover:border-gray-300"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">
                Add Photos (Required)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera size={40} />
                  <span className="text-xs mt-2 font-bold uppercase">
                    Upload
                  </span>
                </div>
                <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-100">
                  <Package size={40} className="text-gray-300" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Pickup Location
              </h2>
              <p className="text-gray-500 mb-8">
                Where should the driver meet you?
              </p>

              <div className="space-y-6">
                <div className="relative group">
                  <MapPin
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors"
                    size={24}
                  />
                  <input
                    type="text"
                    placeholder="Enter your address..."
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-green-600 focus:bg-white outline-none transition-all text-lg font-medium shadow-sm"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <Card className="bg-green-50 border-green-100 p-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-800 font-bold text-lg">
                      Disposal Fee (Fixed)
                    </span>
                    <span className="text-3xl font-black text-green-800">
                      ${formData.disposalFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 text-green-700">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <p className="text-xs leading-relaxed">
                      This fee is calculated automatically based on your item
                      type and regional disposal center rates.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 border-t bg-white">
          <Button
            disabled={
              (step === 1 && !formData.itemType) ||
              (step === 3 && !formData.address)
            }
            onClick={step === 3 ? () => setView("offers") : nextStep}
            className="md:max-w-xs md:mx-auto"
          >
            {step === 3 ? "Find Bids" : "Next Step"}
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderOffers = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-6 md:px-12 border-b flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("wizard")}
            className="text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="rotate-180" size={24} />
          </button>
          <h2 className="text-xl md:text-2xl font-bold">Driver Bids</h2>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div> Live Feed
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 md:py-12">
        <div className="bg-green-700 text-white p-8 rounded-[2rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left">
            <p className="text-xs opacity-70 uppercase font-bold tracking-widest mb-1">
              Fixed Disposal Fee
            </p>
            <p className="text-4xl font-black">
              ${formData.disposalFee.toFixed(2)}
            </p>
          </div>
          <div className="hidden md:block h-12 w-px bg-white/20" />
          <div className="text-center md:text-right">
            <div className="flex items-center gap-2 mb-1 justify-center md:justify-end">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-xs opacity-70 uppercase font-bold tracking-widest">
                Finding Drivers
              </p>
            </div>
            <p className="text-xl font-bold">Bids Coming In...</p>
          </div>
        </div>

        <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-4">
          Available Now
          <div className="h-px flex-1 bg-gray-200" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_OFFERS.map((offer) => (
            <Card
              key={offer.id}
              className="relative overflow-hidden group border-2 border-transparent hover:border-green-600 transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center font-black text-xl">
                    {offer.driver[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{offer.driver}</h4>
                    <div className="flex items-center gap-1.5 text-sm">
                      <div className="flex items-center text-yellow-500 font-bold">
                        <Star
                          size={16}
                          fill="currentColor"
                          className="mr-0.5"
                        />
                        {offer.rating}
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500 font-medium italic">
                        {offer.vehicle}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900 leading-none">
                    ${offer.freightPrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mt-1">
                    Freight Rate
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-bold bg-gray-50 px-3 py-1.5 rounded-lg">
                  <Clock size={16} className="text-green-600" />
                  {offer.arrival}
                </div>
                <Button
                  onClick={() => {
                    setSelectedOffer(offer);
                    setView("checkout");
                  }}
                  className="w-auto py-2.5 px-8"
                >
                  Book Bid
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col md:p-8">
      <header className="bg-white p-6 border-b flex items-center gap-4 md:hidden">
        <button onClick={() => setView("offers")} className="text-gray-600">
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <h2 className="text-xl font-bold">Checkout</h2>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 w-full mt-8">
        <div className="order-2 md:order-1 px-6 md:px-0">
          <h3 className="text-2xl font-black mb-6">Payment Method</h3>
          <Card className="mb-6 p-8 flex items-center justify-between border-2 border-green-600/10">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-xl">
                <CreditCard size={32} />
              </div>
              <div>
                <p className="font-black text-lg tracking-widest">•••• 4242</p>
                <p className="text-sm text-gray-500 font-bold">
                  Expires 12/2026
                </p>
              </div>
            </div>
            <button className="text-green-600 font-black text-sm uppercase tracking-wider hover:underline">
              Change
            </button>
          </Card>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-700 uppercase text-xs tracking-widest">
              Safe & Secure
            </h4>
            <div className="flex items-start gap-4">
              <ShieldCheck size={24} className="text-green-600 shrink-0" />
              <p className="text-sm text-gray-500 leading-relaxed">
                Your payment info is encrypted. We use Stripe to handle all
                financial data. Funds are only released to the driver after you
                confirm job completion.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 px-6 md:px-0">
          <h3 className="text-2xl font-black mb-6">Order Summary</h3>
          <Card className="bg-white p-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Disposal Fee (Fixed)</span>
                <span className="font-bold text-gray-900">
                  ${formData.disposalFee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Freight Bid ({selectedOffer?.driver})</span>
                <span className="font-bold text-gray-900">
                  ${selectedOffer?.freightPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>Service Fee</span>
                <span>$4.99</span>
              </div>
              <div className="pt-6 border-t flex justify-between items-end">
                <div>
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    Total Amount
                  </p>
                  <p className="text-4xl font-black text-gray-900 leading-none mt-1">
                    $
                    {(
                      formData.disposalFee +
                      selectedOffer?.freightPrice +
                      4.99
                    ).toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={() => setView("dashboard")}
                  className="w-auto py-4 px-12"
                >
                  Authorize Payment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Desktop Sidebar Nav */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r h-screen sticky top-0 p-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-green-600 p-2 rounded-xl text-white">
            <Trash2 size={24} />
          </div>
          <span className="text-2xl font-black">EcoDump</span>
        </div>
        <nav className="space-y-2 flex-1">
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl bg-green-50 text-green-700 font-bold"
          >
            <Truck size={20} /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl text-gray-500 hover:bg-gray-50 font-bold"
          >
            <History size={20} /> Activity
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl text-gray-500 hover:bg-gray-50 font-bold"
          >
            <Wallet size={20} /> Wallet
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-xl text-gray-500 hover:bg-gray-50 font-bold"
          >
            <Settings size={20} /> Settings
          </a>
        </nav>
        <div className="pt-8 border-t space-y-4">
          <a
            href="#"
            className="flex items-center gap-4 text-sm text-gray-400 hover:text-gray-600 font-medium px-4"
          >
            <HelpCircle size={18} /> Support Center
          </a>
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Pro Member
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <header className="bg-white p-6 border-b flex justify-between items-center md:hidden">
          <h2 className="text-xl font-bold">My Requests</h2>
          <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
            JD
          </div>
        </header>

        <main className="p-6 md:p-12 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black mb-2">Ongoing Service</h1>
              <p className="text-gray-500 font-medium">
                Tracking your driver in real-time
              </p>
            </div>
            <Button
              variant="outline"
              className="md:w-auto"
              onClick={() => setView("landing")}
            >
              + New Request
            </Button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />{" "}
                  En Route
                </div>
                <h3 className="text-3xl font-black mb-2 italic">
                  "{formData.itemType || "Junk"} Pickup"
                </h3>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <MapPin size={18} className="text-green-600" />
                  {formData.address || "123 Market St, San Francisco"}
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center min-w-[180px]">
                <p className="text-5xl font-black text-green-600 leading-none">
                  12
                </p>
                <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mt-3">
                  Mins Away
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 py-8 border-y border-gray-50 mb-10">
              <div className="w-20 h-20 bg-gray-200 rounded-3xl overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-700 font-black text-2xl">
                  {selectedOffer?.driver[0] || "J"}
                </div>
                <div className="absolute bottom-1 right-1 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                  <Star size={12} fill="#eab308" className="text-yellow-500" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-2xl font-black mb-1">
                  {selectedOffer?.driver || "John Smith"}
                </p>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                  {selectedOffer?.vehicle || "Ford F-150"}
                </p>
              </div>
              <div className="flex gap-4">
                <button className="bg-gray-100 p-5 rounded-2xl text-gray-700 hover:bg-green-600 hover:text-white transition-all">
                  <Truck size={24} />
                </button>
                <button className="bg-green-600 p-5 rounded-2xl text-white shadow-lg shadow-green-600/30 hover:scale-105 transition-all">
                  <AlertCircle size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/50">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-bold text-gray-700">Confirmed</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/50">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-bold text-gray-700">Driver Ready</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-blue-200 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock size={20} />
                </div>
                <span className="font-bold text-blue-600">En Route</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-5 z-50 md:hidden">
        <button className="text-green-600 flex flex-col items-center gap-1">
          <Truck size={22} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Active
          </span>
        </button>
        <button className="text-gray-400 flex flex-col items-center gap-1">
          <History size={22} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Past
          </span>
        </button>
        <button className="text-gray-400 flex flex-col items-center gap-1">
          <Wallet size={22} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Wallet
          </span>
        </button>
        <button className="text-gray-400 flex flex-col items-center gap-1">
          <Settings size={22} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            More
          </span>
        </button>
      </nav>
    </div>
  );

  return (
    <div className="font-sans text-gray-900 bg-white selection:bg-green-100 min-h-screen">
      {view === "landing" && renderLanding()}
      {view === "wizard" && renderWizard()}
      {view === "offers" && renderOffers()}
      {view === "checkout" && renderCheckout()}
      {view === "dashboard" && renderDashboard()}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] animate-in fade-in duration-300 md:hidden backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-8 animate-in slide-in-from-right duration-500 shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <span className="font-black text-2xl">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-gray-100 rounded-full text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <a
                href="#"
                className="block font-black text-xl p-4 hover:bg-green-50 rounded-2xl transition-colors"
              >
                How it Works
              </a>
              <a
                href="#"
                className="block font-black text-xl p-4 hover:bg-green-50 rounded-2xl transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block font-black text-xl p-4 hover:bg-green-50 rounded-2xl transition-colors"
              >
                Pricing
              </a>
              <div className="pt-12">
                <Button onClick={handleStartRequest}>Start Pickup</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
