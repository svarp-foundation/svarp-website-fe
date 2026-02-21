import { Routes, Route } from "react-router-dom";
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

export default function Router() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
