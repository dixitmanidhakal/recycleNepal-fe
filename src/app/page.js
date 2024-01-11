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
      <div className="p-10 mt-10">
        <div className="text-xl" id="why-recycle-nepal">
          <Typography variant="h2">Why Recycle Nepal?</Typography>
          <Typography variant="h5" sx={{ mt: "10px" }}>
            Recycle Nepals impact extends beyond mere waste collection and
            distribution; it serves as a catalyst for community engagement and
            empowerment. By creating a virtual marketplace for recyclable
            materials, the platform encourages sellers to actively participate
            in the recycling process, promoting a sense of responsibility and
            environmental consciousness. The itinerant buyers, in turn, find a
            reliable and efficient source of raw materials, reducing their
            dependence on traditional, often less sustainable sources. This
            symbiotic relationship fosters a dynamic eco-system where both
            sellers and buyers benefit, creating economic opportunities while
            simultaneously contributing to a greener environment. Moreover,
            Recycle Nepal operates as an educational hub, disseminating
            information about the importance of recycling, the environmental
            impact of waste, and sustainable practices. Through workshops,
            webinars, and informative content, the platform seeks to raise
            awareness about the pressing need for responsible waste management
            in Nepal. By fostering a community that values and actively
            participates in recycling, Recycle Nepal becomes a driving force in
            shaping a more environmentally conscious society. In a broader
            context, Recycle Nepal aligns with global efforts to combat climate
            change and environmental degradation. The platform exemplifies how
            technology and innovation can be harnessed to address pressing
            ecological challenges. As more individuals and businesses join the
            Recycle Nepal movement, the ripple effect on sustainable practices
            is poised to extend far beyond the digital realm, creating a lasting
            impact on the ecological footprint of Nepal.
          </Typography>
          <br />
        </div>

        <div className="text-xl mt-3" id="how-it-works">
          <Typography variant="h2">How it works</Typography>
          <Typography variant="h5" sx={{ mt: "10px" }}>
            {`
            "We" refers to the collective identity of Recycle Nepal, a
            community-driven initiative with a shared vision of promoting
            environmental sustainability and responsible waste management. As a
            collaborative effort, "we" encompass a diverse group of individuals,
            including sellers, buyers, and advocates, who recognize the
            importance of recycling in mitigating environmental impact.
            Together, we form a dynamic network that transcends geographical
            boundaries and social demographics, united by a common goal of
            creating positive change. In essence, "we" are the heartbeat of
            Recycle Nepal, contributing to a larger movement that aims to
            reshape how society views and handles waste. Sellers entrust us with
            their recyclable materials, embodying a commitment to responsible
            disposal, while itinerant buyers rely on us for a sustainable source
            of raw materials. The educational aspect of our initiative further
            highlights that "we" are not just a transactional platform but a
            community that values knowledge-sharing, awareness, and continuous
            learning about environmentally friendly practices. As we
            collectively engage in this journey towards a greener future, "we"
            embody the spirit of collaboration and environmental stewardship,
            striving to make a tangible impact on Nepal's waste management
            landscape. Through our shared efforts, "we" represent the potential
            for positive change, where individuals and businesses alike come
            together to create a more sustainable and ecologically conscious
            society`}
          </Typography>
        </div>

        <div className="text-xl mt-10" id="who-are-we">
          <Typography variant="h2">Who are we?</Typography>
          <Typography variant="h5" sx={{ mt: "10px" }}>
            {`Recycle Nepal is a forward-thinking initiative that transcends the conventional boundaries of waste management. It is a collective endeavor driven by a passionate team of environmentalists, tech enthusiasts, and community builders who believe in the transformative power of recycling. At its core, Recycle Nepal is a dedicated group of individuals committed to addressing the pressing environmental challenges in Nepal through innovative solutions.

    The team at Recycle Nepal consists of professionals with diverse backgrounds, including environmental science, technology, business, and community development. This eclectic mix of skills allows the initiative to approach waste management from multiple angles, blending cutting-edge technology with environmental awareness and community engagement.
    
    Recycle Nepal serves as a bridge connecting sellers seeking responsible waste disposal methods with itinerant buyers eager to utilize recycled materials in their production processes. Beyond its role as a virtual marketplace, the initiative fosters education and awareness campaigns, aiming to instill a sense of environmental responsibility in individuals and businesses alike.
    
    The ethos of Recycle Nepal extends beyond its digital platform; it represents a movement towards sustainable living, responsible consumption, and the circular economy. By redefining the narrative around waste, the team behind Recycle Nepal is actively contributing to a cleaner, greener, and more sustainable future for Nepal and beyond. The initiative is not just an entity but a dynamic force working towards positive environmental change, driven by the collective determination to build a better, more eco-conscious world.`}
          </Typography>
        </div>
      </div>
    </Fragment>
  );
}
