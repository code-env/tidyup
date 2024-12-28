const Footer = () => {
  return (
    <footer className="border-t py-8 mt-40 mx-auto max-w-xl w-full flex items-center justify-between">
      <p className="flex gap-1 items-center">
        <img
          src="https://avatars.githubusercontent.com/u/135658967"
          alt="Bossadi Zenith"
          className="size-10 rounded-full"
        />
        by{" "}
        <a
          href="https://x.com/bossadizenith"
          target="_blank"
          rel="noreferrer"
          className="font-bold"
        >
          Bossadi Zenith
        </a>
      </p>
      <p className="classnem">
        Design inspired by{" "}
        <a
          href="https://sonner.emilkowal.ski/"
          target="_blank"
          rel="noreferrer"
          className="font-bold"
        >
          Sonner
        </a>
      </p>
    </footer>
  );
};

export default Footer;
