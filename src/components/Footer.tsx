function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer>
      <p>{`Ⓒ 2020-${currentYear} Kamaal Farah`}</p>
    </footer>
  );
}

export default Footer;
