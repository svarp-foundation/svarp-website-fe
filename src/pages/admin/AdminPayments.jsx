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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Payments & Revenue
          </h1>
          <p className="text-slate-500">
            Track all transactions and financial history.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="bg-white border border-slate-200 text-primary font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2 shadow-sm w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4">
          <select
            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-xs outline-none focus:border-accent"
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
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-bottom border-slate-100">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-400 italic"
                  >
                    Processing records...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-400 italic"
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
                    <td className="px-6 py-4">
                      <code className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        #{p.razorpay_order_id || p.id.slice(0, 8)}
                      </code>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {p.user_email}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-primary">
                      ₹{p.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                          p.status === "success"
                            ? "bg-emerald-50 text-emerald-600"
                            : p.status === "pending"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
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
