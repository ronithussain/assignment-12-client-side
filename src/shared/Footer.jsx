import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImg from '../assets/logo/connection-vector-logo-template.png'

const Footer = () => {
    return (
        <div>

            {/* Footer Section */}
            <footer className=" text-white  bg-opacity-80 backdrop-blur-lg bg-gray-900/80 z-50 py-14">
                <div className="w-10/12 mx-auto md:px-10">
                    <div
                        data-aos="fade-up"
                        className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
                        {/* Logo and Description */}
                        <div>
                            <div className="flex items-center">
                                <img className="sm:w-24 w-18" src={logoImg} alt="Logo" />
                                <h3 className="font-medium text-2xl">
                                    <Link to="/" className=" sm:text-3xl text-xl font-medium">Talk<span className="text-red-500 text-4xl">S</span>phere
                                    </Link>
                                </h3>
                            </div>
                            <p>A Service Review System is a web-based platform that allows users to review and rate various services.</p>

                        </div>

                        {/* Movies Links */}
                        <div className='mt-2'>
                            <h4 className="text-white font-semibold border-b-2 border-orange-600 pb-2">
                                SERVICE
                            </h4>
                            <ul className="mt-4 space-y-2 flex flex-col">
                                <Link to='/about-us' className="link link-hover hover:text-white">About Us</Link>
                                <Link to='/terms-and-policy' className="link link-hover hover:text-white">Terms & Policy</Link>
                            </ul>
                        </div>

                        {/* Additional Links */}
                        <div className='mt-2'>
                            <h4 className="text-white font-semibold border-b-2 border-orange-600 pb-2 inline-block">
                                ADDITIONAL
                            </h4>
                            <ul className="mt-4 space-y-2">
                                <Link to='/contact-us' className="link link-hover hover:text-white">Contact Us</Link>
                            </ul>
                        </div>

                        {/* Newsletter and Social Media */}
                        <div className='mt-2'>
                            <h4 className="text-white font-semibold border-b-2 border-orange-600 pb-2 inline-block">
                                NEWSLETTER
                            </h4>
                            <form className="mt-4">
                                <input
                                    type="email"
                                    placeholder="Newsletter Sign Up"
                                    className="w-full bg-gray-800 text-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                                />
                            </form>
                        </div>
                    </div>
                    <div className='flex lg:justify-center lg:items-center mt-12'>
                        <div className="flex items-center space-x-6">
                            <a href="https://x.com/ZainHussai99859" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-blue-500 hover:text-white" />
                            </a>
                            <a className="" href="https://www.facebook.com/zain.hussain.317274?mibextid=JRoKGi" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className='text-blue-500 hover:text-white' />
                            </a>
                            <a href="https://www.instagram.com/invites/contact/?igsh=ehc5d06duq73&utm_content=dwbztt4 " target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-orange-400 hover:text-white" />
                            </a>
                        </div>
                    </div>
                    <p className="mt-2 text-center text-gray-400">Copyright © 2024. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default Footer;