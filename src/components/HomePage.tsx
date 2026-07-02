import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import {
  Gem,
  Laptop,
  Rocket,
  ShieldCheck,
  Shield,
  Star,
  Target,
  TrendingDown,
  Users,
  Zap,
} from "lucide-react";
import { CtaLink } from "@/components/CtaLink";
import { AnimatedCounter } from "./AnimatedCounter";
import { ScrollAnimations } from "./ScrollAnimations";
import { TestimonialsEffects } from "./TestimonialsEffects";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Feature = {
  title: string;
  text: string;
  icon: IconComponent;
};

type Benefit = {
  label: string;
  icon: IconComponent;
};

type Testimonial = {
  name: string;
  role: string;
  text: string;
  image: string;
  alt: string;
};

const features: Feature[] = [
  {
    title: "Confiança e Segurança",
    text: "Nossa equipe especializada estará sempre ao seu lado para orientá-lo e garantir que você tome as melhores decisões.",
    icon: ShieldCheck,
  },
  {
    title: "Eficiência e Resultados",
    text: "Processos otimizados e estratégias comprovadas para acelerar o crescimento do seu negócio.",
    icon: Zap,
  },
  {
    title: "Equipe Especializada",
    text: "Profissionais experientes e qualificados em diversas áreas de consultoria empresarial.",
    icon: Users,
  },
  {
    title: "Atendimento Personalizado",
    text: "Soluções customizadas para atender às necessidades específicas do seu negócio.",
    icon: Target,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Análise e Diagnóstico",
    text: "Realizamos uma análise completa da sua situação atual, identificando todas as oportunidades para você voltar ao azul com os melhores descontos do mercado.",
  },
  {
    number: "02",
    title: "Estratégia e Planejamento",
    text: "Desenvolvemos um plano estratégico personalizado com metas claras e cronograma de implementação.",
  },
  {
    number: "03",
    title: "Implementação e Execução",
    text: "Colocamos em prática todas as estratégias planejadas com acompanhamento constante e ajustes quando necessário.",
  },
  {
    number: "04",
    title: "Resultados e Otimização",
    text: "Monitoramos os resultados, analisamos o desempenho e implementamos melhorias contínuas para maximizar o sucesso.",
  },
];

const benefits: Benefit[] = [
  { label: "Consulta Grátis", icon: Gem },
  { label: "Até 98% OFF", icon: TrendingDown },
  { label: "100% Online", icon: Laptop },
  { label: "Sem Burocracia", icon: Zap },
  { label: "Resultado Rápido", icon: Rocket },
  { label: "Seguro e Confiável", icon: Shield },
];

const testimonials: Testimonial[] = [
  {
    name: "Marina Silva",
    role: "Empresária",
    text: "Excelente empresa, atendimento rápido e muito profissional. Recomendo super!",
    image: "/img/maria.jpg",
    alt: "Marina Silva",
  },
  {
    name: "Paulo Roberto",
    role: "Analista",
    text: "A consultoria resolveu nossos problemas em tempo recorde. Atendimento excepcional!",
    image: "/img/customer-paulo.png",
    alt: "Paulo Roberto",
  },
  {
    name: "Juliana Costa",
    role: "Autônoma",
    text: "Resolveram nosso problema de forma ótima. Empresa séria e confiável!",
    image: "/img/customer-juliana.png",
    alt: "Juliana Costa",
  },
  {
    name: "Ricardo Mendes",
    role: "Contador",
    text: "Consegui negociar todas as minhas dívidas com descontos incríveis. O processo foi simples e rápido, super recomendo!",
    image: "/img/customer-ricardo.png",
    alt: "Ricardo Mendes",
  },
  {
    name: "Ana Paula Santos",
    role: "Designer",
    text: "Fiquei impressionada com a eficiência e o cuidado no atendimento. Me ajudaram a sair do vermelho de forma organizada e sem estresse.",
    image: "/img/customer-ana-paula.png",
    alt: "Ana Paula Santos",
  },
];

function Hero() {
  

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Descontos de até <strong>98%</strong>. Fique hoje mesmo no Azul
          </h1>
         
          <CtaLink
  href="#"
  className="btn-primary"
  message="Olá, gostaria de consultar minhas ofertas disponíveis!"
>
  Consultar Agora Grátis
</CtaLink>
        </div>
        <div className="hero-image">
          <Image src="/img/123.webp" alt="Consultoria Financeira" width={1017} height={1333} priority />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <AnimatedCounter target={16000000} suffix="+" />
            <div className="stat-label">Clientes Atendidos</div>
          </div>
          <div className="stat-item">
            <AnimatedCounter target={12} suffix="+" />
            <div className="stat-label">Anos de Experiência</div>
          </div>
          <div className="stat-item">
            <AnimatedCounter target={98} suffix="%" />
            <div className="stat-label">Satisfação dos Clientes</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="container">
        <h2 className="section-title">Por que Escolher Nossos Serviços?</h2>
        <p className="section-subtitle">Descubra as vantagens de trabalhar conosco</p>

        <div className="features-grid">
          {features.map(({ title, text, icon: Icon }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon">
                <Icon aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process">
      <div className="container">
        <h2 className="section-title">Nosso Processo de Consultoria</h2>
        <p className="section-subtitle">Uma abordagem estruturada e comprovada para transformar sua situação</p>

        <div className="process-steps">
          {processSteps.map((step) => (
            <div className="step-item" key={step.number}>
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits">
      <div className="container">
        <h2 className="section-title white">Seus Benefícios</h2>
        <div className="benefits-grid">
          {benefits.map(({ label, icon: Icon }) => (
            <div className="benefit-item" key={label}>
              <span className="benefit-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="benefit-text">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const loopTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials">
      <TestimonialsEffects />
      <div className="container">
        <h2 className="section-title">O que Nossos Clientes Dizem</h2>
        <p className="section-subtitle">Histórico de sucesso e satisfação dos clientes</p>

        <div className="testimonials-carousel-wrapper">
          <div className="testimonials-carousel">
            {loopTestimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={`${testimonial.name}-${index}`}>
                <div className="testimonial-avatar">
                  <Image src={testimonial.image} alt={testimonial.alt} width={120} height={120} className="avatar-img" />
                </div>
                <div className="testimonial-content">
                  <div className="testimonial-stars" aria-label="Avaliação 5 estrelas">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} aria-hidden="true" />
                    ))}
                  </div>
                  <p className="testimonial-text">&quot;{testimonial.text}&quot;</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  

  return (
    <section className="cta">
      <div className="container">
        <h2>Pronto para Transformar sua Situação?</h2>
        <p>
          Nossa metodologia comprovada já ajudou milhões de brasileiros a alcançarem resultados excepcionais. Não perca mais tempo e comece sua
          jornada de sucesso hoje mesmo!
        </p>
        <CtaLink
  href="#"
  className="btn-primary large"
  message="Olá, gostaria de consultar minhas ofertas disponíveis!"
>
  Consultar Agora Grátis
</CtaLink>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <ScrollAnimations />
      <Hero />
      <Stats />
      <WhyChoose />
      <Process />
      <Benefits />
      <Testimonials />
      <CTA />
    </>
  );
}
