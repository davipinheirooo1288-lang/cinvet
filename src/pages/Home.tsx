import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Beaker,
  Bone,
  Brain,
  Building2,
  Cat,
  Clock,
  Dog,
  Droplet,
  Eye,
  HeartPulse,
  Link2,
  Maximize2,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Pill,
  Search,
  ShieldCheck,
  Sparkles,
  SquareActivity,
  Star,
  Stethoscope,
  Syringe,
  X,
  Zap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const cinvetLogo = "/cinvet-logo-4k.png";
const heroPhoto = "/cinvet-inicio-4k.png";
const aboutPhoto = "/cinvet-sobre-nos-foto.png";
const aboutVideoWebm = "/cinvet-video-sobre-nos.webm";
const aboutVideoMp4 = "/cinvet-video-sobre-nos.mp4";
const servicesVideoWebm = "/cinvet-servicos.webm";
const servicesVideoMp4 = "/cinvet-servicos.mp4";

const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "sobre", label: "Sobre nós" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Contato" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cinvet.fortaleza/",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cinvet.fortaleza/",
    icon: FaFacebook,
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/cinvet.fortaleza",
    icon: Link2,
  },
];

const UNITS = [
  {
    slug: "coco",
    shortName: "Cinvet Cocó",
    name: "Cinvet Cocó - Hospital Veterinário 24h",
    address: "R. Dr. Gilberto Studart, 800 - Cocó, Fortaleza - CE, 60192-105",
    phone: "(85) 99444-3929",
    whatsapp: "5585994443929",
    maps: "https://www.google.com/maps/search/?api=1&query=Cinvet%20Hospital%20Veterinario%2024%20Horas%20R.%20Dr.%20Gilberto%20Studart%20800%20Coco%20Fortaleza",
    note: "Unidade I",
  },
  {
    slug: "sul",
    shortName: "Cinvet Sul",
    name: "Cinvet Sul - Hospital Veterinário 24 horas",
    address:
      "Av. Oliveira Paiva, 2153 - Cidade dos Funcionários, Fortaleza - CE, 60821-802",
    phone: "(85) 99101-4941",
    whatsapp: "5585991014941",
    maps: "https://www.google.com/maps/search/?api=1&query=Cinvet%20Sul%20Hospital%20Veterinario%2024%20horas%20Av.%20Oliveira%20Paiva%202153%20Fortaleza",
    note: "Unidade II",
  },
];

const SERVICES = [
  { name: "Atendimento 24h", icon: Clock, detail: "Plantão todos os dias" },
  {
    name: "Emergência veterinária",
    icon: Ambulance,
    detail: "Resposta rápida",
  },
  {
    name: "Clínica médica",
    icon: Stethoscope,
    detail: "Acompanhamento completo",
  },
  {
    name: "Internação e UTI",
    icon: Activity,
    detail: "Monitoramento hospitalar",
  },
  {
    name: "Cirurgia veterinária",
    icon: SquareActivity,
    detail: "Estrutura preparada",
  },
  {
    name: "Cardiologia veterinária",
    icon: HeartPulse,
    detail: "Avaliação especializada",
  },
  {
    name: "Dermatologia veterinária",
    icon: Search,
    detail: "Pele, pelos e alergias",
  },
  { name: "Oftalmologia veterinária", icon: Eye, detail: "Cuidado ocular" },
  { name: "Ortopedia veterinária", icon: Bone, detail: "Ossos e articulações" },
  {
    name: "Oncologia veterinária",
    icon: ShieldCheck,
    detail: "Suporte especializado",
  },
  {
    name: "Ultrassonografia",
    icon: Microscope,
    detail: "Diagnóstico por imagem",
  },
  { name: "Raio-X de animais", icon: Search, detail: "Imagem diagnóstica" },
  { name: "Laboratório próprio", icon: Beaker, detail: "Exames com agilidade" },
  { name: "Banco de sangue", icon: Droplet, detail: "Suporte hospitalar" },
  { name: "Vacinas", icon: Syringe, detail: "Prevenção e proteção" },
  { name: "Farmácia veterinária", icon: Pill, detail: "Apoio ao tratamento" },
  {
    name: "Neurologia veterinária",
    icon: Brain,
    detail: "Avaliação neurológica",
  },
  { name: "Gastroenterologia", icon: Activity, detail: "Sistema digestivo" },
  { name: "Acupuntura", icon: Zap, detail: "Cuidado integrativo" },
  { name: "Veterinário para cães", icon: Dog, detail: "Rotina e urgências" },
  { name: "Veterinário para gatos", icon: Cat, detail: "Manejo cuidadoso" },
];

