const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-500 text-sm">
                        © {currentYear} <span className="font-semibold text-gray-700">InventoryLab</span>. All rights reserved.
                    </div>

                    <div className="flex gap-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
                        <a href="#" className="hover:text-blue-500 transition-colors">Docs</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;