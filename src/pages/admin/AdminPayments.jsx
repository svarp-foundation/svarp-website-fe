import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const { token } = useAuth();

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/payments?status=${statusFilter === "all" ? "" : statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      }
    } catch (error) {
      console.error("Error fetching payments", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [statusFilter, token]);

  const exportCSV = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/payments/export`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `payments_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-primary">
            Payments & Revenue
          </h1>
          <p className="text-xs text-slate-500">
            Track all transactions and financial history.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="bg-primary text-white font-bold px-4 py-1.5 rounded-lg hover:bg-slate-900 transition-all text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0 shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="flex gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <select
          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-accent text-xs font-semibold w-full sm:w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          Processing records...
        </div>
      ) : payments.length === 0 ? (
        <div className="text-center text-xs text-slate-400 italic py-8 bg-white border border-slate-200 rounded-lg shadow-xs">
          No transactions found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {payments.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-md border border-slate-200 p-2 flex flex-col justify-between space-y-1.5 hover:border-slate-300 transition-colors shadow-xs"
            >
              <div className="flex justify-between items-start gap-1">
                <div className="min-w-0">
                  <span className="text-[8px] font-bold text-slate-400 bg-slate-50 px-1 py-0.5 rounded border border-slate-100 uppercase tracking-wide">
                    #{p.razorpay_order_id || p.id.slice(0, 8)}
                  </span>
                  <h3 className="text-xs font-bold text-primary mt-1 truncate">
                    {p.user_email}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-primary block">
                    ₹{p.amount.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-100 flex justify-between items-center">
                <span
                  className={`px-1 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${
                    p.status === "success"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : p.status === "pending"
                        ? "bg-amber-50 text-amber-600 border-amber-100"
                        : "bg-red-50 text-red-600 border-red-100"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
