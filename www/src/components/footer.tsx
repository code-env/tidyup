const Footer = () => {
  return (
    <footer className="border-t py-8 mt-40 mx-auto max-w-xl w-full">
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
    </footer>
  );
};

export default Footer;
