import { Link } from 'react-router-dom'; 


const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    {/* <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-6 9 6-9 6-9-6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22V12" />
                    </svg>
                    <span className="text-2xl">Home</span> */}
                    <img src="https://movix-app-murex.vercel.app/assets/movix-logo-HTlvmwAF.svg" alt="" />
                </Link>
                <div className="flex space-x-8">
                    <Link to="/movies" className="text-2xl font-bold">Movies</Link>
                    <Link to="/tvshows" className="text-2xl font-bold">TV Shows</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;