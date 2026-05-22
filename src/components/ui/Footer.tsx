import React from 'react';
import { ExternalLink, Mail, Phone, MapPin, Github, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200 mt-auto">
            {/* Main Footer */}
            <div className="bg-gradient-to-br from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <img src="/logo.png" alt="Eelep Kal" className="w-8 h-8 object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Ээлеп Кал</h3>
                                    <p className="text-xs text-slate-500">Онлайн бронирование</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                Бронируйте столики в лучших ресторанах, кафе, чайханах и lounge Бишкека онлайн без звонков.
                            </p>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://instagram.com/eelepkal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-500 hover:shadow-md transition-all"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://twitter.com/eelepkal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-500 hover:shadow-md transition-all"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://github.com/eelepkal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-orange-600 hover:border-orange-500 hover:shadow-md transition-all"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                Быстрые ссылки
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <a href="https://client.eelepkal.com/venues" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Все заведения
                                    </a>
                                </li>
                                <li>
                                    <a href="https://client.eelepkal.com/restaurants-bishkek" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Рестораны Бишкека
                                    </a>
                                </li>
                                <li>
                                    <a href="https://client.eelepkal.com/cafe-bishkek" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Кафе Бишкека
                                    </a>
                                </li>
                                <li>
                                    <a href="https://client.eelepkal.com/chayhana-bishkek" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Чайханы Бишкека
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                Ресурсы
                            </h4>
                            <ul className="space-y-2.5">
                                <li>
                                    <a href="https://client.eelepkal.com/lounge-bishkek" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Lounge Бишкека
                                    </a>
                                </li>
                                <li>
                                    <a href="https://client.eelepkal.com/cabins-bishkek" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-orange-600 transition-colors inline-flex items-center gap-2">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Кабинки в ресторанах
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                        Помощь
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                        Документация API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                                Контакты
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-slate-600">
                                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                    <span>Бишкек, Кыргызстан</span>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                    <a href="mailto:info@eelepkal.com" className="hover:text-orange-600 transition-colors">
                                        info@eelepkal.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                                    <a href="tel:+996551234567" className="hover:text-orange-600 transition-colors">
                                        +996 551 234 567
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-600">
                            © {currentYear} Ээлеп Кал. Все права защищены.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                Политика конфиденциальности
                            </a>
                            <a href="#" className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
                                Условия использования
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
