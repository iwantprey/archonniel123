import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, Building2, CheckCircle2, ChevronRight, FlaskConical,
  HardHat, LockKeyhole, MapPin, Menu, Send, ShieldCheck, TrendingUp, Truck,
  UploadCloud, X,
} from 'lucide-react';
import './Jobs.css';

const tracks = [
  {
    title: 'Production & Chemical Processing', category: 'Manufacturing Operations', tag: 'Manufacturing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw4pSnZVXr7AF0N1i4sP2RiipfV80cCONdYzxnGTTG42K8oHfzbdeCKU2egLZLFavcX-i2SFXiTjj7dx1DF8_nxBjAviuWdTwMCanSnwYwb7g-3_xOLuBHVAbnS6yVohcQSFwXEYbwjiFFM8T6h1k1hrn6WqbS8O6GaDO5qsH3I-GtWLLO-c8vAqSy77xdt3bGaCllp1uEsbcNhwg_KzIjDRBgjGB5IWY2rwJaf7JZ',
    summary: 'Drive precision batch formulation, automated material compounding, and safety-critical operations for high-grade construction chemicals.',
    description: 'Lead batch formulation, mixing reactors, and automated filling lines for construction adhesives, sealants, and engineering polymers with world-class safety protocols.',
    roles: ['Production Supervisor', 'Production Operator', 'Chemical Mixer'], perks: 'Hazard Allowance · Technical Certification · Shift Rotation Benefits', tags: ['Hazard Differential', 'PPE Allocation'], icon: HardHat,
  },
  {
    title: 'R&D, Laboratory & Quality Control', category: 'Materials Science & Testing', tag: 'Laboratory',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZQ8Gqk4gT9H_q54-T2Sp1mw88MnZ99YP3GkGKzc-deiLPCozZCZtxOoBBqgeMwl6v_0_29jVEXRRHnmxua-52oap4IZw2ppIdHw-O7KEEHbEkTjW9HYSa9BwM-4DEvoxYIXGn1g_lIYAVm51yIogdwIkylLaTsvymNhk4J8-JCXj3Hx7X8ZElHLT1PUjjOj4AQwYi38yryAteG6KO_R-eaoUwTwxsTnrXtmFI3Jfi',
    summary: 'Validate structural material integrity, conduct ASTM/ISO standardized tests, and innovate breakthrough construction polymer chemistries.',
    description: 'Ensure uncompromising quality and build innovative formulations with advanced spectrometry, tensile testing, and chemical chromatography instrumentation.',
    roles: ['R&D Chemist', 'Quality Control Analyst', 'Laboratory Technician'], perks: 'Research Grants · Cleanroom Facility · Continuing Education Stipends', tags: ['Lab Fellowship', 'ISO Standards'], icon: FlaskConical,
  },
  {
    title: 'Engineering, Safety & Maintenance', category: 'Industrial Plant Reliability', tag: 'Plant & Safety',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeicy6gG8WXBijPNpT99opPa_lnCTZalPt5v86LnU4hcB2vA79rVzKivV3QIukf5rPyVjGJWlQvaGBBZidgVLaHd-vT45hSEoYu6lkch74JdCemzWdwfoJokzknlYB4GqxRJ6x56Y6IRuZm9KVBj3f2p2heeSIVRZnpGrIFJo2IqYIjwn7hh89wHoDihUCZnYRTlYPP2_DFSiFGwqLGNXfFvKm43ddw6vDqUeX0YQN',
    summary: 'Maintain industrial electro-mechanical machinery, enforce DOLE-OSHC compliance, and keep automated systems online.',
    description: 'Oversee predictive maintenance routines, pneumatic reactor upkeep, facility safety enforcement, and uninterrupted power grids across our industrial facilities.',
    roles: ['Maintenance Technician', 'Safety Officer', 'System Administrator', 'IT Support Specialist'], perks: 'Safety Bonuses · Advanced Mechanical Toolkits · Full Medical Coverage', tags: ['OSHC Certification', 'Tool Allowances'], icon: ShieldCheck,
  },
  {
    title: 'Supply Chain, Logistics & Commerce', category: 'Industrial Distribution & Trade', tag: 'Commerce & Fleet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyr9VYl_83f-vOkkgHceb-NAuxuGiVtaPQs0aZix75KlPblZ7QHB1jQfh-mnIwzQNVWZAvwuczQhwKjk9JLFg97EMg0_xvXPUNSqPA0ZjXTxh6kBb-2MHDYHDKiTUUVionSE6QvzqqoSvWmHqfpCgfdLCmx8a0AZTqIV2dueQIsdnvHw8nzAIFtcdxigXntHgL_IYf4QOXh48USiugGneLbStWG4HXkegBg0gBuxE1',
    summary: 'Facilitate bulk construction materials trade, heavy freight dispatch, strategic procurement, and builder sales fulfillment.',
    description: 'Connect contractor orders with automated warehouse stock picking, inter-provincial bulk distribution, vendor procurement, and direct institutional sales.',
    roles: ['Purchasing Officer', 'Sales Representative', 'Warehouseman', 'Inventory Controller', 'Delivery Driver'], perks: 'Sales Incentive Plans · Trip Allowances · Comprehensive Fleet Insurance', tags: ['Commission Plan', 'Fleet Per-Diem'], icon: Truck,
  },
];

