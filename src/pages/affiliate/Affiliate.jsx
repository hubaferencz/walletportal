import React from "react";
import affiliateData from "./affiliateData";
import AffiliateItem from "./AffiliateItem";
import "./Affiliate.css";
import crytpocom from "./logos/cryptocom.png";

function Affiliate() {
  return (
    <div className="antialiased font-sans p-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {affiliateData.map((affiliate) => (
            <AffiliateItem
              key={affiliate.id}
              title={affiliate.title}
              image={affiliate.image}
              description={affiliate.description}
              link={affiliate.link}
            />
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default Affiliate;
