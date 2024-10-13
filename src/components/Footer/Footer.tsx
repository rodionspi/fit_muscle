const Footer = () => {
    return (
        <div className="h-44 bg-gray-800 pt-8">
            <div className="m-auto flex flex-row flex-wrap justify-around content-center w-4/5">
                <ul className="list-none flex justify-between flex-col">
                    <li><i>Make your body better</i></li>
                    <li className="text-gray-500 hover:text-gray-300"><i><a href="https://github.com/rodionspi/training_helper">Check out the code on GitHub</a></i></li>
                 </ul>
                <ul className="list-none bg-gray-700 rounded-md p-3">
                    <li><a href="#" className="hover:text-slate-400">Muscle Chart</a></li>
                    <li><a href="/about" className="hover:text-slate-400">About</a></li>
                    <li><a href="/contact" className="hover:text-slate-400">Contact</a></li>
                    <li><a href="/faq" className="hover:text-slate-400">FAQ</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;