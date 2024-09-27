import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 text-center bg-gray-800 text-white">
            <ul className="flex space-x-4 mb-4">
                <li className="hover:text-pink-600 cursor-pointer">Terms of use</li>
                <li className="hover:text-pink-600 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-pink-600 cursor-pointer">About</li>
                <li className="hover:text-pink-600 cursor-pointer">Blog</li>
                <li className="hover:text-pink-600 cursor-pointer">FAQ</li>
            </ul>
            <p className="text-gray-300 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore <br />magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor <br />in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f hover:text-blue-500"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram hover:text-pink-500"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in hover:text-blue-700"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github hover:text-gray-500"></i>
                </a>
            </div>
        </div>
    );
};

export default Footer;