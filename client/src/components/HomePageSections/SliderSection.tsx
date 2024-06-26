import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";


const images = [
  "https://perenual.com/storage/species_image/540_adenium_obesum/thumbnail/9244335137_6d662ed77c_b.jpg",
  "https://perenual.com/storage/species_image/721_aloe_harlana/thumbnail/5582077315_8d613454aa_b.jpg",
  "https://perenual.com/storage/species_image/727_aloe_suzannae/thumbnail/23704519300_5ec1807143_b.jpg",
  "https://perenual.com/storage/species_image/728_aloe_vera/thumbnail/52619084582_6ebcfe6a74_b.jpg",
  "https://perenual.com/storage/species_image/1025_asparagus_densiflorus_sprengeri/thumbnail/24818361201_11881d4f76_b.jpg",
  "https://perenual.com/storage/species_image/1223_begonia_tuberhybrida_jurassic_pink_splash/thumbnail/22656824786_be81bc2887_b.jpg",
  "https://perenual.com/storage/species_image/1845_chlorophytum_amaniense/thumbnail/2560px-Chlorophytum_orchidastrum_2016-04-28_9101.jpg",
  "https://perenual.com/storage/species_image/22_acer_japonicum_green_cascade/thumbnail/4847225395_2509ee2bfe_b.jpg",
  "https://perenual.com/storage/species_image/23_acer_macrophyllum/thumbnail/52135137216_8a124b5188_b.jpg",
  "https://perenual.com/storage/species_image/24_acer_macrophyllum_mocha_rose/thumbnail/4715169892_220a9d39f6_b.jpg",
  "https://perenual.com/storage/species_image/25_acer_negundo_flamingo/thumbnail/5867345385_a9dff5bee7_b.jpg",
  "https://perenual.com/storage/species_image/26_acer_negundo_kellys_gold/thumbnail/28819730054_e2a2b797c9_b.jpg"
];

const slide = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.primary1.color};
  transition: ${props => props.theme.transitions.backgroundColor};
  margin: 0;
`;

const SliderContainer = styled.div`
  display: flex;
  overflow: hidden;
  padding: 20px 0px; // padding for top/bottom only
  background-color: ${props => props.theme.primary1.color};
  transition: ${props => props.theme.transitions.backgroundColor};
  white-space: nowrap;
  position: relative;
  width: 100%;
`;

const ImageSlider = styled.div`
  display: inline-block;
  animation: ${slide} 35s infinite linear;
  
`;

const PlantImage = styled.img`
  height: 150px;
  margin: 0 60px;
  border-radius: 5px;
`;

const SliderTitle = styled.h2`
  background-color: ${props => props.theme.secondary1.color};
  color: ${props => props.theme.primary1.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 10px 30px;
  border-radius: 10px;
  text-align: center;
`;

const SliderSection: React.FC = () => {
  const imagesSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logic to clone and append the content after the component mounts
    if (imagesSliderRef.current) {
      // cloning logic targets the "ImageSlider" component directly. Clones the entire component then appends it to the parent node, which is the "ImageSlider"
      const copy = imagesSliderRef.current.cloneNode(true);
      imagesSliderRef.current.parentNode?.appendChild(copy);
    }
  }, []); // Empty dependency array ensures this effect runs once after mount

  return (
    <>
      <SliderWrapper>
        <SliderTitle>
          🪴 Plant Parenthood Perfected: GreenPets, Nurturing Nature's Beauty 🌱
        </SliderTitle>
        <SliderContainer>
          <ImageSlider ref={imagesSliderRef}>
            {images.map((image, index) => (
              <PlantImage key={index} src={image} />
            ))}
          </ImageSlider>
        </SliderContainer>
      </SliderWrapper>
    </>
  )
};

export default SliderSection;