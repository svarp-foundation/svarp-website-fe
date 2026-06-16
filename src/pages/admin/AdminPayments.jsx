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
          className="bg-primary text-white font-bold px-4 py-1.5 rounded-lg hover:bg-slate-900 transition-all text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto mt-2 sm:mt-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex gap-2">
          <select
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-accent text-xs font-semibold"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-xs text-slate-400 italic"
                  >
                    Processing records...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-xs text-slate-400 italic"
                  >
                    No transactions found
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-4 py-2.5">
                      <code className="text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                        #{p.razorpay_order_id || p.id.slice(0, 8)}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 text-xs font-bold text-primary">
                      {p.user_email}
                    </td>
                    <td className="px-4 py-2.5 text-xs font-extrabold text-primary">
                      ₹{p.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${
                          p.status === "success"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : p.status === "pending"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-red-50 text-red-600 border-red-100"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-slate-500 font-medium">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
