const Footer = () => {
    return (
        <div className="h-auto bg-gray-800 pt-8 pb-4">
            <div className="m-auto flex flex-col items-center w-4/5">
            <ul className="list-none text-center mb-4">
                <li><i>Make your body better</i></li>
                <li className="text-gray-500 hover:text-gray-300"><i><a href="https://github.com/rodionspi/training_helper">Check out the code on GitHub</a></i></li>
            </ul>
            <ul className="list-none bg-gray-700 rounded-md p-3 w-full text-center sm:mt-4">
                <li className="mb-2"><a href="/" className="hover:text-slate-400">Muscle Chart</a></li>
                <li><a href="/about" className="hover:text-slate-400">About</a></li>
            </ul>
            </div>
        </div>
    );
};

export default Footer;