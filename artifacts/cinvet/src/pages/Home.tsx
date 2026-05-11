import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { 
  Activity, HeartPulse, Bone, Eye, Pill, Search, Syringe,
  Cat, Dog, Bird, ShieldPlus, Bug, Beaker, Dna, 
  Zap, SquareActivity, Brain, Droplet, Clock
} from "lucide-react";
import cinvetLogo from "@assets/cinvet_1778523556349.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WHATSAPP_NUMBER = "558530856561";

const SERVICES = [
  { name: "Acupuntura", icon: Zap },
  { name: "Banco de sangue", icon: Droplet },
  { name: "Cardiologia veterinária", icon: HeartPulse },
  { name: "Cirurgia veterinária", icon: SquareActivity },
  { name: "Dermatologista veterinário", icon: Search },
  { name: "Farmácia veterinária", icon: Pill },
  { name: "Fisioterapia veterinária", icon: Bone },
  { name: "Hospitalização", icon: Activity },
  { name: "Oftalmologia veterinária", icon: Eye },
  { name: "Oncologia veterinária", icon: Dna },
  { name: "Ortopedia veterinária", icon: Bone },
  { name: "Pássaros", icon: Bird },
  { name: "Raios-X de animais", icon: Search },
  { name: "Serviço de emergência", icon: Zap },
  { name: "Vacina", icon: Syringe },
  { name: "Veterinário de gatos", icon: Cat },
  { name: "Veterinários para cães", icon: Dog },
  { name: "Cinomose", icon: Bug },
  { name: "Endocrinologia veterinária", icon: Beaker },
  { name: "Gastroenterologia veterinária", icon: ShieldPlus },
  { name: "Neurologia veterinária", icon: Brain },
  { name: "Parvovirose", icon: Bug },
  { name: "Ultrassonografia", icon: Search },
  { name: "Ultrassonografia veterinária", icon: Search },
];