const departments = [
  { group: 'Operations & Technical', subtitle: 'Plant, Chemical Processing, Lab & Logistics Hubs', count: 8, roles: [
    ['Management', 'Leadership', 'General Manager', 'Operations Manager'],
    ['Production', 'High Demand', 'Production Supervisor', 'Production Operator', 'Chemical Mixer'],
    ['Quality Control & Laboratory', 'Testing', 'Quality Control Analyst', 'Laboratory Technician'],
    ['Safety', 'DOLE Compliance', 'Safety Officer'], ['Maintenance', 'Engineering', 'Maintenance Technician'],
    ['Research & Development (R&D)', 'Innovation', 'R&D Chemist'],
    ['Warehouse & Inventory', 'Fulfillment', 'Warehouseman', 'Inventory Controller'],
    ['Logistics & Delivery', 'Fleet', 'Delivery Driver'],
  ] },
  { group: 'Commercial & Corporate', subtitle: 'Commerce, Enterprise Systems & Administrative HQ', count: 7, roles: [
    ['Purchasing', 'Procurement', 'Purchasing Officer'], ['Sales & Marketing', 'Commercial', 'Sales Representative'],
    ['Accounting & Finance', 'Finance', 'Accountant', 'Accounting Staff'], ['Human Resources', 'People Ops', 'HR Officer', 'HR Staff'],
    ['Administration', 'Executive', 'Administrative Assistant'], ['Information Technology (IT)', 'Digital Systems', 'IT Support Specialist', 'System Administrator'],
    ['General Services', 'Facilities', 'Utility Worker'],
  ] },
];

