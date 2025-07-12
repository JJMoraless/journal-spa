import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={5} rowHeight={164}>
      {images.map((imgUrl) => (
        <ImageListItem key={imgUrl} sx={{  mb: 4.1,}} >
          <img
            srcSet={`${imgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${imgUrl}?w=164&h=164&fit=crop&auto=format`}
            alt="Note image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};
