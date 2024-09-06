import defaultAvatar from "../assets/img/astronaut.png";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Avatar = ({ avatarUrl, altText, className = "object-cover" }) => {
  const avatarSrc =
    avatarUrl && isValidUrl(avatarUrl) ? avatarUrl : defaultAvatar;
  return <img src={avatarSrc} alt={altText} className={className} />;
};
export default Avatar;