const regions = [
  ['National Capital Region', 'National Capital Region (NCR)'], ['Cavite', 'Cavite Hub (Carmona / Kawit / Naic)'],
  ['Laguna', 'Laguna Hub (Calamba / Sta. Rosa)'], ['Batangas', 'Batangas Distribution Hub'], ['Rizal', 'Rizal'],
  ['Bulacan', 'Bulacan'], ['Pampanga', 'Pampanga'], ['Mindoro', 'Mindoro'], ['Quezon', 'Quezon'], ['Cebu', 'Cebu Logistics Center'],
];
const positionGroups = [
  ['Management', 'General Manager', 'Operations Manager'], ['Production & Plant', 'Production Supervisor', 'Production Operator', 'Chemical Mixer'],
  ['Quality Control, Lab & R&D', 'Quality Control Analyst', 'Laboratory Technician', 'R&D Chemist'],
  ['Safety & Maintenance', 'Safety Officer', 'Maintenance Technician'], ['Warehouse, Logistics & Delivery', 'Warehouseman', 'Inventory Controller', 'Delivery Driver'],
  ['Commercial, Purchasing & Sales', 'Purchasing Officer', 'Sales Representative'],
  ['Finance, HR & Administration', 'Accountant', 'Accounting Staff', 'HR Officer', 'HR Staff', 'Administrative Assistant'],
  ['Information Technology & Services', 'IT Support Specialist', 'System Administrator', 'Utility Worker'],
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['Who We Are', '#who-we-are'], ['How We Work', '#how-we-work'], ['Locations', '#locations'], ['Careers', '#careers'], ['Contact', '#contact']];
  return <header className="jobs-header"><div className="jobs-header-inner">
    <a href="#careers" className="jobs-brand" aria-label="Meridian Enterprises careers"><span className="jobs-brand-mark"><Building2 size={20} /></span><span><strong>MERIDIAN</strong><small>ENTERPRISES</small></span></a>
    <nav className="jobs-nav">{links.map(([label, href]) => <a key={label} className={label === 'Careers' ? 'active' : ''} href={href}>{label}</a>)}</nav>
    <a className="jobs-signin" href="/">Back to Archon Nell</a>
    <button className="jobs-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
  </div>{menuOpen && <nav className="jobs-mobile-nav">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="/">Back to Archon Nell</a></nav>}</header>;
}

