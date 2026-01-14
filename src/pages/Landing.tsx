import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail,
  Recycle,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  landingStats, 
  landingFeatures, 
  howItWorks, 
  testimonials,
  scrapRates 
} from '@/data/mockData';
import logo from '@/assets/kabadi-man-logo.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Kabadi Man" className="w-10 h-10 rounded-xl object-cover" />
              <span className="text-xl font-bold text-foreground">Kabadi Man</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/customer">
                <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
              </Link>
              <Link to="/customer">
                <Button className="gradient-primary text-white border-0">
                  Schedule Pickup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Recycle className="w-4 h-4" />
                <span>Sell Scrap, Save Planet, Earn Money</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Turn Your Scrap Into
                <span className="text-primary"> Cash</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Get the best prices for your scrap with doorstep pickup. 
                We recycle responsibly while you earn effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/customer">
                  <Button size="lg" className="w-full sm:w-auto gradient-primary text-white border-0 h-14 px-8 text-lg">
                    Schedule Free Pickup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg">
                    See How It Works
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 3).map((t, i) => (
                    <img 
                      key={i}
                      src={t.image} 
                      alt={t.name}
                      className="w-10 h-10 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                    ))}
                    <span className="ml-1 font-semibold text-foreground">4.9</span>
                  </div>
                  <p className="text-sm text-muted-foreground">10,000+ happy customers</p>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="relative z-10 bg-card rounded-3xl p-6 shadow-lg border border-border">
                <div className="gradient-primary rounded-2xl p-6 text-white mb-4">
                  <p className="text-white/80 text-sm">Your earnings this month</p>
                  <p className="text-4xl font-bold">₹2,450</p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+32% from last month</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {scrapRates.slice(0, 4).map((rate) => (
                    <div key={rate.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{rate.icon}</span>
                        <span className="font-medium text-foreground">{rate.name}</span>
                      </div>
                      <span className="font-bold text-primary">₹{rate.rate}/{rate.unit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -z-10 top-8 left-8 right-8 bottom-0 bg-primary/20 rounded-3xl blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Pickups Completed', value: landingStats.totalPickups, icon: <Recycle className="w-6 h-6" /> },
              { label: 'Happy Customers', value: landingStats.activeUsers, icon: <Star className="w-6 h-6" /> },
              { label: 'Cities Covered', value: landingStats.citiesCovered, icon: <MapPin className="w-6 h-6" /> },
              { label: 'Scrap Recycled', value: landingStats.scrapCollected, icon: <TrendingUp className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Kabadi Man?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make selling scrap easy, profitable, and environmentally responsible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landingFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-card rounded-2xl border border-border hover:shadow-card hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 mb-4 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selling your scrap has never been easier. Just 3 simple steps!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border">
                    <ChevronRight className="absolute -right-3 -top-3 w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center text-5xl shadow-lg">
                    {step.icon}
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/customer">
              <Button size="lg" className="gradient-primary text-white border-0 h-14 px-8">
                Start Selling Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Live Scrap Rates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing updated daily. Get paid the best market rates.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {scrapRates.map((rate) => (
              <div key={rate.id} className="p-4 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-card transition-all">
                <div className="text-4xl mb-3">{rate.icon}</div>
                <h3 className="font-semibold text-foreground">{rate.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{rate.category}</p>
                <p className="text-2xl font-bold text-primary">₹{rate.rate}<span className="text-sm text-muted-foreground">/{rate.unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Kabadi Man.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gradient-primary rounded-3xl p-8 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Turn Your Scrap Into Cash?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Schedule your free doorstep pickup today and get paid instantly!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/customer">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
                    Schedule Pickup Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/partner">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8">
                    Become a Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="Kabadi Man" className="w-10 h-10 rounded-xl object-cover" />
                <span className="text-xl font-bold">Kabadi Man</span>
              </div>
              <p className="text-background/70 mb-4">
                India's most trusted scrap pickup service. Sell scrap, save planet, earn money.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <span className="sr-only">Facebook</span>📘
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <span className="sr-only">Twitter</span>🐦
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <span className="sr-only">Instagram</span>📸
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/customer" className="hover:text-background transition-colors">Book Pickup</Link></li>
                <li><a href="#pricing" className="hover:text-background transition-colors">Scrap Rates</a></li>
                <li><Link to="/partner" className="hover:text-background transition-colors">Partner With Us</Link></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-background/70">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@kabadiman.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  Mumbai, Maharashtra, India
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/50">
            <p>© 2024 Kabadi Man. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
