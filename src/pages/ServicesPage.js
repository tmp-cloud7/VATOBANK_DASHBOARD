import React from 'react';
import { Footer, NavbarLanding } from '../component';

const services = [
  {
    title: "Personal Banking",
    description: "Manage your personal finances with ease. From savings accounts to personal loans, we've got you covered.",
    icon: "📊",
    link: "/personal-banking"
  },
  {
    title: "Business Banking",
    description: "Tailored solutions for small businesses and corporations. Offering business accounts, loans, and merchant services.",
    icon: "🏢",
    link: "/business-banking"
  },
  {
    title: "Mortgage Services",
    description: "Find the perfect mortgage solution for your dream home. Our experts are here to guide you through every step.",
    icon: "🏠",
    link: "/mortgage-services"
  },
  {
    title: "Investment Solutions",
    description: "Grow your wealth with our diverse investment options, including stocks, bonds, and retirement plans.",
    icon: "💰",
    link: "/investment-solutions"
  },
  {
    title: "Customer Support",
    description: "Our customer support team is here 24/7 to assist you with any queries or issues you may face.",
    icon: "📞",
    link: "/customer-support"
  }
];

const ServicesPage = () => {
  return (
    <div>
      <NavbarLanding />
    <div className="bg-gray-50 p-8">
      <h1 className="text-4xl font-semibold text-center text-gray-900 mb-10">Our Services</h1>
      <div className="flex flex-col space-y-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4 text-blue-600">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
            <p className="text-gray-700 mt-2">{service.description}</p>
            <a 
              href={service.link} 
              className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
            >
              Learn more &rarr;
            </a>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ServicesPage;
