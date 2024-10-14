function NavItem({ children }) {
  return <li className="font-heading font-black text-5xl">{children}</li>;
}

export default function Hero() {
  return (
    <section className="flex flex-row justify-center h-screen bg-red-600">
      <div className="flex flex-col-reverse h-full">
        <h1 className="font-sans text-3xl">
          Hi, I'm <span className="font-bold">Jonas Pilloud</span>
        </h1>
      </div>
      <div className="flex flex-col-reverse">
        <ul>
          <NavItem>About me</NavItem>
          <NavItem>Career</NavItem>
          <NavItem>Projects</NavItem>
        </ul>
      </div>
    </section>
  );
}
