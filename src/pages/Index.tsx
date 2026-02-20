import React from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Car, Building2, TrendingUp, Shield, Users, ChevronLeft, Star, ArrowLeft } from "lucide-react";

const stats = [
{ value: "+٢٠٠", label: "مشروع ممول", icon: TrendingUp },
{ value: "٩٨٪", label: "نسبة النجاح", icon: Star },
{ value: "+٥٠٠٠", label: "مستثمر نشط", icon: Users },
{ value: "٥٠٠م+", label: "ريال تم تمويله", icon: Shield }];


const projects = [
{
  type: "car",
  badge: "🚗 سيارات",
  title: "مرسيدس S-Class 2024",
  location: "الرياض",
  target: "٢٨٠,٠٠٠",
  funded: 78,
  return: "١٤٪",
  period: "١٢ شهراً",
  tag: "فرصة محدودة",
  color: "from-blue-900 to-slate-900"
},
{
  type: "real-estate",
  badge: "🏢 عقارات",
  title: "برج الأعمال — حي النخبة",
  location: "جدة",
  target: "٣,٢٠٠,٠٠٠",
  funded: 62,
  return: "١٨٪",
  period: "٢٤ شهراً",
  tag: "الأعلى عائداً",
  color: "from-emerald-900 to-slate-900"
},
{
  type: "real-estate",
  badge: "🏘️ عقارات",
  title: "مجمع الفلل السكني",
  location: "الدمام",
  target: "١,٨٠٠,٠٠٠",
  funded: 45,
  return: "١٢٪",
  period: "١٨ شهراً",
  tag: "جديد",
  color: "from-amber-900 to-slate-900"
}];


const steps = [
{ num: "١", title: "سجّل مجاناً", desc: "أنشئ حسابك في دقيقتين واستعرض الفرص المتاحة" },
{ num: "٢", title: "اختر مشروعك", desc: "تصفح فرص السيارات والعقارات وابدأ بما يناسبك" },
{ num: "٣", title: "استثمر بثقة", desc: "تتبع عوائدك لحظة بلحظة عبر لوحة تحكم ذكية" }];


const NavBar = () =>
<nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[hsl(220_70%_8%/0.95)] backdrop-blur-md border-b border-[hsl(45_85%_58%/0.15)]">
    <div className="flex items-center gap-3">
      <span className="text-2xl md:text-3xl font-black text-gold tracking-wide" style={{ color: "hsl(45,85%,58%)" }}>
        مولها
      </span>
      <span className="hidden md:block text-xs text-[hsl(45_85%_58%/0.6)] border border-[hsl(45_85%_58%/0.3)] px-2 py-0.5 rounded-full">
        منصة التمويل الجماعي
      </span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm text-[hsl(220_10%_80%)]">
      <a href="#projects" className="hover:text-[hsl(45,85%,58%)] transition-colors">المشاريع</a>
      <a href="#how" className="hover:text-[hsl(45,85%,58%)] transition-colors">كيف تعمل</a>
      <a href="#stats" className="hover:text-[hsl(45,85%,58%)] transition-colors">إحصاءات</a>
    </div>
    <div className="flex items-center gap-3">
      <Button variant="gold-outline" size="sm" className="hidden md:inline-flex">تسجيل الدخول</Button>
      <Button variant="gold" size="sm">ابدأ الآن</Button>
    </div>
  </nav>;


const HeroSection = () =>
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <img src={heroBg} alt="مولها - منصة التمويل" className="absolute inset-0 w-full h-full object-cover object-center" />
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(220 70% 6% / 0.93) 0%, hsl(220 60% 12% / 0.85) 60%, hsl(220 50% 18% / 0.75) 100%)" }} />
    
    {/* Gold particles / decorative */}
    <div className="absolute top-32 left-20 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(45 85% 58%), transparent 70%)" }} />
    <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(45 85% 58%), transparent 70%)" }} />

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border" style={{ background: "hsl(45 85% 58% / 0.15)", borderColor: "hsl(45 85% 58% / 0.4)", color: "hsl(45,85%,72%)" }}>
        <Star className="w-4 h-4 fill-current" />
        منصة التمويل الجماعي الأولى للسيارات والعقارات
      </div>

      <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6" style={{ color: "hsl(0,0%,100%)" }}>
        <span style={{ color: "hsl(45,85%,58%)" }}>مولّها</span>
        <br />
        <span className="text-3xl md:text-5xl font-bold" style={{ color: "hsl(220,10%,85%)" }}>واربح معها</span>
      </h1>

      <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "hsl(220,10%,75%)" }}>استثمر في سيارات فاخرة وعقارات مميزة
      <strong style={{ color: "hsl(45,85%,68%)" }}>٥٠٠ ريال</strong> فقط، واحصل على عوائد تصل إلى <strong style={{ color: "hsl(45,85%,68%)" }}>٢٠٪</strong> سنوياً
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="gold" size="xl" className="text-lg font-bold w-full sm:w-auto">
          ابدأ الاستثمار الآن
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button variant="gold-outline" size="xl" className="text-lg w-full sm:w-auto">
          استعرض المشاريع
        </Button>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
      <span className="text-xs" style={{ color: "hsl(45,85%,65%)" }}>اسحب للأسفل</span>
      <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, hsl(45,85%,65%), transparent)" }} />
    </div>
  </section>;


