import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Search,
  Share2,
  Mail,
  Smartphone,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DigitalPro</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#servicios" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Servicios
            </Link>
            <Link href="#casos" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Casos de Éxito
            </Link>
            <Link href="#nosotros" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Contacto
            </Link>
          </nav>

          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Consulta Gratis
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">#1 Agencia de Marketing Digital</Badge>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                    Impulsa tu negocio al{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      siguiente nivel
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    Aumentamos tus ventas hasta un 300% con estrategias de marketing digital personalizadas. Más de 500
                    empresas confían en nosotros.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                  >
                    Obtener Propuesta Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 bg-transparent">
                    Ver Casos de Éxito
                  </Button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Clientes Satisfechos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">300%</div>
                    <div className="text-sm text-gray-600">Aumento Promedio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5★</div>
                    <div className="text-sm text-gray-600">Calificación</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Marketing Digital Dashboard"
                    width={600}
                    height={600}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-blue-100 text-blue-700">Nuestros Servicios</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Soluciones Integrales de Marketing Digital
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ofrecemos servicios especializados para hacer crecer tu negocio en el mundo digital
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">SEO & SEM</CardTitle>
                  <CardDescription>
                    Posicionamiento orgánico y campañas de Google Ads para maximizar tu visibilidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Auditoría SEO completa
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Campañas Google Ads optimizadas
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Reportes mensuales detallados
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Social Media</CardTitle>
                  <CardDescription>
                    Gestión profesional de redes sociales para construir tu comunidad digital
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Estrategia de contenido
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Community management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Publicidad en redes sociales
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Email Marketing</CardTitle>
                  <CardDescription>
                    Campañas de email marketing automatizadas para nutrir y convertir leads
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Automatización de emails
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Segmentación avanzada
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      A/B testing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Analytics & Data</CardTitle>
                  <CardDescription>
                    Análisis profundo de datos para optimizar tus estrategias de marketing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Dashboard personalizado
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Tracking de conversiones
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Reportes ejecutivos
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-pink-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Branding Digital</CardTitle>
                  <CardDescription>Construcción y fortalecimiento de tu marca en el ecosistema digital</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Identidad visual digital
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Estrategia de marca
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Reputación online
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-indigo-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Desarrollo Web</CardTitle>
                  <CardDescription>
                    Sitios web optimizados para conversión y experiencia de usuario excepcional
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Diseño responsive
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Optimización CRO
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Velocidad de carga
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Casos de Éxito */}
        <section id="casos" className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <Badge className="bg-green-100 text-green-700">Casos de Éxito</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Resultados que Hablan por Sí Solos</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre cómo hemos transformado negocios como el tuyo
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Cliente 1"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-lg">TechStart SAS</CardTitle>
                      <CardDescription>Startup Tecnológica</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">+450%</div>
                      <div className="text-sm text-gray-600">Tráfico Web</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+280%</div>
                      <div className="text-sm text-gray-600">Conversiones</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "En 6 meses logramos posicionarnos como líderes en nuestro sector gracias a su estrategia integral."
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Cliente 2"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-lg">Fashion Store</CardTitle>
                      <CardDescription>E-commerce de Moda</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">+320%</div>
                      <div className="text-sm text-gray-600">Ventas Online</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">+180%</div>
                      <div className="text-sm text-gray-600">ROI</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Triplicamos nuestras ventas online y mejoramos significativamente nuestro ROI en publicidad."
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Cliente 3"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <div>
                      <CardTitle className="text-lg">RestaurantPro</CardTitle>
                      <CardDescription>Cadena de Restaurantes</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+250%</div>
                      <div className="text-sm text-gray-600">Reservas</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">+400%</div>
                      <div className="text-sm text-gray-600">Seguidores</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Aumentamos nuestras reservas y construimos una comunidad sólida en redes sociales."
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-purple-100 text-purple-700">¿Por Qué Elegirnos?</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">La Diferencia que Marca el Éxito</h2>
                  <p className="text-xl text-gray-600">
                    No somos una agencia más. Somos tu socio estratégico para el crecimiento digital.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Equipo Especializado</h3>
                      <p className="text-gray-600">
                        Más de 50 expertos certificados en Google, Facebook y las principales plataformas digitales.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Resultados Medibles</h3>
                      <p className="text-gray-600">
                        Transparencia total con reportes detallados y métricas claras de ROI y crecimiento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Estrategias Personalizadas</h3>
                      <p className="text-gray-600">
                        Cada estrategia es única y diseñada específicamente para tu industria y objetivos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Soporte 24/7</h3>
                      <p className="text-gray-600">
                        Atención personalizada y soporte técnico disponible cuando lo necesites.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Equipo trabajando"
                  width={500}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">¿Listo para Transformar tu Negocio?</h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Obtén una consultoría gratuita y descubre cómo podemos hacer crecer tu empresa
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Input
                    placeholder="Tu email empresarial"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                    Consulta Gratis
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">15 min</div>
                  <div className="text-sm text-blue-100">Consulta Express</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-blue-100">Sin Compromiso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-sm text-blue-100">Respuesta Garantizada</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">DigitalPro</span>
              </div>
              <p className="text-gray-400">
                Tu socio estratégico para el crecimiento digital. Transformamos negocios a través del marketing digital.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Share2 className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Servicios</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    SEO & SEM
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Email Marketing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Desarrollo Web
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Casos de Éxito
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span>+57 (1) 234-5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span>hola@digitalpro.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>Bogotá, Colombia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DigitalPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
