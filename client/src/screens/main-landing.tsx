import { Link } from "react-router-dom";

import { Script } from "../helpers/script";
import { Grid, Typography, Stack, Container, Box } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import { AppCtx } from "../app";
//import LoginForm from "../comps/login-form";
import { IInfoTab } from "../models/home";
import Infotab from "../comps/main/info-tab";
import AboutSection from "../comps/main/about-section";
import { Footer } from "../comps/footer";

const LogoLinkStyle = {
  fontSize: 16,
  color: "#d1d1d1",
  textDecoration: "none",
  marginLeft: 3,
  marginRight: 3,
};

const InfoTabsData: Array<IInfoTab> = [
  {
    key: 1,
    title: "Login with wallet",
    description:
      "Connect and use your wallet to login to algomart. You will be able to buy tokens even those minted on different blockchain. Find out more about",
    icon: "account_balance_wallet",
    link: {
      url: "/",
      text: "supported wallets and blockchains.",
    },
  },
  {
    key: 2,
    title: "Create programmable NFT",
    description:
      "Develop your very own NFTs (image, animation, sound, interactive) in the programming language you preffer. Find out more about",
    icon: "code",
    link: {
      url: "/",
      text: "supported programing languages.",
    },
  },
  {
    key: 3,
    title: "Swap with others",
    description:
      "Before the asset gets minted or in case assets reside on the same blockchain, you have option to swap your assets. Find out more on ",
    icon: "swap_horizontal_circle",
    link: {
      url: "/",
      text: "on how to swap assets.",
    },
  },

  {
    key: 4,
    title: "List it and sell it!",
    description:
      "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them! Find out more",
    icon: "bookmark",
    link: {
      url: "/",
      text: "on how to sell your NFT.",
    },
  },
];
export const MainScreen = () => {
  return (
    <>
      <Box>
        <Script
          defer={true}
          script={`var sketchLandingAsset = (p) => {
                        let chains = [],
                        chain = [],
                        shift = 0,
                        iter=0,
                        coordsX = [],
                        coordsY = [];
                        for (let i = 0;i<8;i++){
                          coordsX.push(Math.floor(Math.random()*document.body.clientWidth-200));
                          coordsY.push(Math.floor(Math.random()*300))
                        }
                        const gravity = 9.0,
                        mass = 2.0;
                        p.setup = () => {

                        p.createCanvas(document.body.clientWidth, 400);

                          // Inputs: x, y, mass, gravity

                          for (let i = 0; i < 10; i++) {
                            chain = [];
                            for (let j = 0; j < 7; j++)
                              chain.push(
                                new Spring2D(
                                  0,
                                  p.width / 4,
                                  mass,
                                  gravity,
                                  Math.floor(Math.random() * 30 + 10),
                                  p.color(
                                    Math.floor(Math.random() * 255),
                                    Math.floor(Math.random() * 255),
                                    Math.floor(Math.random() * 255)
                                  ),
                                  shift
                                )
                              );
                            chains.push(chain);
                            shift += 50;
                          }
                        }
                        p.draw = () => {
                          p.background(255);
                          shift = 0;
                          let x,y;
                          if (p.mouseY > p.height){
                            x = coordsX[iter];
                            y = coordsY[iter];
                            if (Math.random()>0.95 && Math.abs(x-chains[0][0].x)<100) iter++;
                            if (iter==coordsX.length)
                              iter = 0;
                          }else{
                            y =  p.mouseY;
                            x =  p.mouseX;
                          }
                          for (var i = 0; i < chains.length; i++) {
                            for (var j = 0; j < chains[i].length; j++) {
                              if (j == 0) {
                                chains[i][j].update(x, y);
                                chains[i][j].display(x, y);
                              } else {
                                chains[i][j].update(chains[i][j - 1].x, chains[i][j - 1].y);
                                chains[i][j].display(chains[i][j - 1].x , chains[i][j - 1].y);
                              }
                              
                            }
                            shift += 50;
                          }
                      }
                        function Spring2D(xpos, ypos, m, g, radius, color, shift) {

                          this.x = xpos; // The x- and y-coordinates
                          this.y = ypos;
                          this.vx = 0; // The x- and y-axis velocities
                          this.vy = 0;
                          this.mass = m;
                          this.gravity = g;
                          this.radius = radius;
                          this.stiffness = 0.2;
                          this.damping = 0.7;
                          this.color = color;
                          this.shift = shift;
                          this.update = function (targetX, targetY) {
                            let forceX = (targetX - this.x) * this.stiffness;
                            let ax = forceX / this.mass;
                            this.vx = this.damping * (this.vx + ax);
                            this.x += this.vx;
                            let forceY = (targetY - this.y) * this.stiffness;
                            forceY += this.gravity;
                            let ay = forceY / this.mass;
                            this.vy = this.damping * (this.vy + ay);
                            this.y +=this.vy;
                          };
                          this.display = function (nx, ny) {
                            p.noStroke();
                            p.fill(this.color);
                            p.ellipse(this.x + this.shift, this.y, this.radius * 2, this.radius * 2);
                            p.stroke(255);
                            //line(this.x, this.y, nx, ny);
                          };
                        }
                    }
                    new p5(sketchLandingAsset, 'landingAsset')
`}
          id={"landingAsset"}
        />
      </Box>
      <Container maxWidth="xl" sx={{ my: 15 }}>
        <Grid container>
          <AboutSection />
          {/* <BigmintCountdown bigmint={new Date("2022-07-06 08:00:00")} /> */}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          {InfoTabsData.map((tab) => (
            <Infotab tab={tab} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