const StatsSection = () =>
<section id="stats" className="py-16 bg-navy" style={{ background: "hsl(var(--navy))" }}>
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) =>
    <div key={s.label} className="text-center group">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 mx-auto transition-transform group-hover:scale-110" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,58%)" }}>
            <s.icon className="w-6 h-6" />
          </div>
          <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: "hsl(45,85%,62%)" }}>{s.value}</div>
          <div className="text-sm" style={{ color: "hsl(220,10%,70%)" }}>{s.label}</div>
        </div>
    )}
    </div>
  </section>;


const ProjectCard = ({ project }: {project: typeof projects[0];}) =>
<div className="rounded-2xl overflow-hidden shadow-card hover:shadow-navy transition-all duration-300 hover:-translate-y-1 group" style={{ background: "hsl(0,0%,100%)" }}>
    {/* Card Header */}
    <div className={`relative h-40 bg-gradient-to-br ${project.color} flex items-end p-4`}>
      <div className="absolute top-3 right-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "hsl(45 85% 58% / 0.2)", color: "hsl(45,85%,80%)", border: "1px solid hsl(45 85% 58% / 0.4)" }}>
          {project.badge}
        </span>
      </div>
      {project.tag &&
    <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: "hsl(45,85%,58%)", color: "hsl(220,65%,12%)" }}>
            {project.tag}
          </span>
        </div>
    }
      <div>
        <h3 className="text-white font-bold text-lg">{project.title}</h3>
        <p className="text-white/60 text-sm flex items-center gap-1">📍 {project.location}</p>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-5">
      <div className="flex justify-between text-sm mb-2">
        <span style={{ color: "hsl(220,15%,55%)" }}>تم التمويل</span>
        <span className="font-bold" style={{ color: "hsl(220,65%,15%)" }}>{project.funded}٪</span>
      </div>
      <div className="w-full h-2 rounded-full mb-4" style={{ background: "hsl(220,15%,92%)" }}>
        <div
        className="h-2 rounded-full transition-all duration-700"
        style={{ width: `${project.funded}%`, background: "linear-gradient(to left, hsl(38,75%,42%), hsl(45,85%,58%))" }} />

      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg" style={{ background: "hsl(220,15%,97%)" }}>
          <div className="text-xs mb-1" style={{ color: "hsl(220,15%,55%)" }}>الهدف</div>
          <div className="font-bold text-sm" style={{ color: "hsl(220,65%,15%)" }}>{project.target} ر</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: "hsl(45 85% 58% / 0.08)" }}>
          <div className="text-xs mb-1" style={{ color: "hsl(220,15%,55%)" }}>العائد</div>
          <div className="font-bold text-sm" style={{ color: "hsl(38,75%,42%)" }}>{project.return}</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: "hsl(220,15%,97%)" }}>
          <div className="text-xs mb-1" style={{ color: "hsl(220,15%,55%)" }}>المدة</div>
          <div className="font-bold text-sm" style={{ color: "hsl(220,65%,15%)" }}>{project.period}</div>
        </div>
      </div>

      <Button variant="gold" className="w-full font-bold">
        استثمر الآن
        <ChevronLeft className="w-4 h-4" />
      </Button>
    </div>
  </div>;


const ProjectsSection = () =>
<section id="projects" className="py-20 px-6" style={{ background: "hsl(var(--background))" }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold px-4 py-2 rounded-full mb-4 inline-block" style={{ background: "hsl(45 85% 58% / 0.12)", color: "hsl(38,75%,42%)" }}>
          فرص الاستثمار
        </span>
        <h2 className="text-4xl font-black mb-3" style={{ color: "hsl(var(--primary))" }}>أبرز المشاريع المتاحة</h2>
        <p className="text-lg" style={{ color: "hsl(var(--muted-foreground))" }}>اختر من بين عشرات الفرص في السيارات والعقارات</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>

      <div className="text-center mt-10">
        <Button variant="navy" size="lg">
          عرض جميع المشاريع
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>
    </div>
  </section>;


const HowItWorksSection = () =>
<section id="how" className="py-20 px-6" style={{ background: "hsl(var(--navy))" }}>
    <div className="max-w-4xl mx-auto text-center">
      <span className="text-sm font-semibold px-4 py-2 rounded-full mb-6 inline-block" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,68%)", border: "1px solid hsl(45 85% 58% / 0.3)" }}>
        كيف تعمل المنصة؟
      </span>
      <h2 className="text-4xl font-black mb-4" style={{ color: "hsl(0,0%,100%)" }}>٣ خطوات فقط للبدء</h2>
      <p className="text-lg mb-14" style={{ color: "hsl(220,10%,68%)" }}>عملية بسيطة وشفافة تماماً</p>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) =>
      <div key={step.num} className="relative group">
            {i < steps.length - 1 &&
        <div className="hidden md:block absolute top-8 left-0 w-full h-px opacity-30" style={{ background: "hsl(45,85%,58%)" }} />
        }
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 border-2 transition-transform group-hover:scale-110" style={{ background: "hsl(45 85% 58% / 0.12)", borderColor: "hsl(45,85%,58%)", color: "hsl(45,85%,58%)" }}>
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(0,0%,95%)" }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(220,10%,65%)" }}>{step.desc}</p>
            </div>
          </div>
      )}
      </div>
    </div>
  </section>;


