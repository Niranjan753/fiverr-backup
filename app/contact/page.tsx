'use client';

import { FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface ContactItem {
    icon: IconType;
    title: string;
    content: string | string[];
    href?: string | string[];
}

export default function Contact() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const contactInfo: ContactItem[] = [
        { 
            icon: FaHome, 
            title: "VISIT US", 
            content: "171-A, P.K.N Road, SIVAKASI-626189" 
        },
        { 
            icon: FaEnvelope, 
            title: "EMAIL", 
            content: "crackersrt@gmail.com", 
            href: "mailto:crackersrt@gmail.com" 
        },
        { 
            icon: FaPhone, 
            title: "CALL US", 
            content: ["+91 94446 52762", "+91 94431 55325"], 
            href: ["tel:+919444652762", "tel:+919443155325"] 
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            <motion.section 
                className="relative py-24 bg-gradient-to-r from-red-600 to-red-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6"
                        {...fadeInUp}
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-red-100 max-w-2xl mx-auto"
                        {...fadeInUp}
                    >
                        We&apos;re here to ignite your celebrations. Reach out for all your firework needs!
                    </motion.p>
                </div>
            </motion.section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {contactInfo.map((item, index) => (
                            <motion.div 
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300"
                                whileHover={{ y: -5 }}
                                {...fadeInUp}
                            >
                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                                {Array.isArray(item.content) ? (
                                    <div className="space-y-2">
                                        {item.content.map((line, i) => (
                                            <a 
                                                key={i} 
                                                href={Array.isArray(item.href) ? item.href[i] : '#'} 
                                                className="block text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                {line}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">
                                        {item.href ? (
                                            <a 
                                                href={item.href as string} 
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                {item.content}
                                            </a>
                                        ) : (
                                            item.content
                                        )}
                                    </p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <motion.section 
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.6751795073707!2d77.80343331472597!3d9.450693893246762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cfb7d31cce6d%3A0xa5da865036326b4e!2sSRT%20CRACKERS!5e0!3m2!1sen!2sus!4v1684884512345!5m2!1sen!2sus"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}