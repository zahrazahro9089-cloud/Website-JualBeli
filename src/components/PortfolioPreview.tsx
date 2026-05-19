import EcommerceMockup from './mockups/EcommerceMockup';
import CompanyMockup from './mockups/CompanyMockup';
import RestaurantMockup from './mockups/RestaurantMockup';
import EducationMockup from './mockups/EducationMockup';
import HealthcareMockup from './mockups/HealthcareMockup';

const projects = [
  { name: "Toko Fashion Online", category: "E-Commerce", mockup: "ecommerce", url: "shopmart.id" },
  { name: "PT. Maju Bersama", category: "Toko Bangunan & Ternak", mockup: "company", url: "majubersama.co.id" },
  { name: "Resto Nusantara", category: "Restoran Padang", mockup: "restaurant", url: "restonusantara.id" },
  { name: "EduTech Indonesia", category: "Learning Platform", mockup: "education", url: "edutech.id" },
  { name: "Klinik Sehat", category: "Healthcare & Apotek", mockup: "healthcare", url: "kliniksehat.id" },
];

function MockupContent({ type }: { type: string }) {
  switch (type) {
    case "ecommerce": return <EcommerceMockup />;
    case "company": return <CompanyMockup />;
    case "restaurant": return <RestaurantMockup />;
    case "education": return <EducationMockup />;
    case "healthcare": return <HealthcareMockup />;
    default: return null;
  }
}

export default function PortfolioPreview() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Portfolio</p>
          <h2 className="section-title">Project Terbaru Kami</h2>
        </div>
        <div className="portfolio-grid-new">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-card fade-in">
              <div className="portfolio-preview-frame">
                <div className="preview-browser-bar">
                  <div className="browser-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="browser-url">{project.url}</div>
                </div>
                <div className="preview-scroll-container">
                  <MockupContent type={project.mockup} />
                </div>
              </div>
              <div className="portfolio-card-info">
                <h3>{project.name}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