const CategoriesSection = () =>
<section className="py-20 px-6" style={{ background: "hsl(var(--background))" }}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-3" style={{ color: "hsl(var(--primary))" }}>فئات الاستثمار</h2>
        <p style={{ color: "hsl(var(--muted-foreground))" }}>نغطي أكثر فرص الاستثمار طلباً في السوق</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative rounded-3xl overflow-hidden p-8 group cursor-pointer transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(135deg, hsl(220,65%,15%), hsl(220,50%,22%))", border: "1px solid hsl(45 85% 58% / 0.2)" }}>
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-black mb-2" style={{ color: "hsl(45,85%,62%)" }}>السيارات</h3>
          <p className="mb-6" style={{ color: "hsl(220,10%,72%)" }}>مول سيارت أحلامك بكل سهولة 
        </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,70%)" }}>عائد يصل لـ ١٨٪</span>
            <span className="px-3 py-1 rounded-full" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,70%)" }}>فترة ٦-٢٤ شهر</span>
          </div>
          <div className="absolute top-6 left-6 w-20 h-20 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" style={{ background: "radial-gradient(circle, hsl(45,85%,58%), transparent)" }} />
        </div>

        <div className="relative rounded-3xl overflow-hidden p-8 group cursor-pointer transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(135deg, hsl(150,45%,10%), hsl(150,35%,16%))", border: "1px solid hsl(45 85% 58% / 0.2)" }}>
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-2xl font-black mb-2" style={{ color: "hsl(45,85%,62%)" }}>العقارات</h3>
          <p className="mb-6" style={{ color: "hsl(220,10%,72%)" }}>استثمر في مشاريع سكنية وتجارية مختارة بعناية لضمان أعلى عائد</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="px-3 py-1 rounded-full" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,70%)" }}>عائد يصل لـ ٢٠٪</span>
            <span className="px-3 py-1 rounded-full" style={{ background: "hsl(45 85% 58% / 0.15)", color: "hsl(45,85%,70%)" }}>فترة ١٢-٣٦ شهر</span>
          </div>
          <div className="absolute top-6 left-6 w-20 h-20 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" style={{ background: "radial-gradient(circle, hsl(45,85%,58%), transparent)" }} />
        </div>
      </div>
    </div>
  </section>;

const CTASection = () =>
<section className="py-20 px-6" style={{ background: "linear-gradient(135deg, hsl(220,70%,8%), hsl(220,55%,16%))" }}>
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "hsl(0,0%,100%)" }}>
        جاهز للاستثمار الذكي؟
      </h2>
      <p className="text-lg mb-8" style={{ color: "hsl(220,10%,72%)" }}>
        انضم لأكثر من ٥٠٠٠ مستثمر يثقون في منصة مولها
      </p>
      <Button variant="gold" size="xl" className="text-xl font-black">
        سجّل مجاناً وابدأ الآن
        <ArrowLeft className="w-6 h-6" />
      </Button>
      <p className="mt-4 text-sm" style={{ color: "hsl(220,10%,55%)" }}>لا عمولات مخفية • مرخصة ومنظّمة • دعم على مدار الساعة</p>
    </div>
  </section>;


const Footer = () =>
<footer className="py-10 px-6" style={{ background: "hsl(220,70%,6%)", borderTop: "1px solid hsl(45 85% 58% / 0.12)" }}>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-2xl font-black" style={{ color: "hsl(45,85%,58%)" }}>مولها</div>
      <p className="text-sm" style={{ color: "hsl(220,10%,50%)" }}>© ٢٠٢٦ مولها. جميع الحقوق محفوظة.</p>
      <div className="flex gap-6 text-sm" style={{ color: "hsl(220,10%,55%)" }}>
        <a href="#" className="hover:text-[hsl(45,85%,58%)] transition-colors">الخصوصية</a>
        <a href="#" className="hover:text-[hsl(45,85%,58%)] transition-colors">الشروط</a>
        <a href="#" className="hover:text-[hsl(45,85%,58%)] transition-colors">تواصل معنا</a>
      </div>
    </div>
  </footer>;


const Index = () => {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <NavBar />
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <ProjectsSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>);

};

export default Index;