const REVIEWS = [
  { name: "Davi Costa", stars: 5, time: "5 meses atrás", text: "Uma das melhores clínicas de fortaleza, equipe top demais, levo meus animais aqui há 6 anos e continuo levando porque os profissionais são bons viu." },
  { name: "Maria Neta", stars: 5, time: "1 mês atrás", text: "O atendimento foi excelente, obrigada Dra Vera. Atendimento humanizado." },
  { name: "Beatriz Sena", stars: 5, time: "3 meses atrás", text: "Melhor clínica de Fortaleza!! Meus cachorros sempre são muito bem tratados." },
  { name: "Sheila", stars: 5, time: "11 meses atrás", text: "Uma excelente clínica, com profissionais muito competentes, o atendimento sempre foi muito bom, da recepção aos veterinários, estagiários e auxiliares, todos muito gentis e amorosos com os pets." },
  { name: "João Gabriel Fonteles", stars: 5, time: "3 meses atrás", text: "Equipe nota 10, internamento impecável, Hospital super organizado e tem excelentes profissionais." },
  { name: "James Martins", stars: 5, time: "8 meses atrás", text: "Meu pet foi tratado com carinho e dignidade e não se trata apenas dos doutores e doutoras, mas sim de todos. Da recepção à zeladoria toda a equipe sem exceção é nota dez." },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [petName, setPetName] = useState("");
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = () => {
    let message = "Olá! Gostaria de agendar uma consulta";
    if (selectedService) message += ` de *${selectedService}*`;
    if (petName) message += ` para meu pet, *${petName}*`;
    message += ". Poderia me ajudar?";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleEmergency = () => {
    const message = "URGÊNCIA! Preciso de atendimento emergencial para meu pet agora.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-white">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img src={cinvetLogo} alt="Cinvet Logo" className="w-10 h-10 object-contain rounded-full" />
            <span className="font-serif font-bold text-2xl tracking-tight text-primary">Cinvet</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-foreground/80">
            {[
              { id: "hero", label: "Início" },
              { id: "services", label: "Serviços" },
              { id: "reviews", label: "Avaliações" },
              { id: "location", label: "Localização" },
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative hover:text-primary transition-colors py-1"
                whileTap={{ scale: 0.92 }}
                data-testid={`nav-${id}`}
              >
                {label}
                {activeNav === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
          <Button onClick={() => scrollToSection("booking")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
            Agendar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img src="/images/hero-bg.png" alt="Veterinary Hospital Interior" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-6">
              <Clock className="w-4 h-4" /> Atendimento 24 Horas
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-primary mb-6">
              O cuidado que seu melhor amigo merece.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-lg leading-relaxed">
              Hospital veterinário completo em Fortaleza. Equipe especializada, estrutura premium e amor em cada atendimento, 24 horas por dia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection("booking")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-lg h-14 px-8">
                Agendar Consulta
              </Button>
              <Button onClick={handleEmergency} variant="outline" size="lg" className="border-destructive text-destructive hover:bg-destructive hover:text-white rounded-full text-lg h-14 px-8 group">
                <HeartPulse className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Emergência 24h
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-10 relative z-20 shadow-lg">
        <div className="container mx-auto px-4 md:px-8 flex flex-wrap justify-between items-center gap-8 divide-x divide-primary-foreground/20">
          <div className="flex-1 text-center px-4">
            <p className="text-3xl font-serif font-bold text-accent mb-1">4.4 ★</p>
            <p className="text-sm opacity-90 uppercase tracking-wider">Google (407 avaliações)</p>
          </div>
          <div className="flex-1 text-center px-4">
            <p className="text-3xl font-serif font-bold text-accent mb-1">24h</p>
            <p className="text-sm opacity-90 uppercase tracking-wider">Aberto Todos os Dias</p>
          </div>
          <div className="flex-1 text-center px-4">
            <p className="text-3xl font-serif font-bold text-accent mb-1">UTI</p>
            <p className="text-sm opacity-90 uppercase tracking-wider">Plantão de Emergência</p>
          </div>
          <div className="flex-1 text-center px-4">
            <p className="text-3xl font-serif font-bold text-accent mb-1">Cocó</p>
            <p className="text-sm opacity-90 uppercase tracking-wider">Fortaleza - CE</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">Especialidades e Serviços</h2>
            <p className="text-foreground/70 text-lg">Oferecemos uma estrutura hospitalar completa para diagnóstico, tratamento e recuperação do seu pet.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full bg-card hover-elevate">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-foreground">{service.name}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <img src="/images/why-cinvet.png" alt="Veterinarian treating pet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">Agende uma Consulta</h2>
            <p className="text-foreground/70 text-lg mb-10">Selecione a especialidade e fale diretamente com nossa recepção via WhatsApp para marcar o melhor horário.</p>
            
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border/50">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service">Especialidade / Serviço</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger id="service" className="h-12">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map(s => (
                        <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="petName">Nome do Pet (Opcional)</Label>
                  <Input 
                    id="petName" 
                    placeholder="Ex: Thor, Luna..." 
                    className="h-12"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleBooking} 
                  className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <FaWhatsapp className="w-6 h-6" />
                  Agendar via WhatsApp
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Em caso de emergência, dirija-se imediatamente ao hospital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-16 text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-4">O que dizem sobre nós</h2>
          <p className="text-primary-foreground/80 text-lg">A confiança de quem ama seus pets.</p>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 px-6"
            style={{
              width: "max-content",
              animation: "reviews-scroll 40s linear infinite",
            }}
          >
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div
                key={i}
                className="w-[340px] flex-shrink-0 bg-white text-foreground p-8 rounded-2xl shadow-xl cursor-default"
                style={{
                  perspective: "1000px",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                  transform: hoveredReview === i
                    ? "rotateY(-8deg) rotateX(2deg) scale(1.03)"
                    : "rotateY(0deg) rotateX(0deg) scale(1)",
                  boxShadow: hoveredReview === i
                    ? "0 24px 48px -8px rgba(0,0,0,0.22)"
                    : "0 4px 24px -4px rgba(0,0,0,0.12)",
                  transformStyle: "preserve-3d",
                  animationPlayState: hoveredReview === i ? "paused" : "running",
                }}
                onMouseEnter={() => setHoveredReview(i)}
                onMouseLeave={() => setHoveredReview(null)}
                data-testid={`review-card-${i}`}
              >
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(review.stars)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-6 leading-relaxed flex-grow">"{review.text}"</p>
                <div>
                  <p className="font-semibold text-primary">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes reviews-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}} />
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h2 className="font-serif text-4xl font-bold text-primary mb-4">Onde Estamos</h2>
                <p className="text-foreground/70 text-lg">Fácil acesso no bairro Cocó, com estacionamento no local.</p>
              </div>
              
              <div className="space-y-6 bg-card p-8 rounded-2xl border border-border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Endereço</h4>
                    <p className="text-muted-foreground">R. Dr. Gilberto Studart, 800 - Cocó<br/>Fortaleza - CE, 60192-105</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horário de Funcionamento</h4>
                    <p className="text-muted-foreground">Aberto 24 horas<br/>Todos os dias da semana</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FaWhatsapp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Contato</h4>
                    <p className="text-muted-foreground">(85) 3085-6561</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 h-[500px] rounded-2xl overflow-hidden shadow-lg border border-border">
              <iframe 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFmBBs&q=Cinvet+Hospital+Veterinário,Fortaleza+CE" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 border-t border-primary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <img src={cinvetLogo} alt="Cinvet Logo" className="w-10 h-10 object-contain rounded-full" />
                <span className="font-serif font-bold text-2xl tracking-tight text-white">Cinvet</span>
              </div>
              <p className="text-background/70 max-w-sm mb-6">
                Hospital Veterinário 24 Horas.<br/>
                O cuidado que seu melhor amigo merece.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://www.instagram.com/cinvet.fortaleza/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/cinvet.fortaleza/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <Button onClick={handleEmergency} size="lg" className="bg-destructive hover:bg-destructive/90 text-white rounded-full mb-6">
                Emergência 24h: (85) 3085-6561
              </Button>
              <p className="text-sm text-background/50">
                &copy; {new Date().getFullYear()} Cinvet Hospital Veterinário.<br/>
                Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")}
            className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 animate-[bounce_3s_infinite]"
            aria-label="Fale conosco no WhatsApp"
          >
            <FaWhatsapp className="w-8 h-8" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-foreground text-background border-none mb-2 font-medium">
          Fale conosco no WhatsApp
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
