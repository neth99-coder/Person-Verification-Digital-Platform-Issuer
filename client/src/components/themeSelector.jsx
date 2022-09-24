import React from "react";

function ThemeSelector({ theme }) {
  theme = theme ? "dark" : "light";
  const stylesheet = `${process.env.PUBLIC_URL}/css/bootstrap-${theme}.css`;
  return <link rel="stylesheet" type="text/css" href={stylesheet}></link>;
}

export default ThemeSelector;
