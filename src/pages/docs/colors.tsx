import type { NextPage } from "next";

const Colors: NextPage = () => {
  const divStyle = {
    display: "block",
    paddingLeft: 20,
  };
  const count = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = {
    Greys: "grey",
    Oranges: "orange",
    Reds: "red",
    Purples: "purple",
    Limes: "lime",
    Greens: "green",
    Cyans: "cyan",
    Blues: "blue",
    Yellows: "yellow",
    Browns: "brown",
  };
  return (
    <>
      <h1>Colors!</h1>
      <p>
        Here is a selection of color classes the are included in
        public/colors.css file.{" "}
      </p>
      <p>
        If you need more colors you can generate these monochomatic schemes
        using{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.w3schools.com/w3css/w3css_color_generator.asp"
        >
          W3.css Color Generator
        </a>
      </p>
      {Object.keys(colors).map((color) => {
        const colorClass: string = (colors as any)[color];
        return (
          <div key={color}>
            <h3>{color}</h3>
            {count.map((n) => (
              <div
                key={`${colorClass}-${n}`}
                className={`${colorClass}-${n}`}
                style={divStyle}
              >
                {colorClass}-{n}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Colors;
