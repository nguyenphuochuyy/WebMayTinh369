import React from "react";
import "../../styles/About_styles/About.scss";

const AboutPage = () => {
  const stats = [
    { count: "10.5k", label: "Sellers active on our site" },
    { count: "33k", label: "Monthly Product Sale" },
    { count: "45.5k", label: "Customers active on our site" },
    { count: "25k", label: "Annual gross sale on our site" },
  ];

  const teamMembers = [
    { name: "Tom Cruise", position: "Founder & Chairman", image: "https://s3-alpha-sig.figma.com/img/0881/49fd/5afc043392ee3cbb529f429b3e2098d3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=thm~FY6rZ2J~YF~RFYLGs1QDZDwu5sQAoHPRSj9NYzmC4Z4MU1v9kMkzwQ0w1YSKnzyXfYYInyNSGuD1lj5CDJtJM33IsXvwvzIX7u2MQh~5dw5RUCTDtvKf12g7g~Ebcg-WD8MO90QncV7rzdl8RNtvBqoPnNpJAoiEfAJ0KDLTnFNnJLtegC~H9b3H3iwaZe3bmtSKsEzRY5eef16AV7ugKTRQaCcVddKGcIzHZjAp4z5hvtZf8EsepcWJjr~uLT6W2CkAUr-0avE1cnMN8ZJ9qhIR6lRxpaHk4kURmQReb6nmVOMQkYjQji6t4m2Di1Aus7KVIlrA5SH8YpVEnA__" },
    { name: "Emma Watson", position: "Managing Director", image: "https://s3-alpha-sig.figma.com/img/8438/eab9/a2fe88af0272adecd83422d0cb7e20d7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Fe52RwdgpI4xFJwOhamd3IuZGjQ1hl03LYHRQgMW16nAtEv90uUrNT7Vy12S0JTZ2eXutuYebNY8ARXSD6woaJJJilJKmv1d5vMCbZKXc1XMnG~Qbwhx2JAsHEDxjJmTAhaRCQlJpLnwxYZ6TrvXBrH1cfwjbWUrFcdP4ef0XQRbmzb0eIpyB--uGP8aN5PO46y5PVwZT~8vEs48cDI-Z~aT5kzaf~l-tlUiDJTKmoYf0p6BY1EAMYvE0sggXnKTwW~lp5Ms70ihGig49ro2EfH8wp65Dwy~C2hnE5y0hEyg1CypQ~B4M84n6LIOhYrPiYCjqlm0N9v5h3UPLGaFCw__" },
    { name: "Will Smith", position: "Product Designer", image: "https://s3-alpha-sig.figma.com/img/ede4/8f2b/5df8103b281240ce5bafe5dd7d215ab8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=I3p~IQv88Piie7kBdp1R4ZLNjm~XpemoUQize9rWICD4mrXjPjyHx2xvIJKwYhSL1xOjwgZf3Wm05pmNg~~vHrV7k8eyBJvfxYVc7Xq~KO7vith7meQvd4BSR-zbkQCnD-aNlJgWZ5SLOSnT8or29uSJVmtlg8l0lFHEkrmuqNiQ3uu8Mh3NThtC~eZ5zy-D2rq8qYTZ8LT7ykDoxucOPXUY7K8Q3BPHJXfn2w1HC231rXVVo5yiRL0G-avYnFRsxBhInwGNBbodwo20KHUKQttLRcR0S8aQfV4pjjq9zf31sAtC4toIFppkPxGsro2oa0hvRc1i6xKLLitU50G3GQ__" },
  ];

  const features = [
    { title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
    { title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support" },
    { title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" },
  ];

  return (
    <div className="about-page">
      {/* Our Story */}
      <div className="about-section">
        <div className="about-text">
          <h1>Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia`s premier online shopping marketplace with an active presence in Bangladesh. 
            Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands 
            and serves 3 million customers across the region.
          </p>
          <p>
            Exclusive has more than 1 million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment 
            in categories ranging from consumer products.
          </p>
        </div>
        <div className="about-image">
          <img src="https://s3-alpha-sig.figma.com/img/fcc8/9aaa/7b85f8c1dcce81e71e2eb178be13bd4d?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=snyr9cEc4mqkgddzXXvB88s85nA478H6OeY7Ghu1AVMc2W9TZN2C~ttrZ9P8eimp3g~zK0Re26~8AgawUNjAjDeomUlIyRvap-mY1Oos1I9NF-zBUTy6TWJvC~I3cj508tGzlML5YRSizC0g~z0tmse6N5j5iVRPGfSomN1AQliLvl34rzzvbpmWLBT7~sbhVYOihHRItVnZin6fOV6p6Ft9iCU92pjyCQ~hGYmmrwUMHe53ANC4t1mNLU6UhX7daOzBShLqiaEgj99VODQX7O8u5KykkUZM12iMJKa6nR69v5Sya6SkQpLHswLJiTU4Cg0yY6vcg2atLxeogFrgmA__" alt="About Us" />
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h2>{stat.count}</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Team Members */}
      <div className="team">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-image">
              <img src={member.image} alt={member.name} width={100}/>
            </div>
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;