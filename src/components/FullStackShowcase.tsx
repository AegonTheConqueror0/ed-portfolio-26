import { FormEvent, useState, useMemo } from "react";
import { FULLSTACK_PROJECTS } from "../data";
import { FullStackProject } from "../types";
import { 
  Globe, 
  Database, 
  Plus, 
  Sparkles, 
  Server, 
  Check, 
  Trash2, 
  TrendingUp, 
  ShoppingBag, 
  ChevronRight, 
  Activity, 
  Terminal, 
  AlertTriangle, 
  Play, 
  RefreshCw,
  Sparkle,
  ShoppingCart,
  Heart,
  Star,
  User
} from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  bulkSize: number;
  bulkCost: number;
  usedInBatch: number;
  unit: string;
}

export default function FullStackShowcase() {
  const [selectedProj, setSelectedProj] = useState<FullStackProject>(FULLSTACK_PROJECTS[0]);

  // ==========================================
  // ELLIE'S COOKIES STATE (id === "fs1")
  // ==========================================
  const [ellieTab, setEllieTab] = useState<"calculator" | "orders" | "dashboard">("calculator");
  const [cookieName, setCookieName] = useState("Ube White Chocolate Cookies");
  const [batchSize, setBatchSize] = useState(12);
  const [overhead, setOverhead] = useState(15);
  const [sellingPrice, setSellingPrice] = useState(30);

  // Default professional baking ingredients matching ₱rates
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Premium Flour", bulkSize: 1000, bulkCost: 60, usedInBatch: 250, unit: "grams" },
    { id: "2", name: "Refined Sugar", bulkSize: 1000, bulkCost: 80, usedInBatch: 120, unit: "grams" },
    { id: "3", name: "Creamy Butter Block", bulkSize: 225, bulkCost: 130, usedInBatch: 112, unit: "grams" },
    { id: "4", name: "White Choc Chips", bulkSize: 500, bulkCost: 190, usedInBatch: 150, unit: "grams" }
  ]);

  // Firestore Simulated Datasets
  const [savedRecipes, setSavedRecipes] = useState([
    { id: "rec-1", name: "Classic Choco Chip Cookies", costPerCookie: 8.20, sellingPrice: 25.00, profit: 16.80, batchSize: 12, totalProfit: 201.60 },
    { id: "rec-2", name: "Premium Matchamelts", costPerCookie: 11.50, sellingPrice: 35.00, profit: 23.50, batchSize: 12, totalProfit: 282.00 }
  ]);

  const [savedOrders, setSavedOrders] = useState([
    { id: "ORD-9821", customer: "Edgardo Rojas", item: "Classic Choco Chip Cookies", total: 500.00, status: "Baking", date: "Today, 14:20" },
    { id: "ORD-9822", customer: "Dean's Office HCDC", item: "Premium Matchamelts", total: 1050.00, status: "Completed", date: "Yesterday, 11:30" },
    { id: "ORD-9823", customer: "Minez Club Admin", item: "Ube White Chocolate Cookies", total: 360.00, status: "Pending", date: "Today, 10:15" }
  ]);

  // Order Input state
  const [newOrderCustomer, setNewOrderCustomer] = useState("");
  const [selectedRecipeForOrder, setSelectedRecipeForOrder] = useState("rec-1");
  const [orderQuantityBatches, setOrderQuantityBatches] = useState(2);

  // Calculator Form Add state
  const [ingName, setIngName] = useState("");
  const [ingBulkSize, setIngBulkSize] = useState(1000);
  const [ingBulkCost, setIngBulkCost] = useState(100);
  const [ingUsed, setIngUsed] = useState(200);
  const [ingUnit, setIngUnit] = useState("grams");

  // Cost calculations
  const calculatedIngredientsCost = useMemo(() => {
    return ingredients.reduce((sum, ing) => {
      if (ing.bulkSize <= 0) return sum;
      const ingCost = (ing.usedInBatch / ing.bulkSize) * ing.bulkCost;
      return sum + ingCost;
    }, 0);
  }, [ingredients]);

  const totalBatchCost = useMemo(() => {
    return calculatedIngredientsCost + overhead;
  }, [calculatedIngredientsCost, overhead]);

  const costPerCookie = useMemo(() => {
    if (batchSize <= 0) return 0;
    return totalBatchCost / batchSize;
  }, [totalBatchCost, batchSize]);

  const profitPerCookie = useMemo(() => {
    return Math.max(0, sellingPrice - costPerCookie);
  }, [sellingPrice, costPerCookie]);

  const totalBatchProfit = useMemo(() => {
    if (batchSize <= 0) return 0;
    return (sellingPrice * batchSize) - totalBatchCost;
  }, [sellingPrice, batchSize, totalBatchCost]);

  const handleAddIngredient = (e: FormEvent) => {
    e.preventDefault();
    if (!ingName.trim() || ingBulkSize <= 0 || ingBulkCost <= 0 || ingUsed <= 0) return;

    setIngredients(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        name: ingName,
        bulkSize: ingBulkSize,
        bulkCost: ingBulkCost,
        usedInBatch: ingUsed,
        unit: ingUnit
      }
    ]);
    setIngName("");
    setIngUsed(100);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const handleSaveRecipeToFirebase = () => {
    const newRecipe = {
      id: "rec-" + Math.random().toString(36).substring(2, 7),
      name: cookieName,
      costPerCookie: Number(costPerCookie.toFixed(2)),
      sellingPrice: Number(sellingPrice.toFixed(2)),
      profit: Number(profitPerCookie.toFixed(2)),
      batchSize: batchSize,
      totalProfit: Number(totalBatchProfit.toFixed(2))
    };
    setSavedRecipes(prev => [newRecipe, ...prev]);
    alert(`[FIREBASE FIRESTORE] Document successfully set in 'recipes_collection' under: "${cookieName}"!`);
  };

  const handlePlaceOrderFirebase = (e: FormEvent) => {
    e.preventDefault();
    if (!newOrderCustomer.trim()) return;

    const matchedRec = savedRecipes.find(r => r.id === selectedRecipeForOrder) || savedRecipes[0];
    const totalPrice = matchedRec ? (matchedRec.sellingPrice * matchedRec.batchSize * orderQuantityBatches) : 360;

    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customer: newOrderCustomer,
      item: matchedRec ? matchedRec.name : "Custom Cookie Batch",
      total: totalPrice,
      status: "Pending",
      date: "Just now"
    };

    setSavedOrders(prev => [newOrder, ...prev]);
    setNewOrderCustomer("");
    alert(`[FIREBASE FIRESTORE] New order securely authenticated and pushed to 'orders_collection'!`);
  };

  const handleCycleStatus = (orderId: string) => {
    setSavedOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const nextStatus = o.status === "Pending" ? "Baking" : o.status === "Baking" ? "Completed" : "Pending";
      return { ...o, status: nextStatus };
    }));
  };

  const handleDeleteOrder = (orderId: string) => {
    setSavedOrders(prev => prev.filter(o => o.id !== orderId));
  };


  // ==========================================
  // TEACHER TOOLS STATE (id === "fs3")
  // ==========================================
  const [boardTool, setBoardTool] = useState<"board" | "pen" | "text" | "glow" | "erase" | "point">("pen");
  const [brushColor, setBrushColor] = useState("#FF4B3E"); // Coral default
  const [stars, setStars] = useState(60);
  const [classroomTab, setClassroomTab] = useState<"lobby" | "board">("lobby");
  const [classLogs, setClassLogs] = useState<string[]>(["Welcome! 👏", "No PDF"]);
  const [whiteboardLines, setWhiteboardLines] = useState<{ points: { x: number; y: number }[]; color: string; tool: string }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [customTextInputs, setCustomTextInputs] = useState<{ id: string; text: string; x: number; y: number; color: string }[]>([]);
  const [newTextVal, setNewTextVal] = useState("");
  const [uploadPresetImg, setUploadPresetImg] = useState<string | null>(null);
  const [starTriggerCount, setStarTriggerCount] = useState(0);

  const handleRewardStar = () => {
    setStars(prev => prev + 1);
    setStarTriggerCount(prev => prev + 1);
    setClassLogs(prev => [`Awarded 1 Star! ⭐ Total: ${stars + 1}`, ...prev]);
  };

  const handleUploadSampleImage = (type: "math" | "science" | "chart") => {
    const urls = {
      math: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400",
      science: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400",
      chart: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
    };
    setUploadPresetImg(urls[type]);
    setClassLogs(prev => [`Successfully uploaded ${type} material! 🖼️`, ...prev]);
    setClassroomTab("board");
  };

  const handleSharePDF = (name: string) => {
    setClassLogs(prev => [`Shared PDF resource: "${name}" 📄`, ...prev]);
    setClassroomTab("board");
  };

  // ==========================================
  // ER LIFESTYLES STATE (id === "fs4")
  // ==========================================
  const [erActiveTab, setErActiveTab] = useState<"storefront" | "pos" | "inventory" | "testimonies">("storefront");
  const [erProductFilter, setErProductFilter] = useState<string>("All");
  const [erCart, setErCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [erOrders, setErOrders] = useState<{ id: string; customer: string; value: number; status: "Pending" | "Paid" | "Dispatched"; agent: string }[]>([
    { id: "#ER-9402", customer: "Maria Delos Reyes", value: 3760, status: "Paid", agent: "Edgardo Rojas" },
    { id: "#ER-9403", customer: "Juan Dela Cruz", value: 1580, status: "Pending", agent: "System Auto-POS" },
    { id: "#ER-9404", customer: "Sofia Almeda", value: 8800, status: "Dispatched", agent: "HCDC Partner" }
  ]);
  const [erInventory, setErInventory] = useState<{ [key: string]: number }>({
    "Intra (Liquid)": 45,
    "FibreLife": 24,
    "NutriaPlus": 32,
    "CardioLife": 18,
    "Better Together Kit": 8
  });
  const [erTestimonials, setErTestimonials] = useState<{ id: string; name: string; rating: number; text: string; date: string }[]>([
    { id: "1", name: "Corazon N.", rating: 5, text: "I have been taking Intra liquid for over 3 years. It has completely changed my daily energy levels and digestion! Definitely a must-have wellness formula.", date: "June 2, 2026" },
    { id: "2", name: "Pastor Lemuel", rating: 5, text: "FibreLife has really helped regulate my blood sugar levels and fullness. High quality, safe fiber content.", date: "May 28, 2026" },
    { id: "3", name: "Dr. Elena S.", rating: 4, text: "Combining NutriaPlus with CardioLife offers strong antioxidant defense and cardiovascular support. My patients trust the formulation.", date: "June 10, 2026" }
  ]);

  // State for form inputs
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialText, setNewTestimonialText] = useState("");
  const [newTestimonialRating, setNewTestimonialRating] = useState(5);
  const [newErCustomer, setNewErCustomer] = useState("");
  const [newErValue, setNewErValue] = useState(1880);

  const handleAddToCart = (productName: string, price: number, id: string) => {
    if ((erInventory[productName] || 0) <= 0) {
      alert(`${productName} is currently out of stock in inventory!`);
      return;
    }

    setErCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id, name: productName, price, quantity: 1 }];
    });

    setErInventory(prev => ({
      ...prev,
      [productName]: Math.max(0, prev[productName] - 1)
    }));
  };

  const handleRemoveFromCart = (id: string, productName: string, qty: number) => {
    setErCart(prev => prev.filter(item => item.id !== id));
    setErInventory(prev => ({
      ...prev,
      [productName]: (prev[productName] || 0) + qty
    }));
  };

  const handleCheckoutCart = (customerName: string = "Walk-in Customer") => {
    if (erCart.length === 0) return;

    const totalVal = erCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrderId = `#ER-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newOrderId,
      customer: customerName,
      value: totalVal,
      status: "Paid" as const,
      agent: "System Auto-POS"
    };

    setErOrders(prev => [newOrder, ...prev]);
    setErCart([]);
  };

  const handleToggleOrderStatus = (id: string) => {
    setErOrders(prev => prev.map(ord => {
      if (ord.id === id) {
        const nextStatus = ord.status === "Pending" ? "Paid" : ord.status === "Paid" ? "Dispatched" : "Pending";
        return { ...ord, status: nextStatus };
      }
      return ord;
    }));
  };

  const handleDeleteErOrder = (id: string) => {
    setErOrders(prev => prev.filter(ord => ord.id !== id));
  };

  const handleAddCustomOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!newErCustomer.trim()) return;

    const newOrderId = `#ER-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      customer: newErCustomer,
      value: newErValue,
      status: "Pending" as const,
      agent: "Edgardo Rojas"
    };

    setErOrders(prev => [newOrder, ...prev]);
    setNewErCustomer("");
    setNewErValue(1880);
  };

  const handleSeedErCatalog = () => {
    const seedRecords = [
      { id: `#ER-${Math.floor(1000 + Math.random() * 9000)}`, customer: "Felipe Miranda", value: 3160, status: "Paid" as const, agent: "Wellness Agent #4" },
      { id: `#ER-${Math.floor(1000 + Math.random() * 9000)}`, customer: "Elena Roxas", value: 8800, status: "Paid" as const, agent: "Edgardo Rojas" },
      { id: `#ER-${Math.floor(1000 + Math.random() * 9000)}`, customer: "Davao Center Partner", value: 18800, status: "Dispatched" as const, agent: "System Auto-POS" }
    ];
    setErOrders(prev => [...seedRecords, ...prev]);
  };

  const handleRestockProduct = (productName: string) => {
    setErInventory(prev => ({
      ...prev,
      [productName]: (prev[productName] || 0) + 10
    }));
  };

  const handleAddTestimonial = (e: FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName.trim() || !newTestimonialText.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      name: newTestimonialName,
      rating: newTestimonialRating,
      text: newTestimonialText,
      date: "Today"
    };

    setErTestimonials(prev => [newEntry, ...prev]);
    setNewTestimonialName("");
    setNewTestimonialText("");
    setNewTestimonialRating(5);
  };

  return (
    <div className="space-y-8" id="fullstack-showcase-container">
      
      {/* Intro Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0f] to-emerald-950/40 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-48 w-48 opacity-10 bg-radial-gradient"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#cebfff] text-indigo-300">
            <Server className="h-3 w-3 text-emerald-400" />
            Full Stack Web Portfolio
          </span>
          <h3 className="text-3xl font-light tracking-tight font-display text-white">
            Personal <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">Web Engineering & Cloud Services</span>
          </h3>
          <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
            Beautiful responsive web applications pairing serverless real-time database clusters and state managers 
            with pixel-perfect client-side UI layouts in Tailwind CSS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Left Side: Web Apps Catalog */}
        <div className="lg:col-span-5 space-y-4" id="web-apps-catalog">
          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-400" />
            Core Web Deployments
          </h4>
          <p className="text-zinc-400 text-xs text-left">Deployments built to solve practical workflow and calculating challenges with real-world utility.</p>
          
          <div className="space-y-3">
            {FULLSTACK_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProj(proj)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border cursor-pointer ${
                  selectedProj.id === proj.id
                    ? "bg-white/10 border-indigo-500/50 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
                id={`project-btn-${proj.id}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-white text-sm">{proj.title}</h5>
                  <div className="flex items-center gap-2">
                     {proj.liveUrl && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Live System"></span>}
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">{proj.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-[#050508] text-zinc-400 px-2.5 py-0.5 rounded text-[10px] font-mono border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Project Details Panel */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mt-4">
            <h5 className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2.5">Platform Mechanics</h5>
            <h4 className="text-sm font-semibold text-white mb-4">{selectedProj.title} Features</h4>
            
            {selectedProj.visualThumbnailUrl && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-neutral-950 shadow-inner group mb-4">
                <img
                  src={selectedProj.visualThumbnailUrl}
                  alt={`${selectedProj.title} interactive user interface`}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transform hover:scale-[1.03] transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest mb-0.5 block">PRODUCTION CLOUD SCREENSHOT PREVIEW</span>
                  <p className="text-xs font-semibold text-white leading-normal font-sans">{selectedProj.title}</p>
                </div>
              </div>
            )}

            <ul className="space-y-2">
              {selectedProj.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed text-left">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {selectedProj.liveUrl && (
              <div className="mt-5 pt-4 border-t border-white/5">
                <a
                  href={selectedProj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-150 shadow-md border-none cursor-pointer no-underline text-center hover:scale-[1.01] active:scale-[0.99]"
                  id={`open-live-btn-${selectedProj.id}`}
                >
                  <Globe className="h-4 w-4 text-emerald-400 animate-pulse" />
                  Launch {selectedProj.id === "fs3" ? "Teacher Tools App" : "Live App"} 🚀
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Interactive Workplace/Simulator */}
        <div className="lg:col-span-7 flex flex-col space-y-6" id="db-playground">
          
          {selectedProj.id === "fs1" ? (
            /* ==========================================
               ELLIE'S COOKIES WORKSPACE INTERACTIVE
               ========================================== */
            <div className="rounded-2xl border border-white/10 bg-[#07070a] shadow-2xl overflow-hidden flex flex-col h-full">
              {/* Top Banner tabs matching their UI layout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 gap-2">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-amber-500" />
                  <span className="font-bold uppercase tracking-wider text-white text-[11px]">Ellie's Cookies App Playground</span>
                </div>
                
                {/* Navbar matching screenshot tabs */}
                <div className="flex gap-1 bg-[#050508] p-1 rounded-sm border border-white/10 max-w-fit">
                  <button
                    onClick={() => setEllieTab("calculator")}
                    className={`px-3 py-1 rounded-sm text-[10px] uppercase font-semibold font-sans tracking-wide transition-all border-none cursor-pointer ${
                      ellieTab === "calculator" ? "bg-amber-500 text-black font-bold" : "text-zinc-500 hover:text-white"
                    }`}
                    id="el-tab-calc"
                  >
                    Calculator
                  </button>
                  <button
                    onClick={() => setEllieTab("orders")}
                    className={`px-3 py-1 rounded-sm text-[10px] uppercase font-semibold font-sans tracking-wide transition-all border-none cursor-pointer ${
                      ellieTab === "orders" ? "bg-amber-500 text-black font-bold" : "text-zinc-500 hover:text-white"
                    }`}
                    id="el-tab-orders"
                  >
                    Orders Collection
                  </button>
                  <button
                    onClick={() => setEllieTab("dashboard")}
                    className={`px-3 py-1 rounded-sm text-[10px] uppercase font-semibold font-sans tracking-wide transition-all border-none cursor-pointer ${
                      ellieTab === "dashboard" ? "bg-amber-500 text-black font-bold" : "text-zinc-500 hover:text-white"
                    }`}
                    id="el-tab-dash"
                  >
                    Sales Dashboard
                  </button>
                </div>
              </div>

              {/* Playground body */}
              <div className="p-5 overflow-y-auto space-y-6 flex-1 min-h-[450px]">
                
                {ellieTab === "calculator" && (
                  <div className="space-y-6">
                    {/* General Recipe Meta Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-zinc-500 font-bold block uppercase mb-1">Recipe / Cookie Variant Name</label>
                        <input 
                          type="text" 
                          value={cookieName} 
                          onChange={(e) => setCookieName(e.target.value)}
                          className="w-full bg-black/45 border border-white/10 text-xs px-3 py-2 text-white rounded focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold block uppercase mb-1">Batch Size (count)</label>
                          <input 
                            type="number" 
                            value={batchSize} 
                            onChange={(e) => setBatchSize(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-black/45 border border-white/10 text-xs px-3 py-2 text-white rounded focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-500 font-bold block uppercase mb-1">Overhead Utility (₱)</label>
                          <input 
                            type="number" 
                            value={overhead} 
                            onChange={(e) => setOverhead(Math.max(0, Number(e.target.value)))}
                            className="w-full bg-black/45 border border-white/10 text-xs px-3 py-2 text-white rounded focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Ingredients cost calculator rows representation */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Live Cost-Weight Table</h5>
                        <span className="text-[9px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-400/5 border border-amber-400/10">FORMULA: (Used / Bulk) * BulkCost</span>
                      </div>
                      
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                        {ingredients.map((ing) => {
                          const cost = (ing.usedInBatch / ing.bulkSize) * ing.bulkCost;
                          return (
                            <div key={ing.id} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 text-xs text-zinc-300">
                              <div className="flex-1 text-left">
                                <span className="font-semibold text-white block">{ing.name}</span>
                                <span className="text-[10px] text-zinc-500">Bulk Size: {ing.bulkSize}{ing.unit} | Cost: ₱{ing.bulkCost}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className="font-mono text-zinc-400 block">{ing.usedInBatch}{ing.unit} used</span>
                                  <span className="font-mono text-amber-400 font-bold">₱{cost.toFixed(2)}</span>
                                </div>
                                <button
                                  onClick={() => handleRemoveIngredient(ing.id)}
                                  className="text-zinc-600 hover:text-red-400 p-1 rounded-full cursor-pointer bg-transparent border-none"
                                  title="Delete ingredient"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form to insert new ingredient */}
                    <form onSubmit={handleAddIngredient} className="bg-white/5 border border-white/15 p-4 rounded-xl space-y-3">
                      <h6 className="text-[10px] font-bold text-zinc-300 tracking-wide uppercase flex items-center gap-1.5">
                        <Plus className="h-3 w-3 text-amber-500" /> Add Ingredient to calculator
                      </h6>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[8px] text-zinc-500 block uppercase font-bold mb-0.5">INGREDIENT NAME</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Pecan Nuts" 
                            value={ingName} 
                            onChange={(e) => setIngName(e.target.value)}
                            className="w-full bg-[#030305] text-xs px-2 py-1.5 border border-white/10 text-white placeholder-zinc-700"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] text-zinc-500 block uppercase font-bold mb-0.5">BULK SIZE (grams/ml)</label>
                          <input 
                            type="number" 
                            value={ingBulkSize} 
                            onChange={(e) => setIngBulkSize(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-[#030305] text-xs px-2 py-1.5 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] text-zinc-500 block uppercase font-bold mb-0.5">BULK COST (₱)</label>
                          <input 
                            type="number" 
                            value={ingBulkCost} 
                            onChange={(e) => setIngBulkCost(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-[#030305] text-xs px-2 py-1.5 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] text-zinc-500 block uppercase font-bold mb-0.5">USED IN BATCH</label>
                          <input 
                            type="number" 
                            value={ingUsed} 
                            onChange={(e) => setIngUsed(Math.max(1, Number(e.target.value)))}
                            className="w-full bg-[#030305] text-xs px-2 py-1.5 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-[#050508] hover:bg-[#101015] text-zinc-300 font-mono text-[10px] p-2 border border-white/10 font-bold uppercase cursor-pointer"
                      >
                        + Add ingredient row
                      </button>
                    </form>

                    {/* COST SUMMARY PANEL - Real Philippine weights & metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="rounded-xl border border-white/5 bg-black/45 p-4.5 space-y-4">
                        <h6 className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider">Selling Config</h6>
                        <div>
                          <label className="text-[10px] text-zinc-500 block mb-1">Target Selling Price per Cookie (₱)</label>
                          <span className="flex items-center gap-1.5 bg-[#030305] border border-white/10 rounded px-3 py-1.5">
                            <span className="text-zinc-500 text-xs">₱</span>
                            <input 
                              type="number" 
                              value={sellingPrice} 
                              onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value)))}
                              className="w-full bg-transparent border-none text-white text-xs font-bold focus:outline-none font-mono"
                            />
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="p-2 bg-white/5 border border-white/5 rounded">
                            <span className="block text-[8px] text-zinc-500 font-bold uppercase">Ingredients Cost</span>
                            <span className="text-xs font-bold text-white font-mono">₱{calculatedIngredientsCost.toFixed(2)}</span>
                          </div>
                          <div className="p-2 bg-white/5 border border-white/5 rounded">
                            <span className="block text-[8px] text-zinc-500 font-bold uppercase">Total Batch Cost</span>
                            <span className="text-xs font-bold text-white font-mono">₱{totalBatchCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Display calculations exactly like the screenshot */}
                      <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4.5 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-amber-500/10">
                            <div>
                              <span className="text-[9px] text-zinc-400 block uppercase font-bold">Cost / Cookie</span>
                              <span className="text-base font-bold text-orange-400 font-mono">₱{costPerCookie.toFixed(2)}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-zinc-400 block uppercase font-bold">Maturity / Selling Price</span>
                              <span className="text-base font-bold text-amber-500 font-mono">₱{sellingPrice.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-[10px] text-emerald-400 font-bold block">Profit / Cookie</span>
                              <span className="text-xl font-black text-emerald-400 font-mono">₱{profitPerCookie.toFixed(2)}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-emerald-400 font-bold block">Total Batch Profit</span>
                              <span className="text-xl font-black text-emerald-400 font-mono">₱{totalBatchProfit.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleSaveRecipeToFirebase}
                          className="mt-4 w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase font-sans py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-lg border-none hover:scale-[1.01] transition-transform font-bold cursor-pointer"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-black" />
                          Save Recipe to Firestore
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {ellieTab === "orders" && (
                  <div className="space-y-6">
                    {/* Log simulated new orders */}
                    <form onSubmit={handlePlaceOrderFirebase} className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-4">
                      <h5 className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
                        <Sparkle className="h-3.5 w-3.5" /> Log Custom Client Order (Firebase Auth Secured)
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[9px] text-zinc-500 block font-bold mb-1">CUSTOMER NAME</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Edgardo Rojas" 
                            value={newOrderCustomer}
                            onChange={(e) => setNewOrderCustomer(e.target.value)}
                            className="bg-[#050508] border border-white/10 text-xs rounded px-3 py-2 text-white w-full focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] text-zinc-500 block font-bold mb-1">SELECT RECIPE</label>
                          <select
                            value={selectedRecipeForOrder}
                            onChange={(e) => setSelectedRecipeForOrder(e.target.value)}
                            className="bg-[#050508] border border-white/10 text-xs rounded px-3 py-2 text-white w-full focus:outline-none"
                          >
                            <option value="custom">Ube White Chocolate Cookies (₱360.00 / batch)</option>
                            {savedRecipes.map(r => (
                              <option key={r.id} value={r.id}>{r.name} (₱{(r.sellingPrice * r.batchSize).toFixed(2)} / batch)</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] text-zinc-500 block font-bold mb-1">QUANTITY BATCHES</label>
                          <input 
                            type="number" 
                            value={orderQuantityBatches}
                            onChange={(e) => setOrderQuantityBatches(Math.max(1, Number(e.target.value)))}
                            className="bg-[#050508] border border-white/10 text-xs rounded px-3 py-2 text-white w-full focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-[11px] py-2.5 rounded transition-all cursor-pointer border-none"
                      >
                        Push Order to 'orders_collection' Document
                      </button>
                    </form>

                    {/* Firestore orders collection listing */}
                    <div className="space-y-2">
                      <h5 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center justify-between">
                        <span>Firestore 'orders_collection' browser</span>
                        <span className="text-[8px] font-mono text-zinc-500 uppercase">Click on Status to toggle life status cycles</span>
                      </h5>
                      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#050508]">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] uppercase font-bold">
                              <th className="p-3 text-center">ID</th>
                              <th className="p-3">Client</th>
                              <th className="p-3">Item Variant</th>
                              <th className="p-3">Order Grand Total</th>
                              <th className="p-3">Status</th>
                              <th className="p-3 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {savedOrders.map(ord => (
                              <tr key={ord.id} className="hover:bg-white/5 transition-colors text-zinc-300">
                                <td className="p-3 font-mono text-[10px] text-zinc-500 text-center">{ord.id}</td>
                                <td className="p-3 font-semibold text-white">{ord.customer}</td>
                                <td className="p-3 text-zinc-450">{ord.item}</td>
                                <td className="p-3 font-bold font-mono text-emerald-400">₱{ord.total.toFixed(2)}</td>
                                <td className="p-3">
                                  <button
                                    onClick={() => handleCycleStatus(ord.id)}
                                    className={`px-2.5 py-1 text-[9px] uppercase font-mono font-bold tracking-wider rounded-xl cursor-pointer border-none ${
                                      ord.status === "Completed" 
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                        : ord.status === "Baking"
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    }`}
                                  >
                                    ● {ord.status}
                                  </button>
                                </td>
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => handleDeleteOrder(ord.id)}
                                    className="p-1 cursor-pointer bg-transparent border-none text-zinc-600 hover:text-red-500"
                                    title="Delete document"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {ellieTab === "dashboard" && (
                  <div className="space-y-6">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl border border-white/5 bg-black/45 text-left">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Total Pipeline Revenue</span>
                        <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">₱26,450.00</span>
                        <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 mt-1.5">
                          <TrendingUp className="h-3 w-3" /> +14.2% this month
                        </span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-black/45 text-left">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Active Recipes Configured</span>
                        <span className="text-xl font-bold font-mono text-white mt-1 block">{savedRecipes.length + 1} recipes</span>
                        <span className="text-[10px] font-mono text-zinc-500 block mt-1.5">In Firebase firestore collection</span>
                      </div>
                      <div className="p-4 rounded-xl border border-white/5 bg-black/45 text-left">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Average Batch Margin</span>
                        <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">68.5% Net</span>
                        <span className="text-[10px] font-mono text-zinc-500 block mt-1.5">Outperforming typical retail</span>
                      </div>
                    </div>

                    {/* Simple Custom Bar Chart demonstrating sales distribution */}
                    <div className="p-5 border border-white/10 rounded-xl bg-black/40 space-y-4 text-left">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="h-4 w-4 text-orange-400" /> Metric Flavor Sales Distribution
                      </h5>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-300">Classic Choco Chip Cookies</span>
                            <span className="font-mono text-zinc-400 font-semibold">142 batches (₱42,600 revenue)</span>
                          </div>
                          <div className="w-full bg-[#030305] h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-300">Premium Matchamelts</span>
                            <span className="font-mono text-zinc-400 font-semibold">88 batches (₱30,800 revenue)</span>
                          </div>
                          <div className="w-full bg-[#030305] h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-300">Ube White Chocolate Cookies (Bestseller)</span>
                            <span className="font-mono text-zinc-400 font-semibold">190 batches (₱57,000 revenue)</span>
                          </div>
                          <div className="w-full bg-[#030305] h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div className="bg-indigo-500 h-full rounded-full animate-pulse" style={{ width: "85%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ) : selectedProj.id === "fs3" ? (
            /* ==========================================
               TEACHER TOOLS WORKSPACE INTERACTIVE (fs3)
               ========================================== */
            <div className="rounded-2xl border border-white/10 bg-[#0c0c12] shadow-2xl overflow-hidden flex flex-col h-full text-zinc-300">
              
              {/* Premium Direct Anchor bar linking to Vercel application */}
              <div className="bg-gradient-to-r from-[#FF7A59] to-[#2EADB1] text-black px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
                  <span className="font-bold tracking-wide">Teacher Tools LMS Online System Live:</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold text-[10px]">teacher-tools-three.vercel.app</span>
                </div>
                <a
                  href="https://teacher-tools-three.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-900 text-white font-bold rounded uppercase tracking-wider text-[10px] flex items-center gap-1 shadow-lg no-underline hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Globe className="h-3.5 w-3.5 text-[#2EADB1]" />
                  Open Live Vercel App 🚀
                </a>
              </div>

              {/* Classroom App Frame Layout */}
              <div className="flex flex-col bg-[#F9ECE7] text-slate-800 font-sans p-2 select-none">
                
                {/* Classroom Header */}
                <div className="bg-[#FF7A59] text-white rounded-t-xl px-4 py-3 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-white/20 rounded-lg">🏫</span>
                    <div>
                      <h4 className="text-sm font-black font-sans leading-none">Classroom: Caleb</h4>
                      <span className="text-[9px] opacity-80 font-mono tracking-wider uppercase">Active Session Room</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded">TEACHER LOGGED</span>
                    <span className="h-7 w-7 rounded-full bg-[#2EADB1] border-2 border-white flex items-center justify-center font-bold text-xs text-white">T</span>
                  </div>
                </div>

                {/* Sub-workspace wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-3">
                  
                  {/* LEFT SIDEBAR - Interactive Tools of the whiteboard */}
                  <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-between md:justify-start gap-2.5 bg-white p-3 rounded-2xl shadow-sm border border-[#f1e5df]">
                    
                    {/* Tool selection (corresponds to sidebar tools in Caleb's app) */}
                    <div className="flex flex-row md:flex-col gap-1.5">
                      <button
                        onClick={() => {
                          setBoardTool("board");
                          setClassLogs(prev => ["Selected Board Nav Tool 🌐", ...prev]);
                        }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[10px] border-none uppercase transition-all cursor-pointer ${
                          boardTool === "board" ? "bg-fuchsia-100 text-fuchsia-600 border border-fuchsia-300" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-650"
                        }`}
                        title="Board view tool"
                      >
                        Board
                      </button>

                      <button
                        onClick={() => {
                          setBoardTool("pen");
                          setClassLogs(prev => ["Switched to Active Drawing Pen 🖊️", ...prev]);
                        }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[10px] border-none uppercase transition-all cursor-pointer ${
                          boardTool === "pen" ? "bg-cyan-100 text-cyan-600 border border-cyan-300" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-650"
                        }`}
                        title="Drawing pen"
                      >
                        Pen
                      </button>

                      <button
                        onClick={() => {
                          setBoardTool("text");
                          setClassLogs(prev => ["Text Annotation Layer enabled 🔠", ...prev]);
                        }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[10px] border-none uppercase transition-all cursor-pointer ${
                          boardTool === "text" ? "bg-orange-100 text-orange-600 border border-orange-300" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-650"
                        }`}
                        title="Text layer"
                      >
                        Text
                      </button>

                      <button
                        onClick={() => {
                          setBoardTool("glow");
                          setClassLogs(prev => ["Highlighter glow paint mode active ✨", ...prev]);
                        }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[10px] border-none uppercase transition-all cursor-pointer ${
                          boardTool === "glow" ? "bg-amber-100 text-amber-600 border border-amber-300" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-650"
                        }`}
                        title="Highlight brush"
                      >
                        Glow
                      </button>

                      <button
                        onClick={() => {
                          setBoardTool("erase");
                          setClassLogs(prev => ["Eraser brush tool selected 🧽", ...prev]);
                        }}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-[10px] border-none uppercase transition-all cursor-pointer ${
                          boardTool === "erase" ? "bg-rose-100 text-rose-600 border border-rose-300" : "bg-neutral-50 hover:bg-neutral-100 text-neutral-650"
                        }`}
                        title="Clean stroke eraser"
                      >
                        Erase
                      </button>
                    </div>

                    <hr className="hidden md:block w-full border-neutral-100 my-1" />

                    {/* Color selection dots */}
                    <div className="flex flex-row md:flex-col gap-1">
                      {[
                        { hex: "#FF4B3E", name: "Red" },
                        { hex: "#2EADB1", name: "Teal" },
                        { hex: "#3B82F6", name: "Blue" },
                        { hex: "#10B981", name: "Green" },
                        { hex: "#F59E0B", name: "Gold" },
                        { hex: "#000000", name: "Ink" }
                      ].map(color => (
                        <button
                          key={color.hex}
                          onClick={() => {
                            setBrushColor(color.hex);
                            setClassLogs(prev => [`Selected ${color.name} color swatch`, ...prev]);
                          }}
                          style={{ backgroundColor: color.hex }}
                          className={`h-5 w-5 rounded-full border-none cursor-pointer transform hover:scale-125 transition-all ${
                            brushColor === color.hex ? "ring-2 ring-slate-800 ring-offset-2 scale-110" : "opacity-80"
                          }`}
                          title={color.name}
                        />
                      ))}
                    </div>

                    {/* Clear button */}
                    <button
                      onClick={() => {
                        setWhiteboardLines([]);
                        setCustomTextInputs([]);
                        setUploadPresetImg(null);
                        setClassLogs(prev => ["Cleaned whiteboard stage completely! 🧹", ...prev]);
                      }}
                      className="h-8 md:mt-2 px-2 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-lg text-[9px] uppercase tracking-wide font-bold text-rose-500 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  {/* CENTRAL DRAWING / PRESENTATION STAGE */}
                  <div className="md:col-span-8 flex flex-col gap-3">
                    
                    <div 
                      className="relative bg-[#EFF3F6] rounded-2xl h-[380px] border-2 border-white shadow-inner overflow-hidden cursor-crosshair"
                      onMouseDown={(e) => {
                        if (classroomTab === "lobby") return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        setIsDrawing(true);
                        setWhiteboardLines(prev => [...prev, { points: [{ x, y }], color: brushColor, tool: boardTool }]);
                      }}
                      onMouseMove={(e) => {
                        if (!isDrawing) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        setWhiteboardLines(prev => {
                          const copy = [...prev];
                          if (copy.length === 0) return copy;
                          const lastLine = copy[copy.length - 1];
                          lastLine.points = [...lastLine.points, { x, y }];
                          return copy;
                        });
                      }}
                      onMouseUp={() => setIsDrawing(false)}
                      onMouseLeave={() => setIsDrawing(false)}
                    >
                      
                      {classroomTab === "lobby" ? (
                        /* Standard Pick lesson welcome view shown inside their app screenshot */
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <div className="bg-white rounded-3xl p-8 max-w-sm shadow-xl border border-neutral-100 flex flex-col items-center text-slate-800">
                            <div className="bg-emerald-100 text-emerald-600 rounded-2xl p-4 mb-4">
                              <Plus className="h-8 w-8 text-[#2EADB1]" />
                            </div>
                            <h3 className="text-xl font-black mb-1">Welcome Teacher!</h3>
                            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                              Simulate classroom lesson plans. Pick a PDF template lesson or active drawing Magic Board.
                            </p>
                            
                            <div className="space-y-2.5 w-full">
                              <button
                                onClick={() => {
                                  setClassroomTab("board");
                                  handleSharePDF("Linguistic_IT_Curriculum.pdf");
                                }}
                                className="w-full bg-[#FF7A59] hover:bg-[#ff6842] text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider shadow border-none transition-transform active:scale-95 cursor-pointer"
                              >
                                LOAD LESSON
                              </button>
                              
                              <button
                                onClick={() => {
                                  setClassroomTab("board");
                                  setClassLogs(prev => ["Entered Whiteboard Drawing sandbox directly 🖊️", ...prev]);
                                }}
                                className="w-full bg-[#2EADB1] hover:bg-[#25979a] text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider border-none transition-all cursor-pointer"
                              >
                                MAGIC BOARD
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Classroom dynamic interactive drawing canvas with dynamic material backdrop */
                        <div className="absolute inset-0 w-full h-full relative">
                          
                          {/* Selected shared presentation document preset backdrop if uploaded */}
                          {uploadPresetImg ? (
                            <div className="absolute inset-0 p-8 flex items-center justify-center bg-zinc-100">
                              <img 
                                src={uploadPresetImg} 
                                alt="Lesson asset material" 
                                className="max-h-full max-w-full rounded-lg shadow-md object-contain border border-neutral-200"
                              />
                            </div>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#EFF3F6] pointer-events-none">
                              <div className="text-center opacity-30 select-none max-w-sm">
                                <span className="text-3xl block mb-2">🖊️</span>
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-700">Drawing Board Active</p>
                                <p className="text-[10px] mt-1 text-neutral-600 font-sans">Click and drag inside this grey workspace to draw freehand brushes representing actual lesson writing!</p>
                              </div>
                            </div>
                          )}

                          {/* Freehand rendering SVG overlay */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {whiteboardLines.map((line, lidx) => (
                              <polyline
                                key={lidx}
                                fill="none"
                                stroke={line.tool === "erase" ? "#EFF3F6" : line.color}
                                strokeWidth={line.tool === "glow" ? 14 : line.tool === "erase" ? 30 : 4}
                                strokeOpacity={line.tool === "glow" ? 0.35 : 1}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points={line.points.map(p => `${p.x},${p.y}`).join(" ")}
                              />
                            ))}
                          </svg>

                          {/* Floating typed annotations */}
                          {customTextInputs.map(item => (
                            <div
                              key={item.id}
                              style={{ left: item.x, top: item.y, color: item.color }}
                              className="absolute bg-white/95 px-2 py-1 rounded-md shadow-sm border border-neutral-200 font-bold text-xs pointer-events-auto"
                            >
                              {item.text}
                            </div>
                          ))}

                          {/* Float confetti or star reward notification alerts on whiteboard */}
                          {starTriggerCount > 0 && (
                            <div className="absolute bottom-5 left-5 bg-purple-600 text-white rounded-full px-4 py-2 text-[10px] tracking-widest font-mono uppercase font-black tracking-wider animate-bounce shadow-lg">
                              ⭐ STAR SENT TO CALEB! ⭐
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tool selection status overlay */}
                      {classroomTab !== "lobby" && (
                        <div className="absolute top-2 right-2 bg-slate-900/80 text-white px-2.5 py-1 rounded text-[9px] uppercase tracking-wider font-bold">
                          Active Tool: {boardTool}
                        </div>
                      )}
                    </div>

                    {/* Whiteboard Actions Control Tray */}
                    {classroomTab !== "lobby" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        
                        {/* Preset assets to teach */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">IMAGE PRESENTATIONS</span>
                          <div className="flex gap-1.5 justify-between">
                            <button
                              onClick={() => handleUploadSampleImage("math")}
                              className="w-full bg-slate-50 hover:bg-slate-100 text-[9px] font-semibold py-1 border border-neutral-100 rounded text-slate-700"
                            >
                              Math Eq
                            </button>
                            <button
                              onClick={() => handleUploadSampleImage("science")}
                              className="w-full bg-slate-50 hover:bg-slate-100 text-[9px] font-semibold py-1 border border-neutral-100 rounded text-slate-700"
                            >
                              Atom Lab
                            </button>
                            <button
                              onClick={() => handleUploadSampleImage("chart")}
                              className="w-full bg-slate-50 hover:bg-slate-100 text-[9px] font-semibold py-1 border border-neutral-100 rounded text-slate-700"
                            >
                              Analytics
                            </button>
                          </div>
                        </div>

                        {/* Text layout placement tool */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-500 block">WHITEBOARD TEXT TYPING</span>
                          <div className="flex gap-1.5 mt-1">
                            <input
                              type="text"
                              value={newTextVal}
                              placeholder="e.g. Solve: 5x + 3"
                              onChange={(e) => setNewTextVal(e.target.value)}
                              className="w-full bg-neutral-50 text-[10px] px-2 py-1 rounded border border-neutral-200 placeholder-zinc-400 focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                if (!newTextVal) return;
                                const randomX = 50 + Math.random() * 200;
                                const randomY = 60 + Math.random() * 150;
                                setCustomTextInputs(prev => [...prev, { id: Math.random().toString(), text: newTextVal, x: randomX, y: randomY, color: brushColor }]);
                                setClassLogs(prev => [`Placed typed text "${newTextVal}" on canvas`, ...prev]);
                                setNewTextVal("");
                              }}
                              className="bg-slate-900 text-white rounded px-2.5 py-1 text-[9px] uppercase font-bold"
                            >
                              Inject
                            </button>
                          </div>
                        </div>

                        {/* General exit options */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center">
                          <button
                            onClick={() => {
                              setClassroomTab("lobby");
                              setClassLogs(prev => ["LMS lobby returned", ...prev]);
                            }}
                            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-black py-2.5 px-3 rounded-lg text-[10px] uppercase font-mono tracking-widest font-black"
                          >
                            Reset to Welcome Screen
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* RIGHT SIDEBAR - Class Logs & Interactive STAR REWARD button they can click */}
                  <div className="md:col-span-3 flex flex-col gap-3">
                    
                    {/* Class Logs capsules matching screenshot */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#f1e5df] flex flex-col h-[230px]">
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-2 font-mono">CLASS LOGS</h4>
                      <div className="space-y-2 overflow-y-auto flex-1 pr-1 text-left">
                        {classLogs.map((logStr, lidx) => (
                          <div
                            key={lidx}
                            className="bg-neutral-50 border border-neutral-100 py-1.5 px-2.5 rounded-xl text-[11px] font-semibold text-slate-700 leading-tight"
                          >
                            {logStr}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* INTERACTIVE STAR REWARD BUTTON - THE USER REQUESTED COMPONENT THEY CAN PRESS */}
                    <button
                      onClick={handleRewardStar}
                      className="bg-[#6B5AE0] hover:bg-[#5948cc] text-white p-4 rounded-2xl shadow-lg hover:shadow-xl text-center flex flex-col items-center justify-between min-h-[170px] border-none group cursor-pointer transition-all transform hover:-translate-y-1 active:translate-y-0"
                      id="star-reward-press-btn"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 text-purple-200">Interactive Clicker</span>
                        <span className="text-purple-300 group-hover:animate-spin">🔄 Click to Award</span>
                      </div>

                      {/* Moving star animation indicator */}
                      <div className="relative my-2">
                        <span className="text-5xl filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] block animate-pulse">
                          ⭐
                        </span>
                        {starTriggerCount > 0 && (
                          <span className="absolute -top-3 -right-3 text-xs bg-red-500 text-white font-black px-1.5 py-0.5 rounded-full animate-ping">
                            +1
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="text-3xl font-black font-sans leading-none block text-amber-300">
                          {stars}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#FFC482] block mt-0.5">
                          STAR REWARD
                        </span>
                      </div>
                    </button>

                  </div>

                </div>

              </div>

              {/* Bottom instructional footnote */}
              <div className="p-4 bg-white/5 border-t border-white/10 text-xs text-zinc-400 text-left leading-normal">
                <span className="block font-bold text-indigo-400 mb-1">🚀 Simulated LMS Interactive Features:</span>
                <ul>
                  <li>• Clicking <strong className="text-zinc-200">STAR REWARD</strong> in the bottom-right triggers an instant mock websocket synchronizer log incrementing stellar values to the student portal (Caleb).</li>
                  <li>• Paint brush tracks exact mouse strokes in React using lightweight <strong className="text-zinc-200">responsive SVG paths</strong> over the whiteboard canvas container.</li>
                </ul>
              </div>

            </div>
          ) : (
            /* ==========================================
               ER LIFESTYLES WORKSPACE INTERACTIVE (fs4)
               ========================================== */
            <div className="rounded-2xl border border-white/10 bg-[#0c0c12] shadow-2xl overflow-hidden flex flex-col h-full text-zinc-300">
              
              {/* Premium Direct Anchor bar linking to Vercel application */}
              <div className="bg-gradient-to-r from-[#004d40] to-[#124d44] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-bold tracking-wide">ER Lifestyles E-Commerce Storefront & POS Live:</span>
                  <span className="font-mono bg-white/20 px-2 py-0.5 rounded font-bold text-[10px]">erlifestyles.vercel.app</span>
                </div>
                <a
                  href="https://erlifestyles.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-black hover:bg-neutral-900 text-white font-bold rounded uppercase tracking-wider text-[10px] flex items-center gap-1.5 shadow-lg no-underline hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Globe className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                  Open Live Vercel App 🚀
                </a>
              </div>

              {/* Layout for the simulated space: Elegant White/Cream and Coral/Teal style */}
              <div className="flex flex-col bg-[#F8F9FA] text-[#2D3748] font-sans p-3 select-none flex-1 min-h-[550px]">
                
                {/* Simulated Web Application Header tabs */}
                <div className="bg-white rounded-xl shadow-xs border border-zinc-200 p-2.5 flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-800 font-serif font-bold text-lg tracking-tight">ER Lifestyles</span>
                    <span className="h-4 w-px bg-zinc-200"></span>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider">PORTFOLIO WORKSPACE</span>
                  </div>

                  {/* Navigation item tabs */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: "storefront", name: "Storefront Core" },
                      { id: "pos", name: "POS Dashboard" },
                      { id: "inventory", name: "Inventory Control" },
                      { id: "testimonies", name: "Client Reviews" }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setErActiveTab(t.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border border-transparent ${
                          erActiveTab === t.id 
                            ? "bg-[#004d40] text-white shadow-xs" 
                            : "bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>

                  {/* Right: POS Quick Summary Indicator */}
                  <div className="flex items-center gap-2">
                    <div 
                      onClick={() => setErActiveTab("pos")}
                      className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4 text-[#004d40]" />
                      <span className="font-mono bg-[#004d40] text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                        {erCart.reduce((acc, c) => acc + c.quantity, 0)}
                      </span>
                      <span>Cart Basket</span>
                    </div>

                    <button 
                      onClick={handleSeedErCatalog} 
                      className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-105 text-emerald-800 border border-emerald-200 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Seed POS Records
                    </button>
                  </div>
                </div>

                {/* Sub-workspace contents based on active tab */}
                <div className="flex-1 bg-white rounded-2xl border border-zinc-200 p-4 min-h-[460px] overflow-y-auto">
                  
                  {/* ====== TAB 1: STOREFRONT CORE ====== */}
                  {erActiveTab === "storefront" && (
                    <div className="space-y-6">
                      
                      {/* Beautiful Premium Slogan/Hero matching first screenshot */}
                      <div className="relative rounded-2xl overflow-hidden bg-zinc-50 border border-[#f1e5df] p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 space-y-4 text-left">
                          <span className="text-[10px] tracking-widest font-bold text-teal-750 uppercase block">LIFESTYLES ESSENTIALS</span>
                          <h2 className="text-4xl font-extrabold text-[#113F39] leading-tight font-serif">
                            Live Better. <span className="text-teal-600 font-normal italic block md:inline">Every Day.</span>
                          </h2>
                          <p className="text-zinc-600 text-xs leading-relaxed max-w-sm">
                            Intra is a pleasant tasting, proprietary formulation of 23 time-tested and trusted botanical extracts that provide the body with antioxidants, flavonoids, lignins, polysaccharides and other nutrients specific to each herbal extract.
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <button 
                              onClick={() => setErProductFilter("All")}
                              className="px-5 py-2.5 bg-[#113F39] hover:bg-[#004d40] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md border-none cursor-pointer"
                            >
                              Shop Our Collection
                            </button>
                            <button 
                              onClick={() => {
                                setErActiveTab("testimonies");
                              }}
                              className="px-5 py-2.5 bg-white border border-zinc-300 hover:border-zinc-450 text-zinc-700 hover:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                            >
                              Read Testimonials
                            </button>
                          </div>
                        </div>

                        {/* Right side illustrated bottle card */}
                        <div className="w-56 shrink-0 bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs relative group">
                          <div className="absolute top-2 right-2 bg-yellow-105 text-yellow-850 font-bold uppercase text-[8px] px-1.5 py-0.5 rounded-full tracking-wider shadow-xs">
                            Celebrating 30+ Years
                          </div>
                          <div className="aspect-[1/1] w-full rounded-xl overflow-hidden bg-teal-50/50 flex items-center justify-center mb-3">
                            <img
                              src="/src/assets/images/er_lifestyles_thumbnail_1781500765140.jpg"
                              alt="Intra Premium Botanical bottle"
                              referrerPolicy="no-referrer"
                              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="text-center">
                            <h4 className="font-serif font-bold text-[#113F39] text-sm">Intra Premium Drink</h4>
                            <p className="text-[10px] text-zinc-500 mt-1">23 botanical extracts formulation</p>
                          </div>
                        </div>
                      </div>

                      {/* Product catalog section matching the second screenshot */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-[#113F39] font-serif">Our Essentials Catalog</h3>
                            <p className="text-[11px] text-zinc-500">Specially formulated for your family's daily wellness need.</p>
                          </div>
                          
                          {/* 5 PRODUCTS FOUND Capsule */}
                          <span className="self-start sm:self-center px-3 py-1 bg-teal-50 border border-teal-150 text-teal-800 font-mono text-[9px] font-bold uppercase rounded-full">
                            5 Products Found
                          </span>
                        </div>

                        {/* Filter pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {["All", "Supplements", "Vitamins", "Antioxidants", "Essentials"].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setErProductFilter(cat)}
                              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold cursor-pointer transition-all border-none ${
                                erProductFilter === cat
                                  ? "bg-[#113F39] text-white font-bold shadow-xs"
                                  : "bg-zinc-100 text-zinc-650 hover:bg-zinc-200 hover:text-zinc-900"
                              }`}
                            >
                              {cat.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {[
                            { id: "p1", name: "FibreLife", price: 1580, category: "Supplements", desc: "A premium formulation of raw soluble fiber (Konjac, pectin) regulating levels.", icon: "🍃" },
                            { id: "p2", name: "Intra (Liquid)", price: 1880, category: "Supplements", desc: "Our 23 time-tested botanical ingredients juice providing high antioxidants.", icon: "🍯" },
                            { id: "p3", name: "NutriaPlus", price: 1580, category: "Antioxidants", desc: "A powerful cellular protective formulation designed to protect molecular health.", icon: "🛡️" },
                            { id: "p4", name: "CardioLife", price: 1880, category: "Vitamins", desc: "Crafted specifically for maintaining cardiovascular system muscle stamina.", icon: "❤️" },
                            { id: "p5", name: "Better Together Kit", price: 8800, category: "Essentials", desc: "The ultimate health pack pairing FibreLife, Intra juice, and NutriaPlus.", icon: "📦" }
                          ]
                          .filter(p => erProductFilter === "All" || p.category === erProductFilter)
                          .map(prod => (
                            <div key={prod.id} className="bg-white hover:border-[#113F39]/30 border border-zinc-200 rounded-2xl p-4.5 flex flex-col justify-between text-left transition-all group shadow-xs">
                              <div className="relative">
                                {/* Top categories & heart icon */}
                                <div className="flex items-center justify-between mb-3 text-[9px] font-bold tracking-wider text-teal-800">
                                  <span>{prod.category.toUpperCase()}</span>
                                  <button className="p-1 text-zinc-400 hover:text-rose-500 cursor-pointer bg-transparent border-none">
                                    <Heart className="h-4 w-4" />
                                  </button>
                                </div>

                                {/* Placeholder Image block simulating bottle */}
                                <div className="aspect-[1/1] rounded-xl bg-gradient-to-tr from-teal-50 to-emerald-50 flex items-center justify-center p-3 mb-3 relative overflow-hidden">
                                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300 relative z-10">{prod.icon}</span>
                                  <div className="absolute inset-0 bg-black/[0.01] pointer-events-none"></div>
                                </div>

                                <h4 className="font-bold text-zinc-900 group-hover:text-teal-700 transition-colors font-sans text-sm">{prod.name}</h4>
                                <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed min-h-[30px]">{prod.desc}</p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-zinc-150 flex items-center justify-between">
                                <span className="font-mono font-bold text-emerald-800 text-xs sm:text-sm">₱{prod.price.toLocaleString()}</span>
                                <button
                                  onClick={() => handleAddToCart(prod.name, prod.price, prod.id)}
                                  className="px-2.5 py-1.5 bg-[#113F39] hover:bg-[#004d40] text-white rounded-lg font-bold text-[9px] uppercase cursor-pointer border-none transition-colors"
                                >
                                  Add +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>

                      {/* Active Cart sliding panel drawer preview if cart has items */}
                      {erCart.length > 0 && (
                        <div className="p-4 bg-emerald-50/70 border border-emerald-150 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-left shrink-0">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🛒</span>
                            <div>
                              <h4 className="text-sm font-bold text-emerald-950">Active Basket Storefront Items ({erCart.reduce((sum, i) => sum + i.quantity, 0)})</h4>
                              <p className="text-xs text-emerald-700">Calculated in Philippine Peso currency. Process checkout to insert ledger database entries instantly.</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                            <div className="font-mono text-xl font-bold text-[#113F39]">
                              ₱{erCart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setErCart([])}
                                className="px-3.5 py-2 bg-white text-zinc-650 hover:bg-zinc-100 font-bold text-[10px] uppercase tracking-wider rounded-xl border border-zinc-350 transition-all cursor-pointer"
                              >
                                Clear Basket
                              </button>
                              <button
                                onClick={() => handleCheckoutCart("Storefront Client")}
                                className="px-4.5 py-2 bg-[#113F39] hover:bg-[#104b40] text-white font-bold text-[10px] uppercase tracking-wider rounded-xl border-none transition-all cursor-pointer shadow-sm"
                              >
                                Checkout to POS
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* ====== TAB 2: POS DASHBOARD ====== */}
                  {erActiveTab === "pos" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left">
                      
                      {/* Left Sidebar control mimicking admin panel */}
                      <div className="lg:col-span-3 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="border-b border-zinc-200 pb-2.5">
                            <span className="text-[9px] uppercase font-bold text-zinc-400 block tracking-wider">MANAGEMENT</span>
                            <h4 className="text-[#113F39] font-extrabold text-sm font-serif">Wellness HQ</h4>
                          </div>

                          <div className="space-y-1">
                            {[
                              { label: "Order Registry", active: true },
                              { label: "Partner Network", active: false },
                              { label: "Inventory Levels", active: false },
                              { label: "Buyer Feedback", active: false }
                            ].map((m, idx) => (
                              <div 
                                key={idx}
                                className={`p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                                  m.active ? "bg-[#113F39] text-white font-bold" : "text-zinc-600 hover:bg-zinc-100"
                                }`}
                              >
                                <span>{m.label}</span>
                                {m.active && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="p-3 bg-white border border-zinc-200 rounded-xl">
                            <span className="text-[8px] font-mono font-bold text-zinc-450 block uppercase tracking-wider">System Status</span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-[11px] font-semibold text-zinc-700">Cloud Connected</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={handleSeedErCatalog}
                            className="w-full py-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#113F39] font-bold text-[10px] uppercase tracking-wider rounded-xl cursor-pointer transition-colors"
                          >
                            Seed Catalog
                          </button>
                        </div>
                      </div>

                      {/* Right main table view matching third screenshot */}
                      <div className="lg:col-span-9 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                          <div>
                            <h3 className="text-base font-bold text-[#113F39]">Order Registry</h3>
                            <p className="text-[11px] text-zinc-500">Transaction log indices recorded on general ledger database.</p>
                          </div>
                          
                          {/* DB records pill */}
                          <span className="px-3 py-1 bg-[#113F39]/5 border border-[#113F39]/10 text-teal-800 font-mono text-[9px] font-bold uppercase rounded-full">
                            {erOrders.length} Total Records
                          </span>
                        </div>

                        {/* Order Registry Table */}
                        <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Value</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Agent</th>
                                <th className="p-3 text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200">
                              {erOrders.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="p-8 text-center text-zinc-450">
                                    No records found. Click "Seed Catalog" to add test listings.
                                  </td>
                                </tr>
                              ) : (
                                erOrders.map(ord => (
                                  <tr key={ord.id} className="hover:bg-zinc-50/40 transition-colors text-zinc-800">
                                    <td className="p-3 font-mono text-[11px] text-zinc-500">{ord.id}</td>
                                    <td className="p-3 font-semibold text-zinc-900">{ord.customer}</td>
                                    <td className="p-3 font-bold font-mono text-emerald-800">₱{ord.value.toLocaleString()}</td>
                                    <td className="p-3">
                                      <button
                                        onClick={() => handleToggleOrderStatus(ord.id)}
                                        className={`px-2.5 py-1 text-[9px] uppercase font-mono font-bold tracking-wider rounded-xl cursor-pointer border border-transparent ${
                                          ord.status === "Dispatched" 
                                            ? "bg-blue-50 text-blue-600 border border-blue-200" 
                                            : ord.status === "Paid"
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                            : "bg-amber-50 text-amber-600 border border-amber-200"
                                        }`}
                                        title="Click to toggle order cycle"
                                      >
                                        ● {ord.status}
                                      </button>
                                    </td>
                                    <td className="p-3 text-zinc-600 text-[10px]">{ord.agent}</td>
                                    <td className="p-3 text-center">
                                      <button
                                        onClick={() => handleDeleteErOrder(ord.id)}
                                        className="p-1 cursor-pointer bg-transparent border-none text-zinc-400 hover:text-red-500"
                                        title="Delete order document"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>

                        {/* Add manual payment order form panel */}
                        <form onSubmit={handleAddCustomOrder} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4.5 space-y-3">
                          <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1">
                            <Plus className="h-4 w-4 text-[#113F39]" /> Inject manual billing entry
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div>
                              <label className="text-[9px] text-zinc-550 font-bold uppercase block mb-1">Customer Name</label>
                              <input
                                type="text"
                                required
                                value={newErCustomer}
                                onChange={(e) => setNewErCustomer(e.target.value)}
                                placeholder="e.g. Maria Santos"
                                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-[#113F39]"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] text-zinc-550 font-bold uppercase block mb-1">Receipt Value (₱)</label>
                              <input
                                type="number"
                                required
                                value={newErValue}
                                onChange={(e) => setNewErValue(Math.max(10, Number(e.target.value)))}
                                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-[#113F39]"
                              />
                            </div>
                            <div className="flex items-end">
                              <button
                                type="submit"
                                className="w-full bg-[#113F39] hover:bg-[#004d40] text-white font-bold text-xs uppercase tracking-wider py-2 rounded-lg transition-all border-none cursor-pointer"
                              >
                                Inject Record
                              </button>
                            </div>
                          </div>
                        </form>

                      </div>

                    </div>
                  )}

                  {/* ====== TAB 3: INVENTORY CONTROL ====== */}
                  {erActiveTab === "inventory" && (
                    <div className="space-y-6 text-left">
                      <div>
                        <h3 className="text-[#113F39] font-bold text-base">Warehouse Stock Analytics</h3>
                        <p className="text-[11px] text-zinc-500">Real-time counts mapping store purchases dynamically.</p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        
                        {/* Table of stocks */}
                        <div className="lg:col-span-8 border border-zinc-200 rounded-xl overflow-hidden shadow-xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-[10px] uppercase font-bold">
                                <th className="p-3">Product Name</th>
                                <th className="p-3">Storage Count</th>
                                <th className="p-3">Fulfillment Rating</th>
                                <th className="p-3 text-center">Restock Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-150">
                              {(Object.entries(erInventory) as [string, number][]).map(([name, stock]) => (
                                <tr key={name} className="hover:bg-zinc-50/50">
                                  <td className="p-3 font-semibold text-zinc-900">{name}</td>
                                  <td className="p-3 font-mono font-bold text-zinc-700 bg-zinc-50/20">{stock} units in stock</td>
                                  <td className="p-3">
                                    <span className={`px-2.5 py-0.8 text-[10px] rounded-full font-semibold ${
                                      stock <= 0 
                                        ? "bg-red-50 text-red-650"
                                        : stock <= 10 
                                        ? "bg-amber-50 text-amber-650"
                                        : "bg-emerald-50 text-emerald-650"
                                    }`}>
                                      {stock <= 0 ? "Out of Stock" : stock <= 10 ? "Needs Restocking" : "Optimal"}
                                    </span>
                                  </td>
                                  <td className="p-3 text-center">
                                    <button
                                      onClick={() => handleRestockProduct(name)}
                                      className="px-2.5 py-1 bg-[#113F39] hover:bg-[#004d40] text-white rounded font-bold uppercase text-[9px] tracking-wider cursor-pointer border-none transition-colors"
                                    >
                                      + Restock 10
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Beautiful Visual Charts */}
                        <div className="lg:col-span-4 bg-zinc-50 border border-zinc-200 rounded-xl p-4.5 space-y-4">
                          <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Storage Bar Gauges</h4>
                          
                          <div className="space-y-4 pt-1">
                            {(Object.entries(erInventory) as [string, number][]).map(([name, stock]) => {
                              const pct = Math.min(100, Math.round((stock / 50) * 100));
                              return (
                                <div key={name} className="space-y-1">
                                  <div className="flex justify-between text-[11px] text-zinc-750">
                                    <span>{name}</span>
                                    <span className="font-mono font-bold text-zinc-500">{pct}% ({stock}/50)</span>
                                  </div>
                                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-300 ${
                                        stock <= 10 ? "bg-amber-500" : "bg-emerald-700"
                                      }`} 
                                      style={{ width: `${pct}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* ====== TAB 4: CLIENT REVIEWS ====== */}
                  {erActiveTab === "testimonies" && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
                      
                      {/* Submit review column left */}
                      <div className="md:col-span-5 bg-zinc-50 border border-zinc-200 rounded-xl p-4.5 flex flex-col justify-between">
                        <form onSubmit={handleAddTestimonial} className="space-y-3.5">
                          <div>
                            <span className="text-[10px] tracking-widest font-bold text-teal-750 uppercase block">PRODUCT FEEDBACK</span>
                            <h3 className="text-base font-bold text-[#113F39] font-serif">Write a Testimonial</h3>
                            <p className="text-[11px] text-zinc-500">Provide direct feedback regarding FibreLife, Intra botanical juice, or CardioLife user experience.</p>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-1">Full Name</label>
                              <input
                                type="text"
                                required
                                value={newTestimonialName}
                                onChange={(e) => setNewTestimonialName(e.target.value)}
                                placeholder="Your Name or Initial"
                                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-[#113F39]"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-1">Rating Score</label>
                              <select
                                value={newTestimonialRating}
                                onChange={(e) => setNewTestimonialRating(Number(e.target.value))}
                                className="w-full bg-white border border-zinc-350 rounded-lg px-3 py-1.5 text-xs text-zinc-800 focus:outline-[#113F39]"
                              >
                                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[9px] text-zinc-500 font-bold uppercase block mb-1">Your Narrative</label>
                              <textarea
                                required
                                rows={4}
                                value={newTestimonialText}
                                onChange={(e) => setNewTestimonialText(e.target.value)}
                                placeholder="Describe product benefits, intake schedule results, packaging, etc..."
                                className="w-full bg-white border border-zinc-300 rounded-lg p-3 text-xs text-zinc-805 focus:outline-[#113F39] resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#113F39] hover:bg-[#004d40] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-all border-none cursor-pointer shadow-xs"
                            >
                              Add Testimonial review
                            </button>
                          </div>
                        </form>
                      </div>

                      {/* Right side list of client testimonies */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="border-b border-zinc-200 pb-2">
                          <h4 className="text-sm font-bold text-zinc-800">Verified Client Testimonials</h4>
                          <p className="text-[11px] text-zinc-500">Real verified user outcomes reporting wellness progress.</p>
                        </div>

                        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                          {erTestimonials.map(t => (
                            <div key={t.id} className="p-3.5 border border-zinc-200 rounded-xl bg-white space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-zinc-900 font-sans flex items-center gap-1.5">
                                  <User className="h-3.5 w-3.5 text-zinc-405" /> {t.name}
                                </span>
                                <span className="text-[10px] text-zinc-400 font-mono">{t.date}</span>
                              </div>
                              <div className="text-amber-500 text-xs">
                                {"★".repeat(t.rating)}
                              </div>
                              <p className="text-xs text-zinc-650 leading-relaxed italic">
                                "{t.text}"
                              </p>
                            </div>
                          ))}
                        </div>

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* Bottom instructional footnote */}
              <div className="p-4 bg-white/5 border-t border-white/10 text-xs text-zinc-400 text-left leading-normal">
                <span className="block font-bold text-teal-400 mb-1">🚀 Simulated E-Commerce & POS Interactive Integration Features:</span>
                <ul className="space-y-1">
                  <li>• Adding products inside the <strong className="text-zinc-200">Storefront Core</strong> tab checks stock levels, reserves quantities, and updates values.</li>
                  <li>• Confirming POS checkout compiles values and spawns an operational billing entry dynamically into the <strong className="text-zinc-200">Order Registry</strong>.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
