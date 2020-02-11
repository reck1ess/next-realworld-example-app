import handleBrokenImage from "../../lib/utils/handleBrokenImage";
import { DEFAULT_PROFILE_IMAGE } from "../../lib/utils/constant";

const CustomImage = ({ src, alt, className }) => (
  <img
    src={src || DEFAULT_PROFILE_IMAGE}
    alt={alt}
    className={className || ``}
    onError={handleBrokenImage}
  />
);

export default CustomImage;
