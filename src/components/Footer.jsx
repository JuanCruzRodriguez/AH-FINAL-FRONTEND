const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-dark text-white text-center py-3 mt-4">
            <p className="mb-0">Juan Cruz Rodríguez | {year}</p>
        </footer>
    )
}

export default Footer;
