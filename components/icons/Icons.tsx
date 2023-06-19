import {
  faShareNodes,
  faChevronUp,
  faChevronDown,
  faAdd,
  faPowerOff,
  faUser,
  faRightToBracket,
  faUserPlus,
  faArrowLeft,
  faHouse,
  faAngleUp,
  faAngleDown,
  faBookmark as faSaved,
  faSearch,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import {
  faMessage,
  faBookmark as faSave,
} from "@fortawesome/free-regular-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UpIcon() {
  return (
    <FontAwesomeIcon
      icon={faAngleUp}
      className="hover:text-blue-600 h-6 md:h-7"
    />
  );
}

export function UpvotedIcon() {
  return (
    <FontAwesomeIcon icon={faAngleUp} className="text-blue-600 h-6 md:h-7" />
  );
}

export function DownIcon() {
  return (
    <FontAwesomeIcon
      icon={faAngleDown}
      className="hover:text-blue-600 h-6 md:h-7"
    />
  );
}

export function DownvotedIcon() {
  return (
    <FontAwesomeIcon
      icon={faAngleDown}
      className="text-blue-600 h-6 md:h-7"
    />
  );
}

export function CommentIcon() {
  return <FontAwesomeIcon icon={faMessage} />;
}

export function ShareIcon() {
  return <FontAwesomeIcon icon={faShareNodes} />;
}

export function SearchIcon() {
  return <FontAwesomeIcon icon={faSearch} />;
}

export function SaveIcon() {
  return <FontAwesomeIcon icon={faSave} />;
}

export function SavedIcon() {
  return <FontAwesomeIcon icon={faSaved} className="text-blue-600" />;
}

interface IconProps {
  onClick?: (e: any) => void;
}
export function ExpandIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faChevronDown} onClick={props.onClick} />;
}

export function CollapseIcon(props: IconProps) {
  return <FontAwesomeIcon icon={faChevronUp} onClick={props.onClick} />;
}

export function GoogleIcon() {
  return <FontAwesomeIcon icon={faGoogle} />;
}

export function GithubIcon() {
  return <FontAwesomeIcon icon={faGithub} />;
}

export function CreateIcon() {
  return <FontAwesomeIcon icon={faAdd} />;
}

export function HouseIcon() {
  return <FontAwesomeIcon icon={faHouse} />;
}

export function LogoutIcon() {
  return <FontAwesomeIcon icon={faPowerOff} />;
}

export function ProfileIcon() {
  return <FontAwesomeIcon icon={faUser} />;
}

export function LoginIcon() {
  return <FontAwesomeIcon icon={faRightToBracket} />;
}

export function SignupIcon() {
  return <FontAwesomeIcon icon={faUserPlus} />;
}

export function BackIcon() {
  return <FontAwesomeIcon icon={faArrowLeft} />;
}

export function RisingIcon() {
  return <FontAwesomeIcon icon={faBolt} />;
}
