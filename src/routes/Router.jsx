import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Stories from "../pages/Stories";
import Reports from "../pages/Reports";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Team from "../pages/Team";
import Certifications from "../pages/Certifications";
import Membership from "../pages/Membership";
import Events from "../pages/Events";
import Gallery from "../pages/Gallery";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Payment from "../pages/Payment";
import Donation from "../pages/Donation";
import Careers from "../pages/Careers";
import UnderDevelopment from "../pages/UnderDevelopment";

// Admin Pages
import AdminLayout from "../pages/admin/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminPayments from "../pages/admin/AdminPayments";
import AdminMemberships from "../pages/admin/AdminMemberships";
import AdminVerifications from "../pages/admin/AdminVerifications";
import AdminJobs from "../pages/admin/AdminJobs";
import AdminApplications from "../pages/admin/AdminApplications";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/stories" element={<Stories isStandalone={true} />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/team" element={<Team isStandalone={true} />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/courses" element={<UnderDevelopment />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="memberships" element={<AdminMemberships />} />
        <Route path="verifications" element={<AdminVerifications />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="applications" element={<AdminApplications />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
