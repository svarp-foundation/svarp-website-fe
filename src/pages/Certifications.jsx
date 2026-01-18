import React from "react";

import cert1 from "../assets/certifications/certificate-1.png";
import cert2 from "../assets/certifications/certificate-2.png";
import cert3 from "../assets/certifications/certificate-3.png";
import cert4 from "../assets/certifications/certificate-4.png";
import cert5 from "../assets/certifications/certificate-5.png";
import cert6 from "../assets/certifications/certificate-6.png";
import cert7 from "../assets/certifications/certificate-7.png";
import cert8 from "../assets/certifications/certificate-8.png";
import cert9 from "../assets/certifications/certificate-9.png";
import cert10 from "../assets/certifications/certificate-10.png";
import cert11 from "../assets/certifications/certificate-11.png";

const styles = {
  container: {
    padding: "60px 8%",
    textAlign: "center",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  subHeading: {
    color: "#666",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    marginBottom: "15px",
  },
};
const certificates = [
  {
    id: 1,
    image: cert2,
    title: "GST Registration Certificate (Government of India)",
    year: "2024",
  },
  {
    id: 2,
    image: cert3,
    title: "UDYAM Registration (MSME – Micro Enterprise)",
    year: "2024",
  },
  {
    id: 4,
    image: cert6,
    title: "CSR Registration (Ministry of Corporate Affairs)",
    year: "2025",
  },
  {
    id: 5,
    image: cert8,
    title: "ISO 9001:2015 – Quality Management System",
    year: "2025",
  },
  {
    id: 6,
    image: cert9,
    title: "ISO 14001:2015 – Environmental Management System",
    year: "2025",
  },
  {
    id: 7,
    image: cert10,
    title: "ISO 45001:2018 – Occupational Health & Safety",
    year: "2025",
  },
  {
    id: 8,
    image: cert11,
    title: "ISO 50001:2018 – Energy Management System",
    year: "2025",
  },
  {
    id: 9,
    image: cert4,
    title: "NGO DARPAN Enrollment Certificate (Ministry of Social Justice & Empowerment, Govt. of India)",
    year: "2024",
  },
  {
    id: 11,
    image: cert7,
    title: "NGO DARPAN Profile Details",
    year: "2024",
  },
  {
    id: 10,
    image: cert5,
    title: "Company Registration Certificate (Section 8 – Companies Act 2013)",
    year: "2024",
  },
];

export default function Certifications() {
  return (
    <section style={styles.container}>
      <h1 style={styles.heading}>Our Certifications & Awards</h1>
      <p style={styles.subHeading}>
        Recognitions and certifications received by our organization
      </p>

      <div style={styles.grid}>
        {certificates.map((cert) => (
          <div key={cert.id} style={styles.card}>
            <img src={cert.image} alt={cert.title} style={styles.image} />
            <h3>{cert.title}</h3>
            <span>{cert.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