const HERO_METRICS = [
  { value: "24h", label: "atendimento todos os dias" },
  { value: "+20", label: "especialidades veterinárias" },
  { value: "2", label: "unidades em Fortaleza" },
];

const SPECIES_OPTIONS = [
  "Cachorro",
  "Gato",
  "Ave",
  "Exótico / silvestre",
  "Outro",
];

type MediaPreview =
  | {
      type: "image";
      src: string;
      title: string;
    }
  | {
      type: "video";
      webm: string;
      mp4: string;
      title: string;
    };

const REVIEWS = [
  {
    name: "Alcilene Lima",
    meta: "6 avaliações · há 3 meses",
    text: "Só gratidão à toda equipe que atendeu a Luna e salvou sua vida. Vocês são excelentes e temos toda gratidão. Indico a clínica pra todos que conheço, realmente é um hospital sério e responsável.",
    reply:
      "Resposta Cinvet: receber esse carinho significa muito para uma equipe que se dedica todos os dias a oferecer cuidado, segurança e acolhimento.",
  },
  {
    name: "Betinho Almeida",
    meta: "Local Guide · 93 avaliações · há um mês",
    text: "Precisei fazer um serviço de microchip lá e, para minha surpresa, atendimento excepcional. As meninas da recepção foram muito atenciosas e prestativas, nota mil em tudo.",
  },
  {
    name: "Juliana Cidrao",
    meta: "6 avaliações · há um mês",
    text: "Minha experiência foi maravilhosa. Atendimento excelente, desde a recepção ao atendimento médico. Nota 10.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const listReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Home() {
  const [activeNav, setActiveNav] = useState("inicio");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null);
  const [selectedUnitSlug, setSelectedUnitSlug] = useState(UNITS[0].slug);
  const [selectedService, setSelectedService] = useState(SERVICES[0].name);
  const [selectedSpecies, setSelectedSpecies] = useState(SPECIES_OPTIONS[0]);
  const [petName, setPetName] = useState("");
  const lastScrollY = useRef(0);

  const selectedUnit = useMemo(
    () => UNITS.find((unit) => unit.slug === selectedUnitSlug) ?? UNITS[0],
    [selectedUnitSlug],
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const shouldHide = isScrollingDown && currentScrollY > 160 && !mobileOpen;

      setIsHeaderHidden(shouldHide);
      lastScrollY.current = Math.max(currentScrollY, 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    setMobileOpen(false);
    const section = document.getElementById(id);

    if (!section) return;

    const headerOffset = window.matchMedia("(max-width: 720px)").matches
      ? 92
      : 118;
    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  const openWhatsApp = (unit = selectedUnit, message?: string) => {
    const text =
      message ??
      `Olá! Gostaria de falar com a ${unit.shortName} para atendimento veterinário.`;

    window.open(
      `https://wa.me/${unit.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleBooking = () => {
    const petLine = petName.trim() ? ` para meu pet, ${petName.trim()}` : "";
    const speciesLine = selectedSpecies ? ` Espécie: ${selectedSpecies}.` : "";
    const message = `Olá! Gostaria de agendar ${selectedService}${petLine} na ${selectedUnit.shortName}.${speciesLine} Pode me ajudar?`;
    openWhatsApp(selectedUnit, message);
  };

  const handleEmergency = (unit = selectedUnit) => {
    openWhatsApp(
      unit,
      `URGÊNCIA 24H: preciso de atendimento emergencial para meu pet na ${unit.shortName}.`,
    );
    setEmergencyOpen(false);
  };

  const reviewLoop = [...REVIEWS, ...REVIEWS];

  return (
    <div className="cinvet-shell min-h-screen bg-background text-foreground">
      <header className={`site-header ${isHeaderHidden ? "is-hidden" : ""}`}>
        <div className="site-header__inner">
          <button
            type="button"
            className="brand-button"
            onClick={() => scrollToSection("inicio")}
            aria-label="Ir para o início"
            data-testid="button-logo-home"
          >
            <span className="brand-mark">
              <img src={cinvetLogo} alt="Cinvet" />
            </span>
            <span className="brand-copy">
              <span>Cinvet</span>
              <small>Hospital 24h</small>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={activeNav === item.id ? "is-active" : ""}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <div className="header-socials">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="icon-link"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>{social.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            <button
              type="button"
              className="primary-action"
              onClick={() => scrollToSection("contato")}
              data-testid="button-header-contato"
            >
              Agendar
              <span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>

            <button
              type="button"
              className="menu-button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            aria-label="Navegação mobile"
          >
            {NAV_ITEMS.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button type="button" onClick={() => handleEmergency(UNITS[1])}>
              Emergência 24h
            </button>
          </motion.nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero-section">
          <img
            src={heroPhoto}
            alt="Fachada do Cinvet Centro Integrado Veterinário"
            className="hero-background"
          />
          <div className="hero-overlay" />
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={listReveal}
            >
              <motion.p className="hero-lead" variants={reveal}>
                Duas unidades preparadas para urgências, internação, exames,
                acompanhamento clínico e especialidades veterinárias em todos os
                momentos do dia.
              </motion.p>

              <motion.div className="hero-cta-row" variants={reveal}>
                <button
                  type="button"
                  className="primary-action hero-action"
                  onClick={() => scrollToSection("contato")}
                >
                  Agendar atendimento
                  <span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="emergency-action"
                  onClick={() => setEmergencyOpen(true)}
                  data-testid="button-hero-emergency"
                >
                  <HeartPulse className="h-5 w-5" />
                  Emergência 24h
                </button>
              </motion.div>

              <motion.div className="hero-metrics" variants={listReveal}>
                {HERO_METRICS.map((metric) => (
                  <motion.div key={metric.label} variants={reveal}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="servicos" className="section-pad services-section">
          <div className="section-heading">
            <p className="section-kicker">Serviços</p>
            <h2>Hospital completo para rotina, diagnóstico e urgência.</h2>
            <p>
              Atendimento clínico, exames, internação, especialidades e suporte
              24 horas em um fluxo pensado para dar segurança ao tutor e cuidado
              ao paciente.
            </p>
          </div>

          <div className="services-layout">
            <motion.button
              type="button"
              className="video-panel"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              onClick={() =>
                setMediaPreview({
                  type: "video",
                  webm: servicesVideoWebm,
                  mp4: servicesVideoMp4,
                  title: "Serviços e estrutura Cinvet",
                })
              }
              data-testid="open-services-video"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Vídeo dos serviços do Cinvet"
              >
                <source src={servicesVideoWebm} type="video/webm" />
                <source src={servicesVideoMp4} type="video/mp4" />
              </video>
              <span className="media-expand-chip">
                <Maximize2 className="h-4 w-4" />
                Ver vídeo
              </span>
              <div className="video-panel__caption">
                <Sparkles className="h-4 w-4" />+ de 20 especialidades, UTI,
                laboratório próprio e internação.
              </div>
            </motion.button>

            <motion.div
              className="service-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={listReveal}
            >
              {SERVICES.slice(0, 12).map((service) => {
                const Icon = service.icon;
                return (
                  <motion.article
                    key={service.name}
                    className="service-card"
                    variants={reveal}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.detail}</p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="sobre" className="section-pad about-section">
          <div className="about-grid">
            <motion.div
              className="about-media"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={listReveal}
            >
              <motion.button
                type="button"
                className="about-video"
                variants={reveal}
                onClick={() =>
                  setMediaPreview({
                    type: "video",
                    webm: aboutVideoWebm,
                    mp4: aboutVideoMp4,
                    title: "Sobre o Cinvet",
                  })
                }
                data-testid="open-about-video"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Vídeo institucional sobre o Cinvet"
                >
                  <source src={aboutVideoWebm} type="video/webm" />
                  <source src={aboutVideoMp4} type="video/mp4" />
                </video>
                <span className="media-expand-chip">
                  <Maximize2 className="h-4 w-4" />
                  Ver vídeo
                </span>
              </motion.button>
              <motion.button
                type="button"
                className="about-photo"
                variants={reveal}
                onClick={() =>
                  setMediaPreview({
                    type: "image",
                    src: aboutPhoto,
                    title: "Equipe Cinvet no ambiente hospitalar",
                  })
                }
                data-testid="open-about-photo"
              >
                <img
                  src={aboutPhoto}
                  alt="Equipe Cinvet no ambiente hospitalar"
                />
                <span className="media-expand-chip">
                  <Maximize2 className="h-4 w-4" />
                  Ver foto
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className="about-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={listReveal}
            >
              <motion.p className="section-kicker" variants={reveal}>
                Sobre nós
              </motion.p>
              <motion.h2 variants={reveal}>
                Excelência veterinária com a calma que a família precisa sentir.
              </motion.h2>
              <motion.div className="about-text" variants={listReveal}>
                <motion.p variants={reveal}>
                  No Cinvet, cuidamos de cada paciente com a atenção, o respeito
                  e o carinho que ele merece. Somos um hospital veterinário
                  preparado para oferecer atendimento completo, humanizado e
                  seguro, unindo estrutura moderna, equipe qualificada e
                  tecnologia para cuidar da saúde dos pets em todos os momentos.
                </motion.p>
                <motion.p variants={reveal}>
                  Nossa missão é estar ao lado dos tutores quando eles mais
                  precisam, oferecendo suporte veterinário com responsabilidade,
                  agilidade e acolhimento. Por isso, contamos com atendimento{" "}
                  <strong>24 horas</strong>, ambiente preparado para internação,
                  exames, acompanhamento clínico e cuidados especializados.
                </motion.p>
                <motion.p variants={reveal}>
                  Aqui, cada animal é tratado como único. Mais do que realizar
                  atendimentos, buscamos proporcionar confiança, conforto e
                  tranquilidade para as famílias que nos escolhem.
                </motion.p>
                <motion.p variants={reveal}>
                  No Cinvet, amor pelos animais e excelência veterinária
                  caminham juntos para garantir o melhor cuidado, todos os dias,
                  a qualquer hora.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="depoimentos" className="section-pad reviews-section">
          <div className="section-heading">
            <p className="section-kicker">Depoimentos</p>
            <h2>Histórias de cuidado contadas por quem esteve aqui.</h2>
            <p>
              Avaliações reais de tutores que confiaram seus pets à equipe
              Cinvet.
            </p>
          </div>

          <div className="review-stage" aria-label="Depoimentos de clientes">
            <div className="review-rail">
              {reviewLoop.map((review, index) => (
                <article
                  className="review-card"
                  key={`${review.name}-${index}`}
                >
                  <div className="review-stars" aria-label="5 estrelas">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4" />
                    ))}
                  </div>
                  <p>{review.text}</p>
                  {review.reply && <small>{review.reply}</small>}
                  <footer>
                    <strong>{review.name}</strong>
                    <span>{review.meta}</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section-pad contact-section">
          <div className="section-heading">
            <p className="section-kicker">Contato</p>
            <h2>Escolha a unidade e fale direto com a equipe.</h2>
            <p>
              O atendimento funciona 24 horas, de segunda a domingo, nas
              unidades Cocó e Sul.
            </p>
          </div>

          <div className="contact-grid">
            <div className="units-list">
              {UNITS.map((unit) => (
                <article className="unit-card" key={unit.slug}>
                  <div className="unit-card__label">
                    <Building2 className="h-4 w-4" />
                    {unit.note}
                  </div>
                  <h3>{unit.name}</h3>
                  <p>
                    <MapPin className="h-4 w-4" />
                    {unit.address}
                  </p>
                  <p>
                    <Clock className="h-4 w-4" />
                    Atendimento 24 horas, todos os dias da semana
                  </p>
                  <p>
                    <Phone className="h-4 w-4" />
                    {unit.phone}
                  </p>
                  <div className="unit-actions">
                    <button type="button" onClick={() => openWhatsApp(unit)}>
                      <FaWhatsapp className="h-4 w-4" />
                      WhatsApp
                    </button>
                    <a
                      href={unit.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4" />
                      Rota
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <form
              className="booking-form"
              onSubmit={(event) => {
                event.preventDefault();
                handleBooking();
              }}
              data-testid="booking-form"
            >
              <div className="form-heading">
                <span>
                  <FaWhatsapp className="h-5 w-5" />
                </span>
                <div>
                  <h3>Agendamento pelo WhatsApp</h3>
                  <p>
                    A mensagem já sai com unidade, serviço, espécie e pet
                    selecionados.
                  </p>
                </div>
              </div>

              <label htmlFor="unit">
                Unidade
                <select
                  id="unit"
                  value={selectedUnitSlug}
                  onChange={(event) => setSelectedUnitSlug(event.target.value)}
                >
                  {UNITS.map((unit) => (
                    <option value={unit.slug} key={unit.slug}>
                      {unit.shortName}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="service">
                Serviço
                <select
                  id="service"
                  value={selectedService}
                  onChange={(event) => setSelectedService(event.target.value)}
                >
                  {SERVICES.map((service) => (
                    <option value={service.name} key={service.name}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="species">
                Espécie do pet
                <select
                  id="species"
                  value={selectedSpecies}
                  onChange={(event) => setSelectedSpecies(event.target.value)}
                >
                  {SPECIES_OPTIONS.map((species) => (
                    <option value={species} key={species}>
                      {species}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="petName">
                Nome do pet
                <input
                  id="petName"
                  value={petName}
                  onChange={(event) => setPetName(event.target.value)}
                  placeholder="Ex: Luna"
                />
              </label>

              <button type="submit" className="whatsapp-submit">
                <FaWhatsapp className="h-5 w-5" />
                Enviar para {selectedUnit.shortName}
              </button>

              <button
                type="button"
                className="emergency-submit"
                onClick={() => handleEmergency(selectedUnit)}
              >
                <HeartPulse className="h-5 w-5" />
                Atendimento emergencial 24h
              </button>
            </form>
          </div>
        </section>
      </main>

      {emergencyOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emergency-title"
          onClick={() => setEmergencyOpen(false)}
        >
          <motion.div
            className="emergency-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setEmergencyOpen(false)}
              aria-label="Fechar escolha de emergência"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="section-kicker">Emergência 24h</p>
            <h2 id="emergency-title">Escolha a unidade mais próxima.</h2>
            <p>
              Ao tocar na unidade, o WhatsApp abre com a mensagem de emergência
              pronta para a equipe da sede escolhida.
            </p>

            <div className="emergency-unit-grid">
              {UNITS.map((unit) => (
                <button
                  type="button"
                  key={unit.slug}
                  onClick={() => handleEmergency(unit)}
                  data-testid={`emergency-unit-${unit.slug}`}
                >
                  <span>
                    <HeartPulse className="h-5 w-5" />
                  </span>
                  <strong>{unit.shortName}</strong>
                  <small>{unit.address}</small>
                  <em>{unit.phone}</em>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {mediaPreview && (
        <div
          className="modal-backdrop media-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-preview-title"
          onClick={() => setMediaPreview(null)}
        >
          <motion.div
            className="media-modal"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="media-modal__header">
              <h2 id="media-preview-title">{mediaPreview.title}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={() => setMediaPreview(null)}
                aria-label="Fechar visualização"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="media-modal__body">
              {mediaPreview.type === "image" ? (
                <img src={mediaPreview.src} alt={mediaPreview.title} />
              ) : (
                <video controls autoPlay playsInline>
                  <source src={mediaPreview.webm} type="video/webm" />
                  <source src={mediaPreview.mp4} type="video/mp4" />
                </video>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <footer className="site-footer">
        <div>
          <button
            type="button"
            className="brand-button brand-button--footer"
            onClick={() => scrollToSection("inicio")}
          >
            <span className="brand-mark">
              <img src={cinvetLogo} alt="Cinvet" />
            </span>
            <span className="brand-copy">
              <span>Cinvet</span>
              <small>Hospital veterinário 24 horas</small>
            </span>
          </button>
          <p>Fortaleza - CE · Atendimento 24 horas · Duas unidades.</p>
        </div>

        <div className="footer-links">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>
      </footer>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => openWhatsApp(selectedUnit)}
            className="floating-whatsapp"
            aria-label="Fale conosco no WhatsApp"
            data-testid="floating-whatsapp"
          >
            <FaWhatsapp className="h-7 w-7" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">Fale conosco no WhatsApp</TooltipContent>
      </Tooltip>
    </div>
  );
}