export default function Jobs() {
  const [activeTrack, setActiveTrack] = useState(null);
  const [position, setPosition] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const fileInput = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Careers | Meridian Enterprises';
    const onKeyDown = (event) => { if (event.key === 'Escape') setActiveTrack(null); };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.title = previousTitle; window.removeEventListener('keydown', onKeyDown); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = activeTrack ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeTrack]);

  const chooseFile = (nextFile) => {
    if (!nextFile) return;
    if (!/\.(pdf|docx?)$/i.test(nextFile.name)) { setError('Choose a PDF, DOC, or DOCX resume.'); setFile(null); return; }
    if (nextFile.size > 10 * 1024 * 1024) { setError('Your resume must be 10 MB or smaller.'); setFile(null); return; }
    setError(''); setFile(nextFile);
  };
  const chooseRole = (role) => { setPosition(role); scrollTo('apply-form'); };
  const submitForm = (event) => {
    event.preventDefault(); setError('');
    if (!file) { setError('Please attach your resume before continuing.'); return; }
    setSubmitting(true);
    window.setTimeout(() => { setSubmitting(false); setSubmitted(true); setFormKey((key) => key + 1); setFile(null); scrollTo('form-success-banner'); }, 500);
  };

  return <div className="careers-page" id="careers">
    <Header />
    <main>
      <section className="jobs-hero" id="who-we-are">
        <div className="jobs-hero-grid" />
        <div className="jobs-container jobs-hero-content">
          <div className="jobs-eyebrow-light"><span /> Meridian Network Hiring Cycle 2025 <i>/</i> Nationwide Opportunities</div>
          <div className="jobs-hero-main"><div>
            <h1>Work <em>With</em> Us</h1>
            <p>Power the next era of construction supplies and engineering e-commerce. Explore specialized careers spanning industrial chemical manufacturing, testing laboratories, regional supply fulfillment, and corporate engineering.</p>
            <div className="jobs-hero-actions"><a className="jobs-button jobs-button-primary" href="#apply-form">Apply Now <ArrowDown size={17} /></a><a className="jobs-button jobs-button-ghost" href="#open-positions">Explore Roles <ArrowRight size={17} /></a></div>
          </div><aside className="jobs-mobility"><div><span>TALENT MOBILITY INDEX</span><TrendingUp size={19} /></div><strong>74% <small>Promoted from within</small></strong><p>Structured leadership development programs help store associates advance to managerial hubs.</p></aside></div>
          <div className="jobs-stats">{[['150+', 'Store Locations', 'Active retail centers'], ['7', 'Regional Hubs', 'Automated sorting centers'], ['2,400+', 'Team Members', 'Across Luzon & Visayas'], ['Fast-Track', 'Career Growth', 'Meridian Leadership Ladder']].map(([value, title, note]) => <div key={title}><strong>{value}</strong><b>{title}</b><small>{note}</small></div>)}</div>
        </div>
      </section>

      <section className="jobs-section jobs-tracks" id="how-we-work"><div className="jobs-container">
        <div className="jobs-section-heading"><div><span className="jobs-kicker">CAREER TRACKS</span><h2>Job Variety On Offer</h2><p>From customer experience to regional logistics, Meridian offers opportunities designed for stability and personal growth.</p></div><span className="jobs-hint">Select a card to inspect a career track</span></div>
        <div className="jobs-track-grid">{tracks.map((track) => <article className="jobs-track-card" key={track.title}>
          <div className="jobs-track-image"><img src={track.image} alt={track.title} loading="lazy" /><span>{track.tag}</span></div>
          <div className="jobs-track-body"><div><h3>{track.title}</h3><p>{track.summary}</p></div><div><div className="jobs-tags">{track.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="jobs-card-link" onClick={() => setActiveTrack(track)}>View Details <ArrowRight size={16} /></button></div></div>
        </article>)}</div>
      </div></section>

      <section className="jobs-section jobs-openings" id="open-positions"><div className="jobs-container">
        <div className="jobs-section-heading centered"><span className="jobs-pill">IMMEDIATE OPENINGS</span><h2>We Are Currently Hiring</h2><p>Explore vacancies across 15 specialized departments in our manufacturing, engineering, and digital commerce network.</p></div>
        <div className="jobs-department-grid">{departments.map((department, index) => <article className="jobs-department-card" key={department.group}>
          <div className={`jobs-card-accent ${index ? 'accent-warm' : ''}`} />
          <header><div className="jobs-dept-icon">{index ? <Building2 /> : <HardHat />}</div><div className="jobs-dept-heading"><h3>{department.group}</h3><p>{department.subtitle}</p></div><span className="jobs-dept-count">{department.count} Depts</span></header>
          <div className="jobs-department-list">{department.roles.map(([name, tag, ...roles], deptIndex) => <section key={name} className="jobs-dept-row"><div><strong>{deptIndex + (index ? 9 : 1)}. {name}</strong><span>{tag}</span></div><div className="jobs-role-list">{roles.map((role) => <button key={role} onClick={() => chooseRole(role)}>{role}<ChevronRight size={13} /></button>)}</div></section>)}</div>
          <footer><span>{index ? 'E-commerce & corporate opportunities' : 'Plant & site roles include safety coverage'}</span><a href="#apply-form">Apply here <ChevronRight size={14} /></a></footer>
        </article>)}</div>
      </div></section>

      <section className="jobs-section jobs-application" id="apply-form"><div className="jobs-form-wrap">
        <div className="jobs-form-card"><div className="jobs-form-heading"><div><span className="jobs-kicker">FAST APPLICATION</span><h2>Submit Your Application</h2><p>Start your career with Meridian’s construction and engineering supply operations.</p></div><span className="jobs-step">APPLICATION PREVIEW</span></div>
          {submitted && <div className="jobs-success" id="form-success-banner"><CheckCircle2 /><div><strong>Preview complete</strong><p>Your details were validated in this browser only. No application has been sent to a recruitment system.</p></div></div>}
          <form key={formKey} className="jobs-form" onSubmit={submitForm}>
            <div className="jobs-fields">
              <label>Full Name *<input name="fullName" placeholder="e.g. Maria Santos" required /></label>
              <label>Contact Number *<div className="jobs-phone"><span>+63</span><input name="contactNumber" type="tel" placeholder="917 123 4567" required /></div></label>
              <label>Email Address *<input name="email" type="email" placeholder="name@domain.com" required /></label>
              <label>City / Municipality *<input name="city" placeholder="e.g. Lipa City, Taguig, Pasig" required /></label>
              <label>Target Region *<select name="region" defaultValue="" required><option value="" disabled>Select your preferred region</option>{regions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
              <label>Position Applying For *<select name="position" value={position} onChange={(event) => setPosition(event.target.value)} required><option value="" disabled>Choose a position</option>{positionGroups.map(([group, ...roles]) => <optgroup label={group} key={group}>{roles.map((role) => <option value={role} key={role}>{role}</option>)}</optgroup>)}</select></label>
            </div>
            <label>Message / Cover Note *<textarea name="message" rows="4" placeholder="Highlight your experience, certifications, shift availability, or motivation for joining..." required /></label>
            <div className={`jobs-upload ${dragging ? 'dragging' : ''}`} role="button" tabIndex={0} onClick={() => fileInput.current?.click()} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') fileInput.current?.click(); }} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files?.[0]); }}>
              <input ref={fileInput} type="file" accept=".pdf,.doc,.docx" onChange={(event) => chooseFile(event.target.files?.[0])} hidden />
              <UploadCloud /><strong>{file ? file.name : 'Drop your resume here or browse files'}</strong><small>PDF, DOC, or DOCX · up to 10 MB {file ? `· ${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}</small>
            </div>
            {error && <p className="jobs-error" role="alert">{error}</p>}
            <label className="jobs-consent"><input name="consent" type="checkbox" required /><span>I authorize Meridian Enterprises and its designated human capital representatives to use the information provided for recruitment and application processing under Republic Act No. 10173 (Data Privacy Act of 2012). *</span></label>
            <div className="jobs-submit-row"><span><LockKeyhole size={15} /> Your information is handled securely</span><button className="jobs-button jobs-button-primary" type="submit" disabled={submitting}>{submitting ? 'Validating…' : 'Submit Preview'} <Send size={16} /></button></div>
          </form>
        </div>
      </div></section>
    </main>

    <footer className="jobs-footer" id="contact"><div className="jobs-container jobs-footer-inner"><a className="jobs-brand footer-brand" href="#careers"><span className="jobs-brand-mark"><Building2 size={18} /></span><span><strong>MERIDIAN TALENT</strong><small>CAREERS</small></span></a><div className="jobs-footer-links"><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Service</a><a href="#contact">Candidate Notice</a><a href="#contact">Accessibility</a></div><span className="jobs-footer-note">Equal Opportunity Employer</span><a className="jobs-return" href="/">Return to Archon Nell <ArrowRight size={15} /></a></div></footer>

    {activeTrack && <div className="jobs-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveTrack(null); }}><section className="jobs-modal" role="dialog" aria-modal="true" aria-labelledby="jobs-modal-title"><button className="jobs-modal-close" onClick={() => setActiveTrack(null)} aria-label="Close dialog"><X /></button><span className="jobs-kicker">{activeTrack.category}</span><h2 id="jobs-modal-title">{activeTrack.title}</h2><p>{activeTrack.description}</p><strong>Associated openings</strong><div className="jobs-modal-roles">{activeTrack.roles.map((role) => <button key={role} onClick={() => { setActiveTrack(null); chooseRole(role); }}>{role}</button>)}</div><div className="jobs-modal-perks"><strong>Program highlights & perks</strong><p>{activeTrack.perks}</p></div><div className="jobs-modal-actions"><button onClick={() => setActiveTrack(null)}>Close</button><button onClick={() => { setActiveTrack(null); scrollTo('apply-form'); }}>Apply to this track <ArrowRight size={15} /></button></div></section></div>}
  </div>;
}
