import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { Fragment } from "react";
import { generateLoremIpsum } from "@/utilis/loremIpsum";
import { Typography } from "@mui/material";

export default function Home() {
  const loremIpsumText = generateLoremIpsum(50);

  return (
    <Fragment>
      <NavBar />
      <div className="text-xl" id="why-recycle-nepal">
        <Typography variant="h2">Why Recycle Nepal?</Typography>
        {loremIpsumText}
        <br />
      </div>

      <div className="text-xl" id="how-it-works">
        <Typography variant="h2">How it works</Typography>
        {loremIpsumText}
      </div>

      <div className="text-xl" id="who-are-we">
        <Typography variant="h2">Who are we?</Typography>
        {loremIpsumText}
      </div>
    </Fragment>
  );
}
